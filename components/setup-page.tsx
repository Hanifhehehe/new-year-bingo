'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Goal } from '../types/bingo'
import { GoalChip } from '../components/goal-chip'
import data from '../lib/data.json'

interface SetupPageProps {
  onComplete: (goals: Goal[]) => void;
}

export default function SetupPage({ onComplete }: SetupPageProps) {
  const [userGoals, setUserGoals] = useState<Goal[]>([])
  const [allSuggestedGoals, setAllSuggestedGoals] = useState<Goal[]>([])
  const [displayedSuggestions, setDisplayedSuggestions] = useState<Goal[]>([])
  const [inputValue, setInputValue] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const getRandomGoals = (goals: Goal[], count: number) => {
    const shuffled = [...goals].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const refreshSuggestions = () => {
    setDisplayedSuggestions(getRandomGoals(allSuggestedGoals, 25))
  }

  useEffect(() => {
    setAllSuggestedGoals(data)
    setDisplayedSuggestions(getRandomGoals(data, 35))
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue.length <= 4 ){
      alert("No spamming pls, bayar server mahal tau >:(")
    } else {
      if (inputValue.trim() && userGoals.length < 25) {
        const newGoal: Goal = {
          id: Date.now(),
          title: inputValue.trim(),
          isUserGenerated: true
        }
        setUserGoals([...userGoals, newGoal])
        setInputValue('')
      }
    }
  }

  const handleAddSuggested = (goal: Goal) => {
    if (userGoals.length < 25) {
      setUserGoals([...userGoals, goal])
      setAllSuggestedGoals(allSuggestedGoals.filter(g => g.id !== goal.id))
      setDisplayedSuggestions(displayedSuggestions.filter(g => g.id !== goal.id))
    }
  }

  const handleRemoveGoal = (goalId: number) => {
    const removedGoal = userGoals.find(g => g.id === goalId)
    setUserGoals(userGoals.filter(g => g.id !== goalId))
    if (removedGoal && !removedGoal.isUserGenerated) {
      setAllSuggestedGoals([...allSuggestedGoals, removedGoal])
    }
  }

  const handleGenerate = () => {
    if (userGoals.length < 25) {
      setShowPopup(true)
    } else {
      generateFinalGoals()
    }
  }

  const generateFinalGoals = () => {
    let finalGoals = [...userGoals]
    if (finalGoals.length < 25) {
      const remainingCount = 25 - finalGoals.length
      const availableGoals = allSuggestedGoals.filter(
        goal => !finalGoals.some(userGoal => userGoal.id === goal.id)
      )
      const randomGoals = getRandomGoals(availableGoals, remainingCount)
      finalGoals = [...finalGoals, ...randomGoals]
    }
    
    // Randomize the order of all goals
    const shuffledGoals = finalGoals.sort(() => Math.random() - 0.5)
    
    setUserGoals(shuffledGoals)
    onComplete(shuffledGoals)
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-alt p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">
          2025 NGAREP BINGO
        </h1>

        <div className="bg-white bg-opacity-50 rounded-xl p-6 shadow-lg space-y-6">
          <form onSubmit={handleSubmit} className="space-y-2">
            <h2 className="text-xl font-semibold text-secondary">
              Target dan harapan kk apa?
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Silahkan kk, new year's resolutionnya"
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
                <h3 className="text-sm text-primary">Target dan harapan kk:</h3>
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
                ) : (
                  <div>Loading...</div> // Replace this with a spinner or custom loader component
                )}
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            {userGoals.length === 25 ? (
              <p className="text-lg text-primary"><strong>Hore udah cukup goalnya!</strong></p>
            ) : userGoals.length > 0 ? (
              <p className="text-sm text-primary">
                Kk butuh <strong>{25-userGoals.length} {userGoals.length === 1 ? 'target' : 'target'}</strong> lagi. Atau 
                {userGoals.length < 25 && ` klik "Mulai!" untuk melengkapi dengan ${25 - userGoals.length} target acak.`}
              </p>
            ) : (
              <p className="text-sm text-primary">
                {`Tambahin beberapa harapan kk ato klik "Mulai!" untuk ditambahin sama punya kita, kk.`}
              </p>
            )}
            <button
              onClick={handleGenerate}
              className={`
                px-6 py-3 rounded-lg text-white font-semibold
                bg-primary hover:bg-secondary
                transition-all duration-300
              `}
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
                { userGoals.length == 0 ?
                  <p className='mb-6 text-secondary'>
                    Kk belom nambahin harapan kk di 2025 loh, mau dibikinin aja?
                  </p>
                  :
                  <p className="mb-6 text-secondary">
                    Kk yakin cuma mau bikin {userGoals.length} doang? Masih kurang {25 - userGoals.length} lagi! 
                    Kalo kk yakin kk bakal dikasih bingo random ya
                  </p>
                }
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 bg-background text-primary rounded-lg hover:bg-background-alt transition-colors"
                  >
                    { userGoals.length == 0? `Oh iya! Tambah dulu ya kak` : `Okedeh, isi lagi`}
                  </button>
                  <button
                    onClick={() => {
                      setShowPopup(false)
                      generateFinalGoals()
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                  >
                    {userGoals.length == 0? `Ywd.` : `Lanjut!`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}
