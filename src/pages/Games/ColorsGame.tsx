import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import fondoSecuencia from '../../assets/Images/Backgrounds/fondos juegos/fondo_secuencia.svg';
import rojoImg from '../../assets/Images/iconos_juego/Secuencia colores/rojo_secuencia.png';
import azulImg from '../../assets/Images/iconos_juego/Secuencia colores/azul_secuencia.png';
import verdeImg from '../../assets/Images/iconos_juego/Secuencia colores/verde_secuencia.png';
import amarilloImg from '../../assets/Images/iconos_juego/Secuencia colores/amarillo_secuencia.png';
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png';
import returnButton from '../../assets/Images/Buttons/return_button.png';
import MenuTab from '../../components/MenuTab';
import secuenciaColoresAudio from '../../assets/Audios/juegos/secuencia colores/secuencia de colores_instrucciones.m4a';
import rojoAudio from '../../assets/Audios/juegos/secuencia colores/extra rojo_secuencia.m4a';
import azulAudio from '../../assets/Audios/juegos/secuencia colores/extra azul_secuencia.m4a';
import verdeAudio from '../../assets/Audios/juegos/secuencia colores/extra verde_secuencia.m4a';
import amarilloAudio from '../../assets/Audios/juegos/secuencia colores/extra amarillo_secuencia.m4a';
import buenTrabajoExtra from '../../assets/Audios/extras_ganar/buen trabajo_ extra.m4a';
import felicidadesExtra from '../../assets/Audios/extras_ganar/felicidades_extra.m4a';
import muyBienExtra from '../../assets/Audios/extras_ganar/muy bien_extra.m4a';
import confioEnTiDeNuevo from '../../assets/Audios/extras_perder/confío en ti_ de nuevo .m4a';
import intentaloDeNuevo from '../../assets/Audios/extras_perder/inténtalo de nuevo_ extras.m4a';
import noTePreocupes from '../../assets/Audios/extras_perder/no te preocupes_extras.m4a';
import yaCasiExtra from '../../assets/Audios/extras_perder/ya casi_extras.m4a';

type ColorId = 'rojo' | 'azul' | 'verde' | 'amarillo';

interface ColorButton {
    id: ColorId;
    image: string;
    name: string;
}

const colors: ColorButton[] = [
    { id: 'rojo', image: rojoImg, name: 'Rojo' },
    { id: 'azul', image: azulImg, name: 'Azul' },
    { id: 'verde', image: verdeImg, name: 'Verde' },
    { id: 'amarillo', image: amarilloImg, name: 'Amarillo' }
];

