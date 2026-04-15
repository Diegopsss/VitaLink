import fondoInicio from '../assets/Images/Backgrounds/fondo_inicio.svg'

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
      }}
    >

    </div>
  )
}

export default HomePage
