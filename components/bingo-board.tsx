'use client'

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { BingoTile, Goal } from '../types/bingo'
import { checkForWin } from '../utils/bingoUtils'

interface BingoBoardProps {
  initialGoals: Goal[];
  onBack: () => void;
  isRecap: boolean
}

export default function BingoBoard({ initialGoals, onBack, isRecap }: BingoBoardProps) {
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
          {isRecap ? `2024 RECAP`: `2025 NGAREP`} BINGO
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-3 max-w-md w-full bg-white bg-opacity-50 p-4 rounded-xl shadow-lg">
        {board.map((tile, index) => (
          <button
            key={tile.id}
            onClick={() => toggleTile(index)}
            className={`
              aspect-square 
              flex items-center justify-center
              p-2 text-xs sm:text-sm
              rounded-lg shadow-sm hover:shadow-md
              transition-all duration-300
              ${tile.isSelected
                ? 'bg-secondary text-white font-semibold transform scale-102'
                : 'bg-border text-white hover:bg-secondary'
              }
              ${winningLine && winningLine.includes(index) ? 'ring-4 ring-primary ring-opacity-75' : ''}
            `}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-center break-words">
                {tile.title}
              </span>
            </div>
          </button>
        ))}
      </div>
      {winningLine && (
        <div className="mt-8 font-bold text-primary animate-bounce text-center">
          <h1 className='text-2xl '>
            KK HEBAT BANGET DAPET BINGO!
          </h1>
          <p>dd kagum bgt deh jdnya.. hehehe...</p>
          <p className='text-xs'>follow ig aku kk hanifhehehe</p>
        </div>
      )}
    </div>
  )
}
