import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#E9F2F6] overflow-hidden font-['Poppins']">
            {/* Header */}
            <header className="relative z-50 bg-white/80 backdrop-blur-sm shadow-sm">
                <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#569DBA] to-[#4A90B8] rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <span className="text-gray-900 font-bold text-xl">EventHub</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="text-gray-600 hover:text-[#569DBA] transition-colors font-medium"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => navigate('/signup')}
                            className="bg-[#569DBA] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 font-medium"
                        >
                            Get Started
                        </button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative px-6 py-20 bg-gradient-to-br from-[#E9F2F6] to-[#D4E6F1]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Create Amazing
                                <span className="bg-gradient-to-r from-[#569DBA] to-[#4A90B8] bg-clip-text text-transparent block">
                                    Events
                                </span>
                                That Matter
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Plan, organize, and manage events effortlessly. From corporate meetings to social gatherings, 
                                make every event memorable with our comprehensive platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button 
                                    onClick={() => navigate('/signup')}
                                    className="group px-8 py-4 bg-[#569DBA] text-white font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Start Planning
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>
                                <button 
                                    onClick={() => navigate('/login')}
                                    className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:shadow-lg"
                                >
                                    Watch Demo
                                </button>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="relative">
                            <div className="relative z-10 space-y-6">
                                {/* Event Card 1 */}
                                <div className="transform rotate-3 hover:rotate-6 transition-transform duration-300">
                                    <div className="bg-white rounded-[12px] p-6 shadow-md border border-gray-100 hover:shadow-xl hover:translate-y-[-1px] transition-all duration-300">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#569DBA] to-[#4A90B8] rounded-lg flex items-center justify-center">
                                                    <span className="text-2xl">🎉</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-gray-900 font-semibold">Annual Conference</h3>
                                                    <p className="text-gray-500 text-sm">Tech Innovation 2024</p>
                                                </div>
                                            </div>
                                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                                Dec 25, 2024
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                                250 attendees
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Event Card 2 */}
                                <div className="transform -rotate-2 hover:-rotate-6 transition-transform duration-300 ml-8">
                                    <div className="bg-white rounded-[12px] p-6 shadow-md border border-gray-100 hover:shadow-xl hover:translate-y-[-1px] transition-all duration-300">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#7B68EE] to-[#6A5ACD] rounded-lg flex items-center justify-center">
                                                    <span className="text-2xl">🎵</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-gray-900 font-semibold">Music Festival</h3>
                                                    <p className="text-gray-500 text-sm">Summer Beats 2024</p>
                                                </div>
                                            </div>
                                            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">Upcoming</span>
                                        </div>
                                        <div className="mt-4 bg-gray-200 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-[#569DBA] to-[#4A90B8] h-2 rounded-full w-3/4"></div>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-2">75% tickets sold</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EventHub?</h2>
                        <p className="text-xl text-gray-600">Everything you need to create amazing events</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: "🎯",
                                title: "Smart Planning",
                                description: "AI-powered event planning with intelligent suggestions",
                                color: "from-[#569DBA] to-[#4A90B8]"
                            },
                            {
                                icon: "👥",
                                title: "Team Collaboration",
                                description: "Work together seamlessly with real-time tools",
                                color: "from-[#7B68EE] to-[#6A5ACD]"
                            },
                            {
                                icon: "📊",
                                title: "Analytics",
                                description: "Track attendance and engagement metrics",
                                color: "from-[#20B2AA] to-[#008B8B]"
                            },
                            {
                                icon: "🔔",
                                title: "Notifications",
                                description: "Keep everyone informed with smart alerts",
                                color: "from-[#32CD32] to-[#228B22]"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group">
                                <div className="bg-[#F8FBFC] border border-gray-100 rounded-[12px] p-8 text-center hover:bg-white hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-[12px] flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-[#E9F2F6]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "10,000+", label: "Events Created" },
                            { number: "500,000+", label: "Happy Attendees" },
                            { number: "1,200+", label: "Organizations" },
                            { number: "99.9%", label: "Uptime" }
                        ].map((stat, index) => (
                            <div key={index} className="group">
                                <div className="bg-white rounded-[12px] p-6 shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-[#569DBA] to-[#4A90B8] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#569DBA] to-[#4A90B8]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of event organizers who trust EventHub
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-white text-[#569DBA] font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            Create Your First Event
                        </button>
                        <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#569DBA] transition-all duration-300 hover:shadow-xl">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center gap-3 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#569DBA] to-[#4A90B8] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">E</span>
                            </div>
                            <span className="text-gray-900 font-bold">EventHub</span>
                        </div>
                        <div className="text-gray-500 text-sm">
                            © 2024 EventHub. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;