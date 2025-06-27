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

// Send event invitation email to user
const sendEventInvitation = async (invitee, event, organizer) => {
  try {
    console.log(`Sending event invitation email to ${invitee.email} for event ${event.title}`);
    console.log('CLIENT_URL:', process.env.CLIENT_URL);
    console.log('Event ID:', event._id);
    console.log('Generated URL:', `${process.env.CLIENT_URL}/login?redirect=/event/${event._id}`);
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${organizer.firstName || organizer.username}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: invitee.email,
      subject: `You're Invited: ${event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px;">
          <h2 style="color: #569DBA; text-align: center;">Event Invitation</h2>
          ${organizer.avatar ? `<div style="text-align: center; margin: 20px 0;"><img src="${organizer.avatar}" alt="Organizer" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #569DBA;"></div>` : ''}
          <p>Hello ${invitee.firstName || invitee.username},</p>
          <p>You have been invited by <strong>${organizer.firstName || organizer.username}</strong> to attend the following event:</p>
          ${event.image ? `<div style="text-align: center; margin: 20px 0;"><img src="${event.image}" alt="Event Image" style="max-width: 100%; height: auto; border-radius: 8px;"></div>` : ''}
          <div style="background-color: #f7f7f7; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">${event.title}</h3>
            <p><strong>Date:</strong> ${event.startDate}</p>
            <p><strong>Time:</strong> ${event.startTime} to ${event.endTime || 'TBD'}</p>
            <p><strong>Location:</strong> ${event.location || 'TBD'}</p>
            ${event.summary ? `<p><strong>Description:</strong> ${event.summary}</p>` : ''}
          </div>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${process.env.CLIENT_URL}/login?redirect=/event/${event._id}" style="background-color: #569DBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              View Event Details
            </a>
          </div>
          <p style="font-size: 12px; color: #666; text-align: center; background-color: #f0f0f0; padding: 5px;">
            Debug: ${process.env.CLIENT_URL}/login?redirect=/event/${event._id}
          </p>
          <p>Please log in to your account to accept or decline this invitation.</p>
          <p>We hope to see you there!</p>
          <p>Best regards,<br>${organizer.firstName || organizer.username}<br>${organizer.email}</p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Event invitation email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending event invitation email:', error);
    return { success: false, error };
  }
};

// Send event reminder email
const sendEventReminder = async (user, event, organizer) => {
  try {
    console.log(`Sending event reminder email to ${user.email} for event ${event.title}`);
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${organizer.firstName || organizer.username}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: user.email,
      subject: `Reminder: Upcoming Event - ${event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px;">
          <h2 style="color: #569DBA; text-align: center;">Event Reminder</h2>
          ${organizer.avatar ? `<div style="text-align: center; margin: 20px 0;"><img src="${organizer.avatar}" alt="Organizer" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #569DBA;"></div>` : ''}
          <p>Hello ${user.firstName || user.username},</p>
          <p>This is a friendly reminder from <strong>${organizer.firstName || organizer.username}</strong> that you are confirmed to attend the following event:</p>
          ${event.image ? `<div style="text-align: center; margin: 20px 0;"><img src="${event.image}" alt="Event Image" style="max-width: 100%; height: auto; border-radius: 8px;"></div>` : ''}
          <div style="background-color: #f7f7f7; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">${event.title}</h3>
            <p><strong>Date:</strong> ${event.startDate}</p>
            <p><strong>Time:</strong> ${event.startTime} to ${event.endTime || 'TBD'}</p>
            <p><strong>Location:</strong> ${event.location || 'TBD'}</p>
          </div>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${process.env.CLIENT_URL}/login?redirect=/event/${event._id}" style="background-color: #569DBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              View Event Details
            </a>
          </div>
          <p style="font-size: 12px; color: #666; text-align: center; background-color: #f0f0f0; padding: 5px;">
            Debug: ${process.env.CLIENT_URL}/login?redirect=/event/${event._id}
          </p>
          <p>We look forward to your participation!</p>
          <p>Best regards,<br>${organizer.firstName || organizer.username}<br>${organizer.email}</p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Event reminder email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending event reminder email:', error);
    return { success: false, error };
  }
};

