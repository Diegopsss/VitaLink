import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import baseAprender from '../assets/Images/Backgrounds/base_aprender.svg'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import dialogoMusica from '../assets/Images/Texts/dialogo_musica.png'
import aplauso from '../assets/Images/iconos_musica/aplauso.png'
import guitarra from '../assets/Images/iconos_musica/guitarra.png'
import maracas from '../assets/Images/iconos_musica/maracas.png'
import tambor from '../assets/Images/iconos_musica/tambor.png'
import trompeta from '../assets/Images/iconos_musica/trompeta.png'
import MenuTab from '../components/MenuTab'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import fraseDiapositiva23Audio from '../assets/Audios/palabras/musica/frase_diapositiva 23.m4a'
import fraseDiapositiva24Audio from '../assets/Audios/palabras/musica/frase_diapositiva 24.m4a'
import aplausosAudio from '../assets/Audios/palabras/musica/aplausos_música.m4a'
import guitarraAudio from '../assets/Audios/palabras/musica/guitarra_musica.m4a'
import maracasAudio from '../assets/Audios/palabras/musica/maracas_musica.m4a'
import tamborAudio from '../assets/Audios/palabras/musica/tambor_musica.m4a'
import trompetaAudio from '../assets/Audios/palabras/musica/trompeta_musica.m4a'

// Importar efectos de sonido de música
import efectoAplausos from '../assets/Audios/palabras/musica/efecto_aplausos.mp3'
import efectoGuitarra from '../assets/Audios/palabras/musica/efecto_guitarra.mp3'
import efectoMaracas from '../assets/Audios/palabras/musica/efecto_maracas.mp3'
import efectoTambores from '../assets/Audios/palabras/musica/efecto_tambores.mp3'
import efectoTrompetas from '../assets/Audios/palabras/musica/efecto_trompetas.mp3'

