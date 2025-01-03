'use client'

import { useState } from 'react'
import { Goal } from '@/types/bingo'
import SetupPage from '@/components/setup-page'
import BingoBoard from '@/components/bingo-board'

export default function Home() {
  const [goals, setGoals] = useState<Goal[] | null>(null)
  const [isRecap, setIsRecap] = useState(false)

  const handleSetupComplete = (selectedGoals: Goal[]) => {
    setGoals(selectedGoals)
  }

  const handleBack = () => {
    setGoals(null)
  }

  const handleRecapToggle = (value: boolean) => {
    setIsRecap(value)
  }

  if (!goals) {
    return (
      <SetupPage 
        onComplete={handleSetupComplete} 
        isRecap={isRecap}
        onRecapToggle={handleRecapToggle}
      />
    )
  }

  return (
    <BingoBoard 
      initialGoals={goals} 
      onBack={handleBack} 
      isRecap={isRecap}
    />
  )
}
