export default function StatsCard({ icon, label, value, change, color = 'primary' }) {
    const colors = {
        primary: 'from-primary/20 to-primary/5 border-primary/30',
        secondary: 'from-secondary/20 to-secondary/5 border-secondary/30',
        accent: 'from-accent/20 to-accent/5 border-accent/30',
        danger: 'from-danger/20 to-danger/5 border-danger/30',
    }

    return (
        <div className={`stat-card-hover glass-card p-6 bg-gradient-to-br ${colors[color]} border`}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{icon}</span>
                {change !== undefined && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${change > 0 ? 'bg-secondary/20 text-secondary' : 'bg-danger/20 text-danger'}`}>
                        {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-primary-text mb-1">{typeof value === 'number' ? value.toLocaleString() : value}</p>
            <p className="text-sm text-secondary-text">{label}</p>
        </div>
    )
}
