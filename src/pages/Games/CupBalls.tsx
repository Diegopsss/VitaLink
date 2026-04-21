import fondoVasos from '../../assets/Images/Backgrounds/fondos juegos/fondo_vasos.svg';
import { getMasterVolume } from '../../services/audioVolume';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import vasoImg from '../../assets/Images/iconos_juego/ordena los vasos/vaso_juego.png';
import pelotaAzul from '../../assets/Images/iconos_juego/ordena los vasos/pelota_azul_juego.png';
import pelotaNaranja from '../../assets/Images/iconos_juego/ordena los vasos/pelota_naranja_juego.png';
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png';
import returnButton from '../../assets/Images/Buttons/return_button.png';
import MenuTab from '../../components/MenuTab';

// Audios del juego
import instrucciones1Audio from '../../assets/Audios/juegos/colores a su lugar/vasos colores_instrucciones 1.m4a';
import instrucciones2Audio from '../../assets/Audios/juegos/colores a su lugar/vasos colores_instrucciones 2.m4a';
import azulAudio from '../../assets/Audios/juegos/colores a su lugar/extra azul_vasos.m4a';
import naranjaAudio from '../../assets/Audios/juegos/colores a su lugar/extra naranja_vasos.m4a';

type BallColor = 'azul' | 'naranja';
type BallPosition = 'initial' | 'cup1' | 'cup2';

interface Ball {
    id: number;
    color: BallColor;
    position: BallPosition;
    image: string;
}

