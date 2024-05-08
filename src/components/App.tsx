import Mario from './../assets/mario.png'
import MarioGIF from './../assets/mario.gif'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [marioPos, setMarioPos] = useState({ x: 0, y: 500 })
  const [walkDirection, setWalkDirection] = useState('right')
  const jumpDirection = useRef('right')

  const calculateMarioPos = (e: KeyboardEvent) => {
    const { code, type, repeat } = e
    if (repeat && code === 'Space') return // Prevents multiple jumps

    if (code === 'ArrowRight' || code === 'ArrowLeft') {
      setWalkDirection(code === 'ArrowRight' ? 'right' : 'left')
      jumpDirection.current = code === 'ArrowRight' ? 'right' : 'left'
      code === 'ArrowRight'
        ? setMarioPos((prevState) => ({ ...prevState, x: prevState.x + 5 }))
        : setMarioPos((prevState) => ({ ...prevState, x: prevState.x - 5 }))
    }
    if (code === 'Space') {
      type === 'keydown'
        ? setMarioPos((prevState) => ({
            x:
              jumpDirection.current === 'right'
                ? prevState.x + 50
                : prevState.x - 50,
            y: prevState.y - 150
          }))
        : setMarioPos((prevState) => ({
            x:
              jumpDirection.current === 'right'
                ? prevState.x + 50
                : prevState.x - 50,
            y: prevState.y + 150
          }))
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
          src={MarioGIF}
          alt="Mario"
          className="w-20 h-20 absolute transition duration-150 ease-out lg:ease-in"
          style={{
            transform: `translateX(${marioPos.x}%) translateY(${
              marioPos.y
            }%) rotateY(${walkDirection === 'right' ? 0 : 180}deg)`
          }}
        />
      </div>
    </div>
  )
}

export default App
