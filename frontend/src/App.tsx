import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Home from "./pages/Home"
import About from "./pages/About"

import './css/reset.css'
import './css/main.css'

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
