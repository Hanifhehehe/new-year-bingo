'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Goal } from '@/types/bingo'
import { GoalChip } from '@/components/goal-chip'
import { RefreshCw } from 'lucide-react'
import data from '@/lib/data.json'

interface SetupPageProps {
  onComplete: (goals: Goal[]) => void;
  isRecap: boolean;
  onRecapToggle: (value: boolean) => void;
}

export default function SetupPage({ onComplete, isRecap, onRecapToggle }: SetupPageProps) {
  // State declarations
  const [userGoals, setUserGoals] = useState<Goal[]>([])
  const [allSuggestedGoals, setAllSuggestedGoals] = useState<Goal[]>([])
  const [displayedSuggestions, setDisplayedSuggestions] = useState<Goal[]>([])
  const [inputValue, setInputValue] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  // Helper function to get random goals
  const getRandomGoals = (goals: Goal[], count: number) => {
    const shuffled = [...goals].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // Function to refresh displayed suggestions
  const refreshSuggestions = () => {
    const availableSuggestions = allSuggestedGoals.filter(
      goal => !userGoals.some(userGoal => userGoal.id === goal.id)
    )
    setDisplayedSuggestions(getRandomGoals(availableSuggestions, 5))
  }

  // Effect to initialize and update goals based on isRecap
  useEffect(() => {
    const currentYear = isRecap ? '2024' : '2025'
    const currentData = data.filter(goal => 
      (goal.type === 'shown' || goal.type === currentYear)
    )
    setAllSuggestedGoals(currentData)
    setDisplayedSuggestions(getRandomGoals(currentData, 5))
    setUserGoals([])
  }, [isRecap])

  // Effect to refresh suggestions when they run out
  useEffect(() => {
    if (displayedSuggestions.length === 0 && allSuggestedGoals.length > 0) {
      refreshSuggestions()
    }
  }, [displayedSuggestions, allSuggestedGoals])

  // Handle form submission for user-generated goals
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue.length <= 3) {
      alert("No spamming pls, bayar server mahal tau >:(")
    } else if (inputValue.trim() && userGoals.length < 5) {
      const newGoal: Goal = {
        id: Date.now(),
        type: isRecap ? '2024' : '2025',
        title: inputValue.trim(),
        isUserGenerated: true
      }
      setUserGoals([...userGoals, newGoal])
      setInputValue('')
    }
  }

  // Handle adding a suggested goal
  const handleAddSuggested = (goal: Goal) => {
    if (userGoals.length < 5) {
      setUserGoals([...userGoals, goal])
      const updatedAllSuggestions = allSuggestedGoals.filter(g => g.id !== goal.id)
      setAllSuggestedGoals(updatedAllSuggestions)
      const updatedDisplayed = displayedSuggestions.filter(g => g.id !== goal.id)
      
      if (updatedDisplayed.length < 5 && updatedAllSuggestions.length > 0) {
        const newSuggestions = getRandomGoals(
          updatedAllSuggestions.filter(g => !updatedDisplayed.some(d => d.id === g.id)),
          5 - updatedDisplayed.length
        )
        setDisplayedSuggestions([...updatedDisplayed, ...newSuggestions])
      } else {
        setDisplayedSuggestions(updatedDisplayed)
      }
    }
  }

  // Handle removing a goal
  const handleRemoveGoal = (goalId: number) => {
    const removedGoal = userGoals.find(g => g.id === goalId)
    setUserGoals(userGoals.filter(g => g.id !== goalId))
    if (removedGoal && !removedGoal.isUserGenerated) {
      setAllSuggestedGoals([...allSuggestedGoals, removedGoal])
    }
  }

  // Handle generating final goals
  const handleGenerate = () => {
    if (userGoals.length < 5) {
      setShowPopup(true)
    } else {
      generateFinalGoals()
    }
  }

  // Generate final goals for the bingo board
  const generateFinalGoals = () => {
    let finalGoals = [...userGoals]
    const remainingCount = 25 - finalGoals.length
    const currentYear = isRecap ? '2024' : '2025'
    
    // Add hidden goals
    const hiddenGoals = data.filter(goal => goal.type === 'hidden')
    const randomHiddenGoals = getRandomGoals(hiddenGoals, Math.min(hiddenGoals.length, remainingCount))
    finalGoals = [...finalGoals, ...randomHiddenGoals]
    
    // Add year-specific goals if needed
    if (finalGoals.length < 25) {
      const yearGoals = data.filter(goal => 
        goal.type === currentYear && 
        !finalGoals.some(fg => fg.id === goal.id)
      )
      const additionalGoals = getRandomGoals(yearGoals, 25 - finalGoals.length)
      finalGoals = [...finalGoals, ...additionalGoals]
    }

    const shuffledGoals = finalGoals.sort(() => Math.random() - 0.5)
    setUserGoals(shuffledGoals)
    onComplete(shuffledGoals)
  }

  // Handle toggling between recap and new year modes
  const handleRecap = () => {
    onRecapToggle(!isRecap)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-alt p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="relative flex items-center justify-center mb-4">
          <h1 className="text-4xl font-bold text-center text-primary sm:whitespace-nowrap">
            {isRecap 
              ? ` 2024 RECAP `
              : ` 2025 NGAREP `} 
            <br className="block sm:hidden" /> 
            BINGO
          </h1>
          <button 
            onClick={handleRecap}
            className="absolute right-0 p-2 text-primary rounded-full hover:bg-secondary transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        <p className="text-center text-secondary mb-8">
          {isRecap 
            ? `Renungi masa 2024 kk dengan pengalaman yang kayanya gak terlupakan`
            : `Bikin aspirasi dan target kk biar makin semangat di 2025`}
        </p>
        <div className="bg-white bg-opacity-50 rounded-xl p-6 shadow-lg space-y-6">
          <form onSubmit={handleSubmit} className="space-y-2">
            <h2 className="text-xl font-semibold text-secondary">
              Target dan {isRecap ? `pengalaman` : `harapan`} kk taon {isRecap ? `lalu` : `ini`} apa?
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder={`Isi ${isRecap ? `pengalaman` : `target`}nya kk`}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-button-hover transition-colors"
              >
                Tambah
              </button>
            </div>
          </form>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-primary">{isRecap ? `Target dan pengalaman` : `Target dan harapan`} kk:</h3>
                <button
                  onClick={refreshSuggestions}
                  className="text-xs text-secondary hover:text-primary transition-colors"
                >
                  Ganti inspirasi
                </button>
              </div>
              <div className="min-h-[50px]">
                {userGoals.map(goal => (
                  <GoalChip
                    key={goal.id}
                    title={goal.title}
                    type="user"
                    onRemove={() => handleRemoveGoal(goal.id)}
                  />
                ))}
                {displayedSuggestions.length > 0 ? (
                  displayedSuggestions.map(goal => (
                    <GoalChip
                      key={goal.id}
                      title={goal.title}
                      type="suggestion"
                      onAdd={() => handleAddSuggested(goal)}
                    />
                  ))
                ) : allSuggestedGoals.length > 0 ? (``
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-center space-y-4">
            {userGoals.length === 5 ? (
              <p className="text-lg text-primary"><strong>Hore udah cukup goalnya!</strong></p>
            ) : userGoals.length > 0 ? (
              <p className="text-sm text-primary">
                Kk butuh <strong>{5 - userGoals.length} {userGoals.length === 1 ? 'target' : 'target'}</strong> lagi.
                Atau {userGoals.length < 5 && ` klik "Mulai!" untuk melengkapi dengan ${5 - userGoals.length} target acak.`}
              </p>
            ) : (
              <p className="text-sm text-primary">
                {`Tambahin 5 harapan kk ato klik "Mulai!" untuk lanjut, kk.`}
              </p>
            )}
            <button
              onClick={handleGenerate}
              className={`px-6 py-3 rounded-lg text-white font-semibold bg-primary hover:bg-secondary transition-all duration-300`}
            >
              Mulai!
            </button>
          </div>
        </div>
        {showPopup && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setShowPopup(false)}
          >
            <div
              className="bg-white bg-opacity-95 p-6 rounded-xl shadow-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">Yakin?</h2>
              {userGoals.length === 0 ? (
                <p className='mb-6 text-secondary'>
                  Kk belom nambahin {isRecap? `pengalaman` :`harapan`} kk di {isRecap ? '2024' : '2025'} loh, mau dibikinin aja?
                </p>
              ) : (
                <p className="mb-6 text-secondary">
                  Kk yakin cuma mau bikin {userGoals.length} doang? Masih kurang {5 - userGoals.length} lagi!
                  Kalo kk yakin dd bakal dikasih bingo random ya
                </p>
              )}
              <div className="flex justify-between">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-background text-primary rounded-lg hover:bg-background-alt transition-colors"
                >
                  {userGoals.length === 0 ? `Oke, kk tambahin ya dd` : `Oh kurang ya? kk tambahin ya dd`}
                </button>
                <button
                  onClick={() => {
                    setShowPopup(false)
                    generateFinalGoals()
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                >
                  {userGoals.length === 0 ? `Dd bct.` : `Lanjut!`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
