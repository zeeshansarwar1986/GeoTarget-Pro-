export default function GeofenceCard({ fence, onSelect, onToggle, onDelete }) {
    const triggerLabels = { enter: 'On Enter', exit: 'On Exit', both: 'Enter & Exit' }
    const actionLabels = { push_notification: 'Push', email: 'Email', sms: 'SMS', webhook: 'Webhook' }

    return (
        <div
            className={`glass-card p-4 cursor-pointer transition-all duration-200 hover:border-primary/50 ${fence.active ? 'border-l-4' : 'border-l-4 border-l-slate-400 opacity-60'}`}
            style={{ borderLeftColor: fence.active ? fence.color : undefined }}
            onClick={() => onSelect?.(fence)}
        >
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-primary-text text-sm">{fence.name}</h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={e => { e.stopPropagation(); onToggle?.(fence.id) }}
                        className={`relative w-10 h-5 rounded-full transition-all duration-300 ${fence.active ? 'bg-primary' : 'bg-dark-700/50 border border-border-main'}`}
                    >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${fence.active ? 'left-5' : 'left-0.5'}`} />
                    </button>
                    <button onClick={e => { e.stopPropagation(); onDelete?.(fence.id) }} className="text-secondary-text hover:text-danger transition-colors text-xs">✕</button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                    <p className="text-lg font-bold text-primary-text">{fence.visitors.toLocaleString()}</p>
                    <p className="text-[10px] uppercase font-bold text-secondary-text opacity-70">Visitors</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-bold text-primary-text">{fence.notifications.toLocaleString()}</p>
                    <p className="text-[10px] uppercase font-bold text-secondary-text opacity-70">Sent</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-bold text-primary-text">{fence.avgDwell}m</p>
                    <p className="text-[10px] uppercase font-bold text-secondary-text opacity-70">Dwell</p>
                </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{triggerLabels[fence.trigger]}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">{actionLabels[fence.action]}</span>
                <span className="text-[10px] font-bold text-secondary-text ml-auto">{fence.radius}m</span>
            </div>
        </div>
    )
}
