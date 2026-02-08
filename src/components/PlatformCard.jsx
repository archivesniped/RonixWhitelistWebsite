import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const PlatformCard = ({ name, icon: Icon, color, keys, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="glass glass-hover rounded-2xl p-6 cursor-pointer group"
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Info */}
      <h3 className="text-xl font-display font-semibold mb-2">{name}</h3>
      <p className="text-white/60 text-sm mb-4">
        {keys.length} {keys.length === 1 ? 'key' : 'keys'} registered
      </p>

      {/* Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${keys.length > 0 ? 'bg-green-500' : 'bg-gray-500'}`}></div>
          <span className="text-sm text-white/60">{keys.length > 0 ? 'Active' : 'Inactive'}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  )
}

export default PlatformCard
