export const signup = (name, link) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Activate Your Account</title>
      <style>
        body {
          font-family: "Segoe UI", Arial, sans-serif;
          background-color: #f4f7fa;
          margin: 0;
          padding: 0;
        }

        .email-container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .email-header {
          background-color: #007bff;
          color: #fff;
          text-align: center;
          padding: 25px;
        }

        .email-header h1 {
          margin: 0;
          font-size: 24px;
        }

        .email-body {
          padding: 30px 25px;
          text-align: center;
        }

        .email-body h2 {
          color: #333;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .email-body p {
          color: #555;
          font-size: 16px;
          line-height: 1.6;
        }

        .activation-button {
          display: inline-block;
          background-color: #007bff;
          color: #ffffff !important;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 6px;
          margin-top: 20px;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }

        .activation-button:hover {
          background-color: #0056b3;
        }

        .email-footer {
          background-color: #f1f1f1;
          color: #888;
          text-align: center;
          padding: 15px;
          font-size: 13px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Activate Your Account</h1>
        </div>

        <div class="email-body">
          <h2>Hello ${name} 👋</h2>
          <p>
            Thank you for signing up with <strong>Sara7a App</strong>! To complete your registration and start using your account,
            please click the button below:
          </p>
          <a href="${link}" class="activation-button" target="_blank">Activate My Account</a>

          <p style="margin-top: 25px; font-size: 13px; color: #888;">
            If you did not sign up for this account, please ignore this email.
          </p>
          <p style="margin-top: 20px;">Best regards,<br /><strong>Sara7a Team</strong></p>
        </div>

        <div class="email-footer">
          <p>&copy; ${new Date().getFullYear()} Sara7a App. All rights reserved.</p>
          <p>
            <a href="https://sarahaapp.com/support">Contact Support</a> |
            <a href="https://sarahaapp.com/unsubscribe">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
  </html>`;
