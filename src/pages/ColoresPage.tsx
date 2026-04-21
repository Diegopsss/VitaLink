import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import baseAprender from '../assets/Images/Backgrounds/base_aprender.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import dialogoColores from '../assets/Images/Texts/dialogo_colores.png'
import verdeButton from '../assets/Images/Buttons/verde_button.png'
import yellowButton from '../assets/Images/Buttons/yellow_button.png'
import redButton from '../assets/Images/Buttons/red_button.png'
import azulButton from '../assets/Images/Buttons/azul_button.png'
import MenuTab from '../components/MenuTab'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import { setColor, turnOff, getPiUrl } from '../services/piApi'
import { getMasterVolume } from '../services/audioVolume'
import fraseDiapositiva9Audio from '../assets/Audios/palabras/colores/frase_diapositiva 9.m4a'
import amarilloAudio from '../assets/Audios/palabras/colores/amarillo_palabras.m4a'
import azulAudio from '../assets/Audios/palabras/colores/azul_palabras.m4a'
import rojoAudio from '../assets/Audios/palabras/colores/rojo_palabras.m4a'
import verdeAudio from '../assets/Audios/palabras/colores/verde_palabras.m4a'

function ColoresPage() {
  const [currentView, setCurrentView] = useState<'initial' | 'colorButtons'>('initial')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ledOffTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
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

  // Funciones para reproducir audios específicos de colores
  const handleColorClick = (colorName: string) => {
    let audioFile: string
    
    switch (colorName) {
      case 'Verde':
        audioFile = verdeAudio
        break
      case 'Amarillo':
        audioFile = amarilloAudio
        break
      case 'Rojo':
        audioFile = rojoAudio
        break
      case 'Azul':
        audioFile = azulAudio
        break
      default:
        return
    }
    
    const audio = new Audio(audioFile)
    audio.volume = getMasterVolume()
    audio.play().catch(error => {
      console.log(`Error reproduciendo audio ${colorName}:`, error)
    })

    if (getPiUrl()) {
      if (ledOffTimerRef.current) clearTimeout(ledOffTimerRef.current)
      setColor(colorName.toLowerCase()).catch(() => {})
      ledOffTimerRef.current = setTimeout(() => {
        turnOff().catch(() => {})
      }, 3000)
    }
  }

  useEffect(() => {
    // Esperar a que termine el audio de colores (3 segundos de retraso)
    setTimeout(() => {
      // Reproducir audio 'frase_diapositiva 9' antes del cambio de página
      const audio1 = new Audio(fraseDiapositiva9Audio)
      audio1.play().catch(error => {
        console.log('Error reproduciendo audio frase diapositiva 9:', error)
      })
      
      // Cambiar a vista de colores cuando termine el audio
      audio1.addEventListener('ended', () => {
        setCurrentView('colorButtons')
      })

      return () => {
        audio1.removeEventListener('ended', () => {})
      }
    }, 1000) // Esperar 1 segundo para reducir el tiempo de espera

    return () => {}
  }, [])

  return (
    <div
      style={{
        backgroundImage: currentView === 'initial' ? `url(${baseAprender})` : 'none',
        backgroundColor: currentView === 'colorButtons' ? '#ffffff' : 'transparent',
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
        transition: 'background-color 1s ease-in-out',
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

      {/* Diálogo colores - solo en vista inicial */}
      {currentView === 'initial' && (
        <motion.img
          src={dialogoColores}
          alt="Diálogo Colores"
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

      {/* Botones de colores - solo en vista de botones */}
      {currentView === 'colorButtons' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '0px',
            padding: '0px',
            maxWidth: '600px',
            width: '100%',
            zIndex: 1,
            marginLeft: '-100px',
            marginTop: '-46px',
          }}
        >
          {/* Fila 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleColorClick('Verde')}
          >
            <img
              src={verdeButton}
              alt="Verde"
              style={{
                width: '350px',
                height: 'auto',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleColorClick('Amarillo')}
          >
            <img
              src={yellowButton}
              alt="Yellow"
              style={{
                width: '350px',
                height: 'auto',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </motion.div>

          {/* Fila 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleColorClick('Rojo')}
          >
            <img
              src={redButton}
              alt="Red"
              style={{
                width: '350px',
                height: 'auto',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleColorClick('Azul')}
          >
            <img
              src={azulButton}
              alt="Azul"
              style={{
                width: '350px',
                height: 'auto',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </motion.div>
        </motion.div>
      )}
      
      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default ColoresPage
