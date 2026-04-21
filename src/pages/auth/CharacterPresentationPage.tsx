import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getMasterVolume } from '../../services/audioVolume'
import fondoPagina56 from '../../assets/Images/Backgrounds/pagina_5,6.svg'
import texto51Globo from '../../assets/Images/Texts/texto_5_1_globo.png'
import texto52Globo from '../../assets/Images/Texts/texto_5_2_globo.png'
import texto6Globo from '../../assets/Images/Texts/texto_6_globo.png'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import continueButton from '../../assets/Images/Buttons/continue_button.png'
import MenuTab from '../../components/MenuTab'
import holaNuevoAmigoAudio from '../../assets/Audios/presentacion/character-presentation/Hola nuevo amigo_presentación.m4a'
import comencemosAudio from '../../assets/Audios/presentacion/character-presentation/comencemos_presentación.m4a'
import '../../styles/App.css'

function CharacterPresentationPage() {
  const [currentText, setCurrentText] = useState<'initial' | 'transition' | 'final'>('initial')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Reproducir primer audio "hola nuevo amigo" al cargar
    const audio1 = new Audio(holaNuevoAmigoAudio)
    audio1.volume = getMasterVolume()
    audio1.play().catch(error => {
      console.log('Error reproduciendo audio hola nuevo amigo:', error)
    })

    // Esperar a que termine el primer audio antes de cambiar el texto
    const handleFirstAudioEnd = () => {
      setCurrentText('transition')
      
      // Reproducir segundo audio "comencemos" inmediatamente
      const audio2 = new Audio(comencemosAudio)
      audio2.volume = getMasterVolume()
      audio2.play().catch(error => {
        console.log('Error reproduciendo audio comencemos:', error)
      })
      
      // Después de la transición, mostrar el texto final
      setTimeout(() => {
        setCurrentText('final')
      }, 1000)
    }

    // Agregar event listener para cuando termine el primer audio
    audio1.addEventListener('ended', handleFirstAudioEnd)

    return () => {
      audio1.removeEventListener('ended', handleFirstAudioEnd)
    }
  }, [])

  return (
    <div
      style={{
        backgroundImage: `url(${fondoPagina56})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
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
      {/* Texto 5_1_globo - entra por la izquierda */}
      {currentText === 'initial' && (
        <motion.img
          src={texto51Globo}
          alt="Texto 5.1"
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          exit={{ x: -500, opacity: 0, transition: { duration: 1 } }}
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '50px',
            width: '800px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Texto 5_2_globo - entra por la derecha */}
      {currentText === 'initial' && (
        <motion.img
          src={texto52Globo}
          alt="Texto 5.2"
          initial={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          exit={{ x: 500, opacity: 0, transition: { duration: 1 } }}
          style={{
            position: 'absolute',
            bottom: '100px',
            right: '50px',
            width: '830px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Texto 6_globo - aparece después de la transición */}
      {currentText === 'final' && (
        <motion.img
          src={texto6Globo}
          alt="Texto 6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: '140px',
            left: '130px',
            transform: 'translateX(-50%)',
            width: '800px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Botón continuar abajo a la derecha */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7, duration: 1, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '20px',
          zIndex: 1,
        }}
      >
        <Link to="/mode-selection" style={{ display: 'block', cursor: 'pointer' }}>
          <img
            src={continueButton}
            alt="Continuar"
            style={{
              width: '140px',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        </Link>
      </motion.div>
      
      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default CharacterPresentationPage
