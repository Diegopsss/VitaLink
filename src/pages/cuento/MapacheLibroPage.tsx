import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../../assets/Images/Buttons/return_button.png'
import MenuTab from '../../components/MenuTab'
import { useBackgroundMusic } from '../../contexts/BackgroundMusicContext'
import '../../styles/App.css'

// Importar todos los audios del cuento 3 enumerados
import unoCuento3Audio from '../../assets/Audios/cuentos/cuento 3/uno_cuento 3.m4a'
import dosCuento3Audio from '../../assets/Audios/cuentos/cuento 3/dos_cuento 3.m4a'
import tresCuento3Audio from '../../assets/Audios/cuentos/cuento 3/tres_cuento 3.m4a'
import cuatroCuento3Audio from '../../assets/Audios/cuentos/cuento 3/cuatro_cuento 3.m4a'
import cincoCuento3Audio from '../../assets/Audios/cuentos/cuento 3/cinco_cuento 3.m4a'
import seisCuento3Audio from '../../assets/Audios/cuentos/cuento 3/seis_cuento 3.m4a'
import sieteCuento3Audio from '../../assets/Audios/cuentos/cuento 3/siete_cuento 3.m4a'
import ochoCuento3Audio from '../../assets/Audios/cuentos/cuento 3/ocho_cuento 3.m4a'
import nueveCuento3Audio from '../../assets/Audios/cuentos/cuento 3/nueve_cuento 3.m4a'
import diezCuento3Audio from '../../assets/Audios/cuentos/cuento 3/diez_cuento 3.m4a'
import onceCuento3Audio from '../../assets/Audios/cuentos/cuento 3/once_cuento 3.m4a'

// Importar imágenes del mapache y su libro mágico en orden
import mapache1 from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/map_1.svg'
import mapache2 from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/map_2.svg'
import mapache3 from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/map_3.svg'
import mapache4 from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/map_4.svg'
import mapache5 from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/map_5.svg'
import mapache6 from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/map_6.svg'
import mapache7 from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/map_7.svg'
import mapache8 from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/map_8.svg'
import mapache9 from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/map_9.svg'
import mapache10 from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/map_10.svg'
import mapacheFinal from '../../assets/Images/paginas_cuentos/el_mapache_y_su_libro_magico/mapache_y_libro_magico.svg'

function MapacheLibroPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate()
  
  // Acceder a la música de fondo global y controlar volumen
  const { setVolume } = useBackgroundMusic()

  // Array de imágenes en orden (archivo final al inicio)
  const mapacheImages = [
    mapacheFinal, mapache1, mapache2, mapache3, mapache4, 
    mapache5, mapache6, mapache7, mapache8, mapache9, mapache10
  ]

  // Array de audios correspondientes a cada página
  const mapacheAudios = [
    unoCuento3Audio,  // Página 0 (presentación) → uno_cuento3.m4a
    dosCuento3Audio,  // Página 1 → dos_cuento3.m4a
    tresCuento3Audio,  // Página 2 → tres_cuento3.m4a
    cuatroCuento3Audio,  // Página 3 → cuatro_cuento3.m4a
    cincoCuento3Audio,  // Página 4 → cinco_cuento3.m4a
    seisCuento3Audio,  // Página 5 → seis_cuento3.m4a
    sieteCuento3Audio,  // Página 6 → siete_cuento3.m4a
    ochoCuento3Audio,  // Página 7 → ocho_cuento3.m4a
    nueveCuento3Audio,  // Página 8 → nueve_cuento3.m4a
    diezCuento3Audio,  // Página 9 → diez_cuento3.m4a
    onceCuento3Audio   // Página 10 → once_cuento3.m4a
  ]

  // Efecto para manejar la reproducción de audio y cambio automático
  useEffect(() => {
    // Bajar el volumen de la música de fondo a casi nada (solo en la primera carga)
    if (currentImage === 0) {
      setVolume(0.02) // 2% de volumen - casi inaudible (igual que en juegos)
    }

    // Obtener el audio correspondiente a la página actual
    const audioSrc = mapacheAudios[currentImage]
    if (audioSrc) {
      const audio = new Audio(audioSrc)
      audio.play().catch(error => {
        console.error('Error reproduciendo audio:', error)
        // Si hay error, cambiar después de 3 segundos
        setTimeout(() => {
          if (currentImage < mapacheImages.length - 1) {
            setCurrentImage(currentImage + 1)
          } else {
            navigate('/stories')
          }
        }, 3000)
      })

      audio.addEventListener('ended', () => {
        if (currentImage < mapacheImages.length - 1) {
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
        if (currentImage < mapacheImages.length - 1) {
          setCurrentImage(currentImage + 1)
        } else {
          navigate('/stories')
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentImage, navigate, mapacheAudios, setVolume])

  // Cleanup para restaurar volumen al salir
  useEffect(() => {
    return () => {
      setVolume(0.05) // Restaurar al volumen normal bajo
    }
  }, [setVolume])

  // Función para manejar navegación manual (resetear timer)
  const handleNext = () => {
    if (currentImage < mapacheImages.length - 1) {
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
        backgroundImage: `url(${mapacheImages[currentImage]})`,
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
        disabled={currentImage === mapacheImages.length - 1}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: currentImage === mapacheImages.length - 1 ? 'rgba(200, 200, 200, 0.7)' : 'rgba(255, 255, 255, 0.9)',
          color: currentImage === mapacheImages.length - 1 ? '#999' : '#333',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          fontWeight: 'bold',
          cursor: currentImage === mapacheImages.length - 1 ? 'not-allowed' : 'pointer',
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

export default MapacheLibroPage
