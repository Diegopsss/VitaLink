import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import baseAprender from '../assets/Images/Backgrounds/base_aprender.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import dialogoComida from '../assets/Images/Texts/dialogo_comida.png'
import plato from '../assets/Images/comida_iconos/plato.png'
import paltano from '../assets/Images/comida_iconos/paltano.png'
import galleta from '../assets/Images/comida_iconos/galleta.png'
import manzana from '../assets/Images/comida_iconos/manzana.png'
import vaso from '../assets/Images/comida_iconos/vaso.png'
import biberon from '../assets/Images/comida_iconos/biberon.png'
import MenuTab from '../components/MenuTab'

function ComidaPage() {
  const [currentView, setCurrentView] = useState<'initial' | 'foodDisplay'>('initial')
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentView('foodDisplay')
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (clickedItem) {
      const timer = setTimeout(() => {
        setClickedItem(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [clickedItem])

  
  
  return (
    <div
      style={{
        backgroundImage: currentView === 'initial' ? `url(${baseAprender})` : 'none',
        backgroundColor: currentView === 'foodDisplay' ? '#7CB342' : 'transparent',
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
        transition: 'background-color 1s ease-in-out',
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

      {/* Diálogo comida - solo en vista inicial */}
      {currentView === 'initial' && (
        <motion.img
          src={dialogoComida}
          alt="Diálogo Comida"
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

      {/* Plato y comida - solo en vista de comida */}
      {currentView === 'foodDisplay' && (
        <>
          {/* Plato */}
          <motion.img
            src={plato}
            alt="Plato"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '362px',
              width: '300px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Comida dentro del plato - Paltano */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '300px',
              left: '490px',
              width: '100px',
              height: '100px',
              cursor: 'pointer',
              zIndex: 2,
            }}
            onClick={() => setClickedItem('Paltano')}
          >
            <motion.img
              src={paltano}
              alt="Paltano"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedItem === 'Paltano' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedItem === 'Paltano' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{
                width: '250px',
                height: 'auto',
                position: 'absolute',
                top: '-75px',
                left: '-75px',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Comida dentro del plato - Galleta */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '180px',
              left: '500px',
              width: '100px',
              height: '100px',
              cursor: 'pointer',
              zIndex: 2,
            }}
            onClick={() => setClickedItem('Galleta')}
          >
            <motion.img
              src={galleta}
              alt="Galleta"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedItem === 'Galleta' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedItem === 'Galleta' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{
                width: '250px',
                height: 'auto',
                position: 'absolute',
                top: '-75px',
                left: '-75px',  
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Comida dentro del plato - Manzana */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '250px',
              left: '390px',
              width: '100px',
              height: '100px',
              cursor: 'pointer',
              zIndex: 2,
            }}
            onClick={() => setClickedItem('Manzana')}
          >
            <motion.img
              src={manzana}
              alt="Manzana"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedItem === 'Manzana' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedItem === 'Manzana' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{
                width: '250px',
                height: 'auto',
                position: 'absolute',
                top: '-75px',
                left: '-75px',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Vaso - lado izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '0px',
              cursor: 'pointer',
              zIndex: 2,
            }}
            onClick={() => setClickedItem('Vaso')}
          >
            <motion.img
              src={vaso}
              alt="Vaso"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedItem === 'Vaso' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedItem === 'Vaso' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{
                width: '350px',
                height: 'auto',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Biberon - lado derecho */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0, duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '670px',
              cursor: 'pointer',
              zIndex: 2,
            }}
            onClick={() => setClickedItem('Biberon')}
          >
            <motion.img
              src={biberon}
              alt="Biberon"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedItem === 'Biberon' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedItem === 'Biberon' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{
                width: '350px',
                height: 'auto',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </>
      )}
      
      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default ComidaPage
