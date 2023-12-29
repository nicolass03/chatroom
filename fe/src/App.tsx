import './App.css'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import Home from './pages/Home'

function App() {
  return (
    <ProtectedRoutes>
      <Home />
    </ProtectedRoutes>
  )
}

export default App
