import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

const SignUpPage = () => {
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: "",
        color: ""
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const checkPasswordStrength = (password) => {
        let score = 0;
        let message = "";
        let color = "";

        if (!password || password.length === 0) {
            setPasswordStrength({ score: 0, message: "", color: "" });
            return;
        }

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        switch (score) {
            case 0:
            case 1:
                message = "Weak";
                color = "#f44336";
                break;
            case 2:
                message = "Fair";
                color = "#ff9800";
                break;
            case 3:
                message = "Good";
                color = "#2196f3";
                break;
            case 4:
                message = "Strong";
                color = "#4caf50";
                break;
            default:
                break;
        }

        setPasswordStrength({ score, message, color });
    };

    const handlePasswordChange = (e) => {
        checkPasswordStrength(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(e.target);

        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            setIsLoading(false);
            return;
        }

        if (passwordStrength.score < 2) {
            setError("Please choose a stronger password");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Registration failed');
                setIsLoading(false);
                return;
            }
            
            if (data.requireVerification) {
                setSuccessMessage('Registration successful! Please verify your email.');
                localStorage.setItem('verificationEmail', data.email);
                localStorage.setItem('isFromSignup', 'true');
                
                navigate('/verify-email', { 
                    state: { 
                        email: data.email,
                        isFromSignup: true 
                    } 
                });
            } else {
                setSuccessMessage('Registration successful! You can now log in.');
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }

        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E9F2F6] to-[#D4E6F1] font-['Poppins'] p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#569DBA]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 bg-white rounded-[20px] shadow-xl max-w-lg w-full p-8 transition-all duration-500 hover:shadow-2xl hover:translate-y-[-2px] border border-white/20 backdrop-blur-sm">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#569DBA] to-[#4A90B8] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-[32px] font-bold text-gray-900 mb-2">Join EventHub</h1>
                    <p className="text-[#4B5563] text-lg">Create your account and start planning</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg animate-shake">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-red-700 font-medium">{error}</span>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg animate-pulse">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-700 font-medium">{successMessage}</span>
                        </div>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="block font-semibold text-[#374151] text-sm uppercase tracking-wide">
                                First Name
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#569DBA] focus:ring-4 focus:ring-[#569DBA]/10 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                    placeholder="John"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lastName" className="block font-semibold text-[#374151] text-sm uppercase tracking-wide">
                                Last Name
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#569DBA] focus:ring-4 focus:ring-[#569DBA]/10 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Username Field */}
                    <div className="space-y-2">
                        <label htmlFor="username" className="block font-semibold text-[#374151] text-sm uppercase tracking-wide">
                            Username
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#569DBA] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#569DBA] focus:ring-4 focus:ring-[#569DBA]/10 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                placeholder="Choose a username"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block font-semibold text-[#374151] text-sm uppercase tracking-wide">
                            Email Address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#569DBA] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#569DBA] focus:ring-4 focus:ring-[#569DBA]/10 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block font-semibold text-[#374151] text-sm uppercase tracking-wide">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#569DBA] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#569DBA] focus:ring-4 focus:ring-[#569DBA]/10 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                placeholder="Create a strong password"
                                required
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#569DBA] focus:outline-none transition-colors duration-200"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.465 8.465M9.878 9.878l-.706-.707M18.364 5.636L19.778 4.222M18.364 5.636l-.707.707M18.364 5.636A9.975 9.975 0 0121 12M4.222 4.222L3.636 3.636" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {passwordStrength.message && (
                            <div className="mt-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Password strength:</span>
                                    <span className="text-sm font-semibold" style={{ color: passwordStrength.color }}>
                                        {passwordStrength.message}
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full rounded-full transition-all duration-500 ease-out" 
                                        style={{ 
                                            width: `${(passwordStrength.score / 4) * 100}%`,
                                            backgroundColor: passwordStrength.color
                                        }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Weak</span>
                                    <span>Strong</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-[#569DBA] to-[#4A90B8] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#569DBA]/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <span>Create Account</span>
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    </div>
                </form>

                {/* Terms */}
                <p className="text-xs text-center text-gray-500 mt-6 px-4 leading-relaxed">
                    By creating an account, you acknowledge that your information will be stored securely and used only for event management purposes.
                </p>

                {/* Footer */}
                <div className="text-center mt-6 space-y-4">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            className="font-semibold text-[#569DBA] hover:text-[#4A90B8] transition-colors duration-200 hover:underline"
                        >
                            Sign in here
                        </Link>
                    </p>
                    <Link 
                        to="/" 
                        className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;