import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import fondoMemorama from '../../assets/Images/Backgrounds/fondos juegos/fondo_memorama.svg'
import cartaAtras from '../../assets/Images/iconos_juego/memorama/carta_atras.png'

import azul1 from '../../assets/Images/iconos_juego/memorama/colores/azul_1.png'
import azul2 from '../../assets/Images/iconos_juego/memorama/colores/azul_2.png'
import naranja1 from '../../assets/Images/iconos_juego/memorama/colores/naranja_1.png'
import naranja2 from '../../assets/Images/iconos_juego/memorama/colores/naranja_2.png'
import negro1 from '../../assets/Images/iconos_juego/memorama/colores/negro_1.png'
import negro2 from '../../assets/Images/iconos_juego/memorama/colores/negro_2.png'
import rojo1 from '../../assets/Images/iconos_juego/memorama/colores/rojo_1.png'
import rojo2 from '../../assets/Images/iconos_juego/memorama/colores/rojo_2.png'
import verde1 from '../../assets/Images/iconos_juego/memorama/colores/verde_1.png'
import verde2 from '../../assets/Images/iconos_juego/memorama/colores/verde_2.png'

import enojo1 from '../../assets/Images/iconos_juego/memorama/emociones/enojo_1.png'
import enojo2 from '../../assets/Images/iconos_juego/memorama/emociones/enojo_2.png'
import feliz1 from '../../assets/Images/iconos_juego/memorama/emociones/feliz_1.png'
import feliz2 from '../../assets/Images/iconos_juego/memorama/emociones/feliz_2.png'
import susto1 from '../../assets/Images/iconos_juego/memorama/emociones/susto_1.png'
import susto2 from '../../assets/Images/iconos_juego/memorama/emociones/susto_2.png'
import triste1 from '../../assets/Images/iconos_juego/memorama/emociones/triste_1.png'
import triste2 from '../../assets/Images/iconos_juego/memorama/emociones/triste_2.png'
import amor1 from '../../assets/Images/iconos_juego/memorama/emociones/amor_1.png'
import amor2 from '../../assets/Images/iconos_juego/memorama/emociones/amor_2.png'

import num1_1 from '../../assets/Images/iconos_juego/memorama/numeros/1_1.png'
import num1_2 from '../../assets/Images/iconos_juego/memorama/numeros/1_2.png'
import num2_1 from '../../assets/Images/iconos_juego/memorama/numeros/2_1.png'
import num2_2 from '../../assets/Images/iconos_juego/memorama/numeros/2_2.png'
import num3_1 from '../../assets/Images/iconos_juego/memorama/numeros/3_1.png'
import num3_2 from '../../assets/Images/iconos_juego/memorama/numeros/3_2.png'
import num4_1 from '../../assets/Images/iconos_juego/memorama/numeros/4_1.png'
import num4_2 from '../../assets/Images/iconos_juego/memorama/numeros/4_2.png'
import num5_1 from '../../assets/Images/iconos_juego/memorama/numeros/5_1.png'
import num5_2 from '../../assets/Images/iconos_juego/memorama/numeros/5_2.png'

interface Card {
    id: number
    pairId: string
    image: string
    isFlipped: boolean
    isMatched: boolean
}

type GameSet = 'colores' | 'emociones' | 'numeros'

const gameSets = {
    colores: [
        { pairId: 'azul', images: [azul1, azul2] },
        { pairId: 'naranja', images: [naranja1, naranja2] },
        { pairId: 'negro', images: [negro1, negro2] },
        { pairId: 'rojo', images: [rojo1, rojo2] },
        { pairId: 'verde', images: [verde1, verde2] }
    ],
    emociones: [
        { pairId: 'enojo', images: [enojo1, enojo2] },
        { pairId: 'feliz', images: [feliz1, feliz2] },
        { pairId: 'susto', images: [susto1, susto2] },
        { pairId: 'triste', images: [triste1, triste2] },
        { pairId: 'amor', images: [amor1, amor2] }
    ],
    numeros: [
        { pairId: '1', images: [num1_1, num1_2] },
        { pairId: '2', images: [num2_1, num2_2] },
        { pairId: '3', images: [num3_1, num3_2] },
        { pairId: '4', images: [num4_1, num4_2] },
        { pairId: '5', images: [num5_1, num5_2] }
    ]
}