function CupBalls() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [balls, setBalls] = useState<Ball[]>([]);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [gameStarted, setGameStarted] = useState(false);
    const [levelComplete, setLevelComplete] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);
    const [, setDraggedBall] = useState<number | null>(null);
    const [hoveredCup, setHoveredCup] = useState<'cup1' | 'cup2' | null>(null);
    
    const cup1Ref = useRef<HTMLDivElement>(null);
    const cup2Ref = useRef<HTMLDivElement>(null);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    const initializeLevel = () => {
        const newBalls: Ball[] = [];
        
        for (let i = 0; i < 10; i++) {
            newBalls.push({
                id: i,
                color: 'azul',
                position: 'initial',
                image: pelotaAzul
            });
        }
        
        for (let i = 0; i < 10; i++) {
            newBalls.push({
                id: 10 + i,
                color: 'naranja',
                position: 'initial',
                image: pelotaNaranja
            });
        }
        
        for (let i = newBalls.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newBalls[i], newBalls[j]] = [newBalls[j], newBalls[i]];
        }
        
        const shuffledBalls = newBalls.map((ball, index) => {
            const randomCup = index < 10 ? 'cup1' : 'cup2';
            return { ...ball, position: randomCup as BallPosition };
        });
        
        for (let i = shuffledBalls.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledBalls[i], shuffledBalls[j]] = [shuffledBalls[j], shuffledBalls[i]];
        }
        
        setBalls(shuffledBalls);
        setLevelComplete(false);
    };

    const startGame = () => {
        setGameStarted(true);
        setCurrentLevel(1);
        setGameComplete(false);
        initializeLevel();
        
        // Reproducir audios de instrucciones en secuencia
        const audio1 = new Audio(instrucciones1Audio);
        audio1.volume = getMasterVolume();
        audio1.play().catch(error => {
            console.log('Error reproduciendo audio instrucciones 1:', error);
        });

        audio1.addEventListener('ended', () => {
            const audio2 = new Audio(instrucciones2Audio);
            audio2.volume = getMasterVolume();
            audio2.play().catch(error => {
                console.log('Error reproduciendo audio instrucciones 2:', error);
            });
        });
    };

    const nextLevel = () => {
        const newLevel = currentLevel + 1;
        setCurrentLevel(newLevel);
        initializeLevel();
    };

    const isPointInElement = (x: number, y: number, element: HTMLDivElement | null): boolean => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    const handleDragStart = (ballId: number) => {
        setDraggedBall(ballId);
        
        // Reproducir audio del color de la bola
        const ball = balls.find(b => b.id === ballId);
        if (ball) {
            const audio = new Audio(ball.color === 'azul' ? azulAudio : naranjaAudio);
            audio.volume = getMasterVolume();
            audio.play().catch(error => {
                console.log('Error reproduciendo audio de color:', error);
            });
        }
    };

    const handleDragEnd = (ballId: number, info: PanInfo) => {
        const ball = balls.find(b => b.id === ballId);
        if (!ball) return;

        const dropX = info.point.x;
        const dropY = info.point.y;

        const inCup1 = isPointInElement(dropX, dropY, cup1Ref.current);
        const inCup2 = isPointInElement(dropX, dropY, cup2Ref.current);

        let newPosition: BallPosition = ball.position;

        if (inCup1) {
            newPosition = 'cup1';
        } else if (inCup2) {
            newPosition = 'cup2';
        }

        setBalls(prevBalls => 
            prevBalls.map(b => 
                b.id === ballId ? { ...b, position: newPosition } : b
            )
        );

        setDraggedBall(null);
        setHoveredCup(null);
    };

    const handleDrag = (_: number, info: PanInfo) => {
        const dropX = info.point.x;
        const dropY = info.point.y;

        const inCup1 = isPointInElement(dropX, dropY, cup1Ref.current);
        const inCup2 = isPointInElement(dropX, dropY, cup2Ref.current);

        if (inCup1) {
            setHoveredCup('cup1');
        } else if (inCup2) {
            setHoveredCup('cup2');
        } else {
            setHoveredCup(null);
        }
    };

    useEffect(() => {
        const allCorrect = balls.every(ball => {
            if (ball.color === 'azul') return ball.position === 'cup1';
            if (ball.color === 'naranja') return ball.position === 'cup2';
            return false;
        });

        if (allCorrect && balls.length > 0) {
            setTimeout(() => {
                setLevelComplete(true);
            }, 500);
        }
    }, [balls]);

    return (
        <div style={{
            backgroundImage: `url(${fondoVasos})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            overflow: 'hidden',
            padding: '20px'
        }}>
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

            {!gameStarted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '30px'
                    }}
                >
                    <div style={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
                        textAlign: 'center'
                    }}>
                        Ordena los Vasos
                    </div>
                    <motion.button
                        onClick={startGame}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '20px 60px',
                            fontSize: '32px',
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                        }}
                    >
                        Comenzar
                    </motion.button>
                </motion.div>
            )}

            {gameStarted && !gameComplete && (
                <>
                    <div style={{
                        position: 'absolute',
                        top: '40px',
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        padding: '15px 30px',
                        borderRadius: '15px'
                    }}>
                        Nivel: {currentLevel}
                    </div>

                    <div 
                        ref={gameAreaRef}
                        style={{
                        display: 'flex',
                        gap: '150px',
                        alignItems: 'flex-end',
                        marginTop: '100px'
                    }}>
                        <div
                            ref={cup1Ref}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <motion.div
                                animate={{
                                    scale: hoveredCup === 'cup1' ? 1.1 : 1,
                                    filter: hoveredCup === 'cup1' ? 'brightness(1.3) drop-shadow(0 0 20px rgba(100,150,255,0.8))' : 'brightness(1)'
                                }}
                                style={{
                                    width: '300px',
                                    height: '350px',
                                    position: 'relative'
                                }}
                            >
                                <img
                                    src={vasoImg}
                                    alt="Vaso 1"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '60px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px',
                                    justifyContent: 'center',
                                    maxWidth: '180px'
                                }}>
                                    {balls.filter(ball => ball.position === 'cup1').map((ball) => (
                                        <motion.div
                                            key={ball.id}
                                            drag
                                            dragConstraints={gameAreaRef}
                                            dragElastic={0.1}
                                            dragMomentum={false}
                                            onDragStart={() => handleDragStart(ball.id)}
                                            onDrag={(_, info) => handleDrag(ball.id, info)}
                                            onDragEnd={(_, info) => handleDragEnd(ball.id, info)}
                                            whileHover={{ scale: 1.1 }}
                                            whileDrag={{ scale: 1.3, zIndex: 1000 }}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                cursor: 'grab'
                                            }}
                                        >
                                            <img
                                                src={ball.image}
                                                alt={ball.color}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    pointerEvents: 'none'
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                            <div style={{
                                marginTop: '10px',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#4A90E2',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                padding: '8px 20px',
                                borderRadius: '10px'
                            }}>
                                Azul
                            </div>
                        </div>

                        <div
                            ref={cup2Ref}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <motion.div
                                animate={{
                                    scale: hoveredCup === 'cup2' ? 1.1 : 1,
                                    filter: hoveredCup === 'cup2' ? 'brightness(1.3) drop-shadow(0 0 20px rgba(255,150,100,0.8))' : 'brightness(1)'
                                }}
                                style={{
                                    width: '300px',
                                    height: '350px',
                                    position: 'relative'
                                }}
                            >
                                <img
                                    src={vasoImg}
                                    alt="Vaso 2"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '60px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px',
                                    justifyContent: 'center',
                                    maxWidth: '180px'
                                }}>
                                    {balls.filter(ball => ball.position === 'cup2').map((ball) => (
                                        <motion.div
                                            key={ball.id}
                                            drag
                                            dragConstraints={gameAreaRef}
                                            dragElastic={0.1}
                                            dragMomentum={false}
                                            onDragStart={() => handleDragStart(ball.id)}
                                            onDrag={(_, info) => handleDrag(ball.id, info)}
                                            onDragEnd={(_, info) => handleDragEnd(ball.id, info)}
                                            whileHover={{ scale: 1.1 }}
                                            whileDrag={{ scale: 1.3, zIndex: 1000 }}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                cursor: 'grab'
                                            }}
                                        >
                                            <img
                                                src={ball.image}
                                                alt={ball.color}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    pointerEvents: 'none'
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                            <div style={{
                                marginTop: '10px',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#FF8C42',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                padding: '8px 20px',
                                borderRadius: '10px'
                            }}>
                                Naranja
                            </div>
                        </div>
                    </div>
                </>
            )}

            {levelComplete && !gameComplete && (
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
                            borderRadius: '40px',
                            padding: '80px 120px',
                            textAlign: 'center',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            maxWidth: '800px',
                            minWidth: '600px'
                        }}
                    >
                        <div style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            color: '#4CAF50',
                            marginBottom: '50px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                        }}>
                            ¡Nivel Completado!
                        </div>
                        <div style={{
                            fontSize: '40px',
                            color: '#333',
                            marginBottom: '50px'
                        }}>
                            Nivel {currentLevel} superado
                        </div>
                        <motion.button
                            onClick={nextLevel}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '25px 50px',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#FFFFFF',
                                backgroundColor: '#4CAF50',
                                border: 'none',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                            }}
                        >
                            Siguiente Nivel
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}

            {gameComplete && (
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
                            borderRadius: '40px',
                            padding: '80px 120px',
                            textAlign: 'center',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            maxWidth: '800px',
                            minWidth: '600px'
                        }}
                    >
                        <div style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            color: '#FFD700',
                            marginBottom: '50px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                        }}>
                            ¡Felicidades!
                        </div>
                        <div style={{
                            fontSize: '40px',
                            color: '#333',
                            marginBottom: '30px'
                        }}>
                            ¡Completaste todos los niveles!
                        </div>
                        <div style={{
                            fontSize: '28px',
                            color: '#666',
                            marginBottom: '50px'
                        }}>
                            ¡Eres un experto organizando pelotas!
                        </div>
                        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                            <motion.button
                                onClick={startGame}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '25px 50px',
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: '#FFFFFF',
                                    backgroundColor: '#4CAF50',
                                    border: 'none',
                                    borderRadius: '20px',
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
                                    padding: '25px 50px',
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: '#FFFFFF',
                                    backgroundColor: '#2196F3',
                                    border: 'none',
                                    borderRadius: '20px',
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

            <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
}

export default CupBalls;
