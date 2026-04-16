import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface MenuTabProps {
  isOpen: boolean
  onClose: () => void
}

function MenuTab({ isOpen, onClose }: MenuTabProps) {
  const [volume, setVolume] = useState(50)
  const navigate = useNavigate()

  const handleResumeGame = () => {
    onClose()
    // Reanuda el juego (simplemente cierra el menú)
  }

  const handleLogout = () => {
    // Lógica para cerrar sesión
    // Limpiar localStorage, sessionStorage, etc.
    localStorage.clear()
    sessionStorage.clear()
    navigate('/login') // Redirige al login
  }

  const handleReturnHome = () => {
    // Lógica para regresar al modo de selección
    navigate('/mode-selection')
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
    // Aquí podrías controlar el volumen real del audio
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '1024px',
              height: '600px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
            }}
          />
          
          {/* Menú desplegable */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '280px',
              height: '600px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)',
              zIndex: 1001,
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            {/* Header del menú */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '30px',
              paddingBottom: '15px',
              borderBottom: '2px solid #e0e0e0'
            }}>
              <h3 style={{ 
                margin: 0, 
                color: '#333', 
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                Menú
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </motion.button>
            </div>

            {/* Botones del menú */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Botón Reanudar Juego */}
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleResumeGame}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                Reanudar Juego
              </motion.button>

              {/* Botón Cerrar Sesión */}
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                Cerrar Sesión
              </motion.button>

              {/* Botón Regresar al Inicio */}
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReturnHome}
                style={{
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                Regresar al Inicio
              </motion.button>

              {/* Separador */}
              <div style={{ 
                height: '1px', 
                backgroundColor: '#e0e0e0', 
                margin: '20px 0' 
              }} />

              {/* Control de Volumen */}
              <div style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px',
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  Volumen: {volume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: '#ddd',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MenuTab
