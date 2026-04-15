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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/avatar-selection" element={<AvatarSelectionPage />} />
        <Route path="/character-presentation" element={<CharacterPresentationPage />} />
        <Route path="/mode-selection" element={<ModeSelectionPage />} />
        <Route path="/words" element={<WordsPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/stories" element={<StoriesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
