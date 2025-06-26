import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import readline from 'readline';

// Load environment variables
dotenv.config();

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to check email configuration
async function checkEmailConfig() {
  console.log('===== KIỂM TRA CẤU HÌNH EMAIL =====');
  
  // Check if email settings are configured
  const emailUsername = process.env.EMAIL_USERNAME;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  if (!emailUsername) {
    console.error('❌ EMAIL_USERNAME chưa được cấu hình trong file .env');
    process.exit(1);
  }
  
  if (!emailPassword) {
    console.error('❌ EMAIL_PASSWORD chưa được cấu hình trong file .env');
    process.exit(1);
  }
  
  console.log('✅ Tìm thấy cấu hình email trong file .env');
  console.log(`📧 Email gửi: ${emailUsername}`);
  
  // Test connection to Gmail
  console.log('\nĐang kết nối đến Gmail SMTP...');
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUsername,
        pass: emailPassword
      }
    });
    
    // Verify connection
    await transporter.verify();
    console.log('✅ Kết nối thành công đến Gmail SMTP!');
    
    // Ask if user wants to send a test email
    rl.question('\nBạn có muốn gửi email test không? (y/n): ', async (answer) => {
      if (answer.toLowerCase() === 'y') {
        rl.question('Nhập địa chỉ email nhận test: ', async (testEmail) => {
          console.log(`\nĐang gửi email test đến ${testEmail}...`);
          
          try {
            const info = await transporter.sendMail({
              from: `"Event Planning App" <${emailUsername}>`,
              to: testEmail,
              subject: 'Test Email từ Event Planning App',
              text: 'Đây là email test để kiểm tra cấu hình nodemailer.',
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                  <h2 style="color: #4f46e5;">Test Email Thành Công!</h2>
                  <p>Nếu bạn nhận được email này, cấu hình email của ứng dụng đã hoạt động đúng.</p>
                  <p>Thời gian gửi: ${new Date().toLocaleString()}</p>
                </div>
              `
            });
            
            console.log('✅ Email test đã gửi thành công!');
            console.log(`📋 MessageId: ${info.messageId}`);
            console.log('\n⚠️ LƯU Ý: Nếu bạn không thấy email trong Inbox, hãy kiểm tra thư mục Spam.');
          } catch (error) {
            console.error('❌ Lỗi khi gửi email test:', error);
          }
          
          rl.close();
        });
      } else {
        console.log('Kết thúc kiểm tra cấu hình email.');
        rl.close();
      }
    });
  } catch (error) {
    console.error('❌ Không thể kết nối đến Gmail SMTP!');
    console.error('Chi tiết lỗi:', error.message);
    console.log('\nNguyên nhân có thể:');
    console.log('1. Mật khẩu ứng dụng không đúng');
    console.log('2. Chưa bật "Less secure app access" hoặc chưa tạo App password');
    console.log('3. Lỗi mạng hoặc Gmail tạm thời không khả dụng');
    console.log('\nHướng dẫn khắc phục:');
    console.log('1. Đảm bảo bạn đã bật xác thực 2 yếu tố cho tài khoản Gmail');
    console.log('2. Tạo "App password" tại https://myaccount.google.com/apppasswords');
    console.log('3. Sử dụng App password vừa tạo thay vì mật khẩu Gmail thông thường');
    rl.close();
  }
}

checkEmailConfig();