// Send join request response email
const sendJoinRequestResponse = async (user, event, organizer, isApproved) => {
  try {
    console.log(`Sending join request response email to ${user.email} for event ${event.title}`);
    const transporter = createTransporter();
    
    const subject = isApproved
      ? `Join Request Approved for ${event.title}`
      : `Join Request Declined for ${event.title}`;
    
    const content = isApproved
      ? `<p>Your request to join "${event.title}" has been <strong style="color: green;">approved</strong> by the organizer.</p>
         <p>You are now confirmed to attend this event on ${event.startDate} from ${event.startTime} to ${event.endTime || 'TBD'} at ${event.location || 'the specified location'}.</p>
         <p>We look forward to seeing you there!</p>`
      : `<p>We regret to inform you that your request to join "${event.title}" has been <strong style="color: #d9534f;">declined</strong> by the organizer.</p>
         <p>Please feel free to explore other events that might interest you.</p>`;
         
    const actionButton = isApproved
      ? `<a href="${process.env.CLIENT_URL}/login?redirect=/event/${event._id}" style="background-color: #569DBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
           View Event Details
         </a>
         <p style="font-size: 12px; color: #666; text-align: center; background-color: #f0f0f0; padding: 5px;">
           Debug: ${process.env.CLIENT_URL}/login?redirect=/event/${event._id}
         </p>`
      : `<a href="${process.env.CLIENT_URL}/login?redirect=/home" style="background-color: #569DBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
           Explore Events
         </a>
         <p style="font-size: 12px; color: #666; text-align: center; background-color: #f0f0f0; padding: 5px;">
           Debug: ${process.env.CLIENT_URL}/login?redirect=/home
         </p>`;
    
    const mailOptions = {
      from: `"${organizer.firstName || organizer.username}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: user.email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px;">
          <h2 style="color: #569DBA; text-align: center;">Join Request ${isApproved ? 'Approved' : 'Declined'}</h2>
          ${organizer.avatar ? `<div style="text-align: center; margin: 20px 0;"><img src="${organizer.avatar}" alt="Organizer" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #569DBA;"></div>` : ''}
          <p>Hello ${user.firstName || user.username},</p>
          <p>Message from <strong>${organizer.firstName || organizer.username}</strong>:</p>
          ${content}
          ${event.image ? `<div style="text-align: center; margin: 20px 0;"><img src="${event.image}" alt="Event Image" style="max-width: 100%; height: auto; border-radius: 8px;"></div>` : ''}
          <div style="background-color: #f7f7f7; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">${event.title}</h3>
            <p><strong>Date:</strong> ${event.startDate}</p>
            <p><strong>Time:</strong> ${event.startTime} to ${event.endTime || 'TBD'}</p>
            <p><strong>Location:</strong> ${event.location || 'TBD'}</p>
          </div>
          <div style="text-align: center; margin: 25px 0;">
            ${actionButton}
          </div>
          <p>Best regards,<br>${organizer.firstName || organizer.username}<br>${organizer.email}</p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Join request response email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending join request response email:', error);
    return { success: false, error };
  }
};

// Send join request notification email to organizer
const sendJoinRequestEmail = async (organizer, event, requestingUser) => {
  try {
    console.log(`Sending join request notification email to organizer ${organizer.email} for event ${event.title}`);
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: organizer.email,
      subject: `New Join Request: ${event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px;">
          <h2 style="color: #569DBA; text-align: center;">New Join Request</h2>
          ${requestingUser.avatar ? `<div style="text-align: center; margin: 20px 0;"><img src="${requestingUser.avatar}" alt="Requesting User" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #569DBA;"></div>` : ''}
          <p>Hello ${organizer.firstName || organizer.username},</p>
          <p><strong>${requestingUser.firstName || requestingUser.username}</strong> has requested to join your event:</p>
          ${event.image ? `<div style="text-align: center; margin: 20px 0;"><img src="${event.image}" alt="Event Image" style="max-width: 100%; height: auto; border-radius: 8px;"></div>` : ''}
          <div style="background-color: #f7f7f7; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">${event.title}</h3>
            <p><strong>Date:</strong> ${event.startDate}</p>
            <p><strong>Time:</strong> ${event.startTime} to ${event.endTime || 'TBD'}</p>
            <p><strong>Location:</strong> ${event.location || 'TBD'}</p>
          </div>
          <div style="background-color: #e8f4f8; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h4 style="color: #333; margin-top: 0;">Requesting User Details:</h4>
            <p><strong>Name:</strong> ${requestingUser.firstName || requestingUser.username}</p>
            <p><strong>Email:</strong> ${requestingUser.email}</p>
          </div>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${process.env.CLIENT_URL}/login?redirect=/event/${event._id}" style="background-color: #569DBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Manage Join Requests
            </a>
          </div>
          <p style="font-size: 12px; color: #666; text-align: center; background-color: #f0f0f0; padding: 5px;">
            Debug: ${process.env.CLIENT_URL}/login?redirect=/event/${event._id}
          </p>
          <p>Please log in to your account to approve or decline this request.</p>
          <p>Best regards,<br>The Event Planning Team</p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Join request notification email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending join request notification email:', error);
    return { success: false, error };
  }
};

export default {
  sendVerificationCode,
  sendWelcomeEmail,
  sendEventInvitation,
  sendEventReminder,
  sendJoinRequestResponse,
  sendJoinRequestEmail
};
