import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  Download, 
  RefreshCw, 
  Settings,
  Plus,
  Minus,
  AlertCircle
} from 'lucide-react'
import { useCreditCard } from '../hooks/useCreditCard'
import { toast } from 'react-toastify'

const QuickActions = () => {
  const { state, dispatch } = useCreditCard()
  const [isLoading, setIsLoading] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState('')

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount)
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid payment amount')
      return
    }

    if (amount > state.currentBalance) {
      toast.error('Payment amount cannot exceed current balance')
      return
    }

    setIsLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      dispatch({
        type: 'UPDATE_BALANCE',
        payload: state.currentBalance - amount
      })
      
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: {
          id: Date.now(),
          type: 'payment',
          amount: -amount,
          description: 'Credit Card Payment',
          date: new Date().toISOString(),
          status: 'completed'
        }
      })

      toast.success(`Payment of $${amount.toFixed(2)} processed successfully!`)
      setPaymentAmount('')
      setShowPaymentModal(false)
      setIsLoading(false)
    }, 1500)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    toast.info('Refreshing account data...')
    
    setTimeout(() => {
      toast.success('Account data refreshed!')
      setIsLoading(false)
    }, 1000)
  }

  const handleExport = () => {
    const data = {
      creditLimit: state.creditLimit,
      currentBalance: state.currentBalance,
      availableCredit: state.creditLimit - state.currentBalance - state.pendingCharges,
      utilization: ((state.currentBalance / state.creditLimit) * 100).toFixed(1),
      lastUpdated: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cibc-credit-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Data exported successfully!')
  }

  const quickActions = [
    {
      id: 'payment',
      label: 'Make Payment',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'green',
      action: () => setShowPaymentModal(true)
    },
    {
      id: 'refresh',
      label: 'Refresh Data',
      icon: <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />,
      color: 'blue',
      action: handleRefresh,
      disabled: isLoading
    },
    {
      id: 'export',
      label: 'Export Data',
      icon: <Download className="w-5 h-5" />,
      color: 'purple',
      action: handleExport
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      color: 'gray',
      action: () => toast.info('Settings coming soon!')
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400',
      blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400',
      purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/20 dark:text-purple-400',
      gray: 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-900/20 dark:text-gray-400'
    }
    return colors[color] || colors.gray
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
              disabled={action.disabled}
              className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2 ${getColorClasses(action.color)} ${
                action.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {action.icon}
              <span className="text-xs font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Account Summary */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
            Account Summary
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Last Payment</span>
              <span className="font-medium">
                ${state.lastPaymentAmount?.toFixed(2) || '0.00'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Interest Rate</span>
              <span className="font-medium">
                {state.interestRate}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Next Due</span>
              <span className="font-medium">
                {new Date(state.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Make Payment
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Payment Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    step="0.01"
                    min="0.01"
                    max={state.currentBalance}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Maximum: ${state.currentBalance.toFixed(2)}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isLoading || !paymentAmount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    'Process Payment'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default QuickActions