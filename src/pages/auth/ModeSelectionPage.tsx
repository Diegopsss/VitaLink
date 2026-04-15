import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import fondoGeneral from '../../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../../assets/Images/Buttons/sidebar_button.png'
import palabrasButton from '../../assets/Images/Buttons/palabras_button.png'
import juegosButton from '../../assets/Images/Buttons/juegos_button.png'
import cuentosButton from '../../assets/Images/Buttons/cuentos_button.png'
import '../../styles/App.css'

function ModeSelectionPage() {
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

      {/* Contenido principal - placeholder para selección de modos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '180px',
          left: '80px',
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          zIndex: 1,
        }}
      >
          <Link to="/words" style={{ display: 'block', cursor: 'pointer' }}>
            <img
              src={palabrasButton}
              alt="Palabras"
              style={{
                width: '280px',
                height: 'auto',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
          
          <Link to="/games" style={{ display: 'block', cursor: 'pointer' }}>
            <img
              src={juegosButton}
              alt="Juegos"
              style={{
                width: '280px',
                height: 'auto',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
          
          <Link to="/stories" style={{ display: 'block', cursor: 'pointer' }}>
            <img
              src={cuentosButton}
              alt="Cuentos"
              style={{
                width: '280px',
                height: 'auto',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
      </motion.div>
    </div>
  )
}

export default ModeSelectionPage