function ColorsGame() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Función para reproducir audio aleatorio de felicitación
    const playRandomWinAudio = () => {
        const winAudios = [buenTrabajoExtra, felicidadesExtra, muyBienExtra];
        const randomAudio = winAudios[Math.floor(Math.random() * winAudios.length)];
        const audio = new Audio(randomAudio);
        audio.volume = 0.6;
        audio.play().catch(error => {
            console.log('Error reproduciendo audio de felicitación:', error);
        });
    };

    // Función para reproducir audio aleatorio de derrota
    const playRandomLoseAudio = () => {
        const loseAudios = [confioEnTiDeNuevo, intentaloDeNuevo, noTePreocupes, yaCasiExtra];
        const randomAudio = loseAudios[Math.floor(Math.random() * loseAudios.length)];
        const audio = new Audio(randomAudio);
        audio.volume = 0.6;
        audio.play().catch(error => {
            console.log('Error reproduciendo audio de derrota:', error);
        });
    };

    // Función para reproducir audio específico de cada color
    const playColorAudio = (colorId: ColorId) => {
        let audioFile: string;
        
        switch (colorId) {
            case 'rojo':
                audioFile = rojoAudio;
                break;
            case 'azul':
                audioFile = azulAudio;
                break;
            case 'verde':
                audioFile = verdeAudio;
                break;
            case 'amarillo':
                audioFile = amarilloAudio;
                break;
            default:
                return;
        }
        
        const audio = new Audio(audioFile);
        audio.volume = 0.6; // Volumen alto para colores
        audio.play().catch(error => {
            console.log(`Error reproduciendo audio del color:`, error);
        });
    };

    // Efecto para reproducir audio de instrucciones al entrar
    useEffect(() => {
        const audio = new Audio(secuenciaColoresAudio);
        audio.volume = 0.7; // Volumen alto para instrucciones
        audio.play().catch(error => {
            console.log('Error reproduciendo instrucciones de colores:', error);
        });
    }, []);
    const [sequence, setSequence] = useState<ColorId[]>([]);
    const [userSequence, setUserSequence] = useState<ColorId[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [, setCurrentStep] = useState(-1);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highlightedColor, setHighlightedColor] = useState<ColorId | null>(null);
    const [isWaitingForUser, setIsWaitingForUser] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getRandomColor = (): ColorId => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex].id;
    };

    const startNewRound = () => {
        const newColor = getRandomColor();
        const newSequence = [...sequence, newColor];
        setSequence(newSequence);
        setUserSequence([]);
        setScore(newSequence.length);
        playSequence(newSequence);
        
        // Reproducir audio aleatorio de felicitación al completar ronda
        playRandomWinAudio();
    };

    const playSequence = async (seq: ColorId[]) => {
        setIsPlaying(true);
        setIsWaitingForUser(false);
        
        for (let i = 0; i < seq.length; i++) {
            await new Promise(resolve => {
                timeoutRef.current = setTimeout(() => {
                    setHighlightedColor(seq[i]);
                    setCurrentStep(i);
                    // Reproducir audio del color cuando se ilumina
                    playColorAudio(seq[i]);
                    resolve(undefined);
                }, 600);
            });

            await new Promise(resolve => {
                timeoutRef.current = setTimeout(() => {
                    setHighlightedColor(null);
                    resolve(undefined);
                }, 600);
            });
        }

        setCurrentStep(-1);
        setIsPlaying(false);
        setIsWaitingForUser(true);
    };

    const handleColorClick = (colorId: ColorId) => {
        if (isPlaying || !isWaitingForUser || gameOver) return;

        const newUserSequence = [...userSequence, colorId];
        setUserSequence(newUserSequence);

        setHighlightedColor(colorId);
        setTimeout(() => setHighlightedColor(null), 300);

        // Reproducir audio del color cuando el niño hace clic
        playColorAudio(colorId);

        const currentIndex = newUserSequence.length - 1;
        
        if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
            setGameOver(true);
            setIsWaitingForUser(false);
            playRandomLoseAudio(); // Reproducir audio aleatorio de derrota
            return;
        }

        if (newUserSequence.length === sequence.length) {
            setIsWaitingForUser(false);
            setTimeout(() => {
                startNewRound();
            }, 1000);
        }
    };

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setSequence([]);
        setUserSequence([]);
        setScore(0);
        setIsWaitingForUser(false);
        
        const firstColor = getRandomColor();
        setSequence([firstColor]);
        setScore(1);
        playSequence([firstColor]);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div style={{
            backgroundImage: `url(${fondoSecuencia})`,
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

            {!gameStarted && !gameOver && (
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
                        Juego de Secuencias
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

            {gameStarted && !gameOver && (
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
                        Nivel: {score}
                    </div>

                    {isPlaying && (
                        <div style={{
                            position: 'absolute',
                            bottom: '80px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: '#FFD700',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            padding: '10px 25px',
                            borderRadius: '10px',
                            whiteSpace: 'nowrap'
                        }}>
                            ¡Observa la secuencia!
                        </div>
                    )}

                    {isWaitingForUser && (
                        <div style={{
                            position: 'absolute',
                            bottom: '80px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: '#00FF00',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            padding: '10px 25px',
                            borderRadius: '10px',
                            whiteSpace: 'nowrap'
                        }}>
                            ¡Tu turno!
                        </div>
                    )}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '20px',
                        maxWidth: '350px',
                        width: 'auto'
                    }}>
                        {colors.map((color) => (
                            <motion.div
                                key={color.id}
                                onClick={() => handleColorClick(color.id)}
                                animate={{
                                    scale: highlightedColor === color.id ? 1.2 : 1,
                                    filter: highlightedColor === color.id 
                                        ? 'brightness(1.5) drop-shadow(0 0 20px rgba(255,255,255,0.9))' 
                                        : 'brightness(1)'
                                }}
                                transition={{ duration: 0.2 }}
                                whileHover={!isPlaying && isWaitingForUser ? { scale: 1.1 } : {}}
                                whileTap={!isPlaying && isWaitingForUser ? { scale: 0.9 } : {}}
                                style={{
                                    cursor: isPlaying || !isWaitingForUser ? 'default' : 'pointer',
                                    width: '150px',
                                    height: '150px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <img
                                    src={color.image}
                                    alt={color.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {gameOver && (
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
                            color: '#FF5722',
                            marginBottom: '50px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                        }}>
                            ¡Fin del Juego!
                        </div>
                        <div style={{
                            fontSize: '40px',
                            color: '#333',
                            marginBottom: '30px'
                        }}>
                            Nivel alcanzado: {score}
                        </div>
                        <div style={{
                            fontSize: '28px',
                            color: '#666',
                            marginBottom: '50px'
                        }}>
                            ¡Buen intento!
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

            {/* Menú pestaña desplegable */}
            <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
}

export default ColorsGame;
