import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

const EmailVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  
  // Array of refs for the input fields
  const inputRefs = useRef([]);
  
  // Initialize refs for the 6 input fields
  if (inputRefs.current.length !== 6) {
    inputRefs.current = Array(6).fill().map((_, i) => inputRefs.current[i] || React.createRef());
  }

  useEffect(() => {
    // Check if we have an email from route state (from signup or login)
    console.log("EmailVerificationPage mounted, location state:", location.state);
    
    // Kiểm tra state từ React Router
    if (location.state?.email) {
      console.log("Email found in router state:", location.state.email);
      setEmail(location.state.email);
    } 
    // Nếu không có state từ router, kiểm tra localStorage
    else if (localStorage.getItem('verificationEmail')) {
      const storedEmail = localStorage.getItem('verificationEmail');
      console.log("Email found in localStorage:", storedEmail);
      setEmail(storedEmail);
      // Xóa dữ liệu sau khi sử dụng
      setTimeout(() => {
        localStorage.removeItem('verificationEmail');
        localStorage.removeItem('isFromSignup');
      }, 1000);
    } 
    // Nếu không có email từ cả hai nguồn, chuyển hướng về login
    else {
      console.log("No email found in state or localStorage, redirecting to login");
      navigate('/login');
    }

    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0].current?.focus();
      }, 100);
    }
  }, [location, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // Handle code input change
  const handleCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    
    // Only accept digits
    if (!/^\d*$/.test(value)) return;
    
    // Update the current field
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // If we entered a digit and there's a next input, focus it
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].current?.focus();
    }
    
    // If all fields are filled, automatically submit
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerifyCode();
    }
  };

  // Handle key down in the input fields
  const handleKeyDown = (index, e) => {
    // If backspace and current field is empty, focus previous field
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  // Handle verification code submission
  const handleVerifyCode = async () => {
    setError(null);
    setSuccess(null);
    
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setError('Please enter all 6 digits of the verification code');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          verificationCode: code
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }
      
      setSuccess(data.message || 'Email verified successfully!');
      
      // Redirect to login after successful verification
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
      
      // If code expired, clear the fields
      if (err.message.includes('expired')) {
        setVerificationCode(['', '', '', '', '', '']);
        inputRefs.current[0].current?.focus();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resending verification code
  const handleResendCode = async () => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    setResendDisabled(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend code');
      }
      
      setSuccess('A new verification code has been sent to your email');
      
      // Clear the input fields
      setVerificationCode(['', '', '', '', '', '']);
      inputRefs.current[0].current?.focus();
      
      // Set countdown for resend button (60 seconds)
      setResendCountdown(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9F2F6] font-['Poppins']">
      <div className="bg-white rounded-[12px] shadow-md max-w-md w-full p-8 transition-all duration-300 hover:shadow-xl hover:translate-y-[-1px]">
        <h1 className="text-[28px] font-bold text-center mb-3">Email Verification</h1>
        
        <p className="text-center text-[#4B5563] mb-6">
          We've sent a 6-digit verification code to<br />
          <span className="font-semibold text-[#1F2937]">{email}</span>
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-300 text-green-700 rounded-md text-sm">
            {success}
          </div>
        )}
        
        {/* Verification code input boxes */}
        <div className="flex justify-between mb-8 gap-2">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs.current[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl font-semibold focus:border-[#569DBA] focus:ring-2 focus:ring-[#569DBA] focus:outline-none"
              disabled={isLoading}
            />
          ))}
        </div>
        
        <button
          onClick={handleVerifyCode}
          disabled={isLoading || verificationCode.some(digit => digit === '')}
          className={`w-full py-3 rounded-full font-medium ${
            isLoading || verificationCode.some(digit => digit === '') ? 
              'bg-gray-300 text-gray-500 cursor-not-allowed' : 
              'bg-[#569DBA] text-white hover:bg-opacity-90'
          } transition-colors`}
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-[#4B5563] text-sm mb-3">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendCode}
            disabled={isLoading || resendDisabled}
            className={`text-[#569DBA] font-medium ${
              isLoading || resendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:underline'
            }`}
          >
            {resendCountdown > 0 
              ? `Resend code in ${resendCountdown}s` 
              : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
