import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Calendar, FileText, ArrowLeft, BookOpen, Clock } from 'lucide-react';

export default function ServiceCategory() {
  const { categoryKey } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/services/category/${categoryKey}`);
        if (res.ok) {
          const data = await res.json();
          setCategory(data);
          document.title = `${data.title} | EXIM Guru Mantra`;
        } else {
          setCategory(null);
          document.title = "Service Details | EXIM Guru Mantra";
        }
      } catch (err) {
        console.error('Failed to load category details:', err);
        setCategory(null);
        document.title = "Service Details | EXIM Guru Mantra";
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryKey]);

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading service details...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Service Category Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The requested category page does not exist or has been relocated.</p>
          <Link to="/services" className="btn btn-primary">Return to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '2.5rem' }}>
          <ArrowLeft size={16} />
          <span>All Services</span>
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.5rem', alignItems: 'start' }}>
          <div>
            <span className="section-subtitle" style={{ textTransform: 'uppercase' }}>{category.subtitle}</span>
            <h1 style={{ fontSize: '2.75rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{category.title}</h1>
            
            {/* Premium Category Graphic Banner */}
            <img 
              src={category.img} 
              alt={category.title} 
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid var(--bg-tertiary)',
                marginBottom: '2rem',
                boxShadow: '0 4px 16px rgba(30, 27, 24, 0.04)'
              }}
            />

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: '1.6' }}>
              {category.desc}
            </p>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--bg-tertiary)', paddingBottom: '0.5rem' }}>
              Specific Compliance Modules
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {category.details.map((item, index) => (
                <div key={index} style={{
                  padding: '1.5rem',
                  background: '#ffffff',
                  border: '1px solid var(--bg-tertiary)',
                  borderRadius: '6px',
                  boxShadow: '0 2px 6px rgba(30, 27, 24, 0.02)'
                }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.15rem' }}>{item.heading}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <aside style={{
            position: 'sticky',
            top: '120px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--bg-tertiary)',
            borderRadius: '8px',
            padding: '2.25rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} style={{ color: 'var(--primary)' }} />
              <span>Compliance Briefs & Tips</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {category.tips.map((tip, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.75rem' }}>
                  <Clock size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '4px' }} />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{tip}</p>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '2.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--bg-tertiary)',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Need representation or custom tax analysis for your corporate structure?
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                Contact Advisor Now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
