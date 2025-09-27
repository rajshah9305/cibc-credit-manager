import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Calendar } from 'lucide-react'
import { useCreditCard } from '../hooks/useCreditCard'
import BalanceGauge from './BalanceGauge'
import QuickActions from './QuickActions'

const Dashboard = () => {
  const { state, getAvailableCredit } = useCreditCard()
  const availableCredit = getAvailableCredit()
  const creditUtilization = (state.currentBalance / state.creditLimit) * 100
  const isOverLimit = availableCredit < 0
  const isNearLimit = availableCredit < 100 && availableCredit >= 0

  const getCreditHealth = () => {
    if (isOverLimit) return { status: 'critical', color: 'red', icon: AlertTriangle }
    if (isNearLimit) return { status: 'warning', color: 'yellow', icon: AlertTriangle }
    if (creditUtilization > 80) return { status: 'caution', color: 'orange', icon: AlertTriangle }
    return { status: 'healthy', color: 'green', icon: CheckCircle }
  }

  const creditHealth = getCreditHealth()

  const stats = [
    {
      label: 'Available Credit',
      value: `$${availableCredit.toFixed(2)}`,
      change: isOverLimit ? `+$${Math.abs(availableCredit).toFixed(2)} over` : null,
      color: isOverLimit ? 'red' : isNearLimit ? 'yellow' : 'green',
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      label: 'Current Balance',
      value: `$${state.currentBalance.toFixed(2)}`,
      change: `${creditUtilization.toFixed(1)}% utilized`,
      color: creditUtilization > 80 ? 'orange' : 'blue',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      label: 'Next Payment',
      value: `$${state.minimumPayment.toFixed(2)}`,
      change: `Due ${new Date(state.dueDate).toLocaleDateString()}`,
      color: 'purple',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      label: 'Credit Limit',
      value: `$${state.creditLimit.toFixed(2)}`,
      change: 'Total available',
      color: 'green',
      icon: <DollarSign className="w-5 h-5" />
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white"
      >
        <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
        <p className="text-red-100">Your complete financial overview - updates in real-time</p>
      </motion.div>

      {/* Credit Health Alert */}
      {creditHealth.status !== 'healthy' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-${creditHealth.color}-50 border border-${creditHealth.color}-200 rounded-xl p-4`}
        >
          <div className="flex items-center space-x-3">
            <creditHealth.icon className={`w-6 h-6 text-${creditHealth.color}-600`} />
            <div>
              <h3 className={`font-semibold text-${creditHealth.color}-800`}>
                Credit Health: {creditHealth.status.charAt(0).toUpperCase() + creditHealth.status.slice(1)}
              </h3>
              <p className={`text-sm text-${creditHealth.color}-600 mt-1`}>
                {isOverLimit 
                  ? `You're $${Math.abs(availableCredit).toFixed(2)} over your credit limit.`
                  : isNearLimit
                  ? `Only $${availableCredit.toFixed(2)} available.`
                  : `High utilization at ${creditUtilization.toFixed(1)}%.`
                }
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                    <div className={`text-${stat.color}-600 dark:text-${stat.color}-400`}>
                      {stat.icon}
                    </div>
                  </span>
                  {stat.change && (
                    <span className={`text-xs font-medium text-${stat.color}-600 dark:text-${stat.color}-400`}>
                      {stat.change}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <BalanceGauge
            utilization={creditUtilization}
            available={availableCredit}
            limit={state.creditLimit}
          />
        </div>

        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
export default Dashboard
