import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import fondoGeneral from '../../assets/Images/Backgrounds/fondo_general.svg'
import zorro from '../../assets/Images/FoxImage/zorro_pagina_2,3.png'
import globo from '../../assets/Images/Texts/texto_2_globo.png'
import barraBusqueda from '../../assets/Images/search_bar/barra_busqueda_2.png'
import signUpButton from '../../assets/Images/Buttons/sign_up_button.png'
import continueButton from '../../assets/Images/Buttons/continue_button.png'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import { supabase } from '../../utils/supabase'
import MenuTab from '../../components/MenuTab'
import quienJugaraAudio from '../../assets/Audios/presentacion/login/quien jugará el día de hoy_presentacion.m4a'
import ingresaFolioAudio from '../../assets/Audios/presentacion/login/ingresa el folio_presentación.m4a'
import '../../styles/App.css'

function LoginPage() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNumpad, setShowNumpad] = useState(false)
  const navigate = useNavigate()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleNumpadPress = (value: string) => {
    if (value === '⌫') {
      setSearch(prev => prev.slice(0, -1))
    } else {
      setSearch(prev => prev + value)
    }
  }

  // Efecto para reproducir audios al cargar la página
  useEffect(() => {
    // Crear elemento de audio
    const audio = new Audio()
    audioRef.current = audio

    // Reproducir primer audio "quien jugara"
    audio.src = quienJugaraAudio
    audio.play().catch(error => {
      console.log('Error reproduciendo audio quien jugara:', error)
    })

    // Evento cuando termina el primer audio
    const handleFirstAudioEnd = () => {
      // Reproducir segundo audio "ingresa el folio" solo una vez
      audio.src = ingresaFolioAudio
      audio.play().catch(error => {
        console.log('Error reproduciendo audio ingresa folio:', error)
      })
      
      // Remover el event listener después de reproducir el segundo audio
      audio.removeEventListener('ended', handleFirstAudioEnd)
    }

    audio.addEventListener('ended', handleFirstAudioEnd)

    // Cleanup
    return () => {
      audio.removeEventListener('ended', handleFirstAudioEnd)
      audio.pause()
      audio.src = ''
    }
  }, [])

  const handleLogin = async () => {
    if (!search.trim()) return
    setLoading(true)
    setError('')

    const email = `${search.trim()}@vitalink.com`
    const password = 'Vitalink_2024#'

    console.log('Intentando login con:', { email, password })

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log('Respuesta de Supabase:', { data, error })

    setLoading(false)

    if (error) {
      console.error('Error de login:', error.message)
      setError(`Folio no encontrado: ${error.message}`)
      return
    }

    console.log('Login exitoso, redirigiendo...')
    navigate('/character-presentation')
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
      <motion.img
        src={zorro}
        alt="Zorrito"
        initial={{ x: -220, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '1000px',
          pointerEvents: 'none',
        }}
      />
      <motion.img
        src={globo}
        alt="Globo de diálogo"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '60px',
          width: '950px',
          pointerEvents: 'none',
        }}
      />

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

      {/* Modal de error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100,
          }}
          onClick={() => setError('')}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px 48px',
              textAlign: 'center',
              maxWidth: '380px',
              width: '90%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ fontSize: '48px', margin: '0 0 12px' }}></p>
            <p style={{ fontSize: '20px', fontWeight: '700', color: '#333', margin: '0 0 8px' }}>
              Error al iniciar sesión
            </p>
            <p style={{ fontSize: '16px', color: '#666', margin: '0 0 24px' }}>{error}</p>
            <button
              onClick={() => setError('')}
              style={{
                padding: '12px 32px',
                borderRadius: '12px',
                border: 'none',
                background: '#f97316',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      )}

      {/* Barra de búsqueda */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '860px',
          zIndex: 1,
        }}
      >
        <img
          src={barraBusqueda}
          alt="Barra de búsqueda"
          style={{ width: '100%', display: 'block' }}
        />
        <input
          type="text"
          className="login-input"
          placeholder="Ingresa el folio:"
          value={search}
          readOnly
          onClick={() => setShowNumpad(true)}
          style={{
            position: 'absolute',
            top: '51.5%',
            left: '210px',
            transform: 'translateY(-50%)',
            width: 'calc(100% - 80px)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: '22px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        />
      </motion.div>

      {/* Botón continuar (login) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '20px',
          zIndex: 1,
        }}
      >
        <img
          src={continueButton}
          alt="Continuar"
          onClick={handleLogin}
          style={{
            width: '140px',
            borderRadius: '50%',
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        />
      </motion.div>

      {/* Botón sign up */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '68%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '820px',
          height: '90px',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <Link to="/sign-up" style={{ display: 'block', cursor: 'pointer' }}>
          <img
            src={signUpButton}
            alt="Sign Up"
            style={{
              width: '820px',
              display: 'block',
              marginTop: '-295px',
              pointerEvents: 'none',
            }}
          />
        </Link>
      </motion.div>
      
      {/* Teclado numérico */}
      {showNumpad && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 200,
          }}
          onClick={() => setShowNumpad(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: '28px',
              padding: '28px 24px 24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              border: '2px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              minWidth: '320px',
            }}
          >
            {/* Display del folio */}
            <div style={{
              margin: '0 12px',
              alignSelf: 'stretch',
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '16px',
              padding: '14px 24px',
              color: '#fff',
              fontSize: '32px',
              fontWeight: '800',
              letterSpacing: '6px',
              textAlign: 'center',
              minHeight: '62px',
              border: '1.5px solid rgba(255,255,255,0.15)',
            }}>
              {search || <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '20px', letterSpacing: '2px' }}>Ingresa tu folio</span>}
            </div>

            {/* Grid de botones */}
            {[['1','2','3'],['4','5','6'],['7','8','9'],['⌫','0','✓']].map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: '12px' }}>
                {row.map((key) => {
                  const isBackspace = key === '⌫'
                  const isConfirm = key === '✓'
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        if (isConfirm) {
                          setShowNumpad(false)
                        } else {
                          handleNumpadPress(key)
                        }
                      }}
                      style={{
                        width: '80px',
                        height: '72px',
                        borderRadius: '18px',
                        border: 'none',
                        fontSize: isBackspace || isConfirm ? '26px' : '28px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        background: isConfirm
                          ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                          : isBackspace
                          ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                          : 'linear-gradient(135deg, #f97316, #ea6c0a)',
                        color: '#fff',
                        boxShadow: isConfirm
                          ? '0 4px 14px rgba(34,197,94,0.4)'
                          : isBackspace
                          ? '0 4px 14px rgba(239,68,68,0.4)'
                          : '0 4px 14px rgba(249,115,22,0.4)',
                        transition: 'transform 0.1s, opacity 0.1s',
                        userSelect: 'none',
                      }}
                      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
                      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
                      onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      {key}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default LoginPage