function MemoryGame() {
    const navigate = useNavigate()
    const [cards, setCards] = useState<Card[]>([])
    const [flippedIndices, setFlippedIndices] = useState<number[]>([])
    const [isChecking, setIsChecking] = useState(false)
    const [gameWon, setGameWon] = useState(false)
    const [gameSequence, setGameSequence] = useState<GameSet[]>([])
    const [currentGameIndex, setCurrentGameIndex] = useState(0)
    const [allGamesCompleted, setAllGamesCompleted] = useState(false)

    const initializeGame = () => {
        const gameTypes: GameSet[] = ['colores', 'emociones', 'numeros']
        const shuffledSequence = gameTypes.sort(() => Math.random() - 0.5)
        setGameSequence(shuffledSequence)
        setCurrentGameIndex(0)
        setAllGamesCompleted(false)
        loadGame(shuffledSequence[0])
    }

    const loadGame = (gameType: GameSet) => {
        const selectedSet = gameSets[gameType]

        const newCards: Card[] = []
        let idCounter = 0

        selectedSet.forEach(pair => {
            pair.images.forEach(image => {
                newCards.push({
                    id: idCounter++,
                    pairId: pair.pairId,
                    image: image,
                    isFlipped: false,
                    isMatched: false
                })
            })
        })

        const shuffled = newCards.sort(() => Math.random() - 0.5)
        setCards(shuffled)
        setFlippedIndices([])
        setIsChecking(false)
        setGameWon(false)
    }

    const nextGame = () => {
        const nextIndex = currentGameIndex + 1
        if (nextIndex < gameSequence.length) {
            setCurrentGameIndex(nextIndex)
            loadGame(gameSequence[nextIndex])
        } else {
            setAllGamesCompleted(true)
        }
    }

    useEffect(() => {
        initializeGame()
    }, [])

    useEffect(() => {
        if (flippedIndices.length === 2) {
            setIsChecking(true)
            const [firstIndex, secondIndex] = flippedIndices
            const firstCard = cards[firstIndex]
            const secondCard = cards[secondIndex]

            if (firstCard.pairId === secondCard.pairId) {
                setCards(prev => prev.map((card, idx) => 
                    idx === firstIndex || idx === secondIndex
                        ? { ...card, isMatched: true }
                        : card
                ))
                setFlippedIndices([])
                setIsChecking(false)
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map((card, idx) => 
                        idx === firstIndex || idx === secondIndex
                            ? { ...card, isFlipped: false }
                            : card
                    ))
                    setFlippedIndices([])
                    setIsChecking(false)
                }, 1000)
            }
        }
    }, [flippedIndices, cards])

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.isMatched)) {
            setTimeout(() => {
                setGameWon(true)
                setTimeout(() => {
                    nextGame()
                }, 2000)
            }, 500)
        }
    }, [cards])

    const handleCardClick = (index: number) => {
        if (isChecking || cards[index].isFlipped || cards[index].isMatched || flippedIndices.length >= 2) {
            return
        }

        setCards(prev => prev.map((card, idx) => 
            idx === index ? { ...card, isFlipped: true } : card
        ))
        setFlippedIndices(prev => [...prev, index])
    }

    return (
        <div
            style={{
                backgroundImage: `url(${fondoMemorama})`,
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
                padding: '40px 20px'
            }}
        >
            {gameWon && !allGamesCompleted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.3, y: -50 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1.2,
                        y: 0
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut"
                    }}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '80px',
                        fontWeight: 'bold',
                        color: '#FFD700',
                        textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
                        zIndex: 30,
                        textAlign: 'center'
                    }}
                >
                </motion.div>
            )}

            {allGamesCompleted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 100
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '30px',
                            padding: '60px 80px',
                            textAlign: 'center',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            maxWidth: '600px'
                        }}
                    >
                        <div
                            style={{
                                fontSize: '80px',
                                fontWeight: 'bold',
                                color: '#FFD700',
                                marginBottom: '30px',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            ¡Felicidades!
                        </div>
                        <div
                            style={{
                                fontSize: '28px',
                                color: '#333',
                                marginBottom: '40px'
                            }}
                        >
                            Completaste todos los juegos
                        </div>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            <motion.button
                                onClick={initializeGame}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '20px 40px',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#FFFFFF',
                                    backgroundColor: '#4CAF50',
                                    border: 'none',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                }}
                            >
                                Jugar de Nuevo
                            </motion.button>
                            <motion.button
                                onClick={() => navigate('/games')}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '20px 40px',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#FFFFFF',
                                    backgroundColor: '#2196F3',
                                    border: 'none',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                }}
                            >
                                Volver a Juegos
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '15px',
                    maxWidth: '1000px',
                    width: '100%',
                    zIndex: 10
                }}
            >
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        onClick={() => handleCardClick(index)}
                        whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                        whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
                        style={{
                            width: '100%',
                            aspectRatio: '3/4',
                            cursor: card.isMatched || isChecking ? 'default' : 'pointer',
                            position: 'relative',
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.6s'
                        }}
                    >
                        <motion.div
                            animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                }}
                            >
                                <img
                                    src={cartaAtras}
                                    alt="Card Back"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                    backgroundColor: '#FFFFFF'
                                }}
                            >
                                <img
                                    src={card.image}
                                    alt="Card Front"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        padding: '10px'
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default MemoryGame
