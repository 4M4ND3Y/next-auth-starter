import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

interface EmailParams {
  email: string;
  username: string;
  emailType: "VERIFY" | "RESET";
  userID: string;
}

export const sendEmail = async ({
  email,
  username,
  emailType,
  userID,
}: EmailParams) => {
  try {
    // create a hashed token
    const hashedToken = await bcrypt.hash(userID.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Create a simple HTML email template
    const verificationLink = `${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "verifyemail" : "resetpassword"
    }?token=${hashedToken}`;

    const verifyEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to NextAuth Lite</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">NextAuth Lite</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333;">Hello ${username}!</h2>
            <p>Welcome to NextAuth Lite! We're very excited to have you on board.</p>
            <p>To get verified at NextAuth Lite, please click the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" 
                style="background: #22BC66; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Confirm your account
              </a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">${verificationLink}</p>
            <p>Need help, or have questions? Just reply to this email, we'd love to help.</p>
          </div>
        </body>
      </html>
    `;

    const verifyEmailTextual = `
      Hello ${username}!
      
      Welcome to NextAuth Lite! We're very excited to have you on board.
      
      To get verified at NextAuth Lite, please visit this link:
      ${verificationLink}
      
      Need help, or have questions? Just reply to this email, we'd love to help.
    `;

    const resetEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - NextAuth Lite</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">NextAuth Lite</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333;">Hello ${username}!</h2>
            <p>We received a request to reset your password for your NextAuth Lite account.</p>
            <p>To reset your password, please click the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" 
                style="background: #ff6b6b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Reset Password
              </a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">${verificationLink}</p>
            <p><strong>Important:</strong> This link will expire in 1 hour for security reasons.</p>
            <p>If you didn't request a password reset, please ignore this email or contact us if you have security concerns.</p>
            <p>Need help, or have questions? Just reply to this email, we'd love to help.</p>
          </div>
        </body>
      </html>
    `;

    const resetEmailTextual = `
      Hello ${username}!
      
      We received a request to reset your password for your NextAuth Lite account.
      
      To reset your password, please visit this link:
      ${verificationLink}
      
      Important: This link will expire in 1 hour for security reasons.
      
      If you didn't request a password reset, please ignore this email or contact us if you have security concerns.
      
      Need help, or have questions? Just reply to this email, we'd love to help.
    `;

    // Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: process.env.GMAIL_SMTP_SERVICE,
      host: process.env.GMAIL_SMTP_HOST,
      port: Number(process.env.GMAIL_SMTP_PORT),
      secure: process.env.GMAIL_SMTP_SECURE === "true",
      auth: {
        user: process.env.GMAIL_SMTP_USERNAME, // Your Gmail address
        pass: process.env.GMAIL_SMTP_PASSWORD, // Your Gmail App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Please ${
        emailType === "VERIFY" ? "verify your email" : "reset the password"
      }`,
      text: emailType === "VERIFY" ? verifyEmailTextual : resetEmailTextual, // plain‑text body
      html: emailType === "VERIFY" ? verifyEmailHTML : resetEmailHTML, // HTML body
    };

    // Send the email
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", mailResponse.messageId);

    return {
      success: true,
      messageId: mailResponse.messageId,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Email sending failed";
    console.error("Error sending email:", errorMessage);
    throw new Error(errorMessage);
  }
};
