import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../../assets/Images/Buttons/return_button.png'
import MenuTab from '../../components/MenuTab'
import { useBackgroundMusic } from '../../contexts/BackgroundMusicContext'
import '../../styles/App.css'

// Importar imágenes del conejo perdido en orden
import conejo1 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_1.svg'
import conejo2 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_2.svg'
import conejo3 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_3.svg'
import conejo4 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_4.svg'
import conejo5 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_5.svg'
import conejo6 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_6.svg'
import conejo7 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_7.svg'
import conejo8 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_8.svg'
import conejo9 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_9.svg'
import conejoFinal from '../../assets/Images/paginas_cuentos/conejo_perdido/conejo_perdido.svg'

// Importar todos los audios del cuento 1 enumerados
import unoAudio from '../../assets/Audios/cuentos/cuento 1/uno_cuento 1.m4a'
import dosAudio from '../../assets/Audios/cuentos/cuento 1/dos_cuento 1.m4a'
import tresAudio from '../../assets/Audios/cuentos/cuento 1/tres_cuento 1.m4a'
import cuatroAudio from '../../assets/Audios/cuentos/cuento 1/cuatro_cuento 1.m4a'
import cincoAudio from '../../assets/Audios/cuentos/cuento 1/cinco_cuento 1.m4a'
import seisAudio from '../../assets/Audios/cuentos/cuento 1/seis_cuento 1.m4a'
import sieteAudio from '../../assets/Audios/cuentos/cuento 1/siete_cuento 1.m4a'
import ochoAudio from '../../assets/Audios/cuentos/cuento 1/ocho_cuento 1.m4a'
import nueveAudio from '../../assets/Audios/cuentos/cuento 1/nueve_cuento 1.m4a'
import diezAudio from '../../assets/Audios/cuentos/cuento 1/diez_cuento 1.m4a'

function ConejoPerdidoPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate()
  
  // Acceder a la música de fondo global y controlar volumen
  const { setVolume } = useBackgroundMusic()

  // Array de imágenes en orden (archivo final al inicio)
  const conejoImages = [
    conejoFinal, conejo1, conejo2, conejo3, conejo4, 
    conejo5, conejo6, conejo7, conejo8, conejo9
  ]

  // Array de audios correspondientes a cada página
  const conejoAudios = [
    unoAudio,  // Página 0 (presentación) → uno_cuento 1.m4a
    dosAudio,  // Página 1 → dos_cuento 1.m4a
    tresAudio, // Página 2 → tres_cuento 1.m4a
    cuatroAudio, // Página 3 → cuatro_cuento 1.m4a
    cincoAudio, // Página 4 → cinco_cuento 1.m4a
    seisAudio,  // Página 5 → seis_cuento 1.m4a
    sieteAudio, // Página 6 → siete_cuento 1.m4a
    ochoAudio,  // Página 7 → ocho_cuento 1.m4a
    nueveAudio, // Página 8 → nueve_cuento 1.m4a
    diezAudio  // Página 9 → diez_cuento 1.m4a
  ]

  // Efecto para manejar la reproducción de audio y cambio automático
  useEffect(() => {
    // Bajar el volumen de la música de fondo a casi nada (solo en la primera carga)
    if (currentImage === 0) {
      setVolume(0.02) // 2% de volumen - casi inaudible (igual que en juegos)
    }

    // Obtener el audio correspondiente a la página actual
    const audioSrc = conejoAudios[currentImage]
    if (audioSrc) {
      const audio = new Audio(audioSrc)
      audio.play().catch(error => {
        console.error('Error reproduciendo audio:', error)
        // Si hay error, cambiar después de 3 segundos
        setTimeout(() => {
          if (currentImage < conejoImages.length - 1) {
            setCurrentImage(currentImage + 1)
          } else {
            navigate('/stories')
          }
        }, 3000)
      })

      audio.addEventListener('ended', () => {
        if (currentImage < conejoImages.length - 1) {
          setCurrentImage(currentImage + 1)
        } else {
          navigate('/stories')
        }
      })

      return () => {
        audio.pause()
        audio.removeEventListener('ended', () => {})
      }
    } else {
      // Si no hay audio, cambiar después de 3 segundos
      const timer = setTimeout(() => {
        if (currentImage < conejoImages.length - 1) {
          setCurrentImage(currentImage + 1)
        } else {
          navigate('/stories')
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentImage, navigate, conejoAudios, setVolume])

  // Cleanup para restaurar volumen al salir
  useEffect(() => {
    return () => {
      setVolume(0.05) // Restaurar al volumen normal bajo
    }
  }, [setVolume])

  // Función para manejar navegación manual (resetear timer)
  const handleNext = () => {
    if (currentImage < conejoImages.length - 1) {
      setCurrentImage(currentImage + 1)
    }
  }

  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1)
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${conejoImages[currentImage]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '1024px',
        height: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Botón sidebar - movido abajo */}
      <img
        src={sidebarButton}
        alt="Sidebar"
        onClick={() => setIsMenuOpen(true)}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '80px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 999,
        }}
      />

      {/* Botón de return - movido abajo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '15px',
          right: '870px',
          zIndex: 1,
        }}
      >
        <div onClick={() => navigate('/stories')} style={{ display: 'block', cursor: 'pointer' }}>
          <img
            src={returnButton}
            alt="Regresar"
            style={{
              width: '80px',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        </div>
      </motion.div>

      {/* Flechas de navegación */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={handlePrevious}
        disabled={currentImage === 0}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: currentImage === 0 ? 'rgba(200, 200, 200, 0.7)' : 'rgba(255, 255, 255, 0.9)',
          color: currentImage === 0 ? '#999' : '#333',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          fontWeight: 'bold',
          cursor: currentImage === 0 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
        }}
      >
        <span style={{ marginLeft: '-4px' }}>{"<"}</span>
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={handleNext}
        disabled={currentImage === conejoImages.length - 1}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: currentImage === conejoImages.length - 1 ? 'rgba(200, 200, 200, 0.7)' : 'rgba(255, 255, 255, 0.9)',
          color: currentImage === conejoImages.length - 1 ? '#999' : '#333',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          fontWeight: 'bold',
          cursor: currentImage === conejoImages.length - 1 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
        }}
      >
        <span style={{ marginLeft: '2px' }}>{">"}</span>
      </motion.button>

    {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default ConejoPerdidoPage
