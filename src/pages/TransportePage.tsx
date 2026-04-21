import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getMasterVolume } from '../services/audioVolume'
import baseAprender from '../assets/Images/Backgrounds/base_aprender.svg'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import dialogoTransportes from '../assets/Images/Texts/dialogo_transportes.png'
import ambulancia from '../assets/Images/iconos_transportes/ambulancia.png'
import avion from '../assets/Images/iconos_transportes/avion.png'
import carro from '../assets/Images/iconos_transportes/carro.png'
import tren from '../assets/Images/iconos_transportes/tren.png'
import MenuTab from '../components/MenuTab'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import fraseDiapositiva21Audio from '../assets/Audios/palabras/transportes/frase_diapositiva 21.m4a'
import fraseDiapositiva22Audio from '../assets/Audios/palabras/transportes/frase_diapositiva 22.m4a'
import ambulanciaAudio from '../assets/Audios/palabras/transportes/ambulancia_transporte.m4a'
import avionAudio from '../assets/Audios/palabras/transportes/avion_transporte.m4a'
import carroAudio from '../assets/Audios/palabras/transportes/carro_transporte.m4a'
import trenAudio from '../assets/Audios/palabras/transportes/tren_transporte.m4a'
import efectoAmbulanciaAudio from '../assets/Audios/palabras/transportes/efecto_ambulancia.mp4'
import efectoAvionAudio from '../assets/Audios/palabras/transportes/efecto_avion.mp4'
import efectoCarroAudio from '../assets/Audios/palabras/transportes/efecto_carro_palabras.mp3'
import efectoTrenAudio from '../assets/Audios/palabras/transportes/efecto_tren.mp3'

function TransportePage() {
  const [currentView, setCurrentView] = useState<'initial' | 'transportElements'>('initial')
  const [clickedTransport, setClickedTransport] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
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

  // Funciones para reproducir audios específicos de transporte
  const handleTransportClick = (transportName: string) => {
    let audioFile: string
    let efectoFile: string
    
    switch (transportName) {
      case 'Ambulancia':
        audioFile = ambulanciaAudio
        efectoFile = efectoAmbulanciaAudio
        break
      case 'Avion':
        audioFile = avionAudio
        efectoFile = efectoAvionAudio
        break
      case 'Carro':
        audioFile = carroAudio
        efectoFile = efectoCarroAudio
        break
      case 'Tren':
        audioFile = trenAudio
        efectoFile = efectoTrenAudio
        break
      default:
        return
    }
    
    // Primero reproducir el audio del transporte
    const audio = new Audio(audioFile)
    audio.volume = getMasterVolume()

    // Si es ambulancia, ajustar la duración a 3 segundos
    if (transportName === 'Ambulancia') {
      audio.addEventListener('loadedmetadata', () => {
        // Si el audio es más largo de 3 segundos, cortarlo
        if (audio.duration > 4) {
          setTimeout(() => {
            audio.pause()
            // Disparar evento 'ended' manualmente para continuar con el efecto
            audio.dispatchEvent(new Event('ended'))
          }, 4000) // 4 segundos
        }
      })
    }
    
    audio.play().catch(error => {
      console.log(`Error reproduciendo audio ${transportName}:`, error)
    })
    
    // Cuando termine el audio del transporte, reproducir el efecto específico
    audio.addEventListener('ended', () => {
      const efectoAudio = new Audio(efectoFile)
      efectoAudio.volume = getMasterVolume()

      // Si es ambulancia, recortar el efecto a exactamente 4 segundos
      if (transportName === 'Ambulancia') {
        efectoAudio.addEventListener('loadedmetadata', () => {
          // Recortar el efecto a 4 segundos sin importar su duración original
          setTimeout(() => {
            efectoAudio.pause()
          }, 4000) // Exactamente 4 segundos
        })
      }
      
      efectoAudio.play().catch(error => {
        console.log(`Error reproduciendo efecto ${transportName}:`, error)
      })
    })
  }

  useEffect(() => {
    // Esperar 2 segundos para que termine el audio de transporte
    setTimeout(() => {
      // Reproducir audio 'frase_diapositiva 21' antes del cambio de página
      const audio1 = new Audio(fraseDiapositiva21Audio)
      audio1.volume = getMasterVolume()
      audio1.play().catch(error => {
        console.log('Error reproduciendo audio frase diapositiva 21:', error)
      })
      
      // Cambiar a vista de transporte cuando termine el audio
      audio1.addEventListener('ended', () => {
        setCurrentView('transportElements')
        
        // Reproducir audio 'frase_diapositiva 22' después del cambio de página
        setTimeout(() => {
          const audio2 = new Audio(fraseDiapositiva22Audio)
          audio2.volume = getMasterVolume()
          audio2.play().catch(error => {
            console.log('Error reproduciendo audio frase diapositiva 22:', error)
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
    if (clickedTransport) {
      const timer = setTimeout(() => {
        setClickedTransport(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [clickedTransport])

  // Posiciones para elementos de transporte
  // Terrestres tocando el césped (bottom de la pantalla)
  // Avión volando (arriba)
  const transportPositions = [
    { top: '250px', left: '0px' },  // Ambulancia - terrestre
    { top: '-80px', left: '200px' },   // Avión - volando
    { top: '300px', left: '600px' },  // Carro - terrestre
    { top: '158px', left: '350px' }   // Tren - terrestre
  ]

  const transportElements = [
    { name: 'Ambulancia', image: ambulancia },
    { name: 'Avion', image: avion },
    { name: 'Carro', image: carro },
    { name: 'Tren', image: tren }
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

      {/* Diálogo transporte - solo en vista inicial */}
      {currentView === 'initial' && (
        <motion.img
          src={dialogoTransportes}
          alt="Diálogo Transportes"
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

      {/* Elementos de transporte - solo en vista de transporte */}
      {currentView === 'transportElements' && (
        <>
          {transportElements.map((element, index) => (
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
                top: transportPositions[index].top,
                left: transportPositions[index].left,
                cursor: 'pointer',
                zIndex: 1,
              }}
              onClick={() => {
                setClickedTransport(element.name)
                handleTransportClick(element.name)
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
                animate={clickedTransport === element.name ? {
                  x: [0, -4, 4, -4, 0],
                  y: [0, -2, 2, -2, 0],
                  rotate: [0, -2, 2, -2, 0],
                } : {}}
                transition={{
                  duration: 1.2,
                  repeat: clickedTransport === element.name ? Infinity : 0,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                style={{
                  width: element.name === 'Avion' ? '350px' : element.name === 'Tren' ? '300px' : '400px',
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

export default TransportePage
