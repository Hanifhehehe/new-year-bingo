'use client'

import { useState, useEffect } from 'react'
import { Resolution, BingoTile } from '@/types/bingo'
import { generateBingoBoard, checkForWin } from '@/utils/bingoUtils'
import ReactConfetti from 'react-confetti'

export default function BingoBoard() {
    const [board, setBoard] = useState<BingoTile[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [winningLine, setWinningLine] = useState<number[] | null>(null)
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/data-jwD2WKQKOGqG6G6roz5EZBPjGHs3yT.json')
          const data = await response.json()
          const initialBoard = generateBingoBoard(data.resolutions).map(resolution => ({
            ...resolution,
            isSelected: false
          }))
          setBoard(initialBoard)
          setIsLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error)
          setIsLoading(false)
        }
      }
  
      fetchData()
    }, [])
  
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
  
    if (isLoading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EFF7F6] to-[#F7D6E0] flex flex-col items-center justify-center p-4">
        {winningLine && <ReactConfetti numberOfPieces={200} />}
        <h1 className="text-4xl font-bold mb-8 text-[#F2B5D4] shadow-sm">Resolution Bingo</h1>
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
  
  

