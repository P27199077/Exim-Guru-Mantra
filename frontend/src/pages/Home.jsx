import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Award, 
  FileText, 
  Anchor, 
  BadgeAlert, 
  ArrowRight, 
  Zap, 
  CheckCircle2,
  Landmark,
  ClipboardCheck,
  Percent,
  Building2,
  Globe,
  PenTool,
  Calculator,
  Scale,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Coins,
  TrendingUp,
  HelpCircle,
  X
} from 'lucide-react';

const servicesList = [
  {
    title: 'IEC Licensing & DGFT',
    icon: FileText,
    desc: 'Setup and renewal of Import Export Codes, SEIS/MEIS claims, and drafting appeal petitions before DGFT.',
    link: '/services',
    linkText: 'Explore DGFT services'
  },
  {
    title: 'Customs clearance advisory',
    icon: Anchor,
    desc: 'Advising on classification issues, valuation disputes, provisional assessments, and representation before customs port authorities.',
    link: '/services',
    linkText: 'Explore Customs services'
  },
  {
    title: 'Incentive schemes & RCMC',
    icon: Award,
    desc: 'Maximal recovery under Duty Drawbacks, RoDTEP, RoSCTL, Advance Authorization, and EPCG licensing frameworks.',
    link: '/services',
    linkText: 'Explore Incentives'
  },
  {
    title: 'Taxation And Compliances',
    icon: Landmark,
    desc: 'Managing corporate and individual direct taxation, end-to-end filing, tax planning, and dispute representation.',
    link: '/services/category/taxation-and-compliances',
    linkText: 'Check Taxation Guidelines'
  },
  {
    title: 'Audit And Assurance',
    icon: ClipboardCheck,
    desc: 'Providing transparency, accountability, and reliability to investors and regulatory boards under standard auditing guidelines.',
    link: '/services/category/audit-and-assurance',
    linkText: 'Check Audit Guidelines'
  },
  {
    title: 'Goods And Service Tax (GST)',
    icon: Percent,
    desc: 'Automated indirect tax desk to manage monthly GSTR returns, reconciliation, GSTR audits, and litigation.',
    link: '/services/category/goods-and-service-tax',
    linkText: 'Check GST Guidelines'
  },
  {
    title: 'Company & LLP Compliances',
    icon: Building2,
    desc: 'Ongoing compliance under MCA rules, ROC filings, company registration, and LLP annual compliance services.',
    link: '/services/category/company-and-llp-compliances',
    linkText: 'Check Company Setup'
  },
  {
    title: 'International Taxation',
    icon: Globe,
    desc: 'Managing cross-border tax liabilities, DTAA planning, NRI taxation, and Transfer Pricing compliance.',
    link: '/services/category/international-taxation',
    linkText: 'Check Global Tax Info'
  },
  {
    title: 'Business Registrations',
    icon: PenTool,
    desc: 'Kickstart your business setup with MSME, food licensing, labor, export promotion profiles, and council registrations.',
    link: '/services/category/registration',
    linkText: 'Check Registrations'
  },
  {
    title: 'Account Outsourcing & Bookkeeping',
    icon: Calculator,
    desc: 'Audit-ready ledger preparation, day-to-day books, and modern payroll management using Tally and QuickBooks.',
    link: '/services/category/account-outsourcing-and-bookkeeping',
    linkText: 'Check Accounting Info'
  },
  {
    title: 'Intellectual Property (IPR)',
    icon: Scale,
    desc: 'Protect brand assets through trademark searches, filings, assignments, renewals, and legal responses to objections.',
    link: '/services/category/intellectual-property',
    linkText: 'Check IPR Services'
  }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const [youtubeId, setYoutubeId] = useState('35mvh-2oII8');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const bannerImages = [
    {
      img: 'https://eximplanner.com/assets/img/banner/1.jpg',
      subtitle: 'ANYWHERE ANYTIME',
      title: 'SWIFT, SECURE GLOBALLY CONNECT',
      btnText: 'Read More'
    },
    {
      img: 'https://eximplanner.com/assets/img/banner/2.jpg',
      subtitle: 'YOUR DEDICATED',
      title: 'PARTNER IN LOGISTICS',
      btnText: 'Read More'
    },
    {
      img: 'https://eximplanner.com/assets/img/banner/3.jpg',
      subtitle: 'TRANSPORT. TRUST. TERRITORY.',
      title: 'RELIABLE. EFFICIENT. GROUNDED.',
      btnText: 'Read More'
    }
  ];

  // Fetch dynamically synced youtube video and set doc title
  useEffect(() => {
    document.title = "EXIM Guru Mantra | Leading DGFT & Customs Consultancy";
    fetch('/api/youtube-videos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setYoutubeId(data[0].id);
        }
      })
      .catch(err => console.error('Failed to load dynamic youtube video:', err));
  }, []);

  // Auto-sliding effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % bannerImages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev + 1) % bannerImages.length);
  };

  return (
    <div>
      {/* Sliding Image Banner (Hero Section) */}
      <div className="home-banner-slider">
        {bannerImages.map((slide, idx) => (
          <div 
            key={idx} 
            className={`home-banner-slide ${idx === activeSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0.25) 100%), url(${slide.img})`
            }}
          >
            <div className="container" style={{ paddingLeft: '5%', zIndex: 5 }}>
              <div style={{ maxWidth: '650px', color: '#ffffff', textAlign: 'left' }}>
                <span 
                  className="banner-subtitle" 
                  style={{ 
                    fontSize: '1rem', 
                    fontWeight: '800', 
                    letterSpacing: '2px', 
                    color: '#ff7236', 
                    textTransform: 'uppercase', 
                    display: 'block', 
                    marginBottom: '0.75rem', 
                    animation: idx === activeSlide ? 'fadeInUp 0.6s ease' : 'none' 
                  }}
                >
                  {slide.subtitle}
                </span>
                <h1 
                  className="banner-title" 
                  style={{ 
                    fontSize: '3.25rem', 
                    fontWeight: '900', 
                    lineHeight: '1.25', 
                    textTransform: 'uppercase', 
                    marginBottom: '1.25rem', 
                    color: '#ffffff',
                    animation: idx === activeSlide ? 'fadeInUp 0.8s ease' : 'none' 
                  }}
                >
                  {slide.title}
                </h1>
                <div style={{ animation: idx === activeSlide ? 'fadeInUp 1s ease' : 'none' }}>
                  <Link to="/services" className="banner-cta-btn">
                    <span>{slide.btnText}</span>
                    <span className="banner-cta-arrow">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrevSlide} 
          className="home-banner-btn home-banner-btn-prev"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNextSlide} 
          className="home-banner-btn home-banner-btn-next"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Navigation Dots */}
        <div className="home-banner-dots">
          {bannerImages.map((_, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveSlide(idx)}
              className={`home-banner-dot ${idx === activeSlide ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Video Callout Section (Dynamic YouTube Pop-Up) */}
      <section style={{ background: 'var(--primary)', padding: '3.5rem 0', color: '#ffffff' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setIsVideoOpen(true)}
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              className="pulse-button"
              aria-label="Play Featured Video"
            >
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" style={{ marginLeft: '4px' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            
            <div style={{ maxWidth: '650px' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.6', fontWeight: '500', opacity: 0.95 }}>
                Well-managed logistics can provide a competitive edge by offering faster delivery, better service, and lower costs.
              </p>
            </div>
          </div>
          
          <div>
            <Link to="/services" className="btn btn-secondary" style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: '#ffffff', background: 'transparent' }}>
              Our Portfolios
            </Link>
          </div>
        </div>
      </section>



      {/* YouTube Video Modal Overlay */}
      {isVideoOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 12, 10, 0.92)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          {/* Close trigger */}
          <button 
            onClick={() => setIsVideoOpen(false)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              opacity: 0.8
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
            aria-label="Close Video"
          >
            <X size={32} />
          </button>
          
          <div style={{ width: '100%', maxWidth: '880px', aspectRatio: '16/9', background: '#000000', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&enablejsapi=1&rel=0`}
              title="Featured Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </div>
      )}



      {/* Metrics Section */}
      <section className="metrics-section">
        <div className="container metrics-grid">
          <div>
            <div className="metric-num">1,500+</div>
            <div className="metric-label">IEC Codes Issued</div>
          </div>
          <div>
            <div className="metric-num">4+ Yrs</div>
            <div className="metric-label">Core Industry Experience</div>
          </div>
          <div>
            <div className="metric-num">50+</div>
            <div className="metric-label">Export Sectors Assisted</div>
          </div>
          <div>
            <div className="metric-num">99.8%</div>
            <div className="metric-label">Customs Clearance Rate</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <span className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Execution Process</span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>How Exim Guru Mantra Works</h2>
            <p className="section-desc" style={{ color: '#ebd9d7', maxWidth: '650px', margin: '0 auto' }}>
              We simplify international compliance and customs clearance in four straightforward steps to secure your trade operations.
            </p>
          </div>

          <div className="process-grid">
            {/* Step 00 */}
            <div className="process-step">
              <div className="process-img-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=80" 
                  alt="Choose Service" 
                  className="process-img"
                />
                <span className="process-badge">00</span>
              </div>
              <h4 className="process-step-title">Choose Your Service</h4>
              <p className="process-step-desc">
                Browse our extensive menu of corporate, tax, and customs compliance services to select your requirement.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="process-arrow-container">
              <svg className="process-arrow" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,20 C40,5 60,5 90,20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M85,13 L92,21 L83,25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Step 01 */}
            <div className="process-step">
              <div className="process-img-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=300&auto=format&fit=crop&q=80" 
                  alt="Consult Experts" 
                  className="process-img"
                />
                <span className="process-badge">01</span>
              </div>
              <h4 className="process-step-title">Consult Expert Staff</h4>
              <p className="process-step-desc">
                Submit your query online for professional insight to guide your legal and financial trade journey.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="process-arrow-container">
              <svg className="process-arrow" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,20 C40,5 60,5 90,20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M85,13 L92,21 L83,25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Step 02 */}
            <div className="process-step">
              <div className="process-img-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop&q=80" 
                  alt="Strategic Work Planning" 
                  className="process-img"
                />
                <span className="process-badge">02</span>
              </div>
              <h4 className="process-step-title">Strategic Work Planning</h4>
              <p className="process-step-desc">
                We craft a clear compliance roadmap and gather correct paperwork to minimize operational risks.
              </p>
            </div>

            {/* Arrow 3 */}
            <div className="process-arrow-container">
              <svg className="process-arrow" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,20 C40,5 60,5 90,20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M85,13 L92,21 L83,25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Step 03 */}
            <div className="process-step">
              <div className="process-img-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1450133064473-71024230f91b?w=300&auto=format&fit=crop&q=80" 
                  alt="Completed Work" 
                  className="process-img"
                />
                <span className="process-badge">03</span>
              </div>
              <h4 className="process-step-title">Completed Work</h4>
              <p className="process-step-desc">
                We execute filings and obtain regional clearances, delivering solutions exactly as planned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Excellence in Execution</span>
            <h2 className="section-title">Trade Consultation Specialties</h2>
            <p className="section-desc">
              Discover how our team of legal advisors, CAs, and trade experts support your business expansion through compliance advisory.
            </p>
          </div>

          <div className="cards-grid">
            {(showAll ? servicesList : servicesList.slice(0, 3)).map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div key={idx} className="card">
                  <div className="card-icon">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-desc">{service.desc}</p>
                  <Link to={service.link} className="card-link">
                    <span>{service.linkText}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowAll(!showAll)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 2.2rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{showAll ? 'Show Less Specialties' : 'Show All Offered Services'}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-section">
        <div className="container">
          <div className="why-grid">
            <div>
              <div className="why-badge">
                <HelpCircle size={14} />
                <span>Why Choose Exim Guru Mantra</span>
              </div>
              <h2 className="why-title">
                We Deliver Expertise You Can <span>Trust For Your Trade</span>
              </h2>

              <div className="why-features">
                {/* Feature 1 */}
                <div className="why-feature-item">
                  <div className="why-feature-icon">
                    <Coins size={24} />
                  </div>
                  <div className="why-feature-content">
                    <h4>Affordable Cost</h4>
                    <p>
                      Premium consulting at fair, upfront prices. We offer high value and full billing transparency with absolutely no hidden charges.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="why-feature-item">
                  <div className="why-feature-icon">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="why-feature-content">
                    <h4>Trade Risk Mitigation</h4>
                    <p>
                      Protecting your cross-border investments. Our expert panel of CAs and CSs designs custom pathways to minimize ROC, DGFT, and custom audits exposure.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="why-feature-item">
                  <div className="why-feature-icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="why-feature-content">
                    <h4>Maximize Government Incentives</h4>
                    <p>
                      Smart export structures that lower duties and unlock maximum duty drawback, RoDTEP, and regional tax savings for every rupee you spend.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="why-media">
              <div className="why-images-wrapper">
                {/* Top Right Vertical Image */}
                <img 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80" 
                  alt="Global Shipping Cargo Terminal" 
                  className="why-img-one"
                />
                
                {/* Decorative splash flower asset in center */}
                <svg className="why-splash" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                  position: 'absolute',
                  top: '30%',
                  left: '20%',
                  width: '130px',
                  height: '130px',
                  zIndex: 3,
                  color: 'var(--primary)',
                  opacity: 0.12,
                  pointerEvents: 'none'
                }}>
                  <path d="M60 60 C40 35 15 45 10 60 C15 75 40 85 60 60 Z" fill="currentColor" />
                  <path d="M60 60 C80 35 105 45 110 60 C105 75 80 85 60 60 Z" fill="currentColor" />
                  <path d="M60 60 C35 40 45 15 60 10 C75 15 85 40 60 60 Z" fill="currentColor" />
                  <path d="M60 60 C35 80 45 105 60 110 C75 105 85 80 60 60 Z" fill="currentColor" />
                </svg>

                {/* Bottom Left Horizontal Image */}
                <img 
                  src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&auto=format&fit=crop&q=80" 
                  alt="Business meeting in New Delhi Office" 
                  className="why-img-two"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Call to Action */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid var(--card-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Ready to Scale Your Import-Export Operations?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Book a complimentary 15-minute diagnostic session with our principal consultant to identify duty savings and risk bottlenecks.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
              Book Diagnostic Session
            </Link>
            <Link to="/services" className="btn btn-secondary" style={{ padding: '0.8rem 2rem' }}>
              Browse Detailed Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
