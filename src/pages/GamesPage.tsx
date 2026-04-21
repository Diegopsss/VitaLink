import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMasterVolume } from '../services/audioVolume'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import inicioJuegos from '../assets/Images/Backgrounds/inicio_juegos.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import memoriaIcon from '../assets/Images/juegos_iconos/memorama.png'
import secuenciaIcon from '../assets/Images/juegos_iconos/recuerda_secuencia.png'
import coloresIcon from '../assets/Images/juegos_iconos/separa_colores.png'
import rutaIcon from '../assets/Images/juegos_iconos/ruta_magica_selection.png'
import MenuTab from '../components/MenuTab'
import fraseInterfazJuegosAudio from '../assets/Audios/juegos/inicio juegos/frase interfaz_juegos.m4a'
import memoriaAudio from '../assets/Audios/juegos/inicio juegos/memorama título_juegos.m4a'
import coloresAudio from '../assets/Audios/juegos/inicio juegos/vasos título_juegos.m4a'
import rutaAudio from '../assets/Audios/juegos/inicio juegos/viaje carro título_juegos.m4a'
import secuenciaAudio from '../assets/Audios/juegos/inicio juegos/colores título_juegos.m4a'
import '../styles/App.css'

function GamesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  
  // Acceder a la música de fondo global
  useBackgroundMusic()

  // Reproducir audio 'frase interfaz_juegos' al cargar la página
  useEffect(() => {
    const audio = new Audio(fraseInterfazJuegosAudio)
    audio.volume = getMasterVolume()
    audio.play().catch(error => {
      console.log('Error reproduciendo audio frase interfaz_juegos:', error)
    })
  }, [])

  // Datos de los 4 juegos posibles
  const games = [
    {
      id: 1,
      title: 'Encuentra la pareja',
      color: '#3065c9',
      icon: memoriaIcon,
      route: '/memory-game',
      audio: memoriaAudio
    },
    {
      id: 2,
      title: 'Colores a su lugar',
      color: '#3065c9',
      icon: coloresIcon,
      route: '/cup-balls',
      audio: coloresAudio
    },
    {
      id: 3,
      title: 'Viaje a toda velocidad',
      color: '#3065c9',
      icon: rutaIcon,
      route: '/car-game',
      audio: rutaAudio
    },
    {
      id: 4,
      title: 'Secuencia de colores',
      color: '#3065c9',
      icon: secuenciaIcon,
      route: '/colors-game',
      audio: secuenciaAudio
    }
  ]

  const handleGameClick = (route: string, audioFile?: string) => {
    if (audioFile) {
      const audio = new Audio(audioFile)
      audio.volume = getMasterVolume()
      audio.play().catch(error => {
        console.log('Error reproduciendo audio:', error)
      })
      audio.addEventListener('ended', () => {
        navigate(route)
      })
    } else {
      navigate(route)
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${inicioJuegos})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
        <div onClick={() => navigate('/mode-selection')} style={{ display: 'block', cursor: 'pointer' }}>
          <img
            src={returnButton}
            alt="Regresar"
            style={{
              width: '95px',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        </div>
      </motion.div>

      {/* Contenedor de juegos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '40px',
          padding: '20px',
          maxWidth: '800px',
          width: '100%',
          marginLeft: '50px',
          marginTop: '-15px',
        }}
      >
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.2, 
              duration: 0.6, 
              ease: 'easeOut' 
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGameClick(game.route, game.audio)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.1, duration: 0.5 }}
              src={game.icon}
              alt={game.title}
              style={{
                width: '240px',
                height: '240px',
                filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              style={{
                background: 'rgba(174, 237, 248, 0.95)',
                borderRadius: '12px',
                padding: '12px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(200, 200, 200, 0.3)',
                backdropFilter: 'blur(5px)',
                marginTop: '-10px',
                minWidth: '200px',
                textAlign: 'center',
              }}
            >
              <motion.h3
                style={{
                  color: '#333333',
                  fontSize: '14px',
                  fontWeight: '500',
                  textAlign: 'center',
                  margin: 0,
                  letterSpacing: '0.5px',
                  textTransform: 'capitalize',
                  lineHeight: '1.2',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {game.title}
              </motion.h3>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default GamesPage