function MusicaPage() {
  const [currentView, setCurrentView] = useState<'initial' | 'musicElements'>('initial')
  const [clickedMusic, setClickedMusic] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Configuración de efectos de sonido (fácil de ajustar)
  const efectosConfig = {
    // Volumen de los efectos (0.0 a 1.0)
    volumen: 0.3, // 30% de volumen - fácil de ajustar
    // Duración máxima por instrumento en segundos (null para reproducir completo)
    duraciones: {
      'Aplauso': 2,    // 2 segundos
      'Guitarra': 3,    // 3 segundos
      'Maracas': 2,     // 2 segundos
      'Tambor': 3.5,      // 3.5 segundos
      'Trompeta': 4     // 4 segundos
    },
    // Tiempo inicial para empezar a reproducir el efecto (en segundos)
    tiempoInicial: {
      'Aplauso': 0,    // 0 segundos (empieza desde el principio)
      'Guitarra': 0,    // 0 segundos (empieza desde el principio)
      'Maracas': 1.5,   // 1.5 segundos (empieza avanzado para evitar silencio)
      'Tambor': 1.2,   // 1.2 segundos (empieza avanzado para que salga antes)
      'Trompeta': 1.2   // 1.2 segundos (empieza avanzado para evitar silencio)
    },
    // Retraso antes de iniciar el efecto después del audio del instrumento (en milisegundos)
    retraso: 100 // 100ms - reducido para que salga antes
  }
  
  // Acceder a la música de fondo y bajar el volumen para esta página
  const { setVolume } = useBackgroundMusic()
  
  useEffect(() => {
    // Bajar el volumen de la música de fondo a 10% para no interferir con audios principales
    setVolume(0.1)
    
    // Cleanup: restaurar volumen al salir de la página
    return () => {
      setVolume(0.25) // Volumen normal
    }
  }, [setVolume])

  // Funciones para reproducir audios específicos de música
  const handleMusicClick = (musicName: string) => {
    let audioFile: string
    let efectoFile: string
    
    switch (musicName) {
      case 'Aplauso':
        audioFile = aplausosAudio
        efectoFile = efectoAplausos
        break
      case 'Guitarra':
        audioFile = guitarraAudio
        efectoFile = efectoGuitarra
        break
      case 'Maracas':
        audioFile = maracasAudio
        efectoFile = efectoMaracas
        break
      case 'Tambor':
        audioFile = tamborAudio
        efectoFile = efectoTambores
        break
      case 'Trompeta':
        audioFile = trompetaAudio
        efectoFile = efectoTrompetas
        break
      default:
        return
    }
    
    // Reproducir audio del instrumento primero
    const audio = new Audio(audioFile)
    audio.play().catch(error => {
      console.log(`Error reproduciendo audio ${musicName}:`, error)
    })
    
    // Después de que termine el audio del instrumento, reproducir el efecto
    audio.addEventListener('ended', () => {
      setTimeout(() => {
        const efecto = new Audio(efectoFile)
        efecto.volume = efectosConfig.volumen
        
        // Obtener la duración específica para este instrumento
        const duracionInstrumento = efectosConfig.duraciones[musicName as keyof typeof efectosConfig.duraciones]
        
        // Obtener el tiempo inicial para este instrumento
        const tiempoInicialInstrumento = efectosConfig.tiempoInicial[musicName as keyof typeof efectosConfig.tiempoInicial]
        
        // Establecer el tiempo inicial si está configurado
        if (tiempoInicialInstrumento) {
          efecto.currentTime = tiempoInicialInstrumento
        }
        
        // Si hay duración configurada para este instrumento, cortar el efecto
        if (duracionInstrumento) {
          setTimeout(() => {
            efecto.pause()
            efecto.currentTime = 0
          }, duracionInstrumento * 1000)
        }
        
        efecto.play().catch(error => {
          console.log(`Error reproduciendo efecto de ${musicName}:`, error)
        })
      }, efectosConfig.retraso)
    })
  }

  useEffect(() => {
    // Esperar 2 segundos para que termine el audio de música
    setTimeout(() => {
      // Reproducir audio 'frase_diapositiva 23' antes del cambio de página
      const audio1 = new Audio(fraseDiapositiva23Audio)
      audio1.play().catch(error => {
        console.log('Error reproduciendo audio frase diapositiva 23:', error)
      })
      
      // Cambiar a vista de música cuando termine el audio
      audio1.addEventListener('ended', () => {
        setCurrentView('musicElements')
        
        // Reproducir audio 'frase_diapositiva 24' después del cambio de página
        setTimeout(() => {
          const audio2 = new Audio(fraseDiapositiva24Audio)
          audio2.play().catch(error => {
            console.log('Error reproduciendo audio frase diapositiva 24:', error)
          })
        }, 1000)
      })

      return () => {
        audio1.removeEventListener('ended', () => {})
      }
    }, 2000) // Esperar 2 segundos para que sea perceptible

    return () => {}
  }, [])

  useEffect(() => {
    if (clickedMusic) {
      const timer = setTimeout(() => {
        setClickedMusic(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [clickedMusic])

  // Posiciones aleatorias para los elementos de música
  const musicPositions = [
    { top: '0px', left: '200px' },
    { top: '280px', left: '650px' },
    { top: '250px', left: '100px' },
    { top: '320px', left: '350px' },
    { top: '0px', left: '520px' }
  ]

  const musicElements = [
    { name: 'Aplauso', image: aplauso },
    { name: 'Guitarra', image: guitarra },
    { name: 'Maracas', image: maracas },
    { name: 'Tambor', image: tambor },
    { name: 'Trompeta', image: trompeta }
  ]

  return (
    <div
      style={{
        backgroundImage: currentView === 'initial' ? `url(${baseAprender})` : `url(${fondoGeneral})`,
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
        transition: 'background-image 1s ease-in-out',
      }}
    >
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
        <Link to="/words" style={{ display: 'block', cursor: 'pointer' }}>
          <img
            src={returnButton}
            alt="Regresar"
            style={{
              width: '95px',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        </Link>
      </motion.div>

      {/* Diálogo música - solo en vista inicial */}
      {currentView === 'initial' && (
        <motion.img
          src={dialogoMusica}
          alt="Diálogo Música"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: '200px',
            left: '340px',
            transform: 'translateX(-50%)',
            width: '500px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Elementos de música - solo en vista de música */}
      {currentView === 'musicElements' && (
        <>
          {musicElements.map((element, index) => (
            <motion.div
              key={element.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.2 + (index * 0.15), 
                duration: 0.6, 
                ease: 'easeOut' 
              }}
              style={{
                position: 'absolute',
                top: musicPositions[index].top,
                left: musicPositions[index].left,
                cursor: 'pointer',
                zIndex: 1,
              }}
              onClick={() => {
                setClickedMusic(element.name)
                handleMusicClick(element.name)
              }}
            >
              <motion.img
                src={element.image}
                alt={element.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ 
                  scale: [1, 0.9, 1.2, 1],
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.6 }
                }}
                animate={clickedMusic === element.name ? {
                  x: [0, -4, 4, -4, 0],
                  y: [0, -2, 2, -2, 0],
                  rotate: [0, -2, 2, -2, 0],
                } : {}}
                transition={{
                  duration: 1.2,
                  repeat: clickedMusic === element.name ? Infinity : 0,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                style={{
                  width: '280px',
                  height: 'auto',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          ))}
        </>
      )}
      
      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default MusicaPage
