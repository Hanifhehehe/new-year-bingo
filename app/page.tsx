'use client'

import { useState } from 'react'
import { Goal } from '../types/bingo'
import SetupPage from '@/components/setup-page'
import BingoBoard from '@/components/bingo-board'

export default function Home() {
  const [goals, setGoals] = useState<Goal[] | null>(null)

  const handleSetupComplete = (selectedGoals: Goal[]) => {
    setGoals(selectedGoals)
  }

  const handleBack = () => {
    setGoals(null)
  }

  if (!goals) {
    return <SetupPage onComplete={handleSetupComplete} />
  }

  return <BingoBoard initialGoals={goals} onBack={handleBack} />
}

