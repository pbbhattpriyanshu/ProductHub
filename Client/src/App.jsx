import { Route } from "react-router"
import {Routes} from "react-router"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Edit from "./pages/Edit"
import Create from "./pages/Create"
import Profile from "./pages/Profile"

function App() {

  return (
    <>
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App
