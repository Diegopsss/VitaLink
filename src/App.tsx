import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import AvatarSelectionPage from './pages/auth/AvatarSelectionPage'
import CharacterPresentationPage from './pages/auth/CharacterPresentationPage'
import ConejoPerdidoPage from './pages/cuento/ConejoPerdidoPage'
import ArdillaHambrientaPage from './pages/cuento/ArdillaHambrientaPage'
import MapacheLibroPage from './pages/cuento/MapacheLibroPage'
import TortugaSabiaPage from './pages/cuento/TortugaSabiaPage'
import ZumoAmigosPage from './pages/cuento/ZumoAmigosPage'
import ModeSelectionPage from './pages/auth/ModeSelectionPage'
import WordsPage from './pages/WordsPage'
import GamesPage from './pages/GamesPage'
import StoriesPage from './pages/StoriesPage'
import ProtectedRoute from './components/ProtectedRoute'
import AnimalesPage from './pages/AnimalesPage'
import ColoresPage from './pages/ColoresPage'
import ComidaPage from './pages/ComidaPage'
import MusicaPage from './pages/MusicaPage'
import PersonasPage from './pages/PersonasPage'
import TransportePage from './pages/TransportePage'
import CarGames from './pages/Games/CarGames'
import NotFoundPage from './pages/NotFoundPage'
import MemoryGame from './pages/Games/Memorygame'
import ColorsGame from './pages/Games/ColorsGame'
import CupBalls from './pages/Games/CupBalls'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/avatar-selection" element={<ProtectedRoute><AvatarSelectionPage /></ProtectedRoute>} />
        <Route path="/character-presentation" element={<ProtectedRoute><CharacterPresentationPage /></ProtectedRoute>} />
        <Route path="/mode-selection" element={<ProtectedRoute><ModeSelectionPage /></ProtectedRoute>} />
        <Route path="/words" element={<ProtectedRoute><WordsPage /></ProtectedRoute>} />
        <Route path="/games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
        <Route path="/stories" element={<ProtectedRoute><StoriesPage /></ProtectedRoute>} />
        <Route path="/animales" element={<ProtectedRoute><AnimalesPage /></ProtectedRoute>} />
        <Route path="/colores" element={<ProtectedRoute><ColoresPage /></ProtectedRoute>} />
        <Route path="/comida" element={<ProtectedRoute><ComidaPage /></ProtectedRoute>} />
        <Route path="/musica" element={<ProtectedRoute><MusicaPage /></ProtectedRoute>} />
        <Route path="/personas" element={<ProtectedRoute><PersonasPage /></ProtectedRoute>} />
        <Route path="/transporte" element={<ProtectedRoute><TransportePage /></ProtectedRoute>} />
        <Route path="/car-game" element = {<ProtectedRoute><CarGames /></ProtectedRoute>} />
        <Route path="/cuento/conejo-perdido" element={<ProtectedRoute><ConejoPerdidoPage /></ProtectedRoute>} />
        <Route path="/cuento/ardilla-hambrienta" element={<ProtectedRoute><ArdillaHambrientaPage /></ProtectedRoute>} />
        <Route path="/cuento/mapache-libro" element={<ProtectedRoute><MapacheLibroPage /></ProtectedRoute>} />
        <Route path="/cuento/tortuga-dia-lluvioso" element={<ProtectedRoute><TortugaSabiaPage /></ProtectedRoute>} />
        <Route path="/cuento/zumo-amigos" element={<ProtectedRoute><ZumoAmigosPage /></ProtectedRoute>} />
        <Route path = "/memory-game" element={<ProtectedRoute><MemoryGame/></ProtectedRoute>}/>
        <Route path = "/colors-game" element={<ProtectedRoute><ColorsGame /></ProtectedRoute>}/>
        <Route path = "/cup-balls" element={<ProtectedRoute><CupBalls /></ProtectedRoute>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
