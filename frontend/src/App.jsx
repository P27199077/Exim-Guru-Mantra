import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceCategory from './pages/ServiceCategory';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import Calculator from './pages/Calculator';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Dynamic Glow blobs in background */}
        <div className="bg-gradient-wrapper">
          <div className="gradient-blob-1"></div>
          <div className="gradient-blob-2"></div>
        </div>

        <Navbar />

        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/category/:categoryKey" element={<ServiceCategory />} />
            <Route path="/inquire/:serviceName" element={<Inquiry />} />
            <Route path="/about" element={<About />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
