import dotenv from 'dotenv';

dotenv.config();

// Test URL generation
const testEventId = "670c9c8a123456789abcdef0";
const generatedURL = `${process.env.CLIENT_URL}/event/${testEventId}`;

console.log('=== EMAIL URL TEST ===');
console.log('CLIENT_URL:', process.env.CLIENT_URL);
console.log('Event ID:', testEventId);
console.log('Generated URL:', generatedURL);

console.log('\n=== MANUAL TEST ===');
console.log('1. Copy this URL and paste in browser:', generatedURL);
console.log('2. Make sure your frontend is running on:', process.env.CLIENT_URL);
console.log('3. Check if the event details page loads correctly');

console.log('\n=== POSSIBLE ISSUES ===');
if (!process.env.CLIENT_URL) {
  console.log('❌ CLIENT_URL is not set in .env file');
} else if (process.env.CLIENT_URL === 'http://localhost:5173') {
  console.log('⚠️  CLIENT_URL is set to localhost - make sure your frontend is running locally');
} else {
  console.log('✅ CLIENT_URL looks like production URL');
}

console.log('\n=== SOLUTIONS ===');
console.log('1. If running locally: Make sure CLIENT_URL=http://localhost:5173 in .env');
console.log('2. If deployed: Update CLIENT_URL to your production domain');
console.log('3. Make sure the frontend route /event/:id exists and works');
console.log('4. Check if EventDetails component is properly configured');
