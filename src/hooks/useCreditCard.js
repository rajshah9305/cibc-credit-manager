import { useEffect } from 'react'
import { useCreditCardContext } from '../context/CreditCardContext'
import { toast } from 'react-toastify'

export const useCreditCard = () => {
  const { state, dispatch } = useCreditCardContext()

  // Calculate available credit
  const getAvailableCredit = () => {
    return state.creditLimit - state.currentBalance - state.pendingCharges
  }

  // Parse CIBC clipboard data
  const parseCibcData = (text) => {
    const patterns = {
      creditLimit: /credit\s*limit.*?([\d,]+\.?\d*)/i,
      currentBalance: /current\s*balance.*?([\d,]+\.?\d*)/i,
      pendingCharges: /pending.*?([\d,]+\.?\d*)/i,
      availableCredit: /available\s*credit.*?([\d,]+\.?\d*)/i
    }

    const data = {}
    let hasData = false

    Object.entries(patterns).forEach(([key, pattern]) => {
      const match = text.match(pattern)
      if (match) {
        data[key.replace(/([A-Z])/g, '$1').replace(/^./, str => str.toLowerCase())] = parseFloat(match[1].replace(/,/g, ''))
        hasData = true
      }
    })

    // Calculate missing values
    if (data.availableCredit && data.creditLimit && !data.currentBalance) {
      data.currentBalance = data.creditLimit - data.availableCredit - (data.pendingCharges || 0)
    }

    return hasData ? data : null
  }

  // Handle clipboard paste
  useEffect(() => {
    const handlePaste = async (event) => {
      const text = event.clipboardData.getData('text')
      const parsedData = parseCibcData(text)
      
      if (parsedData) {
        dispatch({
          type: 'UPDATE_MULTIPLE',
          payload: parsedData
        })
        toast.success('✅ CIBC data imported successfully!')
      }
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [dispatch])

  // Monitor for alerts
  useEffect(() => {
    const availableCredit = getAvailableCredit()
    const utilization = (state.currentBalance / state.creditLimit) * 100

    if (availableCredit < 0) {
      toast.error('🚨 OVER LIMIT: You\'ve exceeded your credit limit!', {
        autoClose: false,
        closeOnClick: false
      })
    } else if (availableCredit < 100) {
      toast.warning(`⚠️ Low credit: Only $${availableCredit.toFixed(2)} remaining`)
    } else if (utilization > 80) {
      toast.info(`📊 High utilization: ${utilization.toFixed(1)}% of credit used`)
    }
  }, [state.currentBalance, state.creditLimit, getAvailableCredit])

  return {
    state,
    getAvailableCredit,
    dispatch
  }
}
