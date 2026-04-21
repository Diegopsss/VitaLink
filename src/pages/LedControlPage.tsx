import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import MenuTab from '../components/MenuTab'
import { getPiUrl, setColor, setColorRgb, turnOff } from '../services/piApi'

const COLORS = [
  { name: 'rojo', label: 'Rojo', hex: '#ef4444' },
  { name: 'naranja', label: 'Naranja', hex: '#f97316' },
  { name: 'amarillo', label: 'Amarillo', hex: '#eab308' },
  { name: 'verde', label: 'Verde', hex: '#22c55e' },
  { name: 'azul', label: 'Azul', hex: '#3b82f6' },
  { name: 'morado', label: 'Morado', hex: '#a855f7' },
  { name: 'blanco', label: 'Blanco', hex: '#f8fafc' },
  { name: 'apagar', label: 'Apagar', hex: '#374151' },
]

function LedControlPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasPiUrl, setHasPiUrl] = useState(false)
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rgb, setRgb] = useState({ r: 255, g: 255, b: 255 })
  const navigate = useNavigate()
  useBackgroundMusic()

  useEffect(() => {
    setHasPiUrl(!!getPiUrl())
  }, [isMenuOpen]) // re-check after menu closes (user may have just saved URL)

  const handleColorClick = async (colorName: string) => {
    if (!hasPiUrl) return
    setLoading(true)
    setError('')
    try {
      if (colorName === 'apagar') {
        await turnOff()
      } else {
        await setColor(colorName)
      }
      setActiveColor(colorName)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al conectar con la Pi')
    } finally {
      setLoading(false)
    }
  }

  const handleRgbApply = async () => {
    if (!hasPiUrl) return
    setLoading(true)
    setError('')
    try {
      await setColorRgb(rgb.r, rgb.g, rgb.b)
      setActiveColor('custom')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al conectar con la Pi')
    } finally {
      setLoading(false)
    }
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

      {/* Botón retorno */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ position: 'absolute', top: '60px', left: '2px', zIndex: 1 }}
      >
        <div onClick={() => navigate('/mode-selection')} style={{ cursor: 'pointer' }}>
          <img
            src={returnButton}
            alt="Regresar"
            style={{ width: '95px', borderRadius: '50%', pointerEvents: 'none' }}
          />
        </div>
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderRadius: '20px',
          padding: '24px 32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          width: '700px',
          marginLeft: '60px',
        }}
      >
        <h2 style={{ margin: '0 0 16px', color: '#333', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}>
          Control de LEDs
        </h2>

        {/* Aviso sin URL */}
        <AnimatePresence>
          {!hasPiUrl && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                backgroundColor: '#fff3cd',
                border: '1px solid #f97316',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '16px',
                color: '#92400e',
                fontSize: '14px',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              Configura la URL de la Raspberry Pi en el menú lateral antes de controlar los LEDs
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador color activo */}
        {activeColor && (
          <div style={{ textAlign: 'center', marginBottom: '12px', fontSize: '13px', color: '#555' }}>
            Color activo:{' '}
            <span style={{ fontWeight: 'bold', color: '#333' }}>
              {activeColor === 'custom'
                ? `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`
                : COLORS.find((c) => c.name === activeColor)?.label}
            </span>
            {activeColor !== 'custom' && activeColor !== 'apagar' && (
              <span
                style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: COLORS.find((c) => c.name === activeColor)?.hex,
                  marginLeft: '8px',
                  verticalAlign: 'middle',
                  border: '1px solid #ccc',
                }}
              />
            )}
          </div>
        )}

        {/* Grid de colores */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          {COLORS.map((color, i) => (
            <motion.button
              key={color.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={hasPiUrl && !loading ? { scale: 1.06 } : {}}
              whileTap={hasPiUrl && !loading ? { scale: 0.94 } : {}}
              onClick={() => handleColorClick(color.name)}
              disabled={!hasPiUrl || loading}
              style={{
                backgroundColor: color.hex,
                border: activeColor === color.name ? '3px solid #333' : '2px solid rgba(0,0,0,0.15)',
                borderRadius: '12px',
                padding: '14px 8px',
                cursor: hasPiUrl && !loading ? 'pointer' : 'not-allowed',
                opacity: !hasPiUrl || loading ? 0.5 : 1,
                color: color.name === 'blanco' || color.name === 'amarillo' ? '#333' : '#fff',
                fontWeight: 'bold',
                fontSize: '13px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}
            >
              {color.label}
            </motion.button>
          ))}
        </div>

        {/* Sección RGB */}
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.04)',
            borderRadius: '12px',
            padding: '16px',
          }}
        >
          <p style={{ margin: '0 0 12px', fontWeight: 'bold', color: '#444', fontSize: '14px' }}>
            Color personalizado (RGB)
          </p>
          {(['r', 'g', 'b'] as const).map((channel) => {
            const labels = { r: 'Rojo', g: 'Verde', b: 'Azul' }
            const colors = { r: '#ef4444', g: '#22c55e', b: '#3b82f6' }
            return (
              <div key={channel} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ width: '45px', fontSize: '13px', color: colors[channel], fontWeight: 'bold' }}>
                  {labels[channel]}
                </span>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={rgb[channel]}
                  onChange={(e) => setRgb((prev) => ({ ...prev, [channel]: Number(e.target.value) }))}
                  style={{ flex: 1, cursor: 'pointer', accentColor: colors[channel] }}
                />
                <span style={{ width: '32px', textAlign: 'right', fontSize: '13px', color: '#555' }}>
                  {rgb[channel]}
                </span>
              </div>
            )
          })}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: `rgb(${rgb.r},${rgb.g},${rgb.b})`,
                border: '2px solid rgba(0,0,0,0.2)',
                flexShrink: 0,
              }}
            />
            <motion.button
              whileHover={hasPiUrl && !loading ? { scale: 1.03 } : {}}
              whileTap={hasPiUrl && !loading ? { scale: 0.97 } : {}}
              onClick={handleRgbApply}
              disabled={!hasPiUrl || loading}
              style={{
                flex: 1,
                backgroundColor: '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: hasPiUrl && !loading ? 'pointer' : 'not-allowed',
                opacity: !hasPiUrl || loading ? 0.5 : 1,
              }}
            >
              {loading ? 'Aplicando...' : 'Aplicar color personalizado'}
            </motion.button>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: '12px',
                backgroundColor: '#fee2e2',
                border: '1px solid #ef4444',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#b91c1c',
                fontSize: '13px',
                textAlign: 'center',
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default LedControlPage
