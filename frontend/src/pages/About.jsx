import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Heart, Users, Target } from 'lucide-react';

const fallbackVideos = [
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
  useEffect(() => {
    document.title = "About Us | EXIM Guru Mantra";
  }, []);

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
              Under the leadership of **Varun Gupta**, our team integrates Chartered Accountants, Company Secretaries, and customs brokers to handle everything from Income Tax return filings and GST audits to Trademark registrations and DGFT representations.
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
                Led by principal consultant Varun Gupta, offering clients personalized access to expert compliance councils.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Want to verify your tax setup eligibility?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Book a complimentary 15-minute diagnostic session with Varun Gupta to evaluate your corporate compliance structure.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
            Schedule Consultation Now
          </Link>
        </div>
      </div>
    </div>
  );
}
