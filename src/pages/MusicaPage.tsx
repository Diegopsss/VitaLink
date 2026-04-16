import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import baseAprender from '../assets/Images/Backgrounds/base_aprender.svg'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import dialogoMusica from '../assets/Images/Texts/dialogo_musica.png'
import aplauso from '../assets/Images/iconos_musica/aplauso.png'
import guitarra from '../assets/Images/iconos_musica/guitarra.png'
import maracas from '../assets/Images/iconos_musica/maracas.png'
import tambor from '../assets/Images/iconos_musica/tambor.png'
import trompeta from '../assets/Images/iconos_musica/trompeta.png'
import MenuTab from '../components/MenuTab'

function MusicaPage() {
  const [currentView, setCurrentView] = useState<'initial' | 'musicElements'>('initial')
  const [clickedMusic, setClickedMusic] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentView('musicElements')
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (clickedMusic) {
      const timer = setTimeout(() => {
        setClickedMusic(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [clickedMusic])

  // Posiciones aleatorias para los elementos de música
  const musicPositions = [
    { top: '0px', left: '200px' },
    { top: '280px', left: '650px' },
    { top: '250px', left: '100px' },
    { top: '320px', left: '350px' },
    { top: '0px', left: '520px' }
  ]

  const musicElements = [
    { name: 'Aplauso', image: aplauso },
    { name: 'Guitarra', image: guitarra },
    { name: 'Maracas', image: maracas },
    { name: 'Tambor', image: tambor },
    { name: 'Trompeta', image: trompeta }
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

      {/* Diálogo música - solo en vista inicial */}
      {currentView === 'initial' && (
        <motion.img
          src={dialogoMusica}
          alt="Diálogo Música"
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

      {/* Elementos de música - solo en vista de música */}
      {currentView === 'musicElements' && (
        <>
          {musicElements.map((element, index) => (
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
                top: musicPositions[index].top,
                left: musicPositions[index].left,
                cursor: 'pointer',
                zIndex: 1,
              }}
              onClick={() => setClickedMusic(element.name)}
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
                animate={clickedMusic === element.name ? {
                  x: [0, -4, 4, -4, 0],
                  y: [0, -2, 2, -2, 0],
                  rotate: [0, -2, 2, -2, 0],
                } : {}}
                transition={{
                  duration: 1.2,
                  repeat: clickedMusic === element.name ? Infinity : 0,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                style={{
                  width: '280px',
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

export default MusicaPage
