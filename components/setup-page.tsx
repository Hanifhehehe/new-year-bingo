'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Goal } from '../types/bingo'
import { GoalChip } from '../components/goal-chip'
// Import the local JSON data
import data from '../lib/data100.json'

interface SetupPageProps {
  onComplete: (goals: Goal[]) => void;
}

export default function SetupPage({ onComplete }: SetupPageProps) {
  const [userGoals, setUserGoals] = useState<Goal[]>([])
  const [allSuggestedGoals, setAllSuggestedGoals] = useState<Goal[]>([])
  const [displayedSuggestions, setDisplayedSuggestions] = useState<Goal[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false) // No need to show loading since data is local

  const getRandomGoals = (goals: Goal[], count: number) => {
    const shuffled = [...goals].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const refreshSuggestions = () => {
    setDisplayedSuggestions(getRandomGoals(allSuggestedGoals, 5))
  }

  useEffect(() => {
    // No need for async fetching, just set the local data
    setAllSuggestedGoals(data)
    setDisplayedSuggestions(getRandomGoals(data, 5))
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
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

  const handleAddSuggested = (goal: Goal) => {
    if (userGoals.length < 25) {
      setUserGoals([...userGoals, goal])
      setAllSuggestedGoals(allSuggestedGoals.filter(g => g.id !== goal.id))
      const remainingSuggestions = displayedSuggestions.filter(g => g.id !== goal.id)
      const newSuggestion = getRandomGoals(
        allSuggestedGoals.filter(g => 
          !displayedSuggestions.find(d => d.id === g.id) && 
          g.id !== goal.id
        ),
        1
      )
      setDisplayedSuggestions([...remainingSuggestions, ...newSuggestion])
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
    if (userGoals.length === 25) {
      onComplete(userGoals)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF7F6] to-[#F7D6E0] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#F2B5D4]">
          2025 GOALS BINGO
        </h1>

        <div className="bg-white bg-opacity-50 rounded-xl p-6 shadow-lg space-y-6">
          <form onSubmit={handleSubmit} className="space-y-2">
            <h2 className="text-xl font-semibold text-[#7BDFF2]">
              What's your resolution?
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-[#B2F7EF] focus:outline-none focus:ring-2 focus:ring-[#7BDFF2]"
                placeholder="Enter your resolution..."
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#7BDFF2] text-white rounded-lg hover:bg-[#B2F7EF] transition-colors"
              >
                Add
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm text-[#F2B5D4]">Your resolutions:</h3>
              <div className="min-h-[50px]">
                {userGoals.map(goal => (
                  <GoalChip
                    key={goal.id}
                    title={goal.title}
                    type="user"
                    onRemove={() => handleRemoveGoal(goal.id)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-[#F2B5D4]">Need help? Add ones below!</h3>
                <button
                  onClick={refreshSuggestions}
                  className="text-sm text-[#7BDFF2] hover:text-[#F2B5D4] transition-colors"
                >
                  Refresh suggestions
                </button>
              </div>
              <div>
                {displayedSuggestions.map(goal => (
                  <GoalChip
                    key={goal.id}
                    title={goal.title}
                    type="suggestion"
                    onAdd={() => handleAddSuggested(goal)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-[#F2B5D4]">
              You have {userGoals.length} {userGoals.length === 1 ? 'resolution' : 'resolutions'},
              you need to add {25 - userGoals.length} more
            </p>
            <button
              onClick={handleGenerate}
              disabled={userGoals.length !== 25}
              className={`
                px-6 py-3 rounded-lg text-white font-semibold
                ${userGoals.length === 25
                  ? 'bg-[#F2B5D4] hover:bg-[#7BDFF2]'
                  : 'bg-[#B2F7EF] opacity-50 cursor-not-allowed'
                }
                transition-all duration-300
              `}
            >
              Generate!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
