import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import baseAprender from '../assets/Images/Backgrounds/base_aprender.svg'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import dialogoTransportes from '../assets/Images/Texts/dialogo_transportes.png'
import ambulancia from '../assets/Images/iconos_transportes/ambulancia.png'
import avion from '../assets/Images/iconos_transportes/avion.png'
import carro from '../assets/Images/iconos_transportes/carro.png'
import tren from '../assets/Images/iconos_transportes/tren.png'
import MenuTab from '../components/MenuTab'

function TransportePage() {
  const [currentView, setCurrentView] = useState<'initial' | 'transportElements'>('initial')
  const [clickedTransport, setClickedTransport] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentView('transportElements')
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (clickedTransport) {
      const timer = setTimeout(() => {
        setClickedTransport(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [clickedTransport])

  // Posiciones para elementos de transporte
  // Terrestres tocando el césped (bottom de la pantalla)
  // Avión volando (arriba)
  const transportPositions = [
    { top: '250px', left: '0px' },  // Ambulancia - terrestre
    { top: '-80px', left: '200px' },   // Avión - volando
    { top: '300px', left: '600px' },  // Carro - terrestre
    { top: '158px', left: '350px' }   // Tren - terrestre
  ]

  const transportElements = [
    { name: 'Ambulancia', image: ambulancia },
    { name: 'Avion', image: avion },
    { name: 'Carro', image: carro },
    { name: 'Tren', image: tren }
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

      {/* Diálogo transporte - solo en vista inicial */}
      {currentView === 'initial' && (
        <motion.img
          src={dialogoTransportes}
          alt="Diálogo Transportes"
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

      {/* Elementos de transporte - solo en vista de transporte */}
      {currentView === 'transportElements' && (
        <>
          {transportElements.map((element, index) => (
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
                top: transportPositions[index].top,
                left: transportPositions[index].left,
                cursor: 'pointer',
                zIndex: 1,
              }}
              onClick={() => setClickedTransport(element.name)}
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
                animate={clickedTransport === element.name ? {
                  x: [0, -4, 4, -4, 0],
                  y: [0, -2, 2, -2, 0],
                  rotate: [0, -2, 2, -2, 0],
                } : {}}
                transition={{
                  duration: 1.2,
                  repeat: clickedTransport === element.name ? Infinity : 0,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                style={{
                  width: element.name === 'Avion' ? '350px' : element.name === 'Tren' ? '300px' : '400px',
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

export default TransportePage
