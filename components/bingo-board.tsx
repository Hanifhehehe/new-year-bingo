'use client'

import { useState } from 'react'
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
    <div className="min-h-screen bg-gradient-to-br from-[#EFF7F6] to-[#F7D6E0] flex flex-col items-center justify-center p-4">
      {winningLine && <Confetti />}
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-8 px-4 py-2 text-[#F2B5D4] hover:text-[#7BDFF2] transition-colors"
        >
          ← Back to setup
        </button>
        <h1 className="text-4xl font-bold mb-8 text-[#F2B5D4] shadow-sm text-center">
          Resolution Bingo
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-3 max-w-md w-full bg-white bg-opacity-50 p-4 rounded-xl shadow-lg">
        {board.map((tile, index) => (
          <button
            key={tile.id}
            onClick={() => toggleTile(index)}
            className={`
              aspect-square p-1 text-xs sm:text-sm md:text-base rounded-lg 
              transition-all duration-300 flex items-center justify-center text-center 
              shadow-sm hover:shadow-md 
              ${tile.isSelected
                ? 'bg-[#7BDFF2] text-white font-semibold transform scale-105'
                : 'bg-[#B2F7EF] text-white hover:bg-[#7BDFF2]'
              }
              ${winningLine && winningLine.includes(index) ? 'ring-4 ring-[#F2B5D4] ring-opacity-75' : ''}
            `}
          >
            {tile.title}
          </button>
        ))}
      </div>
      {winningLine && (
        <div className="mt-8 text-2xl font-bold text-[#F2B5D4] animate-bounce">
          You got bingo!
        </div>
      )}
    </div>
  )
}

