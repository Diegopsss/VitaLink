import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import fondoCarro from '../../assets/Images/Backgrounds/fondos juegos/fondo_carro.svg'
import cocheJuego from '../../assets/Images/iconos_juego/Carro/coche_juego.png'
import flechaIzquierda from '../../assets/Images/iconos_juego/Carro/flecha_izquierda.png'
import flechaDerecha from '../../assets/Images/iconos_juego/Carro/flecha_derecha.png'
import iconoCasa from '../../assets/Images/iconos_juego/Carro/icono_casa.png'
import iconoParque from '../../assets/Images/iconos_juego/Carro/icono_parque.png'
import iconoTienda from '../../assets/Images/iconos_juego/Carro/icono_tienda.png'

interface Obstacle {
    id: number
    icon: string
    lane: number
    progress: number
}

function CarGames() {
    const [carPosition, setCarPosition] = useState(0)
    const [isMovingLeft, setIsMovingLeft] = useState(false)
    const [isMovingRight, setIsMovingRight] = useState(false)
    const [obstacles, setObstacles] = useState<Obstacle[]>([])
    const [obstacleIdCounter, setObstacleIdCounter] = useState(0)
    const [countdown, setCountdown] = useState(5)
    const [showIniciamos, setShowIniciamos] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    const moveSpeed = 3
    const minPosition = -400
    const maxPosition = 400
    const lanes = [
        { id: 0, finalX: -450, name: 'left-outer' },
        { id: 1, finalX: -150, name: 'left-inner' },
        { id: 2, finalX: 150, name: 'right-inner' },
        { id: 3, finalX: 450, name: 'right-outer' }
    ]
    const obstacleIcons = [iconoCasa, iconoParque, iconoTienda]

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

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1)
            }, 1000)
            return () => clearTimeout(timer)
        } else if (countdown === 0 && !gameStarted) {
            setShowIniciamos(true)
            setTimeout(() => {
                setShowIniciamos(false)
                setGameStarted(true)
                const randomLane = lanes[Math.floor(Math.random() * lanes.length)]
                const randomIcon = obstacleIcons[Math.floor(Math.random() * obstacleIcons.length)]
                const newObstacle: Obstacle = {
                    id: obstacleIdCounter,
                    icon: randomIcon,
                    lane: randomLane.finalX,
                    progress: 0
                }
                setObstacles([newObstacle])
                setObstacleIdCounter(prev => prev + 1)
            }, 1500)
        }
    }, [countdown, gameStarted, obstacleIdCounter])

    useEffect(() => {
        let animationFrame: number

        const animateObstacles = () => {
            setObstacles(prev => {
                const updated = prev
                    .map(obstacle => ({
                        ...obstacle,
                        progress: obstacle.progress + 0.083
                    }))
                    .filter(obstacle => obstacle.progress < 85)

                if (gameStarted && prev.length > 0 && updated.length === 0) {
                    const lastObstacle = prev[0]
                    const obstacleX = lastObstacle.lane * (lastObstacle.progress / 100)
                    const distance = Math.abs(carPosition - obstacleX)
                    
                    if (distance < 150) {
                        setShowConfetti(true)
                        setTimeout(() => setShowConfetti(false), 2000)
                    }
                    
                    const randomLane = lanes[Math.floor(Math.random() * lanes.length)]
                    const randomIcon = obstacleIcons[Math.floor(Math.random() * obstacleIcons.length)]
                    const newObstacle: Obstacle = {
                        id: obstacleIdCounter,
                        icon: randomIcon,
                        lane: randomLane.finalX,
                        progress: 0
                    }
                    setObstacleIdCounter(prev => prev + 1)
                    return [newObstacle]
                }

                return updated
            })
            animationFrame = requestAnimationFrame(animateObstacles)
        }

        animationFrame = requestAnimationFrame(animateObstacles)

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [gameStarted, obstacleIdCounter, carPosition])

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
            {/* Contador y mensaje INICIAMOS */}
            {countdown > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        fontSize: '120px',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
                        zIndex: 20,
                    }}
                >
                    {countdown}
                </motion.div>
            )}

            {showIniciamos && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        fontSize: '100px',
                        fontWeight: 'bold',
                        color: '#FFD700',
                        textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
                        zIndex: 20,
                    }}
                >
                    ¡INICIAMOS!
                </motion.div>
            )}
            
            {showConfetti && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '150px',
                        zIndex: 25,
                    }}
                >
                    🎉✨🎊
                </motion.div>
            )}

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

            {/* Obstáculos */}
            {obstacles.map(obstacle => {
                const progressRatio = obstacle.progress / 100

                const scale = 0.05 + progressRatio * 0.95

                const startY = 60
                const endY = 20
                const yPosition = startY - (startY - endY) * progressRatio

                const xPosition = obstacle.lane * progressRatio

                return (
                    <motion.img
                        key={obstacle.id}
                        src={obstacle.icon}
                        alt="Obstáculo"
                        animate={{
                            x: xPosition,
                            scale: scale
                        }}
                        transition={{ duration: 0 }}
                        style={{
                            position: 'absolute',
                            bottom: `${yPosition}%`,
                            width: '200px',
                            zIndex: 4,
                            opacity: 0.7 + progressRatio * 0.3,
                            transform: 'translateX(-50%)',
                        }}
                    />
                )
            })}

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