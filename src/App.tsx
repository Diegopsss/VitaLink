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
<<<<<<< HEAD
import ProtectedRoute from './components/ProtectedRoute'
=======
import AnimalesPage from './pages/AnimalesPage'
import ColoresPage from './pages/ColoresPage'
import ComidaPage from './pages/ComidaPage'
import MusicaPage from './pages/MusicaPage'
import PersonasPage from './pages/PersonasPage'
import TransportePage from './pages/TransportePage'
>>>>>>> 5aba805efdf7307a60d270e405d88fb068285853

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
<<<<<<< HEAD
        <Route path="/avatar-selection" element={<ProtectedRoute><AvatarSelectionPage /></ProtectedRoute>} />
        <Route path="/character-presentation" element={<ProtectedRoute><CharacterPresentationPage /></ProtectedRoute>} />
        <Route path="/mode-selection" element={<ProtectedRoute><ModeSelectionPage /></ProtectedRoute>} />
        <Route path="/words" element={<ProtectedRoute><WordsPage /></ProtectedRoute>} />
        <Route path="/games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
        <Route path="/stories" element={<ProtectedRoute><StoriesPage /></ProtectedRoute>} />
=======
        <Route path="/avatar-selection" element={<AvatarSelectionPage />} />
        <Route path="/character-presentation" element={<CharacterPresentationPage />} />
        <Route path="/mode-selection" element={<ModeSelectionPage />} />
        <Route path="/words" element={<WordsPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/animales" element={<AnimalesPage />} />
        <Route path="/colores" element={<ColoresPage />} />
        <Route path="/comida" element={<ComidaPage />} />
        <Route path="/musica" element={<MusicaPage />} />
        <Route path="/personas" element={<PersonasPage />} />
        <Route path="/transporte" element={<TransportePage />} />
>>>>>>> 5aba805efdf7307a60d270e405d88fb068285853
      </Routes>
    </BrowserRouter>
  )
}

export default App
