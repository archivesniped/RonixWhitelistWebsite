import { motion } from 'framer-motion'

const StatsCard = ({ label, value, icon: Icon, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-2xl font-display font-bold">{value}</span>
      </div>
      <p className="text-white/60 text-sm">{label}</p>
    </motion.div>
  )
}

export default StatsCard
