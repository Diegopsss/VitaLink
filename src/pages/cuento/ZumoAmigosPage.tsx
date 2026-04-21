import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../../assets/Images/Buttons/return_button.png'
import MenuTab from '../../components/MenuTab'
import { useBackgroundMusic } from '../../contexts/BackgroundMusicContext'
import '../../styles/App.css'

// Importar todos los audios del cuento 5 enumerados
import unoCuento5Audio from '../../assets/Audios/cuentos/cuento 5/uno_cuento 5.m4a'
import dosCuento5Audio from '../../assets/Audios/cuentos/cuento 5/dos_cuento 5.m4a'
import tresCuento5Audio from '../../assets/Audios/cuentos/cuento 5/tres_cuento 5.m4a'
import cuatroCuento5Audio from '../../assets/Audios/cuentos/cuento 5/cuatro_cuento 5.m4a'
import cincoCuento5Audio from '../../assets/Audios/cuentos/cuento 5/cinco_cuento 5.m4a'
import seisCuento5Audio from '../../assets/Audios/cuentos/cuento 5/seis_cuento 5.m4a'
import sieteCuento5Audio from '../../assets/Audios/cuentos/cuento 5/siete_cuento 5.m4a'
import ochoCuento5Audio from '../../assets/Audios/cuentos/cuento 5/ocho_cuento 5.m4a'
import nueveCuento5Audio from '../../assets/Audios/cuentos/cuento 5/nueve_cuento 5.m4a'
import diezCuento5Audio from '../../assets/Audios/cuentos/cuento 5/diez_cuento 5.m4a'
import onceCuento5Audio from '../../assets/Audios/cuentos/cuento 5/once_cuento 5.m4a'
import doceCuento5Audio from '../../assets/Audios/cuentos/cuento 5/doce_cuento 5.m4a'

// Importar imágenes de zumo y trabajo en equipo
import zumo1 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_1.svg'
import zumo2 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_2.svg'
import zumo3 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_3.svg'
import zumo4 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_4.svg'
import zumo5 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_5.svg'
import zumo6 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_6.svg'
import zumo7 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_7.svg'
import zumo8 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_8.svg'
import zumo9 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_9.svg'
import zumo10 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_10.svg'
import zumo11 from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zum_11.svg'
import zumoFinal from '../../assets/Images/paginas_cuentos/zumo y el trabajo en equipo/zumo_y_trabajo_en_equipo.svg'

function ZumoAmigosPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate()
  
  // Acceder a la música de fondo global y controlar volumen
  const { setVolume } = useBackgroundMusic()

  // Array de imágenes en orden (archivo final al inicio)
  const zumoImages = [
    zumoFinal, zumo1, zumo2, zumo3, zumo4, 
    zumo5, zumo6, zumo7, zumo8, zumo9, zumo10, zumo11
  ]

  // Array de audios correspondientes a cada página
  const zumoAudios = [
    unoCuento5Audio,  // Página 0 (presentación) → uno_cuento5.m4a
    dosCuento5Audio,  // Página 1 → dos_cuento5.m4a
    tresCuento5Audio,  // Página 2 → tres_cuento5.m4a
    cuatroCuento5Audio,  // Página 3 → cuatro_cuento5.m4a
    cincoCuento5Audio,  // Página 4 → cinco_cuento5.m4a
    seisCuento5Audio,  // Página 5 → seis_cuento5.m4a
    sieteCuento5Audio,  // Página 6 → siete_cuento5.m4a
    ochoCuento5Audio,  // Página 7 → ocho_cuento5.m4a
    nueveCuento5Audio,  // Página 8 → nueve_cuento5.m4a
    diezCuento5Audio,  // Página 9 → diez_cuento5.m4a
    onceCuento5Audio,  // Página 10 → once_cuento5.m4a
    doceCuento5Audio   // Página 11 → doce_cuento5.m4a
  ]

  // Efecto para manejar la reproducción de audio y cambio automático
  useEffect(() => {
    // Bajar el volumen de la música de fondo a casi nada (solo en la primera carga)
    if (currentImage === 0) {
      setVolume(0.02) // 2% de volumen - casi inaudible (igual que en juegos)
    }

    // Obtener el audio correspondiente a la página actual
    const audioSrc = zumoAudios[currentImage]
    if (audioSrc) {
      const audio = new Audio(audioSrc)
      audio.play().catch(error => {
        console.error('Error reproduciendo audio:', error)
        // Si hay error, cambiar después de 3 segundos
        setTimeout(() => {
          if (currentImage < zumoImages.length - 1) {
            setCurrentImage(currentImage + 1)
          } else {
            navigate('/stories')
          }
        }, 3000)
      })

      audio.addEventListener('ended', () => {
        if (currentImage < zumoImages.length - 1) {
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
        if (currentImage < zumoImages.length - 1) {
          setCurrentImage(currentImage + 1)
        } else {
          navigate('/stories')
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentImage, navigate, zumoAudios, setVolume])

  // Cleanup para restaurar volumen al salir
  useEffect(() => {
    return () => {
      setVolume(0.05) // Restaurar al volumen normal bajo
    }
  }, [setVolume])

  // Función para manejar navegación manual (resetear timer)
  const handleNext = () => {
    if (currentImage < zumoImages.length - 1) {
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
        backgroundImage: `url(${zumoImages[currentImage]})`,
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
        disabled={currentImage === zumoImages.length - 1}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: currentImage === zumoImages.length - 1 ? 'rgba(200, 200, 200, 0.7)' : 'rgba(255, 255, 255, 0.9)',
          color: currentImage === zumoImages.length - 1 ? '#999' : '#333',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          fontWeight: 'bold',
          cursor: currentImage === zumoImages.length - 1 ? 'not-allowed' : 'pointer',
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

export default ZumoAmigosPage
