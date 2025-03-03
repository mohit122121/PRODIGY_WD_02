"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])

  useEffect(() => {
    if (!isRunning) return

    const intervalId = setInterval(() => setTime((prev) => prev + 10), 10)
    return () => clearInterval(intervalId)
  }, [isRunning])

  const toggleStartPause = () => setIsRunning((prev) => !prev)

  const reset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const addLap = () => setLaps((prev) => [...prev, time])

  const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0")
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0")
    const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0")
    return `${minutes}:${seconds}.${centiseconds}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 transition-all">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md transition-transform transform hover:scale-105">
        <div 
          className={`text-6xl font-bold mb-6 text-center transition-colors ${isRunning ? 'text-green-500' : 'text-red-500'}`}
        >
          {formatTime(time)}
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <Button 
            onClick={toggleStartPause} 
            className={`transition-transform transform hover:scale-110 ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button 
            onClick={reset} 
            variant="outline" 
            className="transition-transform transform hover:scale-110 hover:bg-gray-200"
          >
            Reset
          </Button>
          <Button 
            onClick={addLap} 
            disabled={!isRunning} 
            className={`transition-transform transform hover:scale-110 ${!isRunning ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            Lap
          </Button>
        </div>
        {laps.length > 0 && (
          <ScrollArea className="h-48 border rounded-md p-2 bg-gray-50">
            <ol className="space-y-2">
              {laps.map((lap, i) => (
                <li 
                  key={i} 
                  className="text-sm transition-transform transform hover:scale-105 hover:text-blue-500"
                >
                  Lap {i + 1}: {formatTime(lap)}
                </li>
              ))}
            </ol>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
