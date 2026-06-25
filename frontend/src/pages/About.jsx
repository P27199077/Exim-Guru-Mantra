import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Heart, Users, Target } from 'lucide-react';

const youtubeVideos = [
  {
    id: '5BkyvOq8Uts',
    title: 'How to Start Import Export Business in India - Step-by-Step Guide',
    desc: 'Learn the complete operational workflow of starting an EXIM startup, setting up logistics, and finding international buyers.',
    duration: '12:45'
  },
  {
    id: 'vVeeN_hEobU',
    title: 'IEC Registration Online Tutorial | Apply for Import Export Code',
    desc: 'A complete walk-through of the DGFT portal application process to get your IEC issued in under 24 hours.',
    duration: '08:30'
  },
  {
    id: 'z-F1mYlQ_j8',
    title: 'Understanding Indian Customs Duty & Clearance Procedures',
    desc: 'How customs duty is calculated (CIF, Basic Customs Duty, Social Welfare Surcharge, IGST) and port clearance steps.',
    duration: '10:15'
  },
  {
    id: 'k83lB1V0z-o',
    title: 'DGFT Export Incentive Schemes: RoDTEP, Duty Drawback & EPCG',
    desc: 'Evaluate how your trade firm can utilize key government incentive schemes to maximize duty savings and export drawbacks.',
    duration: '14:20'
  }
];

export default function About() {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isYtHovered, setIsYtHovered] = useState(false);

  useEffect(() => {
    if (isYtHovered) return;
    const interval = setInterval(() => {
      setActiveVideoIdx((prev) => (prev + 1) % youtubeVideos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isYtHovered]);

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <span className="section-subtitle">Who We Are</span>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>About Exim Guru Mantra</h1>
          <p className="section-desc" style={{ fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto' }}>
            A premier compliance and trade advisory firm based in New Delhi, Delhi. We are committed to delivering quality advisory services across corporate registration, direct taxation, and global trade incentives.
          </p>
        </div>

        {/* YouTube TV Section */}
        <div style={{ marginBottom: '5rem' }}>
          <div className="youtube-player-grid" style={{ marginTop: '0rem' }}>
            {/* Large Screen Player */}
            <div 
              className="yt-main-player"
              onMouseEnter={() => setIsYtHovered(true)}
              onMouseLeave={() => setIsYtHovered(false)}
            >
              {isYtHovered ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeVideos[activeVideoIdx].id}?autoplay=1&mute=1&enablejsapi=1&rel=0`}
                  title={youtubeVideos[activeVideoIdx].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                ></iframe>
              ) : (
                <div style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}>
                  <img 
                    src={`https://img.youtube.com/vi/${youtubeVideos[activeVideoIdx].id}/maxresdefault.jpg`} 
                    alt={youtubeVideos[activeVideoIdx].title}
                    className="yt-thumbnail-img"
                  />
                  {/* Play Button Overlay */}
                  <div className="yt-play-btn-overlay">
                    <div className="yt-play-btn">
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Info Overlay at the bottom */}
                  <div className="yt-info-overlay">
                    <span className="yt-live-tag">LATEST INSIGHT</span>
                    <h3 className="yt-overlay-title">{youtubeVideos[activeVideoIdx].title}</h3>
                  </div>
                </div>
              )}
            </div>

            {/* Playlist Sidebar */}
            <div className="yt-playlist-sidebar">
              <div className="yt-playlist-header">
                <h4>Featured Tutorials</h4>
                <span>{youtubeVideos.length} Videos</span>
              </div>
              <div className="yt-playlist-items">
                {youtubeVideos.map((video, idx) => {
                  const isActive = idx === activeVideoIdx;
                  return (
                    <div 
                      key={video.id} 
                      className={`yt-playlist-item ${isActive ? 'active' : ''}`}
                      onMouseEnter={() => {
                        setActiveVideoIdx(idx);
                        setIsYtHovered(true);
                      }}
                      onMouseLeave={() => {
                        setIsYtHovered(false);
                      }}
                    >
                      <div className="yt-playlist-thumb-wrap">
                        <img 
                          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                          alt={video.title} 
                          className="yt-playlist-thumb"
                        />
                        <span className="yt-playlist-duration">{video.duration}</span>
                      </div>
                      <div className="yt-playlist-info" style={{ flexGrow: 1, minWidth: 0 }}>
                        <h5 className="yt-playlist-title">{video.title}</h5>
                        <p className="yt-playlist-desc">{video.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Brand Showcase Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Empowering Cross-Border Commerce & Compliance
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.98rem', lineHeight: '1.6' }}>
              Exim Guru Mantra was established in New Delhi with a singular mission: to make corporate compliance, taxation, and import-export licenses friction-free for businesses. Over the past **4 years**, we have assisted startups, domestic enterprises, and global exporters in securing their operations against regulatory risks.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.98rem', lineHeight: '1.6' }}>
              Under the leadership of **Varun**, our team integrates Chartered Accountants, Company Secretaries, and customs brokers to handle everything from Income Tax return filings and GST audits to Trademark registrations and DGFT representations.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link to="/services" className="btn btn-primary">Our Portfolios</Link>
              <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
            </div>
          </div>

          <div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80" 
              alt="Team collaboration in Delhi office" 
              style={{
                width: '100%',
                height: '350px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid var(--bg-tertiary)',
                boxShadow: '0 8px 24px rgba(30, 27, 24, 0.05)'
              }}
            />
          </div>
        </div>

        {/* Pillars / Values Section */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--bg-tertiary)', borderRadius: '8px', padding: '3.5rem 3rem', marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2.5rem' }}>Our Core Pillars</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px', height: '48px', background: 'rgba(194, 29, 46, 0.05)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--primary)',
                marginBottom: '1rem'
              }}>
                <Target size={22} />
              </div>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Strict Compliance</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                We enforce the highest standard of verification logs to ensure ITR, GST returns, and ROC filing audits are error-free.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px', height: '48px', background: 'rgba(194, 29, 46, 0.05)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--primary)',
                marginBottom: '1rem'
              }}>
                <Award size={22} />
              </div>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>4+ Years Experience</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                Deep local knowledge in Delhi's regulatory boards, enabling fast clearances across ROC circles, Customs, and regional tax desks.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px', height: '48px', background: 'rgba(194, 29, 46, 0.05)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--primary)',
                marginBottom: '1rem'
              }}>
                <Users size={22} />
              </div>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Expert Advisory</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                Led by principal consultant Varun, offering clients personalized access to expert compliance councils.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Want to verify your tax setup eligibility?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Book a complimentary 15-minute diagnostic session with Varun to evaluate your corporate compliance structure.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
            Schedule Consultation Now
          </Link>
        </div>
      </div>
    </div>
  );
}
