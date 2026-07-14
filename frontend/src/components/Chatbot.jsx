import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickPrompts = [
  { text: 'How to apply for IEC Code?', action: 'iec' },
  { text: 'Estimate Customs Duty', action: 'duty' },
  { text: 'Consultation with Varun', action: 'consult' },
  { text: 'Browse Offered Services', action: 'services' }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am your EXIM Guru Assistant. How can I help you navigate global trade compliance and customs incentives today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Trigger bot typing
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let replyElement = null;

      const lowerText = text.toLowerCase();

      if (lowerText.includes('iec') || lowerText.includes('import export code') || lowerText.includes('apply')) {
        replyText = 'To apply for an Import Export Code (IEC), you will need: \n1. PAN Card (Individual/Company)\n2. Active Current Account (Cancelled Cheque)\n3. Digital Signature (DSC)\n4. Business Address Proof.\n\nWe can get your IEC issued within 24 hours!';
      } else if (lowerText.includes('duty') || lowerText.includes('calculate') || lowerText.includes('calculator') || lowerText.includes('tariff') || lowerText.includes('insurance') || lowerText.includes('insur')) {
        replyText = 'For global procurement sourcing, supply chain audits, or cargo transit insurance (Air, Marine, Surface covers), check our dedicated buying house or cargo insurance service desks below!';
        replyElement = (
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link 
              to="/buying-house" 
              onClick={() => setIsOpen(false)}
              className="btn btn-primary" 
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', borderRadius: '4px', display: 'inline-block' }}
            >
              Buying House Desk
            </Link>
            <Link 
              to="/insurance" 
              onClick={() => setIsOpen(false)}
              className="btn btn-secondary" 
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', borderRadius: '4px', display: 'inline-block' }}
            >
              Transit Insurance Cover
            </Link>
          </div>
        );
      } else if (lowerText.includes('consult') || lowerText.includes('varun') || lowerText.includes('contact') || lowerText.includes('appointment')) {
        replyText = 'You can book a direct diagnostic briefing with our principal advisor, Varun Gupta, by calling us at +91 88104 00251, or by submitting the contact form on our Contact & Support page.';
        replyElement = (
          <div style={{ marginTop: '0.5rem' }}>
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="btn btn-primary" 
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '4px', display: 'inline-block' }}
            >
              Go to Contact Page
            </Link>
          </div>
        );
      } else if (lowerText.includes('service') || lowerText.includes('offer') || lowerText.includes('categories')) {
        replyText = 'We offer end-to-end EXIM and legal advisory including:\n- DGFT Licensing & RCMC Profile\n- Customs Clearance & Duty Incentives\n- Taxation compliance, GST Audits & Litigation\n- Trademark & Business Registrations.';
      } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
        replyText = 'Hi there! Feel free to ask me anything about import-export licensing, ROC company filing, GST litigation, or customs calculations.';
      } else {
        replyText = 'Thank you for your message! To get detailed support or verify your compliance documents, you can schedule a call directly with Varun Gupta at +91 88104 00251, or submit a query on our Contact page.';
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-bot',
          sender: 'bot',
          text: replyText,
          element: replyElement,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800); // Realistic 800ms response time
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button 
        className={`chat-trigger-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Chatbot Support"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window Box */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-bot-avatar">
                <Bot size={18} />
                <span className="chat-online-dot"></span>
              </div>
              <div className="chat-header-title-wrap">
                <h4 className="chat-bot-title">EXIM Guru Bot</h4>
                <span className="chat-bot-subtitle">24/7 Global Compliance Desk</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <X size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="chat-messages-area">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message-bubble-wrap ${msg.sender}`}>
                <div className="chat-message-bubble">
                  <p className="chat-message-text">{msg.text}</p>
                  {msg.element && msg.element}
                  <span className="chat-message-time">{msg.time}</span>
                </div>
              </div>
            ))}
            
            {/* Typing Loader */}
            {isTyping && (
              <div className="chat-message-bubble-wrap bot">
                <div className="chat-message-bubble typing-bubble">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Suggestions */}
          <div className="chat-quick-suggestions">
            {quickPrompts.map((prompt, i) => (
              <button 
                key={i} 
                className="chat-suggestion-chip"
                onClick={() => handleSend(prompt.text)}
              >
                <HelpCircle size={11} />
                <span>{prompt.text}</span>
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form 
            className="chat-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input 
              type="text" 
              placeholder="Ask about IEC, duty, ROC filings..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="chat-input-field"
            />
            <button type="submit" className="chat-send-btn" disabled={!inputText.trim()}>
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
