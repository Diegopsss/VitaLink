import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMasterVolume } from '../../services/audioVolume'
import fondoCarro from '../../assets/Images/Backgrounds/fondos juegos/fondo_carro.svg'
import cocheJuego from '../../assets/Images/iconos_juego/Carro/coche_juego.png'
import flechaIzquierda from '../../assets/Images/iconos_juego/Carro/flecha_izquierda.png'
import flechaDerecha from '../../assets/Images/iconos_juego/Carro/flecha_derecha.png'
import iconoCasa from '../../assets/Images/iconos_juego/Carro/icono_casa.png'
import iconoParque from '../../assets/Images/iconos_juego/Carro/icono_parque.png'
import iconoTienda from '../../assets/Images/iconos_juego/Carro/icono_tienda.png'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../../assets/Images/Buttons/return_button.png'
import MenuTab from '../../components/MenuTab'
import { useBackgroundMusic } from '../../contexts/BackgroundMusicContext'
import carGameAudio from '../../assets/Audios/juegos/Carro juego/mizanstock-bmw-xm-car-sound-2023-165995.mp3'
import carroCasaAudio from '../../assets/Audios/juegos/Carro juego/carro casa_juegos.m4a'
import carroTiendaAudio from '../../assets/Audios/juegos/Carro juego/carro tienda_juegos.m4a'
import carroParqueAudio from '../../assets/Audios/juegos/Carro juego/carro parque _juegos.m4a'
import instrucciones1Audio from '../../assets/Audios/juegos/Carro juego/carro instrucciones 1_juegos.m4a'
import muyBienExtra from '../../assets/Audios/extras_ganar/muy bien_extra.m4a'
import noTePreocupes from '../../assets/Audios/extras_perder/no te preocupes_extras.m4a'

import '../../styles/App.css'

interface Obstacle {
    id: number
    icon: string
    lane: number
    progress: number
}

