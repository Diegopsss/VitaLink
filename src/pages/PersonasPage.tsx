import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import baseAprender from '../assets/Images/Backgrounds/base_aprender.svg'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import dialogoPersonas from '../assets/Images/Texts/dialogo_personas.png'
import papa from '../assets/Images/iconos_personas/papa.png'
import mama from '../assets/Images/iconos_personas/mama.png'
import bebe from '../assets/Images/iconos_personas/bebe.png'
import abuelo from '../assets/Images/iconos_personas/abuelo.png'
import abuela from '../assets/Images/iconos_personas/abuela.png'
import MenuTab from '../components/MenuTab'

function PersonasPage() {
  const [currentView, setCurrentView] = useState<'initial' | 'parents' | 'baby' | 'grandparents' | 'family'>('initial')
  const [clickedPerson, setClickedPerson] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (currentView === 'initial') {
      const timer = setTimeout(() => {
        setCurrentView('parents')
      }, 2000)

      return () => clearTimeout(timer)
    } else if (currentView === 'parents') {
      const timer = setTimeout(() => {
        setCurrentView('baby')
      }, 2000)

      return () => clearTimeout(timer)
    } else if (currentView === 'baby') {
      const timer = setTimeout(() => {
        setCurrentView('grandparents')
      }, 2000)

      return () => clearTimeout(timer)
    } else if (currentView === 'grandparents') {
      const timer = setTimeout(() => {
        setCurrentView('family')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [currentView])

  useEffect(() => {
    if (clickedPerson) {
      const timer = setTimeout(() => {
        setClickedPerson(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [clickedPerson])

  return (
    <div
      style={{
        backgroundImage: currentView === 'initial' ? `url(${baseAprender})` : `url(${fondoGeneral})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '1024px',
        height: '600px',
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

      {/* Diálogo personas - solo en vista inicial */}
      {currentView === 'initial' && (
        <motion.img
          src={dialogoPersonas}
          alt="Diálogo Personas"
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

      {/* Papás - vista de padres */}
      {currentView === 'parents' && (
        <>
          {/* Papá */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '200px',
              left: '200px',
              width: '300px',
              height: '300px',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <motion.img
              src={papa}
              alt="Papá"
              whileHover={{ scale: 1.1 }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Mamá */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '200px',
              left: '550px',
              width: '300px',
              height: '300px',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <motion.img
              src={mama}
              alt="Mamá"
              whileHover={{ scale: 1.1 }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </>
      )}

      {/* Bebé - vista de bebé */}
      {currentView === 'baby' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '200px',
            left: '400px',
            width: '250px',
            height: '250px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          <motion.img
            src={bebe}
            alt="Bebé"
            whileHover={{ scale: 1.1 }}
            style={{ width: '100%', height: '100%' }}
          />
        </motion.div>
      )}

      {/* Abuelos - vista de abuelos */}
      {currentView === 'grandparents' && (
        <>
          {/* Abuelo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '200px',
              left: '250px',
              width: '250px',
              height: '250px',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <motion.img
              src={abuelo}
              alt="Abuelo"
              whileHover={{ scale: 1.1 }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Abuela */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '200px',
              left: '500px',
              width: '250px',
              height: '250px',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <motion.img
              src={abuela}
              alt="Abuela"
              whileHover={{ scale: 1.1 }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </>
      )}

      {/* Toda la familia - vista final */}
      {currentView === 'family' && (
        <>
          {/* Papá */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '800px',
              width: '200px',
              height: '200px',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => setClickedPerson('Papa')}
          >
            <motion.img
              src={papa}
              alt="Papá"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedPerson === 'Papa' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedPerson === 'Papa' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Mamá */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '600px',
              width: '200px',
              height: '200px',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => setClickedPerson('Mama')}
          >
            <motion.img
              src={mama}
              alt="Mamá"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedPerson === 'Mama' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedPerson === 'Mama' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Bebé */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '350px',
              left: '400px',
              width: '180px',
              height: '180px',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => setClickedPerson('Bebe')}
          >
            <motion.img
              src={bebe}
              alt="Bebé"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedPerson === 'Bebe' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedPerson === 'Bebe' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Abuelo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '50px',
              width: '200px',
              height: '200px',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => setClickedPerson('Abuelo')}
          >
            <motion.img
              src={abuelo}
              alt="Abuelo"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedPerson === 'Abuelo' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedPerson === 'Abuelo' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Abuela */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '200px',
              width: '200px',
              height: '200px',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => setClickedPerson('Abuela')}
          >
            <motion.img
              src={abuela}
              alt="Abuela"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedPerson === 'Abuela' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedPerson === 'Abuela' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </>
      )}
    {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default PersonasPage
