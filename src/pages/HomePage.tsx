import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import fondoInicio from '../assets/Images/Backgrounds/fondo_inicio.svg'
import playButton from '../assets/Images/Buttons/Play_Button.png'

function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url(${fondoInicio})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Link to="/login" style={{ marginTop: '20vh' }}>
        <motion.img
          src={playButton}
          alt="Play"
          style={{
            width: '220px',
            borderRadius: '50%',
            border: '3px solid white',
            display: 'block',
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 1,
            ease: ['easeOut', 'easeIn'],
            repeat: Infinity,
          }}
        />
      </Link>
    </div>
  )
}

export default HomePage
