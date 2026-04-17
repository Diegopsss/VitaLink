import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import fondoCarro from '../../assets/Images/Backgrounds/fondos juegos/fondo_carro.svg'
import cocheJuego from '../../assets/Images/iconos_juego/Carro/coche_juego.png'
import flechaIzquierda from '../../assets/Images/iconos_juego/Carro/flecha_izquierda.png'
import flechaDerecha from '../../assets/Images/iconos_juego/Carro/flecha_derecha.png'

function CarGames() {
    const [carPosition, setCarPosition] = useState(0)
    const [isMovingLeft, setIsMovingLeft] = useState(false)
    const [isMovingRight, setIsMovingRight] = useState(false)
    const moveSpeed = 3
    const minPosition = -400
    const maxPosition = 400

    useEffect(() => {
        let animationFrame: number

        const animate = () => {
            if (isMovingLeft) {
                setCarPosition(prev => Math.max(minPosition, prev - moveSpeed))
            } else if (isMovingRight) {
                setCarPosition(prev => Math.min(maxPosition, prev + moveSpeed))
            }
            animationFrame = requestAnimationFrame(animate)
        }

        if (isMovingLeft || isMovingRight) {
            animationFrame = requestAnimationFrame(animate)
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [isMovingLeft, isMovingRight])

    return (
        <div
            style={{
                backgroundImage: `url(${fondoCarro})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Flecha Izquierda */}
            <motion.img
                src={flechaIzquierda}
                alt="Flecha Izquierda"
                onMouseDown={() => setIsMovingLeft(true)}
                onMouseUp={() => setIsMovingLeft(false)}
                onMouseLeave={() => setIsMovingLeft(false)}
                onTouchStart={(e) => {
                    e.preventDefault()
                    setIsMovingLeft(true)
                }}
                onTouchEnd={(e) => {
                    e.preventDefault()
                    setIsMovingLeft(false)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    left: '50px',
                    bottom: '50px',
                    width: '150px',
                    cursor: 'pointer',
                    zIndex: 10,
                    userSelect: 'none',
                    touchAction: 'none',
                }}
            />

            {/* Carro con animación */}
            <motion.img
                src={cocheJuego}
                alt="Coche"
                animate={{ x: carPosition }}
                transition={{
                    duration: 0,
                }}
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    width: '300px',
                    zIndex: 5,
                }}
            />

            {/* Flecha Derecha */}
            <motion.img
                src={flechaDerecha}
                alt="Flecha Derecha"
                onMouseDown={() => setIsMovingRight(true)}
                onMouseUp={() => setIsMovingRight(false)}
                onMouseLeave={() => setIsMovingRight(false)}
                onTouchStart={(e) => {
                    e.preventDefault()
                    setIsMovingRight(true)
                }}
                onTouchEnd={(e) => {
                    e.preventDefault()
                    setIsMovingRight(false)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    right: '50px',
                    bottom: '50px',
                    width: '150px',
                    cursor: 'pointer',
                    zIndex: 10,
                    userSelect: 'none',
                    touchAction: 'none',
                }}
            />
        </div>
    )
}

export default CarGames