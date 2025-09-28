import React from 'react'
import { motion } from 'framer-motion'
import { Gauge } from 'lucide-react'

const BalanceGauge = ({ utilization, available, limit }) => {
  const getGaugeColor = (util) => {
    if (util >= 100) return 'text-red-500'
    if (util >= 80) return 'text-orange-500'
    if (util >= 60) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getGaugeBgColor = (util) => {
    if (util >= 100) return 'bg-red-100 dark:bg-red-900/20'
    if (util >= 80) return 'bg-orange-100 dark:bg-orange-900/20'
    if (util >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20'
    return 'bg-green-100 dark:bg-green-900/20'
  }

  const getStatusText = (util) => {
    if (util >= 100) return 'Over Limit'
    if (util >= 80) return 'High Risk'
    if (util >= 60) return 'Moderate'
    return 'Healthy'
  }

  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (utilization / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          Credit Utilization
        </h3>
        <Gauge className="w-5 h-5 text-slate-500" />
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-200 dark:text-slate-700"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              className={getGaugeColor(utilization)}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${getGaugeColor(utilization)}`}>
              {utilization.toFixed(0)}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              utilized
            </span>
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className={`${getGaugeBgColor(utilization)} rounded-lg p-3 mb-4`}>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${getGaugeColor(utilization)}`}>
            Status: {getStatusText(utilization)}
          </span>
          <div className={`w-2 h-2 rounded-full ${getGaugeColor(utilization).replace('text-', 'bg-')}`} />
        </div>
      </div>

      {/* Credit details */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Available Credit</span>
          <span className={`font-medium ${available < 0 ? 'text-red-500' : 'text-green-500'}`}>
            ${available.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Credit Limit</span>
          <span className="font-medium text-slate-800 dark:text-white">
            ${limit.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Used</span>
          <span className="font-medium text-slate-800 dark:text-white">
            ${(limit - available).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${getGaugeColor(utilization).replace('text-', 'bg-')}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(utilization, 100)}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default BalanceGauge