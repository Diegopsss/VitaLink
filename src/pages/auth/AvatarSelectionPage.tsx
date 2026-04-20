import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import fondoGeneral from '../../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import avatares from '../../assets/Images/Buttons/avatares.png'
import MenuTab from '../../components/MenuTab'
import avatarSelectionAudio from '../../assets/Audios/presentacion/avatar-selection/elije tu personaje_presentacion.m4a'
import '../../styles/App.css'

function AvatarSelectionPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleAvatarClick = () => {
    navigate('/login')
  }

  // Efecto para reproducir audio al cargar la página
  useEffect(() => {
    const audio = new Audio(avatarSelectionAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio avatar selection:', error)
    })
  }, [])
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

      {/* Texto central arriba */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '30px',
          left: '255px',
          transform: 'translateX(-50%)',
          fontSize: '60px',
          fontWeight: '700',
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        Elige tu personaje
      </motion.h1>

      {/* Imagen de avatares que lleva a login */}
      <motion.div
        initial={{ opacity: 0, scale: .9}}
        animate={{ opacity: 1, scale: 1.2 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '200px',
          left: '200px',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      >
        <div onClick={handleAvatarClick} style={{ display: 'block', cursor: 'pointer' }}>
          <img
            src={avatares}
            alt="Seleccionar Avatar"
            style={{
              width: '600px',
              maxWidth: '90vw',
              display: 'block',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          />
        </div>
      </motion.div>
      
      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default AvatarSelectionPage
