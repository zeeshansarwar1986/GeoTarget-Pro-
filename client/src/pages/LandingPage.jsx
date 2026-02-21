import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PricingCard from '../components/PricingCard'
import ConsentBanner from '../components/ConsentBanner'

const features = [
    { icon: '🗺️', title: 'Smart Geofencing', desc: 'Draw virtual boundaries on an interactive map. Circle, polygon, or custom shapes — set up in minutes.' },
    { icon: '🔔', title: 'Instant Notifications', desc: 'Trigger push notifications, emails, or SMS the moment customers enter your zone.' },
    { icon: '📊', title: 'Deep Analytics', desc: 'Track visitors, dwell time, frequency, and demographics with real-time dashboards.' },
    { icon: '🎯', title: 'Targeted Marketing', desc: 'Create audience segments based on location behavior and deliver personalized campaigns.' },
    { icon: '🔒', title: 'Privacy Compliant', desc: 'Built-in GDPR & CCPA compliance with user consent management and data anonymization.' },
    { icon: '🔗', title: 'API & Integrations', desc: 'Connect with Shopify, HubSpot, Salesforce, and more via our RESTful API.' },
]

const pricing = [
    { tier: 'Free', price: '$0', period: 'month', cpm: null, features: ['Up to 5 geofences', '1,000 monthly impressions', 'Basic analytics (7 days)', 'Email notifications', '1 user'], popular: false },
    { tier: 'Basic', price: '$19', period: 'month', cpm: '$4-8 CPM', features: ['Unlimited geofences', '10,000 monthly impressions', 'Advanced analytics (30 days)', 'Email + Push notifications', 'Demographics targeting', '3 users', 'CSV export'], popular: false },
    { tier: 'Premium', price: '$49', period: 'month', cpm: '$8-12 CPM', features: ['Unlimited geofences', '50,000 monthly impressions', 'Full analytics suite (90 days)', 'All notification channels', 'AI-powered targeting', 'Full REST API access', '10 users', 'A/B testing', 'Custom branding'], popular: true },
    { tier: 'Enterprise', price: '$99+', period: 'month', cpm: '$12-15 CPM', features: ['Everything in Premium', 'Dedicated servers', 'Custom integrations', '99.9% SLA', 'White-label options', 'Unlimited users', '24/7 phone support', 'On-premise available'], popular: false },
]

const stats = [
    { value: '17.5%', label: 'Annual Market Growth' },
    { value: '72%', label: 'Consumer Response Rate' },
    { value: '3x', label: 'Higher Engagement' },
    { value: '20%', label: 'More Foot Traffic' },
]

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-main transition-colors duration-300">
            <Navbar />
            <ConsentBanner />

            {/* Hero */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                            <span className="text-xs text-primary font-bold uppercase tracking-wider">Location Intelligence Platform</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 animate-slide-up tracking-tight">
                            <span className="text-primary-text">Reach Customers</span><br />
                            <span className="gradient-text">Where They Are</span>
                        </h1>
                        <p className="text-lg md:text-xl text-secondary-text mb-10 max-w-2xl mx-auto animate-slide-up font-medium" style={{ animationDelay: '0.2s' }}>
                            Create virtual boundaries, trigger real-time notifications, and unlock powerful audience analytics — all GDPR & CCPA compliant.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                            <Link to="/signup" className="btn-primary text-lg !px-8 !py-4">Start Free Today →</Link>
                            <a href="#features" className="btn-secondary text-lg !px-8 !py-4 border shadow-sm">See Features</a>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((s, i) => (
                            <div key={i} className="glass-card text-center p-6 animate-slide-up shadow-lg border border-border-main" style={{ animationDelay: `${0.1 * i}s` }}>
                                <p className="text-3xl md:text-4xl font-extrabold gradient-text">{s.value}</p>
                                <p className="text-[10px] text-secondary-text mt-1 font-bold uppercase tracking-widest">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-primary-text mb-4 tracking-tight">Everything You Need</h2>
                        <p className="text-secondary-text text-lg max-w-2xl mx-auto font-medium">Powerful geofencing tools designed for businesses of all sizes</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="glass-card p-8 group border border-border-main hover:border-primary/50 transition-all duration-300">
                                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">{f.icon}</span>
                                <h3 className="text-xl font-bold text-primary-text mb-3">{f.title}</h3>
                                <p className="text-sm text-secondary-text leading-relaxed font-medium">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 px-4 bg-dark-700/5 relative">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-primary-text mb-4 tracking-tight">How It Works</h2>
                        <p className="text-secondary-text text-lg font-medium">Set up your first geofence in under 5 minutes</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: '01', title: 'Draw Your Fence', desc: 'Open the map and draw a circle or polygon around your target area.', icon: '✏️' },
                            { step: '02', title: 'Set Triggers', desc: 'Choose what happens when customers enter or exit — notifications, offers, analytics.', icon: '⚡' },
                            { step: '03', title: 'Track Results', desc: 'Monitor visitors, engagement, and ROI in your real-time analytics dashboard.', icon: '📈' },
                        ].map((s, i) => (
                            <div key={i} className="text-center relative pt-8">
                                <span className="text-7xl font-black text-secondary-text opacity-5 absolute top-0 left-1/2 -translate-x-1/2 z-0">{s.step}</span>
                                <div className="w-20 h-20 rounded-2xl gradient-bg mx-auto mb-6 flex items-center justify-center text-3xl shadow-xl shadow-primary/30 animate-float relative z-10" style={{ animationDelay: `${0.3 * i}s` }}>
                                    {s.icon}
                                </div>
                                <h3 className="text-xl font-bold text-primary-text mb-2 relative z-10">{s.title}</h3>
                                <p className="text-sm text-secondary-text font-medium relative z-10">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-primary-text mb-4 tracking-tight">Simple, Transparent Pricing</h2>
                        <p className="text-secondary-text text-lg font-medium">Start free. Scale as you grow. <span className="text-primary font-bold">20% off annual plans.</span></p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pricing.map((p, i) => <PricingCard key={i} {...p} />)}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="about" className="py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="glass-card p-12 relative overflow-hidden group border border-primary/20">
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                        <h2 className="text-3xl md:text-5xl font-black text-primary-text mb-6 relative z-10 tracking-tight">Ready to Boost Your Business?</h2>
                        <p className="text-secondary-text text-lg mb-10 relative z-10 font-medium">Join thousands of businesses using location intelligence to grow.</p>
                        <Link to="/signup" className="btn-primary text-lg !px-12 !py-4 inline-block relative z-10 shadow-2xl">Get Started Free Today</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
