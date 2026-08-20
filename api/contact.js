// Fonction serverless Vercel : reçoit le formulaire de contact et envoie
// un email via l'API Resend (https://resend.com). Ne fonctionne que sur
// Vercel (ignorée par GitHub Pages, qui ne sait pas exécuter de backend).
//
// Variables d'environnement à configurer dans les réglages du projet Vercel :
//   RESEND_API_KEY   (obligatoire) clé API Resend
//   CONTACT_TO_EMAIL (optionnel)   email de reception, defaut : support@agency-gp.com
//   RESEND_FROM      (optionnel)   expediteur, defaut : onboarding@resend.dev
//                                  (utilisable sans verifier de domaine ;
//                                  pour un vrai domaine verifie, ex :
//                                  "GP Agency <contact@agency-gp.com>")

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Méthode non autorisée.' });
  }

  const { name, hotel, email, rooms, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ ok: false, error: 'Nom et email requis.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ ok: false, error: 'RESEND_API_KEY manquant côté serveur.' });
  }

  const to = process.env.CONTACT_TO_EMAIL || 'support@agency-gp.com';
  const from = process.env.RESEND_FROM || 'GP Agency <onboarding@resend.dev>';

  const text = [
    `Nom : ${name}`,
    `Hôtel : ${hotel || '-'}`,
    `Email : ${email}`,
    `Nombre de chambres : ${rooms || '-'}`,
    `Message : ${message || '-'}`,
  ].join('\n');

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Nouvelle demande de diagnostic — ${name}`,
        text,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      return res.status(502).json({ ok: false, error: errBody });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Envoi de l'email impossible." });
  }
};