function CarGames() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const [carPosition, setCarPosition] = useState(0)
    const [isMovingLeft, setIsMovingLeft] = useState(false)
    const [isMovingRight, setIsMovingRight] = useState(false)
    const [obstacles, setObstacles] = useState<Obstacle[]>([])
    const [obstacleIdCounter, setObstacleIdCounter] = useState(0)
    const [countdown, setCountdown] = useState(5)
    const [showIniciamos, setShowIniciamos] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [instructionsPlayed, setInstructionsPlayed] = useState(false)
    
    // Acceder a la música de fondo global y controlar volumen
    const { setVolume } = useBackgroundMusic()
    
    // Referencia para el audio del juego
    const gameAudioRef = useRef<HTMLAudioElement | null>(null)

    // Referencia para detener audios anteriores y evitar cruzados
    const currentLocationAudioRef = useRef<HTMLAudioElement | null>(null)

    // Función para reproducir audio específico según el icono que aparece
    const playLocationAudio = (icon: string) => {
        let audioFile: string
        
        switch (icon) {
            case iconoCasa:
                // Reproducir audio específico de casa
                audioFile = carroCasaAudio
                break
            case iconoTienda:
                // Reproducir audio específico de tienda
                audioFile = carroTiendaAudio
                break
            case iconoParque:
                // Reproducir audio específico de parque
                audioFile = carroParqueAudio
                break
            default:
                return
        }
        
        // Detener audio anterior para evitar cruzados
        if (currentLocationAudioRef.current) {
            currentLocationAudioRef.current.pause()
            currentLocationAudioRef.current.currentTime = 0
        }
        
        // Crear y reproducir nuevo audio específico
        const audio = new Audio(audioFile)
        audio.volume = getMasterVolume() * 0.5
        currentLocationAudioRef.current = audio // Guardar referencia
        
        audio.play().catch(error => {
            console.log(`Error reproduciendo audio específico del lugar:`, error)
        })
        
        // Limpiar referencia cuando termine
        audio.addEventListener('ended', () => {
            if (currentLocationAudioRef.current === audio) {
                currentLocationAudioRef.current = null
            }
        })
    }

    // Función para reproducir audio de ganar (solo muy bien)
    const playRandomWinAudio = () => {
        return new Promise<void>((resolve) => {
            const audio = new Audio(muyBienExtra)
            audio.volume = 0.6
            
            audio.addEventListener('ended', () => {
                resolve()
            })
            
            audio.play().catch(error => {
                console.log('Error reproduciendo audio de ganar:', error)
                resolve() // Resolver igual para continuar el juego
            })
        })
    }

    // Función para reproducir audio de perder (solo no te preocupes)
    const playRandomLoseAudio = () => {
        return new Promise<void>((resolve) => {
            const audio = new Audio(noTePreocupes)
            audio.volume = 0.6
            
            audio.addEventListener('ended', () => {
                resolve()
            })
            
            audio.play().catch(error => {
                console.log('Error reproduciendo audio de perder:', error)
                resolve() // Resolver igual para continuar el juego
            })
        })
    }

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

    // Efecto para controlar música de fondo y reproducir instrucciones al entrar
    useEffect(() => {
        // Bajar el volumen de la música de fondo a casi nada
        setVolume(0.02) // 2% de volumen - casi inaudible
        
        // Reproducir audio de instrucciones solo una vez al entrar
        if (!instructionsPlayed) {
            const audio = new Audio(instrucciones1Audio)
            audio.volume = getMasterVolume() * 0.6
            audio.play().catch(error => {
                console.log('Error reproduciendo instrucciones:', error)
            })
            
            // Marcar que las instrucciones ya se reprodujeron
            setInstructionsPlayed(true)
        }
        
        // Cleanup: restaurar volumen al salir
        return () => {
            setVolume(0.05) // Restaurar al volumen normal bajo
        }
    }, [setVolume, instructionsPlayed])

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
                        progress: obstacle.progress + 0.30
                    }))
                    .filter(obstacle => obstacle.progress < 85)

                if (gameStarted && prev.length > 0 && updated.length === 0) {
                    const lastObstacle = prev[0]
                    const obstacleX = lastObstacle.lane * (lastObstacle.progress / 100)
                    const distance = Math.abs(carPosition - obstacleX)
                    
                    // Función asíncrona para manejar el resultado y generar siguiente obstáculo
                    const handleObstacleResult = async () => {
                        if (distance < 50) {
                            // El jugador realmente llegó al obstáculo - reproducir audio aleatorio de ganar
                            await playRandomWinAudio()
                            setShowConfetti(true)
                            setTimeout(() => setShowConfetti(false), 2000)
                            
                            // Generar siguiente obstáculo después del audio
                            setTimeout(() => {
                                const randomLane = lanes[Math.floor(Math.random() * lanes.length)]
                                const randomIcon = obstacleIcons[Math.floor(Math.random() * obstacleIcons.length)]
                                const newObstacle: Obstacle = {
                                    id: obstacleIdCounter,
                                    icon: randomIcon,
                                    lane: randomLane.finalX,
                                    progress: 0
                                }
                                
                                // Reproducir audio específico cuando spawnea el nuevo icono
                                playLocationAudio(randomIcon)
                                
                                setObstacleIdCounter(prev => prev + 1)
                                setObstacles([newObstacle])
                            }, 500) // 500ms de delay después del audio de feedback
                        } else if (distance < 150) {
                            // El jugador chocó con el obstáculo - reproducir audio de perder
                            await playRandomLoseAudio()
                            
                            // Generar siguiente obstáculo después del audio
                            setTimeout(() => {
                                const randomLane = lanes[Math.floor(Math.random() * lanes.length)]
                                const randomIcon = obstacleIcons[Math.floor(Math.random() * obstacleIcons.length)]
                                const newObstacle: Obstacle = {
                                    id: obstacleIdCounter,
                                    icon: randomIcon,
                                    lane: randomLane.finalX,
                                    progress: 0
                                }
                                
                                // Reproducir audio específico cuando spawnea el nuevo icono
                                playLocationAudio(randomIcon)
                                
                                setObstacleIdCounter(prev => prev + 1)
                                setObstacles([newObstacle])
                            }, 500) // 500ms de delay después del audio de feedback
                        } else {
                            // El jugador está en la posición correcta pero no llegó al obstáculo - no reproducir audio
                            // Solo generar siguiente obstáculo sin audio de feedback
                            const randomLane = lanes[Math.floor(Math.random() * lanes.length)]
                            const randomIcon = obstacleIcons[Math.floor(Math.random() * obstacleIcons.length)]
                            const newObstacle: Obstacle = {
                                id: obstacleIdCounter,
                                icon: randomIcon,
                                lane: randomLane.finalX,
                                progress: 0
                            }
                            
                            // Reproducir audio específico cuando spawnea el nuevo icono
                            playLocationAudio(randomIcon)
                            
                            setObstacleIdCounter(prev => prev + 1)
                            setObstacles([newObstacle])
                        }
                    }
                    
                    handleObstacleResult()
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

    // Efecto para manejar el audio del juego
    useEffect(() => {
        // Crear el elemento de audio del juego
        if (!gameAudioRef.current) {
            gameAudioRef.current = new Audio(carGameAudio)
            gameAudioRef.current.loop = true
            gameAudioRef.current.volume = 0.01 // Volumen audible pero de fondo (3%)
            gameAudioRef.current.preload = 'auto'
        }

        // Iniciar el audio del juego en loop con volumen original
        if (gameStarted && gameAudioRef.current) {
            const playAudio = async () => {
                try {
                    gameAudioRef.current!.volume = getMasterVolume() * 0.03
                    await gameAudioRef.current!.play()
                    console.log('Audio del juego iniciado')
                } catch (error) {
                    console.log('Error reproduciendo audio del juego:', error)
                }
            }
            playAudio()
        }

        // Pausar el audio cuando el juego termine o se cambie de página
        return () => {
            if (gameAudioRef.current) {
                gameAudioRef.current.pause()
                gameAudioRef.current.currentTime = 0
            }
        }
    }, [gameStarted])

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
                        top: '200px',
                        left: '230px',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '150px',
                        zIndex: 25,
                    }}
                >
                    🎉✨🎊
                </motion.div>
            )}

            {/* Botón sidebar */}
            <img
                src={sidebarButton}
                alt="Sidebar"
                onClick={() => setIsMenuOpen(true)}
                style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: '100px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    zIndex: 999,
                }}
            />

            {/* Botón de return */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    top: '60px',
                    left: '2px',
                    zIndex: 1,
                }}
            >
                <div onClick={() => navigate('/games')} style={{ display: 'block', cursor: 'pointer' }}>
                    <img
                        src={returnButton}
                        alt="Regresar"
                        style={{
                            width: '95px',
                            borderRadius: '50%',
                            pointerEvents: 'none',
                        }}
                    />
                </div>
            </motion.div>

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
                            width: '280px', // Aumentado de 200px a 280px (40% más grande)
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

            {/* Menú pestaña desplegable */}
            <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    )
}

export default CarGames