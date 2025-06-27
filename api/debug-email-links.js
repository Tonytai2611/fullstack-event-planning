import dotenv from 'dotenv';

dotenv.config();

console.log('=== EMAIL LINK DEBUG ===');
console.log('CLIENT_URL from .env:', process.env.CLIENT_URL);

// Sample event ID for testing
const sampleEventId = '507f1f77bcf86cd799439011';

console.log('\n=== Generated Email Links ===');
console.log('Event Details Link:', `${process.env.CLIENT_URL}/event/${sampleEventId}`);
console.log('Home Link:', `${process.env.CLIENT_URL}/home`);

console.log('\n=== Current Environment Variables ===');
console.log('EMAIL_USERNAME:', process.env.EMAIL_USERNAME);
console.log('EMAIL_FROM_NAME:', process.env.EMAIL_FROM_NAME);
console.log('EMAIL_FROM_ADDRESS:', process.env.EMAIL_FROM_ADDRESS);
console.log('REQUIRE_EMAIL_VERIFICATION:', process.env.REQUIRE_EMAIL_VERIFICATION);

console.log('\n=== Suggestions ===');
console.log('1. Make sure CLIENT_URL matches your actual frontend URL');
console.log('2. If running locally, frontend should be on http://localhost:5173');
console.log('3. If deployed, CLIENT_URL should be your production domain');
console.log('4. Test the link manually in browser before sending emails');
