import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import PlatformCard from '../components/PlatformCard'
import StatsCard from '../components/StatsCard'
import { Smartphone, Apple, Monitor, FileCode, Key, RefreshCw, Database } from 'lucide-react'

const Dashboard = ({ userData, setUserData }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(null)

  const platforms = [
    {
      id: 'android',
      name: 'Android',
      icon: Smartphone,
      color: 'from-green-500 to-emerald-600',
      keys: userData?.platforms?.android?.keys || [],
      lastReset: userData?.platforms?.android?.lastHwidReset,
    },
    {
      id: 'macos',
      name: 'MacOS',
      icon: Apple,
      color: 'from-gray-400 to-gray-600',
      keys: userData?.platforms?.macos?.keys || [],
      lastReset: userData?.platforms?.macos?.lastHwidReset,
    },
    {
      id: 'windows',
      name: 'Windows',
      icon: Monitor,
      color: 'from-blue-500 to-cyan-600',
      keys: userData?.platforms?.windows?.keys || [],
      lastReset: userData?.platforms?.windows?.lastHwidReset,
    },
    {
      id: 'scriptHub',
      name: 'Script Hub',
      icon: FileCode,
      color: 'from-purple-500 to-pink-600',
      keys: userData?.platforms?.scriptHub?.keys || [],
      lastReset: userData?.platforms?.scriptHub?.lastHwidReset,
    },
  ]

  const totalKeys = platforms.reduce((acc, p) => acc + p.keys.length, 0)

  const stats = [
    { label: 'Total Keys', value: totalKeys, icon: Key, color: 'text-primary-400' },
    { label: 'Active Platforms', value: platforms.filter(p => p.keys.length > 0).length, icon: Database, color: 'text-green-400' },
    { label: 'Last Reset', value: 'Never', icon: RefreshCw, color: 'text-blue-400' },
  ]

  return (
    <div className="min-h-screen bg-dark-900 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      <Navigation showLinks />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold mb-2">
            Welcome to your <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-white/60">
            Manage your whitelist keys across all platforms
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} index={index} />
          ))}
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <PlatformCard
              key={platform.id}
              {...platform}
              index={index}
              onClick={() => setSelectedPlatform(platform)}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-display font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-xl font-medium transition-colors flex items-center gap-2">
              <Key className="w-4 h-4" />
              View All Keys
            </button>
            <button className="px-6 py-3 bg-dark-700 hover:bg-dark-600 rounded-xl font-medium transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset HWID
            </button>
            <button className="px-6 py-3 bg-dark-700 hover:bg-dark-600 rounded-xl font-medium transition-colors flex items-center gap-2">
              <Database className="w-4 h-4" />
              Fetch Latest Data
            </button>
          </div>
        </motion.div>
      </div>

      {/* Platform Modal */}
      {selectedPlatform && (
        <PlatformModal 
          platform={selectedPlatform} 
          onClose={() => setSelectedPlatform(null)}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </div>
  )
}

// Platform Modal Component
const PlatformModal = ({ platform, onClose, userData, setUserData }) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateKey = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const newKey = `PREMIUM_${platform.name.toUpperCase()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      const updatedUserData = { ...userData }
      updatedUserData.platforms[platform.id].keys.push(newKey)
      setUserData(updatedUserData)
      setIsGenerating(false)
    }, 1000)
  }

  const handleResetHWID = () => {
    const updatedUserData = { ...userData }
    updatedUserData.platforms[platform.id].lastHwidReset = new Date().toISOString()
    setUserData(updatedUserData)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
              <platform.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold">{platform.name}</h2>
              <p className="text-white/60 text-sm">{platform.keys.length} keys registered</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Keys List */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Your Keys</h3>
          {platform.keys.length > 0 ? (
            <div className="space-y-2">
              {platform.keys.map((key, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-dark-800 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                >
                  <code className="text-sm text-white/80 font-mono">{key}</code>
                  <button
                    onClick={() => copyToClipboard(key)}
                    className="px-3 py-1 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm transition-colors"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-white/40">
              No keys registered yet
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleGenerateKey}
            disabled={isGenerating}
            className="py-3 bg-primary-600 hover:bg-primary-700 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Key className="w-4 h-4" />
                <span>Generate Key</span>
              </>
            )}
          </button>
          <button
            onClick={handleResetHWID}
            className="py-3 bg-dark-700 hover:bg-dark-600 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset HWID</span>
          </button>
        </div>

        {/* Info */}
        {platform.lastReset && (
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-sm text-blue-400">
              Last HWID reset: {new Date(platform.lastReset).toLocaleString()}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
