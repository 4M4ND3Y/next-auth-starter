import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({
  email,
  username,
  emailType,
  userID,
}: any) => {
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

    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Next Auth Starter</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Next Auth Starter</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333;">Hello ${username}!</h2>
            <p>Welcome to Next Auth Starter! We're very excited to have you on board.</p>
            <p>To get verified at Next Auth Starter, please click the button below:</p>
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

    const emailTextual = `
      Hello ${username}!
      
      Welcome to Next Auth Starter! We're very excited to have you on board.
      
      To get verified at Next Auth Starter, please visit this link:
      ${verificationLink}
      
      Need help, or have questions? Just reply to this email, we'd love to help.
    `;

    // Nodemailer
    var transporter = nodemailer.createTransport({
      service: "smtp",
      host: process.env.MAILTRAP_SMTP_HOST,
      port: Number(process.env.MAILTRAP_SMTP_PORT),
      auth: {
        user: process.env.MAILTRAP_SMTP_USERNAME,
        pass: process.env.MAILTRAP_SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Next Auth Starter Team" <support@next-auth-starter.com>',
      to: email,
      subject: `Please ${
        emailType === "VERIFY" ? "verify your email" : "reset the password"
      }`,
      text: emailTextual, // plain‑text body
      html: emailHTML, // HTML body
    };

    // Send the email
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", mailResponse.messageId);

    return {
      success: true,
      messageId: mailResponse.messageId,
    };
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    throw new Error(error.message);
  }
};
