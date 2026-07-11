export const emailTemplates = {
  /**
   * Template for Appointment Booking Confirmation
   */
  bookingConfirmation: ({ patientName, serviceName, date, time, email, plainPassword }) => {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmation</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px 0; color: #1a202c; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; overflow: hidden; border: 1px solid #e2e8f0; }
          .header { padding: 20px 30px; border-bottom: 1px solid #e2e8f0; display: table; width: 100%; box-sizing: border-box; }
          .logo { color: #004494; font-size: 24px; font-weight: 700; text-decoration: none; display: table-cell; vertical-align: middle; }
          .icons { display: table-cell; text-align: right; vertical-align: middle; color: #4a5568; }
          .hero { position: relative; background-color: #004494; color: white; text-align: left; background-image: url('${baseUrl}/email/hero.jpg'); background-size: cover; background-position: center; padding: 60px 30px; }
          .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,68,148,0.8) 0%, rgba(0,68,148,0.2) 100%); z-index: 1; }
          .hero-content { position: relative; z-index: 2; }
          .hero h1 { font-size: 32px; font-weight: 800; margin: 0 0 10px 0; line-height: 1.2; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
          .hero p { font-size: 14px; margin: 0; opacity: 0.9; max-width: 300px; line-height: 1.5; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
          .content { padding: 30px; }
          .title { color: #004494; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 20px; }
          .text { font-size: 14px; line-height: 1.6; color: #4a5568; margin-bottom: 25px; }
          .card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px; }
          .card-row { display: table; width: 100%; margin-bottom: 15px; }
          .card-col { display: table-cell; width: 50%; vertical-align: top; }
          .label { font-size: 10px; font-weight: 700; color: #718096; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; }
          .value-lg { font-size: 16px; font-weight: 700; color: #1a202c; margin: 0 0 4px 0; }
          .value-sm { font-size: 13px; color: #4a5568; margin: 0; }
          .divider { height: 1px; background-color: #cbd5e1; margin: 15px 0; }
          .location { font-size: 13px; color: #4a5568; margin: 0; }
          .actions { display: block; margin-bottom: 40px; }
          .btn-primary { display: inline-block; background-color: #004494; color: #ffffff !important; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 20px; margin-right: 10px; }
          .btn-secondary { display: inline-block; background-color: #ffffff; color: #004494 !important; font-weight: 600; font-size: 14px; text-decoration: none; padding: 11px 23px; border-radius: 20px; border: 1px solid #004494; }
          .news-section { margin-bottom: 20px; }
          .news-title { font-size: 16px; font-weight: 700; color: #1a202c; margin-bottom: 15px; }
          .news-grid { display: table; width: 100%; border-spacing: 15px 0; margin-left: -15px; margin-right: -15px; }
          .news-item { display: table-cell; width: 50%; vertical-align: top; }
          .news-img { width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px; display: block; }
          .news-heading { font-size: 13px; font-weight: 700; color: #1a202c; margin: 0 0 5px 0; }
          .news-desc { font-size: 12px; color: #4a5568; line-height: 1.5; margin: 0; }
          .footer { background-color: #f8fafc; padding: 30px; text-align: left; border-top: 1px solid #e2e8f0; }
          .footer-top { display: table; width: 100%; margin-bottom: 20px; }
          .footer-logo { display: table-cell; width: 50%; }
          .footer-logo h3 { color: #004494; font-size: 16px; font-weight: 700; margin: 0 0 5px 0; }
          .footer-logo p { font-size: 12px; color: #718096; margin: 0; max-width: 200px; line-height: 1.4; }
          .footer-links { display: table-cell; width: 50%; text-align: right; vertical-align: top; }
          .footer-link { color: #4a5568; font-size: 12px; text-decoration: underline; margin-left: 10px; display: inline-block; margin-bottom: 5px; }
          .footer-bottom { display: table; width: 100%; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          .copyright { display: table-cell; font-size: 11px; color: #a0aec0; }
          .tagline { display: table-cell; font-size: 11px; color: #a0aec0; text-align: right; }
          .password-alert { background-color: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; margin-bottom: 25px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <a href="${baseUrl}" class="logo">Zenith Physio</a>
            <div class="icons">
              <span style="font-size: 18px; margin-left: 10px;">🔔</span>
              <span style="font-size: 18px; margin-left: 10px;">👤</span>
            </div>
          </div>

          <!-- Hero Section -->
          <div class="hero">
            <div class="hero-overlay"></div>
            <div class="hero-content">
              <h1>Your Path to<br>Recovery Starts<br>Here</h1>
              <p>Personalized clinical excellence for a stronger, healthier you.</p>
            </div>
          </div>

          <!-- Main Content -->
          <div class="content">
            <h2 class="title">Appointment Confirmation</h2>
            
            <p class="text">Hello ${patientName},</p>
            <p class="text">This is a friendly reminder of your upcoming physiotherapy session at Zenith Physio. Our team is dedicated to providing you with the highest standard of care on your journey to recovery.</p>

            ${plainPassword ? `
            <div class="password-alert">
              <p style="margin: 0 0 5px 0; font-size: 13px; font-weight: 700; color: #2b6cb0;">Welcome to the Patient Portal!</p>
              <p style="margin: 0 0 2px 0; font-size: 13px; color: #4a5568;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0; font-size: 13px; color: #4a5568;"><strong>Password:</strong> ${plainPassword}</p>
            </div>
            ` : ''}

            <!-- Details Card -->
            <div class="card">
              <div class="card-row">
                <div class="card-col">
                  <div class="label">Date & Time</div>
                  <p class="value-lg">${date}</p>
                  <p class="value-sm">${time}</p>
                </div>
                <div class="card-col">
                  <div class="label">Specialist</div>
                  <p class="value-lg">Dr. Elena Rodriguez</p>
                  <p class="value-sm">Senior Physiotherapist</p>
                </div>
              </div>
              <div class="divider"></div>
              <p class="location">📍 Suite 402, Medical Wellness Plaza, Central District</p>
            </div>

            <!-- Actions -->
            <div class="actions">
              <a href="${baseUrl}/login?role=patient" class="btn-primary">Confirm Appointment</a>
              <a href="${baseUrl}/contact" class="btn-secondary">Reschedule</a>
            </div>

            <!-- News Section -->
            <div class="news-section">
              <h3 class="news-title">Latest Clinic News</h3>
              <div class="news-grid">
                <div class="news-item">
                  <img src="${baseUrl}/email/news-yoga.jpg" alt="Yoga Class" class="news-img">
                  <h4 class="news-heading">New Yoga-Physio Fusion Classes</h4>
                  <p class="news-desc">Explore our new sessions designed to combine flexibility and clinical recovery techniques.</p>
                </div>
                <div class="news-item">
                  <img src="${baseUrl}/email/news-app.jpg" alt="Digital Tracking" class="news-img">
                  <h4 class="news-heading">Digital Recovery Tracking</h4>
                  <p class="news-desc">Update your app to access our new real-time progress dashboard for at-home exercises.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="footer-top">
              <div class="footer-logo">
                <h3>Zenith Physio</h3>
                <p>Restoring movement and enhancing life through empathetic precision.</p>
              </div>
              <div class="footer-links">
                <a href="${baseUrl}/privacy" class="footer-link">Privacy Policy</a>
                <a href="${baseUrl}/terms" class="footer-link">Terms of Service</a><br>
                <a href="${baseUrl}/contact" class="footer-link">Contact Support</a>
                <a href="#" class="footer-link">Unsubscribe</a>
              </div>
            </div>
            <div class="footer-bottom">
              <div class="copyright">© 2024 Zenith Physio. All rights reserved.</div>
              <div class="tagline">⚡ Empathetic Precision</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  },

  /**
   * Template for Payment Receipt
   */
  paymentReceipt: ({ patientName, serviceName, amount, date, invoiceId }) => {
    return `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #f0fff4; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #2f855a; margin: 0;">Payment Receipt</h2>
        </div>
        <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
          <p>Dear <strong>${patientName}</strong>,</p>
          <p>Thank you for your payment. We have successfully received it.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2f855a; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Invoice ID:</strong> ${invoiceId}</p>
            <p style="margin: 5px 0;"><strong>Service:</strong> ${serviceName}</p>
            <p style="margin: 5px 0;"><strong>Amount Paid:</strong> $${amount}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
          </div>
          
          <p>If you have any questions about this receipt, please contact our support team.</p>
          <p>Best regards,<br><strong>Zenith Physiotherapy Team</strong></p>
        </div>
      </div>
    `;
  },

  /**
   * Template for Contact Us Auto-Reply
   */
  contactAutoReply: ({ firstName }) => {
    return `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #495057; margin: 0;">We received your message!</h2>
        </div>
        <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
          <p>Hi <strong>${firstName}</strong>,</p>
          <p>Thank you for reaching out to Zenith Physiotherapy. We have received your inquiry and our team will get back to you as soon as possible.</p>
          <p>If your matter is urgent, please call our clinic directly.</p>
          <p>Best regards,<br><strong>Zenith Physiotherapy Team</strong></p>
        </div>
      </div>
    `;
  },

  /**
   * Template for Appointment Status Update (Confirmed, Cancelled, Completed)
   */
  appointmentStatusUpdate: ({ patientName, serviceName, date, time, status }) => {
    const statusColor = status === 'Confirmed' ? '#2f855a' : status === 'Cancelled' ? '#c53030' : '#2b6cb0';
    return `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: ${statusColor}; margin: 0;">Appointment ${status}</h2>
        </div>
        <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
          <p>Dear <strong>${patientName}</strong>,</p>
          <p>The status of your appointment for <strong>${serviceName}</strong> has been updated to <strong>${status}</strong>.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid ${statusColor}; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
            <p style="margin: 5px 0;"><strong>New Status:</strong> ${status}</p>
          </div>
          
          <p>If you have any questions, please log in to your patient portal or contact us.</p>
          <p>Best regards,<br><strong>Zenith Physiotherapy Team</strong></p>
        </div>
      </div>
    `;
  }
};
