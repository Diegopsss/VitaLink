import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import AvatarSelectionPage from './pages/auth/AvatarSelectionPage'
import CharacterPresentationPage from './pages/auth/CharacterPresentationPage'
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
import NotFoundPage from './pages/NotFoundPage'

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
