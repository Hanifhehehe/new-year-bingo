'use client'

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { BingoTile, Goal } from '../types/bingo'
import { checkForWin } from '../utils/bingoUtils'

interface BingoBoardProps {
  initialGoals: Goal[];
  onBack: () => void;
}

export default function BingoBoard({ initialGoals, onBack }: BingoBoardProps) {
  const [board, setBoard] = useState<BingoTile[]>(() => 
    initialGoals.map(goal => ({
      id: goal.id,
      title: goal.title,
      isSelected: false
    }))
  )
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (winningLine) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [winningLine])

  const toggleTile = (index: number) => {
    setBoard(prevBoard => {
      const newBoard = [...prevBoard]
      newBoard[index] = { ...newBoard[index], isSelected: !newBoard[index].isSelected }
      
      const selectedIndexes = newBoard.map(tile => tile.isSelected)
      const winLine = checkForWin(selectedIndexes)
      setWinningLine(winLine)

      return newBoard
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-alt flex flex-col items-center justify-center p-4">
      {showConfetti && <Confetti recycle={false} />}
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-8 px-4 py-2 text-primary hover:text-secondary transition-colors"
        >
          ← Balik
        </button>
        <h1 className="text-4xl font-bold mb-8 text-primary shadow-sm text-center">
          2025 Ngarep Bingo
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-3 max-w-md w-full bg-white bg-opacity-50 p-4 rounded-xl shadow-lg">
        {board.map((tile, index) => (
          <button
            key={tile.id}
            onClick={() => toggleTile(index)}
            className={`
              aspect-square p-1 text-sm sm:text-sm md:text-base rounded-lg 
              transition-all duration-300 flex items-center justify-center text-center 
              shadow-sm hover:shadow-md 
              ${tile.isSelected
                ? 'bg-secondary text-white font-semibold transform scale-105'
                : 'bg-border text-white hover:bg-secondary'
              }
              ${winningLine && winningLine.includes(index) ? 'ring-4 ring-primary ring-opacity-75' : ''}
            `}
          >
            <span className='text-sm'>
              {tile.title}
            </span>
          </button>
        ))}
      </div>
      {winningLine && (
        <div className="mt-8 text-2xl font-bold text-primary animate-bounce">
          KK HEBAT BANGET DAPET BINGO!
        </div>
      )}
    </div>
  )
}
