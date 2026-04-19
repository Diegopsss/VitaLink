import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import seleccionAnimales from '../assets/Images/Iconos_palabras/seleccion_animales.png'
import seleccionColores from '../assets/Images/Iconos_palabras/seleccion_colores.png'
import seleccionComida from '../assets/Images/Iconos_palabras/seleccion_comida.png'
import seleccionMusica from '../assets/Images/Iconos_palabras/seleccion_musica.png'
import seleccionPersonas from '../assets/Images/Iconos_palabras/seleccion_personas.png'
import seleccionTransporte from '../assets/Images/Iconos_palabras/seleccion_transporte.png'
import MenuTab from '../components/MenuTab'
import frasePalabrasAudio from '../assets/Audios/palabras/words/frase_palabras diapositiva 8.m4a'
import animalesAudio from '../assets/Audios/palabras/words/animales_diapositiva 8.m4a'
import coloresAudio from '../assets/Audios/palabras/words/colores_diapositiva 8.m4a'
import comidaAudio from '../assets/Audios/palabras/words/comida_diapositiva 8.m4a'
import familiaAudio from '../assets/Audios/palabras/words/familia_diapositiva 8.m4a'
import musicaAudio from '../assets/Audios/palabras/words/música_diapositiva 8.m4a'
import transporteAudio from '../assets/Audios/palabras/words/transporte_diapositiva 8.m4a'

function WordsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Reproducir audio 'frase_palabras' después de 0.5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      const audio = new Audio(frasePalabrasAudio)
      audio.play().catch(error => {
        console.log('Error reproduciendo audio frase palabras:', error)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Función para reproducir audio de animales
  const handleAnimalesClick = () => {
    const audio = new Audio(animalesAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio animales:', error)
    })
    navigate('/animales')
  }

  // Función para reproducir audio de colores
  const handleColoresClick = () => {
    const audio = new Audio(coloresAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio colores:', error)
    })
    navigate('/colores')
  }

  // Función para reproducir audio de comida
  const handleComidaClick = () => {
    const audio = new Audio(comidaAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio comida:', error)
    })
    navigate('/comida')
  }

  // Función para reproducir audio de música
  const handleMusicaClick = () => {
    const audio = new Audio(musicaAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio música:', error)
    })
    navigate('/musica')
  }

  // Función para reproducir audio de personas
  const handlePersonasClick = () => {
    const audio = new Audio(familiaAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio personas:', error)
    })
    navigate('/personas')
  }

  // Función para reproducir audio de transporte
  const handleTransporteClick = () => {
    const audio = new Audio(transporteAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio transporte:', error)
    })
    navigate('/transporte')
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

      {/* Contenedor principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '0px',
          padding: '0px',
          maxWidth: '800px',
          width: '100%',
          marginLeft: '-70px',
          zIndex: 1,
        }}
      >
        {/* Fila 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Link to="/animales" style={{ display: 'block' }} onClick={handleAnimalesClick}>
            <img
              src={seleccionAnimales}
              alt="Animales"
              style={{
                width: '300px',
                height: 'auto',
                transition: 'transform 0.2s',
                pointerEvents: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Link to="/colores" style={{ display: 'block' }} onClick={handleColoresClick}>
            <img
              src={seleccionColores}
              alt="Colores"
              style={{
                width: '300px',
                height: 'auto',
                transition: 'transform 0.2s',
                pointerEvents: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Link to="/comida" style={{ display: 'block' }} onClick={handleComidaClick}>
            <img
              src={seleccionComida}
              alt="Comida"
              style={{
                width: '300px',
                height: 'auto',
                transition: 'transform 0.2s',
                pointerEvents: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
        </motion.div>

        {/* Fila 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Link to="/musica" style={{ display: 'block' }} onClick={handleMusicaClick}>
            <img
              src={seleccionMusica}
              alt="Música"
              style={{
                width: '300px',
                height: 'auto',
                transition: 'transform 0.2s',
                pointerEvents: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Link to="/personas" style={{ display: 'block' }} onClick={handlePersonasClick}>
            <img
              src={seleccionPersonas}
              alt="Personas"
              style={{
                width: '300px',
                height: 'auto',
                transition: 'transform 0.2s',
                pointerEvents: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Link to="/transporte" style={{ display: 'block' }} onClick={handleTransporteClick}>
            <img
              src={seleccionTransporte}
              alt="Transporte"
              style={{
                width: '300px',
                height: 'auto',
                transition: 'transform 0.2s',
                pointerEvents: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* Botón de return/regreso debajo del menú */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '60px',
          left: '2px',
          zIndex: 1,
        }}
      >
        <Link to="/mode-selection" style={{ display: 'block', cursor: 'pointer' }}>
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
      
      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default WordsPage
