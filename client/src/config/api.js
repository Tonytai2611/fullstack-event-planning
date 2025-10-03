// Thay thế toàn bộ nội dung
const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

export const API_BASE_URL = isDevelopment 
    ? 'http://localhost:8800'
    : 'https://your-production-url.com';

// Debug để kiểm tra
console.log('🔗 API_BASE_URL:', API_BASE_URL);
console.log('🔗 Environment mode:', import.meta.env.MODE);
console.log('🔗 Is development:', isDevelopment);

// Test connection function
export const testAPIConnection = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/test`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('✅ API connection successful');
            return true;
        } else {
            console.warn('⚠️ API responded with status:', response.status);
            return false;
        }
    } catch (error) {
        console.error('❌ API connection failed:', error);
        return false;
    }
};