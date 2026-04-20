import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import baseAprender from '../assets/Images/Backgrounds/base_aprender.svg'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import dialogoAnimales from '../assets/Images/Texts/dialogo_animales.png'
import caballo from '../assets/Images/Buttons/caballo.png'
import gallo from '../assets/Images/Buttons/gallo.png'
import gato from '../assets/Images/Buttons/gato.png'
import oveja from '../assets/Images/Buttons/oveja.png'
import perro from '../assets/Images/Buttons/perro.png'
import vaca from '../assets/Images/Buttons/vaca.png'
import MenuTab from '../components/MenuTab'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import fraseDiapositiva11Audio from '../assets/Audios/palabras/animales/frase_diapositiva 11.m4a'
import caballoAudio from '../assets/Audios/palabras/animales/caballo_animales.m4a'
import gallinaAudio from '../assets/Audios/palabras/animales/gallina_animales.m4a'
import gatoAudio from '../assets/Audios/palabras/animales/gato_animales.m4a'
import ovejaAudio from '../assets/Audios/palabras/animales/oveja_animales.m4a'
import perroAudio from '../assets/Audios/palabras/animales/perro_animales.m4a'
import vacaAudio from '../assets/Audios/palabras/animales/vaca_animales.m4a'
import hazClicAudio from '../assets/Audios/palabras/animales/haz clic_animales.m4a'

// Importar efectos de sonido de animales
import efectoCaballo from '../assets/Audios/palabras/animales/efecto_caballo.mp3'
import efectoGallina from '../assets/Audios/palabras/animales/efecto_gallina.mp3'
import efectoGato from '../assets/Audios/palabras/animales/efecto_gato.mp3'
import efectoOveja from '../assets/Audios/palabras/animales/efecto_oveja.mp3'
import efectoPerro from '../assets/Audios/palabras/animales/efecto_perro.mp3'
import efectoVaca from '../assets/Audios/palabras/animales/efecto_vaca.mp3'

