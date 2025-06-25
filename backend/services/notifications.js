const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class NotificationService {
  async sendEmail(to, subject, text) {
    if (process.env.NODE_ENV === 'test') {
      console.log(`[Email Mock] To: ${to}, Subject: ${subject}`);
      return { success: true };
    }

    const msg = {
      to,
      from: process.env.EMAIL_FROM,
      subject,
      text
    };

    try {
      await sgMail.send(msg);
      return { success: true };
    } catch (err) {
      console.error('Email error:', err);
      return { success: false, error: err.message };
    }
  }

  async sendSMS(to, message) {
    console.log(`[SMS Mock] To: ${to}, Message: ${message}`);
    return { success: true };
  }
}

module.exports = new NotificationService();