import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../../assets/Images/Buttons/return_button.png'
import MenuTab from '../../components/MenuTab'
import { useBackgroundMusic } from '../../contexts/BackgroundMusicContext'
import '../../styles/App.css'

// Importar todos los audios del cuento 2 enumerados
import unoCuento2Audio from '../../assets/Audios/cuentos/cuento 2/uno_cuento2.m4a'
import dosCuento2Audio from '../../assets/Audios/cuentos/cuento 2/dos_cuento 2.m4a'
import tresCuento2Audio from '../../assets/Audios/cuentos/cuento 2/tres_cuento 2.m4a'
import cuatroCuento2Audio from '../../assets/Audios/cuentos/cuento 2/cuatro_cuento 2.m4a'
import cincoCuento2Audio from '../../assets/Audios/cuentos/cuento 2/cinco_cuento 2.m4a'
import seisCuento2Audio from '../../assets/Audios/cuentos/cuento 2/seis_cuento 2.m4a'
import sieteCuento2Audio from '../../assets/Audios/cuentos/cuento 2/siete_cuento 2.m4a'
import ochoCuento2Audio from '../../assets/Audios/cuentos/cuento 2/ocho_cuento 2.m4a'
import nueveCuento2Audio from '../../assets/Audios/cuentos/cuento 2/nueve_cuento 2.m4a'
import diezCuento2Audio from '../../assets/Audios/cuentos/cuento 2/diez_cuento 2.m4a'

// Importar imágenes de la ardilla hambrienta en orden
import ardilla1 from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ard_1.svg'
import ardilla2 from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ard_2.svg'
import ardilla3 from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ard_3.svg'
import ardilla4 from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ard_4.svg'
import ardilla5 from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ard_5.svg'
import ardilla6 from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ard_6.svg'
import ardilla7 from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ard_7.svg'
import ardilla8 from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ard_8.svg'
import ardilla9 from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ard_9.svg'
import ardilla10 from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ard_9.svg' // Temporalmente usando la misma imagen
import ardillaFinal from '../../assets/Images/paginas_cuentos/ardilla_hambrienta/ardilla_hambrienta.svg'

function ArdillaHambrientaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate()

  // Acceder a la música de fondo global y controlar volumen
  const { setVolume } = useBackgroundMusic()

  // Array de imágenes en orden (archivo final al inicio)
  const ardillaImages = [
    ardillaFinal, ardilla1, ardilla2, ardilla3, ardilla4, 
    ardilla5, ardilla6, ardilla7, ardilla8, ardilla9, ardilla10
  ]

  // Array de audios correspondientes a cada página
  const ardillaAudios = [
    unoCuento2Audio,  // Página 0 (presentación) → uno_cuento2.m4a
    dosCuento2Audio,  // Página 1 → dos_cuento2.m4a
    tresCuento2Audio, // Página 2 → tres_cuento2.m4a
    cuatroCuento2Audio, // Página 3 → cuatro_cuento2.m4a
    cincoCuento2Audio, // Página 4 → cinco_cuento2.m4a
    seisCuento2Audio,  // Página 5 → seis_cuento2.m4a
    sieteCuento2Audio, // Página 6 → siete_cuento2.m4a
    ochoCuento2Audio,  // Página 7 → ocho_cuento2.m4a
    nueveCuento2Audio, // Página 8 → nueve_cuento2.m4a
    diezCuento2Audio  // Página 9 → diez_cuento2.m4a
  ]

  // Efecto para manejar la reproducción de audio y cambio automático
  useEffect(() => {
    // Bajar el volumen de la música de fondo a casi nada (solo en la primera carga)
    if (currentImage === 0) {
      setVolume(0.02) // 2% de volumen - casi inaudible (igual que en juegos)
    }

    // Obtener el audio correspondiente a la página actual
    const audioSrc = ardillaAudios[currentImage]
    if (audioSrc) {
      const audio = new Audio(audioSrc)
      audio.play().catch(error => {
        console.error('Error reproduciendo audio:', error)
        // Si hay error, cambiar después de 3 segundos
        setTimeout(() => {
          if (currentImage < ardillaImages.length - 1) {
            setCurrentImage(currentImage + 1)
          } else {
            navigate('/stories')
          }
        }, 3000)
      })

      audio.addEventListener('ended', () => {
        if (currentImage < ardillaImages.length - 1) {
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
        if (currentImage < ardillaImages.length - 1) {
          setCurrentImage(currentImage + 1)
        } else {
          navigate('/stories')
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentImage, navigate, ardillaAudios, setVolume])

  // Cleanup para restaurar volumen al salir
  useEffect(() => {
    return () => {
      setVolume(0.05) // Restaurar al volumen normal bajo
    }
  }, [setVolume])

  // Función para manejar navegación manual (resetear timer)
  const handleNext = () => {
    if (currentImage < ardillaImages.length - 1) {
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
        backgroundImage: `url(${ardillaImages[currentImage]})`,
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
        disabled={currentImage === ardillaImages.length - 1}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: currentImage === ardillaImages.length - 1 ? 'rgba(200, 200, 200, 0.7)' : 'rgba(255, 255, 255, 0.9)',
          color: currentImage === ardillaImages.length - 1 ? '#999' : '#333',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          fontWeight: 'bold',
          cursor: currentImage === ardillaImages.length - 1 ? 'not-allowed' : 'pointer',
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

export default ArdillaHambrientaPage
