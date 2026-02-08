import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Key, ArrowLeft, Check } from 'lucide-react'
import Navigation from '../components/Navigation'

const RedeemPage = ({ onRedeem }) => {
  const navigate = useNavigate()
  const [keyInput, setKeyInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRedeem = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!keyInput.trim()) {
      setError('Please enter a key')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const success = onRedeem(keyInput)
      if (success) {
        navigate('/dashboard')
      } else {
        setError('Invalid key. Please try again.')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
      
      <Navigation />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Card */}
          <div className="glass rounded-2xl p-8 border border-white/10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-xl shadow-primary-500/30">
                <Key className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-display font-bold text-center mb-2">
              Redeem Your Key
            </h2>
            <p className="text-white/60 text-center mb-8">
              Enter your premium key to access the dashboard
            </p>

            {/* Form */}
            <form onSubmit={handleRedeem} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="PREMIUM_PLUS_XXXXXXXXXX"
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-600/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Redeem Key</span>
                  </>
                )}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm text-center">
                Don't have a key?{' '}
                <a href="https://discord.gg/ronixstudios" className="text-primary-400 hover:text-primary-300 transition-colors">
                  Join our Discord
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RedeemPage
