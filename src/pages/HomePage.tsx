import heroImg from '../assets/hero.png'
import './HomePage.css'

function HomePage() {
  return (
    <div className="homepage">
      <div
        className="homepage-bg"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="vocalia-container">
        <h1 className="vocalia-text">VOCALIA</h1>
      </div>
    </div>
  )
}

export default HomePage
