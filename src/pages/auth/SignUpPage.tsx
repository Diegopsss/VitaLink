import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import fondoGeneral from '../../assets/Images/Backgrounds/fondo_general.svg'
import zorro from '../../assets/Images/FoxImage/zorro_pagina_2,3.png'
import globo from '../../assets/Images/Texts/texto_3_globo.png'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../../assets/Images/Buttons/return_button.png'
import continueButton from '../../assets/Images/Buttons/continue_button.png'
import { supabase } from '../../utils/supabase'
import MenuTab from '../../components/MenuTab'
import signupAudio from '../../assets/Audios/presentacion/signup/nuevo usuario_presentación.m4a'
import '../../styles/App.css'

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    folio: '',
    age: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [registeredFolio, setRegisteredFolio] = useState('')
  const [activeInput, setActiveInput] = useState<'name' | 'folio' | 'age' | null>(null)
  const [isCaps, setIsCaps] = useState(true)
  const navigate = useNavigate()

  // Efecto para reproducir audio al cargar la página
  useEffect(() => {
    const audio = new Audio(signupAudio)
    audio.play().catch(error => {
      console.log('Error reproduciendo audio signup:', error)
    })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleKeyPress = (field: 'name' | 'folio' | 'age', value: string) => {
    if (value === '⌫') {
      setFormData(prev => ({ ...prev, [field]: prev[field].slice(0, -1) }))
    } else if (value === 'ESPACIO') {
      setFormData(prev => ({ ...prev, [field]: prev[field] + ' ' }))
    } else {
      const char = field === 'name' ? (isCaps ? value.toUpperCase() : value.toLowerCase()) : value
      setFormData(prev => ({ ...prev, [field]: prev[field] + char }))
    }
  }

  const handleSignUp = async () => {
    if (!formData.name.trim() || !formData.folio.trim() || !formData.age.trim()) {
      setError('Por favor completa todos los campos')
      return
    }

    if (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120) {
      setError('Por favor ingresa una edad válida')
      return
    }

    setLoading(true)
    setError('')

    const email = `${formData.folio.trim()}@vitalink.com`
    const password = 'Vitalink_2024#'

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: formData.name.trim(),
          age: formData.age.trim()
        },
        emailRedirectTo: undefined
      }
    })

    setLoading(false)

    if (error) {
      if (error.message.includes('already registered')) {
        setError('Este folio ya está registrado')
      } else {
        setError('Error al crear la cuenta. Intenta nuevamente')
      }
      return
    }

    setRegisteredFolio(formData.folio.trim())
    setSuccess(true)
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
        <Link to="/login" style={{ display: 'block', cursor: 'pointer' }}>
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

      {/* Modal de éxito */}
      {success && (
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
          >
            <p style={{ fontSize: '48px', margin: '0 0 12px' }}>✅</p>
            <p style={{ fontSize: '20px', fontWeight: '700', color: '#333', margin: '0 0 8px' }}>
              ¡Listo!
            </p>
            <p style={{ fontSize: '16px', color: '#666', margin: '0 0 24px' }}>
              Folio <strong>{registeredFolio}</strong> registrado
            </p>
            <button
              onClick={() => navigate('/avatar-selection')}
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
              Elegir Avatar
            </button>
          </div>
        </motion.div>
      )}

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
              Error en el registro
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

      {/* Formulario de registro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '250px',
          left: '250px',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '205px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          zIndex: 1,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      > 
        {/* Campo Nombre */}
        <div style={{
          marginBottom: '25px',
          backgroundColor: '#f97316',
          borderRadius: '10px',
          padding: '15px'
        }}>
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            readOnly
            onClick={() => setActiveInput('name')}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            className="signup-input"
          />
        </div>

        {/* Campo Folio */}
        <div style={{
          marginBottom: '25px',
          backgroundColor: '#f97316',
          borderRadius: '10px',
          padding: '15px'
        }}>
          <input
            type="text"
            name="folio"
            placeholder="Número de folio"
            value={formData.folio}
            readOnly
            onClick={() => setActiveInput('folio')}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            className="signup-input"
          />
        </div>

        {/* Campo Edad */}
        <div style={{
          marginBottom: '30px',
          backgroundColor: '#f97316',
          borderRadius: '10px',
          padding: '15px'
        }}>
          <input
            type="text"
            name="age"
            placeholder="Edad"
            value={formData.age}
            readOnly
            onClick={() => setActiveInput('age')}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            className="signup-input"
          />
        </div>
      </motion.div>

      {/* Botón continuar abajo a la derecha */}
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
          onClick={handleSignUp}
          style={{
            width: '140px',
            borderRadius: '50%',
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        />
      </motion.div>
      
      {/* Modal teclado numérico (folio / edad) */}
      {(activeInput === 'folio' || activeInput === 'age') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 200 }}
          onClick={() => setActiveInput(null)}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', borderRadius: '28px', padding: '28px 24px 24px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', minWidth: '320px' }}>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {activeInput === 'folio' ? 'Número de folio' : 'Edad'}
            </p>
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.07)', borderRadius: '16px', padding: '14px 20px', color: '#fff', fontSize: '32px', fontWeight: '800', letterSpacing: '6px', textAlign: 'center', minHeight: '62px', border: '1.5px solid rgba(255,255,255,0.15)' }}>
              {formData[activeInput] || <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '20px', letterSpacing: '2px' }}>—</span>}
            </div>
            {[['1','2','3'],['4','5','6'],['7','8','9'],['⌫','0','✓']].map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: '12px' }}>
                {row.map((key) => {
                  const isBackspace = key === '⌫'
                  const isConfirm = key === '✓'
                  return (
                    <button key={key}
                      onClick={() => isConfirm ? setActiveInput(null) : handleKeyPress(activeInput!, key)}
                      style={{ width: '80px', height: '72px', borderRadius: '18px', border: 'none', fontSize: isBackspace || isConfirm ? '26px' : '28px', fontWeight: '800', cursor: 'pointer', background: isConfirm ? 'linear-gradient(135deg,#22c55e,#16a34a)' : isBackspace ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#f97316,#ea6c0a)', color: '#fff', boxShadow: isConfirm ? '0 4px 14px rgba(34,197,94,0.4)' : isBackspace ? '0 4px 14px rgba(239,68,68,0.4)' : '0 4px 14px rgba(249,115,22,0.4)', transition: 'transform 0.1s', userSelect: 'none' }}
                      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
                      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
                      onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >{key}</button>
                  )
                })}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Modal teclado de letras (nombre) */}
      {activeInput === 'name' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 200 }}
          onClick={() => setActiveInput(null)}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', borderRadius: '28px', padding: '24px 20px 20px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {/* Label */}
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Nombre completo</p>

            {/* Display */}
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.07)', borderRadius: '14px', padding: '12px 18px', color: '#fff', fontSize: '22px', fontWeight: '700', minHeight: '52px', border: '1.5px solid rgba(255,255,255,0.15)', letterSpacing: '1px' }}>
              {formData.name || <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '16px' }}>Escribe tu nombre...</span>}
            </div>

            {/* Filas del teclado */}
            {(() => {
              const rows = [
                ['Q','W','E','R','T','Y','U','I','O','P'],
                ['A','S','D','F','G','H','J','K','L','Ñ'],
                ['⇧','Z','X','C','V','B','N','M','⌫'],
              ]
              const btnStyle = (key: string): React.CSSProperties => {
                const isShift = key === '⇧'
                const isBack = key === '⌫'
                const isSpecial = isShift || isBack
                return {
                  width: isSpecial ? '70px' : '52px',
                  height: '50px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: isSpecial ? '20px' : '18px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  background: isBack
                    ? 'linear-gradient(135deg,#ef4444,#dc2626)'
                    : isShift
                    ? (isCaps ? 'linear-gradient(135deg,#6366f1,#4f46e5)' : 'linear-gradient(135deg,#4b5563,#374151)')
                    : 'linear-gradient(135deg,#f97316,#ea6c0a)',
                  color: '#fff',
                  boxShadow: isBack ? '0 3px 10px rgba(239,68,68,0.4)' : isShift ? '0 3px 10px rgba(99,102,241,0.4)' : '0 3px 10px rgba(249,115,22,0.35)',
                  transition: 'transform 0.1s',
                  userSelect: 'none',
                }
              }
              return rows.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', gap: '6px' }}>
                  {row.map((key) => (
                    <button key={key}
                      style={btnStyle(key)}
                      onClick={() => {
                        if (key === '⇧') { setIsCaps(c => !c) }
                        else { handleKeyPress('name', key) }
                      }}
                      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
                      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
                      onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      {key === '⇧' ? (isCaps ? '⬆' : '⇧') : key === '⌫' ? '⌫' : (isCaps ? key.toUpperCase() : key.toLowerCase())}
                    </button>
                  ))}
                </div>
              ))
            })()}

            {/* Fila inferior: espacio + confirmar */}
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <button
                onClick={() => handleKeyPress('name', 'ESPACIO')}
                style={{ flex: 1, height: '50px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: '700', cursor: 'pointer', background: 'linear-gradient(135deg,#f97316,#ea6c0a)', color: '#fff', boxShadow: '0 3px 10px rgba(249,115,22,0.35)', transition: 'transform 0.1s', userSelect: 'none' }}
                onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
                onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
                onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >ESPACIO</button>
              <button
                onClick={() => setActiveInput(null)}
                style={{ width: '80px', height: '50px', borderRadius: '12px', border: 'none', fontSize: '22px', fontWeight: '800', cursor: 'pointer', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', boxShadow: '0 3px 10px rgba(34,197,94,0.4)', transition: 'transform 0.1s', userSelect: 'none' }}
                onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
                onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
                onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >✓</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default SignUpPage
