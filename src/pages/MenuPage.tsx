import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'

function MenuPage() {
  const [volume, setVolume] = useState(50)
  const navigate = useNavigate()

  const handleResumeGame = () => {
    // Lógica para reanudar el juego
    // Podría volver a la página anterior o guardar el estado del juego
    navigate(-1) // Vuelve a la página anterior
  }

  const handleLogout = () => {
    // Lógica para cerrar sesión
    // Limpiar localStorage, sessionStorage, etc.
    localStorage.clear()
    sessionStorage.clear()
    navigate('/') // Redirige al login/inicio
  }

  const handleReturnHome = () => {
    // Lógica para regresar al inicio
    navigate('/')
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
    // Aquí podrías controlar el volumen real del audio
    // Por ejemplo: audioElement.volume = volume / 100
  }

  return (
    <div
      style={{
        backgroundImage: `url(${fondoGeneral})`,
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
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 2,
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

      {/* Contenedor del menú */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        }}
      >
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px', 
          color: '#333',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          Menú
        </h2>

        {/* Botones del menú */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Botón Reanudar Juego */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResumeGame}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '15px 30px',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Reanudar Juego
          </motion.button>

          {/* Botón Cerrar Sesión */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '15px 30px',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Cerrar Sesión
          </motion.button>

          {/* Botón Regresar al Inicio */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReturnHome}
            style={{
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '15px 30px',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Regresar al Inicio
          </motion.button>

          {/* Control de Volumen */}
          <div style={{ 
            marginTop: '20px', 
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '10px'
          }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px',
              color: '#333',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Control de Volumen: {volume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '5px',
                backgroundColor: '#ddd',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default MenuPage
