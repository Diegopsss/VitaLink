import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getMasterVolume } from '../services/audioVolume'
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
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import fraseDiapositiva18Audio from '../assets/Audios/palabras/comida/frase_ diapositiva 18.m4a'
import fraseDiapositiva19Audio from '../assets/Audios/palabras/comida/frase_diapositiva 19.m4a'
import aguaAudio from '../assets/Audios/palabras/comida/agua_comida.m4a'
import galletaAudio from '../assets/Audios/palabras/comida/galleta_comida.m4a'
import lecheAudio from '../assets/Audios/palabras/comida/leche_comida.m4a'
import manzanaAudio from '../assets/Audios/palabras/comida/manzana_comida.m4a'
import platanoAudio from '../assets/Audios/palabras/comida/plátano_comida.m4a'

function ComidaPage() {
  const [currentView, setCurrentView] = useState<'initial' | 'emptyPlate' | 'foodDisplay'>('initial')
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Acceder a la música de fondo y bajar el volumen para esta página
  const { setVolume } = useBackgroundMusic()
  
  useEffect(() => {
    // Bajar el volumen de la música de fondo a 10% para no interferir con audios principales
    setVolume(0.1)
    
    // Cleanup: restaurar volumen al salir de la página
    return () => {
      setVolume(0.25) // Volumen normal
    }
  }, [setVolume])

  // Funciones para reproducir audios específicos de comida
  const handleFoodClick = (foodName: string) => {
    let audioFile: string
    
    switch (foodName) {
      case 'Plátano':
        audioFile = platanoAudio
        break
      case 'Galleta':
        audioFile = galletaAudio
        break
      case 'Manzana':
        audioFile = manzanaAudio
        break
      case 'Agua':
        audioFile = aguaAudio
        break
      case 'Leche':
        audioFile = lecheAudio
        break
      default:
        return
    }
    
    const audio = new Audio(audioFile)
    audio.volume = getMasterVolume()
    audio.play().catch(error => {
      console.log(`Error reproduciendo audio ${foodName}:`, error)
    })
  }

  useEffect(() => {
    // Esperar 1 segundo para reducir el tiempo de espera
    setTimeout(() => {
      // Reproducir audio 'frase_diapositiva 18' antes del cambio de página
      const audio1 = new Audio(fraseDiapositiva18Audio)
      audio1.volume = getMasterVolume()
      audio1.play().catch(error => {
        console.log('Error reproduciendo audio frase diapositiva 18:', error)
      })
      
      // Cambiar a vista de plato vacío cuando termine el audio 18
      audio1.addEventListener('ended', () => {
        setCurrentView('emptyPlate')
        
        // Reproducir audio 'frase_diapositiva 19' con el plato vacío
        const audio2 = new Audio(fraseDiapositiva19Audio)
        audio2.volume = getMasterVolume()
        audio2.play().catch(error => {
          console.log('Error reproduciendo audio frase diapositiva 19:', error)
        })
        
        // Mostrar comida cuando termine el audio 19
        audio2.addEventListener('ended', () => {
          setCurrentView('foodDisplay')
        })
      })

      return () => {
        audio1.removeEventListener('ended', () => {})
      }
    }, 1000) // Reducir a 1 segundo

    return () => {}
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
        backgroundColor: (currentView === 'emptyPlate' || currentView === 'foodDisplay') ? '#7CB342' : 'transparent',
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

      {/* Plato vacío - solo en vista de plato vacío */}
      {currentView === 'emptyPlate' && (
        <motion.img
          src={plato}
          alt="Plato Vacío"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '150px',
            left: '362px',
            width: '300px',
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
            onClick={() => {
              setClickedItem('Paltano')
              handleFoodClick('Plátano')
            }}
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
            onClick={() => {
              setClickedItem('Galleta')
              handleFoodClick('Galleta')
            }}
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
            onClick={() => {
              setClickedItem('Manzana')
              handleFoodClick('Manzana')
            }}
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
            onClick={() => {
              setClickedItem('Vaso')
              handleFoodClick('Agua')
            }}
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
            onClick={() => {
              setClickedItem('Biberon')
              handleFoodClick('Leche')
            }}
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
