import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE_CONFIG } from '@/lib/constants';

const resend = new Resend(process.env.RESEND_API_KEY);

const serviceLabels: Record<string, string> = {
  menage: 'Ménage et nettoyage',
  repassage: 'Repassage et entretien du linge',
  courses: 'Livraison de courses',
  'nettoyage-specifique': 'Nettoyage spécifique',
  'home-organising': 'Home Organising & Coaching',
  professionnel: 'Services professionnels',
  autre: 'Autre demande',
};

export async function POST(request: NextRequest) {
  try {
    // Vérifier que la clé API est configurée
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Configuration Resend manquante' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { nom, email, telephone, service, message } = body;

    console.log('Contact form submission:', { nom, email, telephone, service });

    // Validation basique
    if (!nom || !email || !telephone || !service || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Envoi de l'email à l'entreprise
    // Note: L'email "from" doit être un domaine vérifié sur Resend
    // Par défaut, utilisez "onboarding@resend.dev" pour les tests
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = SITE_CONFIG.contact.email;
    
    console.log('Sending email from:', fromEmail, 'to:', toEmail);
    
    const { data, error } = await resend.emails.send({
      from: `Satisfait Services <${fromEmail}>`,
      to: SITE_CONFIG.contact.email,
      replyTo: email,
      subject: `Nouvelle demande de contact - ${serviceLabels[service] || service}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
              .value { color: #4b5563; }
              .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3B82F6; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nouvelle demande de contact</h1>
                <p style="margin: 0; opacity: 0.9;">Formulaire de contact - Satisfait Services</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Nom complet</div>
                  <div class="value">${nom}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Téléphone</div>
                  <div class="value"><a href="tel:${telephone}">${telephone}</a></div>
                </div>
                <div class="field">
                  <div class="label">Service souhaité</div>
                  <div class="value">${serviceLabels[service] || service}</div>
                </div>
                <div class="message-box">
                  <div class="label">Message</div>
                  <div class="value" style="white-space: pre-wrap;">${message}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Nouvelle demande de contact - Satisfait Services

Nom complet: ${nom}
Email: ${email}
Téléphone: ${telephone}
Service souhaité: ${serviceLabels[service] || service}

Message:
${message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email', details: error },
        { status: 500 }
      );
    }

    console.log('Email sent successfully to business:', data);

    // Email de confirmation au client
    const confirmationResult = await resend.emails.send({
      from: `Satisfait Services <${fromEmail}>`,
      to: email,
      subject: 'Votre demande a bien été reçue - Satisfait Services',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Merci pour votre demande !</h1>
              </div>
              <div class="content">
                <p>Bonjour ${nom},</p>
                <p>Nous avons bien reçu votre demande concernant <strong>${serviceLabels[service] || service}</strong>.</p>
                <p>Notre équipe va examiner votre demande et vous recontacter dans les plus brefs délais.</p>
                <p>En attendant, n'hésitez pas à nous contacter directement :</p>
                <ul>
                  <li>Téléphone : <a href="tel:${SITE_CONFIG.contact.phone}">${SITE_CONFIG.contact.phone}</a></li>
                  <li>Email : <a href="mailto:${SITE_CONFIG.contact.email}">${SITE_CONFIG.contact.email}</a></li>
                </ul>
                <p>Cordialement,<br>L'équipe Satisfait Services</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (confirmationResult.error) {
      console.error('Error sending confirmation email:', confirmationResult.error);
      // On continue quand même car l'email principal a été envoyé
    } else {
      console.log('Confirmation email sent successfully:', confirmationResult.data);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du formulaire' },
      { status: 500 }
    );
  }
}
