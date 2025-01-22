export const otpTemplate = (otp: string, username: string) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333333;">Hello ${username},</h2>
            <p style="color: #555555; font-size: 16px;">
              Your OTP code is:
            </p>
            <p style="font-size: 24px; font-weight: bold; color: #1a73e8; text-align: center; margin: 20px 0;">
              ${otp}
            </p>
            <p style="color: #555555; font-size: 16px;">
              Please use this code within the next 10 minutes to complete your verification.
            </p>
            <p style="color: #777777; font-size: 14px;">
              If you did not request this code, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">
            <p style="color: #999999; font-size: 12px; text-align: center;">
              This is an automated message, please do not reply.
            </p>
          </div>
        </body>
      </html>
    `;
  };
  