import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
  creditLimit: 1500,
  currentBalance: 1384.44,
  pendingCharges: 94.46,
  statementBalance: 1530.61,
  minimumPayment: 110.22,
  dueDate: '2025-10-08',
  interestRate: 21.99,
  cashAdvanceRate: 22.99,
  lastPaymentDate: '2025-09-26',
  lastPaymentAmount: 102,
  cards: [],
  transactions: []
}

const CreditCardContext = createContext()

const creditCardReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_BALANCE':
      return { ...state, currentBalance: action.payload }
    
    case 'UPDATE_MULTIPLE':
      return { ...state, ...action.payload }
    
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      }
    
    default:
      return state
  }
}

export const CreditCardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(creditCardReducer, initialState)

  return (
    <CreditCardContext.Provider value={{ state, dispatch }}>
      {children}
    </CreditCardContext.Provider>
  )
}

export const useCreditCardContext = () => {
  const context = useContext(CreditCardContext)
  if (!context) {
    throw new Error('useCreditCardContext must be used within CreditCardProvider')
  }
  return context
}
