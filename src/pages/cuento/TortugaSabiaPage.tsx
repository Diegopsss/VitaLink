import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../../assets/Images/Buttons/return_button.png'
import MenuTab from '../../components/MenuTab'
import '../../styles/App.css'

// Importar imágenes de la tortuga sabia (usar conejo como placeholder)
import tortuga1 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_1.svg'
import tortuga2 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_2.svg'
import tortuga3 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_3.svg'
import tortuga4 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_4.svg'
import tortuga5 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_5.svg'
import tortuga6 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_6.svg'
import tortuga7 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_7.svg'
import tortuga8 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_8.svg'
import tortuga9 from '../../assets/Images/paginas_cuentos/conejo_perdido/con_9.svg'

function TortugaSabiaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate()

  // Array de imágenes en orden (menor a mayor)
  const tortugaImages = [
    tortuga1, tortuga2, tortuga3, tortuga4, tortuga5,
    tortuga6, tortuga7, tortuga8, tortuga9
  ]

  // Efecto para cambiar imágenes cada 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentImage < tortugaImages.length - 1) {
        setCurrentImage(currentImage + 1)
      }
    }, 5000) // 5 segundos por imagen

    return () => clearTimeout(timer)
  }, [currentImage])

  return (
    <div
      style={{
        backgroundImage: `url(${tortugaImages[currentImage]})`,
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
        <div onClick={() => navigate('/stories')} style={{ display: 'block', cursor: 'pointer' }}>
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

      {/* Título del cuento */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          padding: '30px 40px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontSize: '42px',
            fontWeight: '700',
            color: '#333333',
            margin: 0,
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          La Tortuga Sabia
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            fontSize: '16px',
            color: '#666666',
            margin: '10px 0 0',
            fontStyle: 'italic',
          }}
        >
          Lecciones de paciencia
        </motion.p>
      </motion.div>

      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default TortugaSabiaPage
