export default function PricingCard({ tier, price, period, features, popular, cpm }) {
    return (
        <div className={`relative glass-card p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] ${popular ? 'border-2 border-primary shadow-xl shadow-primary/20 scale-105' : 'border border-border-main'
            }`}>
            {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg px-4 py-1 rounded-full text-[10px] font-bold text-white shadow-lg">
                    MOST POPULAR
                </div>
            )}
            <h3 className="text-xl font-bold text-primary-text mb-2">{tier}</h3>
            <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-extrabold text-primary-text">{price}</span>
                {period && <span className="text-secondary-text text-sm">/{period}</span>}
            </div>
            {cpm && <p className="text-xs text-primary font-bold mb-4">CPM: {cpm}</p>}

            <ul className="space-y-3 my-6 flex-1">
                {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-secondary-text">
                        <span className="text-secondary font-bold flex-shrink-0">✓</span>
                        <span>{f}</span>
                    </li>
                ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${popular
                    ? 'btn-primary'
                    : 'border-2 border-border-main text-secondary-text hover:border-primary hover:text-primary'
                }`}>
                {price === '$0' ? 'Start Free' : 'Get Started'}
            </button>
            <p className="text-[10px] text-secondary-text opacity-50 text-center mt-3 font-medium">Annual billing: 20% off</p>
        </div>
    )
}
