import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceCategory from './pages/ServiceCategory';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import BuyingHouse from './pages/BuyingHouse';
import Insurance from './pages/Insurance';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Chatbot from './components/Chatbot';
import DocCheck from './pages/DocCheck';
import FAQ from './pages/FAQ';
import Careers from './pages/Careers';
import Portfolios from './pages/Portfolios';
import Terms from './pages/Terms';
import Certificates from './pages/Certificates';

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
            <Route path="/buying-house" element={<BuyingHouse />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/doc-check" element={<DocCheck />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/portfolios" element={<Portfolios />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
