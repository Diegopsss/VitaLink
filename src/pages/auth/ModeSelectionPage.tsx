import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBackgroundMusic } from '../../contexts/BackgroundMusicContext'
import fondoGeneral from '../../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import palabrasButton from '../../assets/Images/Buttons/palabras_button.png'
import juegosButton from '../../assets/Images/Buttons/juegos_button.png'
import cuentosButton from '../../assets/Images/Buttons/cuentos_button.png'
import MenuTab from '../../components/MenuTab'
import diapositiva7Audio from '../../assets/Audios/presentacion/mode-selection/diapositiva 7_ presentación.m4a'
import juegosAudio from '../../assets/Audios/presentacion/mode-selection/juegos_presentación.m4a'
import palabrasAudio from '../../assets/Audios/presentacion/mode-selection/palabras_presentación.m4a'
import cuentosAudio from '../../assets/Audios/presentacion/mode-selection/cuentos_presentación.m4a'
import '../../styles/App.css'

function ModeSelectionPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  
  // Acceder a la música de fondo global
  useBackgroundMusic()

  // Reproducir audio 'diapositiva 7' al cargar la página
  useEffect(() => {
    const audio = new Audio(diapositiva7Audio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio diapositiva 7:', error)
    })
  }, [])

  // Función para reproducir audio de juegos
  const handleJuegosClick = (e) => {
    e.preventDefault()
    const audio = new Audio(juegosAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio juegos:', error)
    })
    audio.addEventListener('ended', () => {
      navigate('/games')
    })
  }

  // Función para reproducir audio de cuentos
  const handleCuentosClick = (e) => {
    e.preventDefault()
    const audio = new Audio(cuentosAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio cuentos:', error)
    })
    audio.addEventListener('ended', () => {
      navigate('/stories')
    })
  }

  // Función para reproducir audio de palabras
  const handlePalabrasClick = (e) => {
    e.preventDefault()
    const audio = new Audio(palabrasAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio palabras:', error)
    })
    audio.addEventListener('ended', () => {
      navigate('/words')
    })
  }
  return (
    <div
      style={{
        backgroundImage: `url(${fondoGeneral})`,
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

      {/* Contenido principal - placeholder para selección de modos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '180px',
          left: '80px',
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          zIndex: 1,
        }}
      >
          <Link to="/words" style={{ display: 'block', cursor: 'pointer' }} onClick={handlePalabrasClick}>
            <img
              src={palabrasButton}
              alt="Palabras"
              style={{
                width: '280px',
                height: 'auto',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
          
          <Link to="/games" style={{ display: 'block', cursor: 'pointer' }} onClick={handleJuegosClick}>
            <img
              src={juegosButton}
              alt="Juegos"
              style={{
                width: '280px',
                height: 'auto',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
          
          <Link to="/stories" style={{ display: 'block', cursor: 'pointer' }} onClick={handleCuentosClick}>
            <img
              src={cuentosButton}
              alt="Cuentos"
              style={{
                width: '280px',
                height: 'auto',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
      </motion.div>
      
      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default ModeSelectionPage
