import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="glass-card !rounded-none !border-b-0 !border-x-0 bg-opacity-95 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="text-white font-bold text-xl">G</span>
                            </div>
                            <span className="text-2xl font-black text-primary-text tracking-tight">Geo<span className="text-primary">Target</span> Pro</span>
                        </Link>
                        <p className="text-secondary-text text-sm leading-relaxed max-w-sm">
                            Real-time geofencing and location analytics platform.
                            Built for marketing intelligence with a focus on privacy and GDPR compliance.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-primary-text font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link to="/map" className="text-secondary-text hover:text-primary transition-colors text-sm font-medium">Map Editor</Link></li>
                            <li><Link to="/analytics" className="text-secondary-text hover:text-primary transition-colors text-sm font-medium">Analytics</Link></li>
                            <li><Link to="/notifications" className="text-secondary-text hover:text-primary transition-colors text-sm font-medium">Campaigns</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-primary-text font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#about" className="text-secondary-text hover:text-primary transition-colors text-sm font-medium">About Us</a></li>
                            <li><a href="#privacy" className="text-secondary-text hover:text-primary transition-colors text-sm font-medium">Privacy Policy</a></li>
                            <li><a href="#contact" className="text-secondary-text hover:text-primary transition-colors text-sm font-medium">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border-main flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-secondary-text text-xs font-medium">
                        © 2024 GeoTarget Pro. All rights reserved. Built with ❤️ for location intelligence.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-secondary-text hover:text-primary cursor-pointer transition-colors">Twitter</span>
                        <span className="text-secondary-text hover:text-primary cursor-pointer transition-colors">LinkedIn</span>
                        <span className="text-secondary-text hover:text-primary cursor-pointer transition-colors">GitHub</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
