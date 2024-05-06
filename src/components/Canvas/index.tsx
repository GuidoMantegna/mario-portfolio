import { useRef, useState, useEffect } from 'react'

export const Canvas = () => {
  const [keys, setKeys] = useState({ rightPressed: false, leftPressed: false })
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = canvas.current?.getContext('2d')

  useEffect(() => {
    if (canvas.current && ctx) {
      canvas.current.width = 448
      canvas.current.height = 400
      // Variables de Mario
      let x = canvas.current.width / 2
      let y = canvas.current.height - 30
      const ballRadius = 3

      const drawMario = () => {
        ctx.beginPath() // iniciar el trazado
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
        ctx.fillStyle = '#0095DD'
        ctx.fill()
        ctx.closePath() // terminar el trazado
      }
      drawMario()
    }
  }, [])
  return (
    <>
      <canvas ref={canvas} className='border w-full'></canvas>
    </>
  )
}
