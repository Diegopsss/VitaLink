import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import baseAprender from '../assets/Images/Backgrounds/base_aprender.svg'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import dialogoAnimales from '../assets/Images/Texts/dialogo_animales.png'
import caballo from '../assets/Images/Buttons/caballo.png'
import gallo from '../assets/Images/Buttons/gallo.png'
import gato from '../assets/Images/Buttons/gato.png'
import oveja from '../assets/Images/Buttons/oveja.png'
import perro from '../assets/Images/Buttons/perro.png'
import vaca from '../assets/Images/Buttons/vaca.png'
import MenuTab from '../components/MenuTab'

function AnimalesPage() {
  const [currentView, setCurrentView] = useState<'initial' | 'animalButtons'>('initial')
  const [clickedAnimal, setClickedAnimal] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentView('animalButtons')
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (clickedAnimal) {
      const timer = setTimeout(() => {
        setClickedAnimal(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [clickedAnimal])

  // Posiciones aleatorias para los animales
  const animalPositions = [
    { top: '20px', left: '100px' },
    { top: '180px', left: '400px' },
    { top: '0px', left: '500px' },
    { top: '100px', left: '700px' },
    { top: '300px', left: '600px' },
    { top: '300px', left: '65px' }
  ]

  const animals = [
    { name: 'Caballo', image: caballo },
    { name: 'Gallo', image: gallo },
    { name: 'Gato', image: gato },
    { name: 'Oveja', image: oveja },
    { name: 'Perro', image: perro },
    { name: 'Vaca', image: vaca }
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

      {/* Diálogo animales - solo en vista inicial */}
      {currentView === 'initial' && (
        <motion.img
          src={dialogoAnimales}
          alt="Diálogo Animales"
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

      {/* Botones de animales - solo en vista de botones */}
      {currentView === 'animalButtons' && (
        <>
          {animals.map((animal, index) => (
            <motion.div
              key={animal.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.2 + (index * 0.15), 
                duration: 0.6, 
                ease: 'easeOut' 
              }}
              style={{
                position: 'absolute',
                top: animalPositions[index].top,
                left: animalPositions[index].left,
                cursor: 'pointer',
                zIndex: 1,
              }}
              onClick={() => setClickedAnimal(animal.name)}
            >
              <motion.img
                src={animal.image}
                alt={animal.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ 
                  scale: [1, 0.9, 1.2, 1],
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.6 }
                }}
                animate={clickedAnimal === animal.name ? {
                  x: [0, -4, 4, -4, 0],
                  y: [0, -2, 2, -2, 0],
                  rotate: [0, -2, 2, -2, 0],
                } : {}}
                transition={{
                  duration: 1.2,
                  repeat: clickedAnimal === animal.name ? Infinity : 0,
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

export default AnimalesPage
