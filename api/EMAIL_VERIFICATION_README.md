# Email Verification with Gmail Instructions

## Setup Instructions

### 1. Configure Gmail for SMTP Access

To use Gmail for sending emails, you need to set up an app password:

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select **Security** from the left menu
3. Under "Signing in to Google," select **2-Step Verification** (if not already enabled, you need to enable it)
4. At the bottom of the page, select **App passwords**
5. Click **Select app** and choose **Mail**
6. Click **Select device** and choose **Other (Custom name)**
7. Enter "Event Planning App" as the name
8. Click **Generate**
9. Google will display a 16-character app password - copy this password

### 2. Configure Environment Variables

Add these variables to your `.env` file:

```
# Email Configuration (Nodemailer with Gmail)
EMAIL_USERNAME=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
REQUIRE_EMAIL_VERIFICATION=true
```

### 3. Test Email Configuration

Run the following command to test your email configuration:

```bash
npm run check-email
```

This will:
- Verify your Gmail credentials
- Test the connection to Gmail SMTP
- Let you send a test email to verify everything works

### 4. How Email Verification Works

When a user signs up:

1. A 6-digit verification code is generated
2. The code is saved to the user's profile
3. An email with the code is sent to the user's email address
4. The user enters the code on the verification page
5. The code is verified, and the user's email is marked as verified

### 5. API Endpoints

- `POST /api/auth/signup`: Creates new user and sends verification email
- `POST /api/auth/verify-email`: Verifies the code entered by the user
- `POST /api/auth/resend-verification`: Resends the verification email
- `POST /api/auth/login`: Logs in a user (requires verified email)

### 6. Testing Routes

- `GET /api/test/email-config`: Check email configuration
- `POST /api/test/send-test-email`: Send a test email
- `GET /api/test/user-verification/:email`: Check verification status of a user

### 7. Troubleshooting

- **Email not received?** Check your spam folder
- **Connection errors?** Make sure your app password is correct
- **"Less secure app" errors?** Make sure you're using an App Password, not your regular Gmail password
- **Still having issues?** Google might block sign-in attempts from new locations or apps - check for security notifications in your Gmail
