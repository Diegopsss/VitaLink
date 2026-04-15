import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import fondoGeneral from '../../assets/Images/Backgrounds/fondo_general.svg'
import zorro from '../../assets/Images/FoxImage/zorro_pagina_2,3.png'
import globo from '../../assets/Images/Texts/texto_3_globo.png'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import continueButton from '../../assets/Images/Buttons/continue_button.png'
import '../../styles/App.css'

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    folio: '',
    age: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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

    // Simulate sign up process
    setTimeout(() => {
      setLoading(false)
      navigate('/login')
    }, 1000)
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
            onChange={handleInputChange}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
            }}
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
            onChange={handleInputChange}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
            }}
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
            onChange={handleInputChange}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
            }}
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
    </div>
  )
}

export default SignUpPage