function AnimalesPage() {
  const [currentView, setCurrentView] = useState<'initial' | 'animalButtons'>('initial')
  const [clickedAnimal, setClickedAnimal] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Configuración de efectos de sonido (fácil de ajustar)
  const efectosConfig = {
    // Volumen de los efectos (0.0 a 1.0)
    volumen: 0.3, // 30% de volumen - fácil de ajustar
    // Duración máxima por animal en segundos (null para reproducir completo)
    duraciones: {
      'Caballo': 2,    // 2 segundos
      'Gallo': 2,      // 2 segundos
      'Gato': 2,       // 2 segundos
      'Oveja': 2,      // 2 segundos
      'Perro': 3,      // 3 segundos (1 segundo más)
      'Vaca': 3        // 3 segundos (1 segundo más)
    },
    // Tiempo inicial para empezar a reproducir el efecto (en segundos)
    tiempoInicial: {
      'Caballo': 0,    // 0 segundos (empieza desde el principio)
      'Gallo': 0,      // 0 segundos (empieza desde el principio)
      'Gato': 0,       // 0 segundos (empieza desde el principio)
      'Oveja': 0,      // 0 segundos (empieza desde el principio)
      'Perro': 0.5,    // 0.5 segundos (empieza avanzado)
      'Vaca': 0        // 0 segundos (empieza desde el principio)
    },
    // Retraso antes de iniciar el efecto después del audio del animal (en milisegundos)
    retraso: 200 // 200ms - fácil de ajustar
  }
  
  // Acceder a la música de fondo y bajar el volumen para esta página
  const { setVolume } = useBackgroundMusic()
  
  useEffect(() => {
    // Bajar el volumen de la música de fondo a 10% para no interferir con audios principales
    setVolume(0.1)
    
    // Cleanup: restaurar volumen al salir de la página
    return () => {
      setVolume(0.25) // Volumen normal
    }
  }, [setVolume])

  useEffect(() => {
    // Esperar a que termine el audio de animales (3 segundos de retraso)
    setTimeout(() => {
      // Reproducir audio 'frase_diapositiva 11' antes del cambio de página
      const audio1 = new Audio(fraseDiapositiva11Audio)
      audio1.play().catch(error => {
        console.log('Error reproduciendo audio frase diapositiva 11:', error)
      })
      
      // Cambiar a vista de animales cuando termine el audio
      audio1.addEventListener('ended', () => {
        setCurrentView('animalButtons')
        
        // Reproducir audio 'haz clic_animales' después del cambio de página
        setTimeout(() => {
          const audio2 = new Audio(hazClicAudio)
          audio2.play().catch(error => {
            console.log('Error reproduciendo audio haz clic animales:', error)
          })
        }, 1000)
      })

      return () => {
        audio1.removeEventListener('ended', () => {})
      }
    }, 2000) // Esperar 2 segundos para que sea perceptible

    return () => {}
  }, [])

  useEffect(() => {
    if (clickedAnimal) {
      const timer = setTimeout(() => {
        setClickedAnimal(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [clickedAnimal])

  // Posiciones aleatorias para los animales
  const animalPositions = [
    { top: '20px', left: '100px' },
    { top: '180px', left: '400px' },
    { top: '0px', left: '500px' },
    { top: '100px', left: '700px' },
    { top: '300px', left: '600px' },
    { top: '300px', left: '65px' }
  ]

  // Funciones para reproducir audios específicos de animales
  const handleAnimalClick = (animalName: string) => {
    let audioFile: string
    let efectoFile: string
    
    switch (animalName) {
      case 'Caballo':
        audioFile = caballoAudio
        efectoFile = efectoCaballo
        break
      case 'Gallo':
        audioFile = gallinaAudio
        efectoFile = efectoGallina
        break
      case 'Gato':
        audioFile = gatoAudio
        efectoFile = efectoGato
        break
      case 'Oveja':
        audioFile = ovejaAudio
        efectoFile = efectoOveja
        break
      case 'Perro':
        audioFile = perroAudio
        efectoFile = efectoPerro
        break
      case 'Vaca':
        audioFile = vacaAudio
        efectoFile = efectoVaca
        break
      default:
        return
    }
    
    // Reproducir audio del animal primero
    const audio = new Audio(audioFile)
    audio.play().catch(error => {
      console.log(`Error reproduciendo audio ${animalName}:`, error)
    })
    
    // Después de que termine el audio del animal, reproducir el efecto
    audio.addEventListener('ended', () => {
      setTimeout(() => {
        const efecto = new Audio(efectoFile)
        efecto.volume = efectosConfig.volumen
        
        // Obtener la duración específica para este animal
        const duracionAnimal = efectosConfig.duraciones[animalName as keyof typeof efectosConfig.duraciones]
        
        // Obtener el tiempo inicial para este animal
        const tiempoInicialAnimal = efectosConfig.tiempoInicial[animalName as keyof typeof efectosConfig.tiempoInicial]
        
        // Establecer el tiempo inicial si está configurado
        if (tiempoInicialAnimal) {
          efecto.currentTime = tiempoInicialAnimal
        }
        
        // Si hay duración configurada para este animal, cortar el efecto
        if (duracionAnimal) {
          setTimeout(() => {
            efecto.pause()
            efecto.currentTime = 0
          }, duracionAnimal * 1000)
        }
        
        efecto.play().catch(error => {
          console.log(`Error reproduciendo efecto de ${animalName}:`, error)
        })
      }, efectosConfig.retraso)
    })
  }

  const animals = [
    { name: 'Caballo', image: caballo },
    { name: 'Gallo', image: gallo },
    { name: 'Gato', image: gato },
    { name: 'Oveja', image: oveja },
    { name: 'Perro', image: perro },
    { name: 'Vaca', image: vaca }
  ]

  return (
    <div
      style={{
        backgroundImage: currentView === 'initial' ? `url(${baseAprender})` : `url(${fondoGeneral})`,
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
        transition: 'background-image 1s ease-in-out',
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
        <Link to="/words" style={{ display: 'block', cursor: 'pointer' }}>
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

      {/* Diálogo animales - solo en vista inicial */}
      {currentView === 'initial' && (
        <motion.img
          src={dialogoAnimales}
          alt="Diálogo Animales"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: '200px',
            left: '340px',
            transform: 'translateX(-50%)',
            width: '500px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Botones de animales - solo en vista de botones */}
      {currentView === 'animalButtons' && (
        <>
          {animals.map((animal, index) => (
            <motion.div
              key={animal.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.2 + (index * 0.15), 
                duration: 0.6, 
                ease: 'easeOut' 
              }}
              style={{
                position: 'absolute',
                top: animalPositions[index].top,
                left: animalPositions[index].left,
                cursor: 'pointer',
                zIndex: 1,
              }}
              onClick={() => {
                setClickedAnimal(animal.name)
                handleAnimalClick(animal.name)
              }}
            >
              <motion.img
                src={animal.image}
                alt={animal.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ 
                  scale: [1, 0.9, 1.2, 1],
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.6 }
                }}
                animate={clickedAnimal === animal.name ? {
                  x: [0, -4, 4, -4, 0],
                  y: [0, -2, 2, -2, 0],
                  rotate: [0, -2, 2, -2, 0],
                } : {}}
                transition={{
                  duration: 1.2,
                  repeat: clickedAnimal === animal.name ? Infinity : 0,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                style={{
                  width: '280px',
                  height: 'auto',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          ))}
        </>
      )}
      
      {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default AnimalesPage
