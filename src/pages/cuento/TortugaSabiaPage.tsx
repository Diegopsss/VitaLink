import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../../assets/Images/Buttons/return_button.png'
import MenuTab from '../../components/MenuTab'
import { useBackgroundMusic } from '../../contexts/BackgroundMusicContext'
import '../../styles/App.css'

// Importar todos los audios del cuento 4 enumerados
import unoCuento4Audio from '../../assets/Audios/cuentos/cuento 4/uno_cuento 4.m4a'
import dosCuento4Audio from '../../assets/Audios/cuentos/cuento 4/dos_cuento 4.m4a'
import tresCuento4Audio from '../../assets/Audios/cuentos/cuento 4/tres_cuento 4.m4a'
import cuatroCuento4Audio from '../../assets/Audios/cuentos/cuento 4/cuatro_cuento 4.m4a'
import cincoCuento4Audio from '../../assets/Audios/cuentos/cuento 4/cinco_cuento 4.m4a'
import seisCuento4Audio from '../../assets/Audios/cuentos/cuento 4/seis_cuento 4.m4a'
import sieteCuento4Audio from '../../assets/Audios/cuentos/cuento 4/siete_cuento 4.m4a'
import ochoCuento4Audio from '../../assets/Audios/cuentos/cuento 4/ocho_cuento 4.m4a'
import nueveCuento4Audio from '../../assets/Audios/cuentos/cuento 4/nueve_cuento 4.m4a'
import diezCuento4Audio from '../../assets/Audios/cuentos/cuento 4/diez_cuento 4.m4a'

// Importar imágenes de la tortuga y día lluvioso en orden
import tortuga1 from '../../assets/Images/paginas_cuentos/tortuga_y_dia_lluvioso/tor_1.svg'
import tortuga2 from '../../assets/Images/paginas_cuentos/tortuga_y_dia_lluvioso/tor_2.svg'
import tortuga3 from '../../assets/Images/paginas_cuentos/tortuga_y_dia_lluvioso/tor_3.svg'
import tortuga4 from '../../assets/Images/paginas_cuentos/tortuga_y_dia_lluvioso/tor_4.svg'
import tortuga5 from '../../assets/Images/paginas_cuentos/tortuga_y_dia_lluvioso/tor_5.svg'
import tortuga6 from '../../assets/Images/paginas_cuentos/tortuga_y_dia_lluvioso/tor_6.svg'
import tortuga7 from '../../assets/Images/paginas_cuentos/tortuga_y_dia_lluvioso/tor_7.svg'
import tortuga8 from '../../assets/Images/paginas_cuentos/tortuga_y_dia_lluvioso/tor_8.svg'
import tortuga9 from '../../assets/Images/paginas_cuentos/tortuga_y_dia_lluvioso/tor_9.svg'
import tortugaFinal from '../../assets/Images/paginas_cuentos/tortuga_y_dia_lluvioso/la_tortuga_y_dia_lluviosa.svg'

function TortugaSabiaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate()
  
  // Acceder a la música de fondo global y controlar volumen
  const { setVolume } = useBackgroundMusic()

  // Array de imágenes en orden (archivo final al inicio)
  const tortugaImages = [
    tortugaFinal, tortuga1, tortuga2, tortuga3, tortuga4, 
    tortuga5, tortuga6, tortuga7, tortuga8, tortuga9
  ]

  // Array de audios correspondientes a cada página
  const tortugaAudios = [
    unoCuento4Audio,  // Página 0 (presentación) → uno_cuento4.m4a
    dosCuento4Audio,  // Página 1 → dos_cuento4.m4a
    tresCuento4Audio,  // Página 2 → tres_cuento4.m4a
    cuatroCuento4Audio,  // Página 3 → cuatro_cuento4.m4a
    cincoCuento4Audio,  // Página 4 → cinco_cuento4.m4a
    seisCuento4Audio,  // Página 5 → seis_cuento4.m4a
    sieteCuento4Audio,  // Página 6 → siete_cuento4.m4a
    ochoCuento4Audio,  // Página 7 → ocho_cuento4.m4a
    nueveCuento4Audio,  // Página 8 → nueve_cuento4.m4a
    diezCuento4Audio  // Página 9 → diez_cuento4.m4a
  ]

  // Efecto para manejar la reproducción de audio y cambio automático
  useEffect(() => {
    // Bajar el volumen de la música de fondo a casi nada (solo en la primera carga)
    if (currentImage === 0) {
      setVolume(0.02) // 2% de volumen - casi inaudible (igual que en juegos)
    }

    // Obtener el audio correspondiente a la página actual
    const audioSrc = tortugaAudios[currentImage]
    if (audioSrc) {
      const audio = new Audio(audioSrc)
      audio.play().catch(error => {
        console.error('Error reproduciendo audio:', error)
        // Si hay error, cambiar después de 3 segundos
        setTimeout(() => {
          if (currentImage < tortugaImages.length - 1) {
            setCurrentImage(currentImage + 1)
          } else {
            navigate('/stories')
          }
        }, 3000)
      })

      audio.addEventListener('ended', () => {
        if (currentImage < tortugaImages.length - 1) {
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
        if (currentImage < tortugaImages.length - 1) {
          setCurrentImage(currentImage + 1)
        } else {
          navigate('/stories')
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentImage, navigate, tortugaAudios, setVolume])

  // Cleanup para restaurar volumen al salir
  useEffect(() => {
    return () => {
      setVolume(0.05) // Restaurar al volumen normal bajo
    }
  }, [setVolume])

  // Función para manejar navegación manual (resetear timer)
  const handleNext = () => {
    if (currentImage < tortugaImages.length - 1) {
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
        backgroundImage: `url(${tortugaImages[currentImage]})`,
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
        disabled={currentImage === tortugaImages.length - 1}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: currentImage === tortugaImages.length - 1 ? 'rgba(200, 200, 200, 0.7)' : 'rgba(255, 255, 255, 0.9)',
          color: currentImage === tortugaImages.length - 1 ? '#999' : '#333',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          fontWeight: 'bold',
          cursor: currentImage === tortugaImages.length - 1 ? 'not-allowed' : 'pointer',
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

export default TortugaSabiaPage
