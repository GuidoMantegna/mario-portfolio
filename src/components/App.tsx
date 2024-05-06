import { Canvas } from './Canvas'
import Mario from './../assets/mario.png'
import { useEffect, useState } from 'react'

function App() {
  const [marioPos, setMarioPos] = useState({ x: 0, y: 500 })

  const marioActions = {
    move: (direction: string) => {
      direction === 'ArrowRight'
        ? setMarioPos((prevState) => ({ ...prevState, x: prevState.x + 5 }))
        : setMarioPos((prevState) => ({ ...prevState, x: prevState.x - 5 }))
    },
    jump: (type: string) => {
      type === 'keydown'
        ? setMarioPos((prevState) => ({ ...prevState, y: prevState.y - 150  }))
        : setMarioPos((prevState) => ({ ...prevState, y: prevState.y + 150  }))
    }
  }

  const calculateMarioPos = (e: KeyboardEvent) => {
    const { code, type } = e

    switch (code) {
      case 'ArrowRight':
      case 'ArrowLeft':
        marioActions.move(code)
        break
      case 'Space':
        marioActions.jump(type)
        break
      default:
        return
        break
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', calculateMarioPos)
    window.addEventListener('keyup', calculateMarioPos)

    return () => {
      window.removeEventListener('keydown', calculateMarioPos)
      window.removeEventListener('keyup', calculateMarioPos)
    } 
  }, [])
  return (
    <div className="App h-screen w-screen border-1 bg-black">
      <div className="Mario">
        <img
          src={Mario}
          alt="Mario"
          className="w-10 h-10 absolute transition duration-150 ease-out md:ease-in"
          style={{
            transform: `translateX(${marioPos.x}%) translateY(${marioPos.y}%)`
          }}
        />
      </div>
    </div>
  )
}

export default App
