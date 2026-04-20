import React, { createContext, useContext, useRef, useEffect, useState } from 'react'
import babyMozartAudio from '../assets/Audios/baby_mozart/classical-music-for-toddlers--baby-einstein--full-episode.mp3'

interface BackgroundMusicContextType {
  isPlaying: boolean
  toggleMusic: () => void
  setVolume: (volume: number) => void
  startMusicManually: () => Promise<void>
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | undefined>(undefined)

export const useBackgroundMusic = () => {
  const context = useContext(BackgroundMusicContext)
  if (!context) {
    throw new Error('useBackgroundMusic must be used within a BackgroundMusicProvider')
  }
  return context
}

export const BackgroundMusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasStarted = useRef(false)
  const hasInteracted = useRef(false)

  useEffect(() => {
    // Crear el elemento de audio solo una vez
    if (!audioRef.current) {
      audioRef.current = new Audio(babyMozartAudio)
      audioRef.current.loop = true
      audioRef.current.volume = 0.05 // Volumen aumentado (10%)
      audioRef.current.preload = 'auto'
    }

    // Función para iniciar la música automáticamente
    const startMusic = async () => {
      if (audioRef.current && !hasStarted.current) {
        try {
          await audioRef.current.play()
          hasStarted.current = true
          setIsPlaying(true)
          console.log('Música de fondo iniciada automáticamente')
        } catch (error) {
          console.log('Error iniciando música de fondo:', error)
          // Si falla, intentar con la primera interacción
          const handleFirstInteraction = () => {
            if (!hasStarted.current) {
              audioRef.current?.play().then(() => {
                hasStarted.current = true
                setIsPlaying(true)
                console.log('Música iniciada con interacción del usuario')
              }).catch(err => {
                console.log('Error incluso con interacción:', err)
              })
            }
          }
          
          const events = ['click', 'keydown', 'touchstart', 'mousedown']
          events.forEach(event => {
            document.addEventListener(event, handleFirstInteraction, { once: true })
          })
        }
      }
    }

    // Iniciar música automáticamente después de un corto delay
    const timer = setTimeout(() => {
      startMusic()
    }, 500) // Reducido a 0.5 segundos para inicio más rápido

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Función para iniciar manualmente la música
  const startMusicManually = async () => {
    if (audioRef.current && !hasStarted.current) {
      hasInteracted.current = true // Marcar como interactuado
      try {
        await audioRef.current.play()
        hasStarted.current = true
        setIsPlaying(true)
        console.log('Música de fondo iniciada manualmente')
      } catch (error) {
        console.log('Error iniciando música manualmente:', error)
        // Intentar con un volumen más bajo si hay error
        if (audioRef.current) {
          audioRef.current.volume = 0.05
          try {
            await audioRef.current.play()
            hasStarted.current = true
            setIsPlaying(true)
            console.log('Música iniciada con volumen reducido')
          } catch (error2) {
            console.log('Error incluso con volumen reducido:', error2)
          }
        }
      }
    }
  }

  // Función para alternar la reproducción
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        if (!hasStarted.current) {
          hasInteracted.current = true
        }
        audioRef.current.play().catch(error => {
          console.log('Error reanudando música:', error)
        })
        setIsPlaying(true)
      }
    }
  }

  // Función para ajustar el volumen
  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume))
    }
  }

  // Manejar el evento cuando el audio se pausa/reanuda
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  return (
    <BackgroundMusicContext.Provider value={{ isPlaying, toggleMusic, setVolume, startMusicManually }}>
      {children}
    </BackgroundMusicContext.Provider>
  )
}
