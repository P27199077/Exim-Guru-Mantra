import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Globe, Menu, X, PhoneCall, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer open state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop services mega-dropdown state

  const handleLinkClick = () => {
    setDropdownOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <NavLink to="/" className="logo logo-img-container" onClick={handleLinkClick} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="EXIM Guru Mantra Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Home
            </NavLink>
          </li>
          
          {/* Services Link with Mega Dropdown */}
          <li 
            className="nav-item-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <NavLink 
              to="/services" 
              className={({ isActive }) => isActive ? "nav-link active nav-link-flex" : "nav-link nav-link-flex"}
              onClick={handleLinkClick}
            >
              <span>Services</span>
              <ChevronDown size={14} className="dropdown-arrow" />
            </NavLink>
            
            {/* Mega Dropdown Panel */}
            <div className={`mega-dropdown ${dropdownOpen ? 'open' : ''}`}>
              {/* Column 1 */}
              <div className="mega-column">
                <div className="mega-group">
                  <Link to="/services/category/taxation-and-compliances" className="mega-title-link" onClick={handleLinkClick}>
                    <h4 className="mega-title">Taxation And Compliances</h4>
                  </Link>
                  <Link to={`/inquire/${encodeURIComponent("Overview - Direct And Indirect Tax")}`} className="mega-link" onClick={handleLinkClick}>Overview - Direct And Indirect Tax</Link>
                  <Link to={`/inquire/${encodeURIComponent("Corporate Tax")}`} className="mega-link" onClick={handleLinkClick}>Corporate Tax</Link>
                  <Link to={`/inquire/${encodeURIComponent("Income Tax Return Filing Services")}`} className="mega-link" onClick={handleLinkClick}>Income Tax Return Filing Services</Link>
                  <Link to={`/inquire/${encodeURIComponent("Income Tax Litigation Services")}`} className="mega-link" onClick={handleLinkClick}>Income Tax Litigation Services</Link>
                  <Link to={`/inquire/${encodeURIComponent("Certification And Attestation Services")}`} className="mega-link" onClick={handleLinkClick}>Certification And Attestation Services</Link>
                  <Link to={`/inquire/${encodeURIComponent("TDS Return Filing")}`} className="mega-link" onClick={handleLinkClick}>TDS Return Filing</Link>
                </div>
                <div className="mega-group">
                  <Link to="/services/category/audit-and-assurance" className="mega-title-link" onClick={handleLinkClick}>
                    <h4 className="mega-title">Audit And Assurance</h4>
                  </Link>
                  <Link to={`/inquire/${encodeURIComponent("Overview - Audit And Assurance")}`} className="mega-link" onClick={handleLinkClick}>Overview - Audit And Assurance</Link>
                  <Link to={`/inquire/${encodeURIComponent("Statutory Audit")}`} className="mega-link" onClick={handleLinkClick}>Statutory Audit</Link>
                  <Link to={`/inquire/${encodeURIComponent("Tax Audit")}`} className="mega-link" onClick={handleLinkClick}>Tax Audit</Link>
                  <Link to={`/inquire/${encodeURIComponent("Internal Audit")}`} className="mega-link" onClick={handleLinkClick}>Internal Audit</Link>
                  <Link to={`/inquire/${encodeURIComponent("Stock Audit")}`} className="mega-link" onClick={handleLinkClick}>Stock Audit</Link>
                  <Link to={`/inquire/${encodeURIComponent("Fixed Assets Audit")}`} className="mega-link" onClick={handleLinkClick}>Fixed Assets Audit</Link>
                </div>
              </div>

              {/* Column 2 */}
              <div className="mega-column">
                <div className="mega-group">
                  <Link to="/services/category/goods-and-service-tax" className="mega-title-link" onClick={handleLinkClick}>
                    <h4 className="mega-title">Goods And Service Tax</h4>
                  </Link>
                  <Link to={`/inquire/${encodeURIComponent("Overview - Goods And Services Tax")}`} className="mega-link" onClick={handleLinkClick}>Overview - Goods And Services Tax</Link>
                  <Link to={`/inquire/${encodeURIComponent("GST Compliance Services")}`} className="mega-link" onClick={handleLinkClick}>GST Compliance Services</Link>
                  <Link to={`/inquire/${encodeURIComponent("GST Audit")}`} className="mega-link" onClick={handleLinkClick}>GST Audit</Link>
                  <Link to={`/inquire/${encodeURIComponent("GST Litigation Services")}`} className="mega-link" onClick={handleLinkClick}>GST Litigation Services</Link>
                  <Link to={`/inquire/${encodeURIComponent("GST Refund")}`} className="mega-link" onClick={handleLinkClick}>GST Refund</Link>
                </div>
                <div className="mega-group">
                  <Link to="/services/category/company-and-llp-compliances" className="mega-title-link" onClick={handleLinkClick}>
                    <h4 className="mega-title">Company And LLP Compliances</h4>
                  </Link>
                  <Link to={`/inquire/${encodeURIComponent("Company Registration")}`} className="mega-link" onClick={handleLinkClick}>Company Registration</Link>
                  <Link to={`/inquire/${encodeURIComponent("LLP Formation")}`} className="mega-link" onClick={handleLinkClick}>LLP Formation</Link>
                  <Link to={`/inquire/${encodeURIComponent("Company Annual Compliances")}`} className="mega-link" onClick={handleLinkClick}>Company Annual Compliances</Link>
                  <Link to={`/inquire/${encodeURIComponent("Company Strike Off")}`} className="mega-link" onClick={handleLinkClick}>Company Strike Off</Link>
                  <Link to={`/inquire/${encodeURIComponent("Company Annual Return Filing")}`} className="mega-link" onClick={handleLinkClick}>Company Annual Return Filing</Link>
                  <Link to={`/inquire/${encodeURIComponent("LLP Annual Return Filing")}`} className="mega-link" onClick={handleLinkClick}>LLP Annual Return Filing</Link>
                  <Link to={`/inquire/${encodeURIComponent("One Person Company Registration")}`} className="mega-link" onClick={handleLinkClick}>One Person Company Registration</Link>
                </div>
              </div>

              {/* Column 3 */}
              <div className="mega-column">
                <div className="mega-group">
                  <Link to="/services/category/international-taxation" className="mega-title-link" onClick={handleLinkClick}>
                    <h4 className="mega-title">International Taxation</h4>
                  </Link>
                  <Link to={`/inquire/${encodeURIComponent("Overview - International Taxation")}`} className="mega-link" onClick={handleLinkClick}>Overview - International Taxation</Link>
                  <Link to={`/inquire/${encodeURIComponent("NRI Taxation")}`} className="mega-link" onClick={handleLinkClick}>NRI Taxation</Link>
                  <Link to={`/inquire/${encodeURIComponent("Transfer Pricing")}`} className="mega-link" onClick={handleLinkClick}>Transfer Pricing</Link>
                  <Link to={`/inquire/${encodeURIComponent("Double Taxation Avoidance Agreement")}`} className="mega-link" onClick={handleLinkClick}>Double Taxation Avoidance Agreement</Link>
                  <Link to={`/inquire/${encodeURIComponent("Taxation Of Expats")}`} className="mega-link" onClick={handleLinkClick}>Taxation Of Expats</Link>
                </div>
                <div className="mega-group">
                  <Link to="/services/category/registration" className="mega-title-link" onClick={handleLinkClick}>
                    <h4 className="mega-title">Registration</h4>
                  </Link>
                  <Link to={`/inquire/${encodeURIComponent("Trust Registration")}`} className="mega-link" onClick={handleLinkClick}>Trust Registration</Link>
                  <Link to={`/inquire/${encodeURIComponent("Society Registration")}`} className="mega-link" onClick={handleLinkClick}>Society Registration</Link>
                  <Link to={`/inquire/${encodeURIComponent("IEC Registration")}`} className="mega-link" onClick={handleLinkClick}>IEC Registration</Link>
                  <Link to={`/inquire/${encodeURIComponent("MSME Registration")}`} className="mega-link" onClick={handleLinkClick}>MSME Registration</Link>
                  <Link to={`/inquire/${encodeURIComponent("FSSAI Registration")}`} className="mega-link" onClick={handleLinkClick}>FSSAI Registration</Link>
                  <Link to={`/inquire/${encodeURIComponent("ESI Registration")}`} className="mega-link" onClick={handleLinkClick}>ESI Registration</Link>
                </div>
              </div>

              {/* Column 4 */}
              <div className="mega-column">
                <div className="mega-group">
                  <Link to="/services/category/account-outsourcing-and-bookkeeping" className="mega-title-link" onClick={handleLinkClick}>
                    <h4 className="mega-title">Account Outsourcing & Bookkeeping</h4>
                  </Link>
                  <Link to={`/inquire/${encodeURIComponent("Overview - Accounts Outsourcing And Bookkeeping")}`} className="mega-link" onClick={handleLinkClick}>Overview - Accounts Outsourcing And Bookkeeping</Link>
                  <Link to={`/inquire/${encodeURIComponent("Accounting And Book Keeping")}`} className="mega-link" onClick={handleLinkClick}>Accounting And Book Keeping</Link>
                  <Link to={`/inquire/${encodeURIComponent("Payroll Management")}`} className="mega-link" onClick={handleLinkClick}>Payroll Management</Link>
                </div>
                <div className="mega-group">
                  <Link to="/services/category/intellectual-property" className="mega-title-link" onClick={handleLinkClick}>
                    <h4 className="mega-title">Intellectual Property</h4>
                  </Link>
                  <Link to={`/inquire/${encodeURIComponent("Trademark Registration")}`} className="mega-link" onClick={handleLinkClick}>Trademark Registration</Link>
                  <Link to={`/inquire/${encodeURIComponent("Trademark Assignment")}`} className="mega-link" onClick={handleLinkClick}>Trademark Assignment</Link>
                  <Link to={`/inquire/${encodeURIComponent("Trademark Renewal")}`} className="mega-link" onClick={handleLinkClick}>Trademark Renewal</Link>
                  <Link to={`/inquire/${encodeURIComponent("Trademark Search")}`} className="mega-link" onClick={handleLinkClick}>Trademark Search</Link>
                  <Link to={`/inquire/${encodeURIComponent("Trademark Objection")}`} className="mega-link" onClick={handleLinkClick}>Trademark Objection</Link>
                </div>
              </div>
            </div>
          </li>
          
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              About Us
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/calculator" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Duty Estimator
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Contact & Support
            </NavLink>
          </li>
        </ul>

        <div className="pc-only">
          <NavLink to="/contact" className="btn btn-primary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }} onClick={handleLinkClick}>
            <PhoneCall size={14} />
            <span>Book Consultation</span>
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#fbf9f4',
          borderBottom: '1px solid var(--bg-tertiary)',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          zIndex: 99
        }}>
          <NavLink to="/" className="nav-link" onClick={handleLinkClick}>Home</NavLink>
          <NavLink to="/services" className="nav-link" onClick={handleLinkClick}>Services</NavLink>
          <NavLink to="/about" className="nav-link" onClick={handleLinkClick}>About Us</NavLink>
          <NavLink to="/calculator" className="nav-link" onClick={handleLinkClick}>Duty Estimator</NavLink>
          <NavLink to="/contact" className="nav-link" onClick={handleLinkClick}>Contact & Support</NavLink>
          <NavLink to="/contact" className="btn btn-primary" style={{ marginTop: '0.5rem' }} onClick={handleLinkClick}>
            <PhoneCall size={16} />
            <span>Book Consultation</span>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
