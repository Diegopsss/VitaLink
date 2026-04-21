import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import { getPiUrl, setPiUrl } from '../services/piApi'
import { setMasterVolume } from '../services/audioVolume'

interface MenuTabProps {
  isOpen: boolean
  onClose: () => void
}

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function MenuTab({ isOpen, onClose }: MenuTabProps) {
  const [volume, setVolume] = useState(100)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [piUrlInput, setPiUrlInput] = useState(getPiUrl() ?? '')
  const [piUrlSaved, setPiUrlSaved] = useState(false)
  const navigate = useNavigate()
  const { isPlaying, toggleMusic } = useBackgroundMusic()

  const handleResumeGame = () => {
    onClose()
  }

  const handleLogout = () => {
    const piUrl = localStorage.getItem('pi_url')
    localStorage.clear()
    sessionStorage.clear()
    if (piUrl) localStorage.setItem('pi_url', piUrl)
    navigate('/login')
  }

  const handleReturnHome = () => {
    navigate('/mode-selection')
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setVolume(val)
    setMasterVolume(val / 100)
  }

  const handleOpenSettings = () => {
    setPiUrlInput(getPiUrl() ?? '')
    setPiUrlSaved(false)
    setIsSettingsOpen(true)
  }

  const handleSavePiUrl = () => {
    const trimmed = piUrlInput.trim()
    if (!trimmed) return
    setPiUrl(trimmed)
    setPiUrlSaved(true)
    setTimeout(() => {
      setPiUrlSaved(false)
      setIsSettingsOpen(false)
    }, 1200)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay del menú */}
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
              overflowY: 'auto',
            }}
          >
            {/* Header del menú */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
              paddingBottom: '15px',
              borderBottom: '2px solid #e0e0e0',
            }}>
              <h3 style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
                Menú
              </h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {/* Botón de configuración */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 30 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleOpenSettings}
                  title="Configuración"
                  style={{
                    backgroundColor: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GearIcon />
                </motion.button>

                {/* Botón cerrar */}
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
            </div>

            {/* Botones del menú */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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

              <div style={{ height: '1px', backgroundColor: '#e0e0e0', margin: '20px 0' }} />

              {/* Control de Volumen */}
              <div style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '10px',
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  color: '#333',
                  fontSize: '16px',
                  fontWeight: 'bold',
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

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleMusic}
                style={{
                  backgroundColor: isPlaying ? '#FF9800' : '#9C27B0',
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
                  marginTop: '15px',
                }}
              >
                {isPlaying ? 'Pausar Música' : 'Reanudar Música'}
              </motion.button>
            </div>
          </motion.div>

          {/* Modal de configuración */}
          <AnimatePresence>
            {isSettingsOpen && (
              <>
                {/* Overlay del modal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSettingsOpen(false)}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '1024px',
                    height: '600px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    zIndex: 1002,
                  }}
                />

                {/* Contenedor centrador — cubre el canvas exacto */}
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '1024px',
                  height: '600px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1003,
                  pointerEvents: 'none',
                }}>
                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -20 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  style={{
                    width: '380px',
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                    padding: '28px',
                    boxSizing: 'border-box',
                    pointerEvents: 'all',
                  }}
                >
                  {/* Header modal */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        backgroundColor: '#7c3aed',
                        borderRadius: '8px',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}>
                        <GearIcon />
                      </div>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a' }}>
                        Configuración
                      </h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsSettingsOpen(false)}
                      style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
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

                  {/* Contenido del modal */}
                  <div style={{
                    backgroundColor: '#f5f3ff',
                    borderRadius: '10px',
                    padding: '16px',
                    marginBottom: '20px',
                  }}>
                    <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#4c1d95', fontSize: '14px' }}>
                      URL de la Raspberry Pi (ngrok)
                    </p>
                    <p style={{
                      margin: '0 0 12px',
                      fontSize: '12px',
                      color: getPiUrl() ? '#15803d' : '#dc2626',
                      fontWeight: '500',
                    }}>
                      {getPiUrl() ? `Actual: ${getPiUrl()}` : 'No configurada'}
                    </p>
                    <input
                      type="text"
                      placeholder="https://xxxx.ngrok-free.dev"
                      value={piUrlInput}
                      onChange={(e) => setPiUrlInput(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #c4b5fd',
                        fontSize: '13px',
                        boxSizing: 'border-box',
                        outline: 'none',
                        backgroundColor: '#fff',
                        color: '#1a1a1a',
                      }}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSavePiUrl}
                    style={{
                      width: '100%',
                      backgroundColor: piUrlSaved ? '#15803d' : '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                    }}
                  >
                    {piUrlSaved ? 'Guardado' : 'Guardar URL'}
                  </motion.button>
                </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

export default MenuTab
