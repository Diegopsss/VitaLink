import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import baseAprender from '../assets/Images/Backgrounds/base_aprender.svg'
import fondoGeneral from '../assets/Images/Backgrounds/fondo_general.svg'
import sidebarButton from '../assets/Images/Buttons/sidebar_button.png'
import returnButton from '../assets/Images/Buttons/return_button.png'
import dialogoPersonas from '../assets/Images/Texts/dialogo_personas.png'
import papa from '../assets/Images/iconos_personas/papa.png'
import mama from '../assets/Images/iconos_personas/mama.png'
import bebe from '../assets/Images/iconos_personas/bebe.png'
import abuelo from '../assets/Images/iconos_personas/abuelo.png'
import abuela from '../assets/Images/iconos_personas/abuela.png'
import MenuTab from '../components/MenuTab'
import fraseDiapositiva13Audio from '../assets/Audios/palabras/familia/frase_diapositiva 13.m4a'
import mamaAudio from '../assets/Audios/palabras/familia/mamá_familia.m4a'
import papaAudio from '../assets/Audios/palabras/familia/papá_familia.m4a'
import bebeAudio from '../assets/Audios/palabras/familia/bebé_familia.m4a'
import abueloAudio from '../assets/Audios/palabras/familia/abuelo_familia.m4a'
import abuelaAudio from '../assets/Audios/palabras/familia/abuela_familia.m4a'
import ellosSonPapasAudio from '../assets/Audios/palabras/familia/ellos son papás_familia.m4a'
import ellosSonAbuelosAudio from '../assets/Audios/palabras/familia/ellos son abuelos_familia.m4a'
import todosFamiliaAudio from '../assets/Audios/palabras/familia/todos familia_familia.m4a'
import extraBebeAudio from '../assets/Audios/palabras/familia/extra bebé_familia.m4a'

