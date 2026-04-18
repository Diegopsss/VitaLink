import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../../assets/Images/Buttons/return_button.png'
import MenuTab from '../../components/MenuTab'
import '../../styles/App.css'

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

function MapacheLibroPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate()

  // Array de imágenes en orden (menor a mayor)
  const mapacheImages = [
    mapache1, mapache2, mapache3, mapache4, mapache5,
    mapache6, mapache7, mapache8, mapache9, mapache10
  ]

  // Timer para cambio automático después de 20 segundos de inactividad
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentImage < mapacheImages.length - 1) {
        setCurrentImage(currentImage + 1)
      } else {
        // Si está en la última imagen, redirigir a selección de cuentos
        navigate('/stories')
      }
    }, 20000) // 20 segundos

    return () => clearTimeout(timer)
  }, [currentImage, navigate])

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
