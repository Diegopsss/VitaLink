import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'

function NotFoundPage() {
  const navigate = useNavigate()

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '30px',
          padding: '60px 80px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          maxWidth: '600px',
        }}
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            fontSize: '120px',
            fontWeight: '900',
            color: '#f97316',
            margin: '0 0 20px',
            textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
          }}
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#333',
            margin: '0 0 16px',
          }}
        >
          ¡Oops! Página no encontrada
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            fontSize: '18px',
            color: '#666',
            margin: '0 0 40px',
            lineHeight: '1.6',
          }}
        >
          La página que buscas no existe o fue movida.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '16px 48px',
            borderRadius: '16px',
            border: 'none',
            background: '#f97316',
            color: '#fff',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3)',
          }}
        >
          Volver al inicio
        </motion.button>
      </motion.div>
    </div>
  )
}

export default NotFoundPage
