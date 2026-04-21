import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import cuentosInicio from '../assets/Images/Backgrounds/Fondos cuentos/cuentos_inicio.svg'
import fondoSeleccion from '../assets/Images/Backgrounds/Fondos cuentos/fondo_seleccion.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import MenuTab from '../components/MenuTab'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import '../styles/App.css'

// Importar audios de cuentos
import portadaCuentosAudio from '../assets/Audios/cuentos/portada_cuentos.m4a'
import cuentosInstruccionesAudio from '../assets/Audios/cuentos/cuentos instrucciones_cuentos.m4a'

// Importar iconos de cuentos
import conejoPerdido from '../assets/Images/paginas_cuentos/iconos_seleccion/el_conejo_perdido.png'
import ardillaHambrienta from '../assets/Images/paginas_cuentos/iconos_seleccion/la_ardilla_hambrienta.png'
import mapacheLibro from '../assets/Images/paginas_cuentos/iconos_seleccion/mapache_libro_magico.png'
import tortugaCuento from '../assets/Images/paginas_cuentos/iconos_seleccion/tortuga_cuento.png'
import zumoCuento from '../assets/Images/paginas_cuentos/iconos_seleccion/zumo_cuento.png'

function StoriesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSelection, setShowSelection] = useState(false)
  const navigate = useNavigate()
  
  // Acceder a la música de fondo global y controlar volumen
  const { setVolume } = useBackgroundMusic()

  // Datos de los cuentos
  const cuentos = [
    {
      id: 1,
      title: 'El Conejo Perdido',
      icon: conejoPerdido,
      route: '/cuento/conejo-perdido'
    },
    {
      id: 2,
      title: 'La Ardilla Hambrienta',
      icon: ardillaHambrienta,
      route: '/cuento/ardilla-hambrienta'
    },
    {
      id: 3,
      title: 'Mapache y el Libro Mágico',
      icon: mapacheLibro,
      route: '/cuento/mapache-libro'
    },
    {
      id: 4,
      title: 'La Tortuga y Día Lluvioso',
      icon: tortugaCuento,
      route: '/cuento/tortuga-dia-lluvioso'
    },
    {
      id: 5,
      title: 'Zumo y sus Amigos',
      icon: zumoCuento,
      route: '/cuento/zumo-amigos'
    }
  ]

  // Efecto para manejar la reproducción de audios y cambio de pantalla
  useEffect(() => {
    // Bajar el volumen de la música de fondo a casi nada
    setVolume(0.02) // 2% de volumen - casi inaudible (igual que en juegos)
    
    // Reproducir audio de portada cuentos inmediatamente al entrar
    const audio = new Audio(portadaCuentosAudio)
    audio.play().catch(error => {
      console.error('Error reproduciendo audio portada cuentos:', error)
    })

    // Timer para cambiar a selección y reproducir audio de instrucciones
    const timer = setTimeout(() => {
      setShowSelection(true)
      
      // Reproducir audio de cuentos instrucciones al cambiar a iconos
      const instruccionesAudio = new Audio(cuentosInstruccionesAudio)
      instruccionesAudio.play().catch(error => {
        console.error('Error reproduciendo audio cuentos instrucciones:', error)
      })
    }, 3000) // 3 segundos

    // Cleanup para detener audios y restaurar volumen al salir
    return () => {
      clearTimeout(timer)
      audio.pause()
      setVolume(0.05) // Restaurar al volumen normal bajo
    }
  }, [setVolume, portadaCuentosAudio, cuentosInstruccionesAudio])

  // Cleanup adicional para restaurar volumen al salir de la página
  useEffect(() => {
    return () => {
      setVolume(0.05) // Restaurar al volumen normal bajo
    }
  }, [setVolume])

  const handleCuentoClick = (route: string) => {
    navigate(route)
  }

  return (
    <div
      style={{
        backgroundImage: `url(${showSelection ? fondoSeleccion : cuentosInicio})`,
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

      {/* Pantalla de inicio - solo se muestra al principio */}
      {!showSelection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            textAlign: 'center',
          }}
        >
        </motion.div>
      )}

      {/* Pantalla de selección - aparece después de 3 segundos */}
      {showSelection && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px',
            padding: '20px',
            width: '100%',
            marginTop: '-20px',
          }}
        >
          {/* Fila superior - 2 iconos centrados */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '60px',
            }}
          >
            {cuentos.slice(0, 2).map((cuento, index) => (
              <motion.div
                key={cuento.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.6, 
                  ease: 'easeOut' 
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCuentoClick(cuento.route)}
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
                  src={cuento.icon}
                  alt={cuento.title}
                  style={{
                    width: '220px',
                    height: '220px',
                    filter: 'drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.3))',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Fila inferior - 3 iconos */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '50px',
            }}
          >
            {cuentos.slice(2, 5).map((cuento, index) => (
              <motion.div
                key={cuento.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: (index + 2) * 0.2, 
                  duration: 0.6, 
                  ease: 'easeOut' 
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCuentoClick(cuento.route)}
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
                  transition={{ delay: (index + 2) * 0.2 + 0.1, duration: 0.5 }}
                  src={cuento.icon}
                  alt={cuento.title}
                  style={{
                    width: '220px',
                    height: '220px',
                    filter: 'drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.3))',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default StoriesPage