function PersonasPage() {
  const [currentView, setCurrentView] = useState<'initial' | 'parents' | 'baby' | 'grandparents' | 'family'>('initial')
  const [clickedPerson, setClickedPerson] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [canTransitionToBaby, setCanTransitionToBaby] = useState(false)
  const [canTransitionToGrandparents, setCanTransitionToGrandparents] = useState(false)
  
  // Acceder a la música de fondo global y ajustar volumen
  const { setVolume } = useBackgroundMusic()
  
  useEffect(() => {
    // Bajar el volumen de la música de fondo a 10% para no interferir con audios principales
    setVolume(0.1)
    
    // Cleanup: restaurar volumen al salir de la página
    return () => {
      setVolume(0.25) // Volumen normal
    }
  }, [setVolume])
  const [isAnimatingAbuela, setIsAnimatingAbuela] = useState(false)
  const [isAnimatingAbuelo, setIsAnimatingAbuelo] = useState(false)
  const [isAnimatingMama, setIsAnimatingMama] = useState(false)
  const [isAnimatingPapa, setIsAnimatingPapa] = useState(false)

  // Función para reproducir audios específicos de familia
  const handleFamilyClick = (personName: string) => {
    let audioFile: string
    
    switch (personName) {
      case 'Bebe':
        audioFile = bebeAudio
        break
      case 'Mama':
        audioFile = mamaAudio
        break
      case 'Papa':
        audioFile = papaAudio
        break
      case 'Abuela':
        audioFile = abuelaAudio
        break
      case 'Abuelo':
        audioFile = abueloAudio
        break
      default:
        return
    }
    
    const audio = new Audio(audioFile)
    audio.play().catch(error => {
      console.log(`Error reproduciendo audio ${personName}:`, error)
    })
  }

  useEffect(() => {
    if (currentView === 'initial') {
      // Esperar 2 segundos para el audio existente
      const timer = setTimeout(() => {
        // Reproducir audio 'frase_diapositiva 13'
        const audio = new Audio(fraseDiapositiva13Audio)
        audio.play().catch(error => {
          console.log('Error reproduciendo audio frase diapositiva 13:', error)
        })
        
        // Cambiar a vista de padres cuando termine el audio
        audio.addEventListener('ended', () => {
          setCurrentView('parents')
          
          // Reproducir audio 'ellos son papás' cuando salgan los dos papas juntos
          setTimeout(() => {
            const audio2 = new Audio(ellosSonPapasAudio)
            audio2.play().catch(error => {
              console.log('Error reproduciendo audio ellos son papás:', error)
            })
            
            // Después de ellos son papás, reproducir audio mamá y animar
            audio2.addEventListener('ended', () => {
              setTimeout(() => {
                const audio3 = new Audio(mamaAudio)
                audio3.play().catch(error => {
                  console.log('Error reproduciendo audio mamá:', error)
                })
                
                // Animar mamá
                setIsAnimatingMama(true)
                setTimeout(() => setIsAnimatingMama(false), 2000)
                
                // Después de mamá, reproducir audio papá y animar
                audio3.addEventListener('ended', () => {
                  setTimeout(() => {
                    const audio4 = new Audio(papaAudio)
                    audio4.play().catch(error => {
                      console.log('Error reproduciendo audio papá:', error)
                    })
                    
                    // Animar papá
                    setIsAnimatingPapa(true)
                    setTimeout(() => setIsAnimatingPapa(false), 2000)
                    
                    // Después de papá, habilitar transición a baby
                    audio4.addEventListener('ended', () => {
                      setCanTransitionToBaby(true)
                    })
                  }, 1000)
                })
              }, 1000)
            })
          }, 1000)
        })
      }, 2000)

      return () => clearTimeout(timer)
    } else if (currentView === 'parents') {
      // Solo cambiar a baby cuando el audio mamá y papá haya terminado
      if (canTransitionToBaby) {
        const timer = setTimeout(() => {
          setCurrentView('baby')
          setCanTransitionToBaby(false) // Resetear el estado
        }, 1000)

        return () => clearTimeout(timer)
      }
      return () => {}
    } else if (currentView === 'baby') {
      // Reproducir audio 'extra bebé' cuando entre a la vista baby
      const timer = setTimeout(() => {
        const audio = new Audio(extraBebeAudio)
        audio.play().catch(error => {
          console.log('Error reproduciendo audio extra bebé:', error)
        })
        
        // Cambiar a vista de abuelos cuando termine el audio
        audio.addEventListener('ended', () => {
          setCurrentView('grandparents')
          
          // Reproducir audio 'ellos son los abuelos' cuando salgan los abuelos juntos
          setTimeout(() => {
            const audio2 = new Audio(ellosSonAbuelosAudio)
            audio2.play().catch(error => {
              console.log('Error reproduciendo audio ellos son los abuelos:', error)
            })
            
            // Después de ellos son los abuelos, reproducir audio abuela y animar
            audio2.addEventListener('ended', () => {
              setTimeout(() => {
                const audio3 = new Audio(abuelaAudio)
                audio3.play().catch(error => {
                  console.log('Error reproduciendo audio abuela:', error)
                })
                
                // Animar abuela
                setIsAnimatingAbuela(true)
                setTimeout(() => setIsAnimatingAbuela(false), 2000)
                
                // Después de abuela, reproducir audio abuelo y animar
                audio3.addEventListener('ended', () => {
                  setTimeout(() => {
                    const audio4 = new Audio(abueloAudio)
                    audio4.play().catch(error => {
                      console.log('Error reproduciendo audio abuelo:', error)
                    })
                    
                    // Animar abuelo
                    setIsAnimatingAbuelo(true)
                    setTimeout(() => setIsAnimatingAbuelo(false), 2000)
                    
                    // Después de abuelo, habilitar transición a family
                    audio4.addEventListener('ended', () => {
                      setCanTransitionToGrandparents(true)
                    })
                  }, 1000)
                })
              }, 1000)
            })
          }, 1000)
        })
      }, 1000)

      return () => clearTimeout(timer)
    } else if (currentView === 'grandparents') {
      // Solo cambiar a family cuando el audio abuela y abuelo haya terminado
      if (canTransitionToGrandparents) {
        const timer = setTimeout(() => {
          setCurrentView('family')
          setCanTransitionToGrandparents(false) // Resetear el estado
          
          // Reproducir audio 'todos familia' cuando entre a la vista family
          setTimeout(() => {
            const audio = new Audio(todosFamiliaAudio)
            audio.play().catch(error => {
              console.log('Error reproduciendo audio todos familia:', error)
            })
          }, 1000)
        }, 1000)

        return () => clearTimeout(timer)
      }
      return () => {}
    }
  }, [currentView, canTransitionToBaby, canTransitionToGrandparents])

  useEffect(() => {
    if (clickedPerson) {
      const timer = setTimeout(() => {
        setClickedPerson(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [clickedPerson])

  return (
    <div
      style={{
        backgroundImage: currentView === 'initial' ? `url(${baseAprender})` : `url(${fondoGeneral})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
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

      {/* Diálogo personas - solo en vista inicial */}
      {currentView === 'initial' && (
        <motion.img
          src={dialogoPersonas}
          alt="Diálogo Personas"
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

      {/* Papás - vista de padres */}
      {currentView === 'parents' && (
        <>
          {/* Papá */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '200px',
              left: '200px',
              width: '300px',
              height: '300px',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <motion.img
              src={papa}
              alt="Papá"
              whileHover={{ scale: 1.1 }}
              animate={isAnimatingPapa ? {
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0],
                x: [0, -20, 20, 0],
              } : {}}
              transition={{
                duration: 2,
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Mamá */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '200px',
              left: '550px',
              width: '300px',
              height: '300px',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <motion.img
              src={mama}
              alt="Mamá"
              whileHover={{ scale: 1.1 }}
              animate={isAnimatingMama ? {
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
                x: [0, 20, -20, 0],
              } : {}}
              transition={{
                duration: 2,
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </>
      )}

      {/* Bebé - vista de bebé */}
      {currentView === 'baby' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '200px',
            left: '400px',
            width: '250px',
            height: '250px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          <motion.img
            src={bebe}
            alt="Bebé"
            whileHover={{ scale: 1.1 }}
            style={{ width: '100%', height: '100%' }}
          />
        </motion.div>
      )}

      {/* Abuelos - vista de abuelos */}
      {currentView === 'grandparents' && (
        <>
          {/* Abuelo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '200px',
              left: '250px',
              width: '250px',
              height: '250px',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <motion.img
              src={abuelo}
              alt="Abuelo"
              whileHover={{ scale: 1.1 }}
              animate={isAnimatingAbuelo ? {
                scale: [1, 1.2, 1],
                rotate: [0, -15, 15, 0],
                y: [0, -15, 0],
              } : {}}
              transition={{
                duration: 2,
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Abuela */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '200px',
              left: '500px',
              width: '250px',
              height: '250px',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <motion.img
              src={abuela}
              alt="Abuela"
              whileHover={{ scale: 1.1 }}
              animate={isAnimatingAbuela ? {
                scale: [1, 1.2, 1],
                rotate: [0, 15, -15, 0],
                y: [0, -15, 0],
              } : {}}
              transition={{
                duration: 2,
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </>
      )}

      {/* Toda la familia - vista final */}
      {currentView === 'family' && (
        <>
          {/* Papá */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '800px',
              width: '200px',
              height: '200px',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => {
              setClickedPerson('Papa')
              handleFamilyClick('Papa')
            }}
          >
            <motion.img
              src={papa}
              alt="Papá"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedPerson === 'Papa' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedPerson === 'Papa' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Mamá */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '600px',
              width: '200px',
              height: '200px',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => {
              setClickedPerson('Mama')
              handleFamilyClick('Mama')
            }}
          >
            <motion.img
              src={mama}
              alt="Mamá"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedPerson === 'Mama' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedPerson === 'Mama' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Bebé */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '350px',
              left: '400px',
              width: '180px',
              height: '180px',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => {
              setClickedPerson('Bebe')
              handleFamilyClick('Bebe')
            }}
          >
            <motion.img
              src={bebe}
              alt="Bebé"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedPerson === 'Bebe' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedPerson === 'Bebe' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Abuelo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '50px',
              width: '200px',
              height: '200px',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => {
              setClickedPerson('Abuelo')
              handleFamilyClick('Abuelo')
            }}
          >
            <motion.img
              src={abuelo}
              alt="Abuelo"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedPerson === 'Abuelo' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedPerson === 'Abuelo' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Abuela */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '150px',
              left: '200px',
              width: '200px',
              height: '200px',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => {
              setClickedPerson('Abuela')
              handleFamilyClick('Abuela')
            }}
          >
            <motion.img
              src={abuela}
              alt="Abuela"
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: [1, 0.9, 1.2, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
              animate={clickedPerson === 'Abuela' ? {
                x: [0, -4, 4, -4, 0],
                y: [0, -2, 2, -2, 0],
                rotate: [0, -2, 2, -2, 0],
              } : {}}
              transition={{
                duration: 1.2,
                repeat: clickedPerson === 'Abuela' ? Infinity : 0,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </>
      )}
    {/* Menú pestaña desplegable */}
      <MenuTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default PersonasPage
