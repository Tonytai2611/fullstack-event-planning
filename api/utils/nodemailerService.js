import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transport for Nodemailer
const createTransporter = () => {
  console.log('Creating nodemailer transporter with config:', {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD ? '********' : 'not set' // Masking password for security
  });
  
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    debug: true // Turn on debug mode
  });
};

// Send verification code to user email
const sendVerificationCode = async (user, verificationCode) => {
  try {
    console.log(`Attempting to send verification email to ${user.email} with code: ${verificationCode}`);
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: user.email,
      subject: 'Email Verification - Event Planning App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px;">
          <h2 style="color: #569DBA; text-align: center;">Email Verification</h2>
          <p>Hello ${user.firstName} ${user.lastName},</p>
          <p>Thank you for registering with our Event Planning App. Please use the verification code below to complete your registration:</p>
          <div style="background-color: #f7f7f7; padding: 15px; text-align: center; margin: 20px 0;">
            <h1 style="letter-spacing: 5px; font-size: 32px; margin: 0; color: #333;">${verificationCode}</h1>
          </div>
          <p>This code will expire in 24 hours.</p>
          <p>If you didn't request this code, you can safely ignore this email.</p>
          <p>Best regards,<br>The Event Planning Team</p>
        </div>
      `
    };
    
    console.log('Sending email with options:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      from: mailOptions.from
    });
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return { success: false, error };
  }
};

// Send welcome email after successful verification
const sendWelcomeEmail = async (user) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: user.email,
      subject: 'Welcome to Event Planning App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px;">
          <h2 style="color: #569DBA; text-align: center;">Welcome to Event Planning App!</h2>
          <p>Dear ${user.firstName} ${user.lastName},</p>
          <p>Thank you for verifying your email address. Your account is now fully active!</p>
          <p>You can now start creating and managing events, sending invitations, and much more.</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${process.env.CLIENT_URL}/login" style="background-color: #569DBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Log in now
            </a>
          </div>
          <p>We're excited to have you on board!</p>
          <p>Best regards,<br>The Event Planning Team</p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
};

export default {
  sendVerificationCode,
  sendWelcomeEmail
};
