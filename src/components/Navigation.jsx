import { Link } from 'react-router-dom'
import { Sparkles, LayoutDashboard, Key } from 'lucide-react'
import { motion } from 'framer-motion'

const Navigation = ({ showLinks = false }) => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary-500/50 transition-shadow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg">Ronix Premium</span>
        </Link>

        {/* Links */}
        {showLinks && (
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/redeem"
              className="px-4 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Redeem</span>
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navigation
