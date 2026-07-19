import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Phone,
  Mail,
  Link as LinkIcon
} from 'lucide-react';

// Custom SVG Brand Icons because project lucide-react version doesn't include them
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96C5.12 19.08 12 19.08 12 19.08s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0-.46-5.12 29 29 0 0 0-.46-5.12z"></path>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
  </svg>
);

const iconMap = {
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
  Facebook: FacebookIcon,
  Linkedin: LinkedinIcon,
  Youtube: YoutubeIcon,
  Phone: Phone,
  Mail: Mail,
  Link: LinkIcon
};

const platforms = [
  { name: 'Instagram', defaultIcon: 'Instagram' },
  { name: 'Twitter/X', defaultIcon: 'Twitter' },
  { name: 'Facebook', defaultIcon: 'Facebook' },
  { name: 'LinkedIn', defaultIcon: 'Linkedin' },
  { name: 'YouTube', defaultIcon: 'Youtube' },
  { name: 'WhatsApp', defaultIcon: 'Phone' },
  { name: 'Email', defaultIcon: 'Mail' },
  { name: 'Website', defaultIcon: 'Link' }
];

export default function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ platform: 'Instagram', url: '', icon: 'Instagram' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Tab management
  const [activeTab, setActiveTab] = useState('socials'); // 'socials' | 'services' | 'content' | 'careers'

  // Service management states
  const [categories, setCategories] = useState([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryDivision, setNewCategoryDivision] = useState('taxation');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('');
  const [newServiceName, setNewServiceName] = useState('');

  // Info Pages content states
  const [selectedPageId, setSelectedPageId] = useState('insurance');
  const [pageBulletins, setPageBulletins] = useState([]);
  const [newBulletin, setNewBulletin] = useState({ title: '', desc: '', authority: '' });

  // Career Jobs states
  const [jobsList, setJobsList] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', dept: '', location: '', type: 'Full-Time', desc: '' });

  // Password reset states
  const [mode, setMode] = useState('login'); // 'login' | 'forgot' | 'reset'
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Check URL query parameters for reset token
  useEffect(() => {
    document.title = "Admin Dashboard | EXIM Guru Mantra";
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      setResetToken(token);
      setMode('reset');
    }
  }, []);

  // Check if credentials are saved in session storage to keep logged in on refresh
  useEffect(() => {
    const savedUser = sessionStorage.getItem('admin_username');
    const savedPass = sessionStorage.getItem('admin_password');
    if (savedUser && savedPass) {
      verifyCredentials(savedUser, savedPass, true);
    }
  }, []);

  const verifyCredentials = async (userToVerify, passToVerify, isAutoLogin = false) => {
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userToVerify, password: passToVerify })
      });

      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_username', userToVerify);
        sessionStorage.setItem('admin_password', passToVerify);
        setUsername(userToVerify);
        setPassword(passToVerify);
        fetchSocialLinks();
        fetchAdminServices(userToVerify, passToVerify);
        loadPageContent('insurance');
        loadJobsList();
      } else {
        if (!isAutoLogin) {
          setStatus({ type: 'error', message: 'Invalid admin username or password.' });
        }
        sessionStorage.removeItem('admin_username');
        sessionStorage.removeItem('admin_password');
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection to server failed.' });
    } finally {
      setLoading(false);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const res = await fetch('/api/settings/socials');
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch (err) {
      console.error('Failed to load social links:', err);
    }
  };

  const fetchAdminServices = async (user = username, pass = password) => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategoryKey(prev => prev || data[0].key);
        }
      }
    } catch (err) {
      console.error('Failed to load services in admin:', err);
    }
  };

  const loadPageContent = async (pageId = selectedPageId) => {
    try {
      const res = await fetch(`/api/page-content/${pageId}`);
      if (res.ok) {
        const data = await res.json();
        setPageBulletins(data);
      }
    } catch (err) {
      console.error('Failed to load page content in admin:', err);
    }
  };

  const loadJobsList = async () => {
    try {
      const res = await fetch('/api/careers/jobs');
      if (res.ok) {
        const data = await res.json();
        setJobsList(data);
      }
    } catch (err) {
      console.error('Failed to load jobs list in admin:', err);
    }
  };

  const handleSavePageContent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(`/api/admin/page-content/${selectedPageId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          items: pageBulletins
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: 'Page content bulletins saved successfully!' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to save page content.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection to server failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!newJob.title.trim() || !newJob.dept.trim() || !newJob.location.trim() || !newJob.desc.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all job role fields.' });
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/admin/careers/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          job: {
            title: newJob.title.trim(),
            dept: newJob.dept.trim(),
            location: newJob.location.trim(),
            type: newJob.type,
            desc: newJob.desc.trim()
          }
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: 'Job posting added/updated successfully!' });
        setNewJob({ title: '', dept: '', location: '', type: 'Full-Time', desc: '' });
        loadJobsList();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to save job posting.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection to server failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobTitle) => {
    if (!window.confirm(`Are you sure you want to delete the job posting for: "${jobTitle}"?`)) {
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(`/api/admin/careers/jobs/${encodeURIComponent(jobTitle)}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: 'Job posting removed successfully!' });
        loadJobsList();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to remove job posting.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection to server failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryTitle.trim()) {
      setStatus({ type: 'error', message: 'Category title cannot be empty.' });
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/admin/services/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          title: newCategoryTitle.trim(),
          division: newCategoryDivision
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: data.message });
        setNewCategoryTitle('');
        await fetchAdminServices();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to create category.' });
      }
    } catch (err) {
      console.error('Error creating category:', err);
      setStatus({ type: 'error', message: 'Network error. Failed to connect.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateServiceItem = async (e) => {
    e.preventDefault();
    if (!selectedCategoryKey || !newServiceName.trim()) {
      setStatus({ type: 'error', message: 'Please select a category and enter a service name.' });
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/admin/services/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          categoryKey: selectedCategoryKey,
          serviceName: newServiceName.trim()
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: data.message });
        setNewServiceName('');
        await fetchAdminServices();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to add service item.' });
      }
    } catch (err) {
      console.error('Error creating service item:', err);
      setStatus({ type: 'error', message: 'Network error. Failed to connect.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (catKey, catTitle) => {
    if (!window.confirm(`Are you sure you want to delete the subheading "${catTitle}" and all its service links? This cannot be undone.`)) {
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch(`/api/admin/services/category/${catKey}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: data.message });
        await fetchAdminServices();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to delete category.' });
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      setStatus({ type: 'error', message: 'Network error. Failed to connect.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteServiceItem = async (catKey, svcName) => {
    if (!window.confirm(`Are you sure you want to delete the service link "${svcName}"?`)) {
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/admin/services/item', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, categoryKey: catKey, serviceName: svcName })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: data.message });
        await fetchAdminServices();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to delete service item.' });
      }
    } catch (err) {
      console.error('Error deleting service item:', err);
      setStatus({ type: 'error', message: 'Network error. Failed to connect.' });
    } finally {
      setLoading(false);
    }
  };

  const handleMoveServiceItem = async (catKey, index, direction) => {
    const category = categories.find(c => c.key === catKey);
    if (!category) return;
    
    const newServicesList = [...category.services];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIdx < 0 || targetIdx >= newServicesList.length) return;
    
    const temp = newServicesList[index];
    newServicesList[index] = newServicesList[targetIdx];
    newServicesList[targetIdx] = temp;
    
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/admin/services/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          categoryKey: catKey,
          services: newServicesList
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: 'Services reordered successfully.' });
        await fetchAdminServices();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to reorder services.' });
      }
    } catch (err) {
      console.error('Error reordering services:', err);
      setStatus({ type: 'error', message: 'Network error. Failed to connect.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setStatus({ type: 'error', message: 'Username and password are required.' });
      return;
    }
    verifyCredentials(username, password);
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: data.message });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send reset link.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection to server failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setStatus({ type: 'error', message: 'Both password fields are required.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: 'Password reset successfully! Redirecting to login...' });
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          // Clear query params and return to login mode
          window.history.replaceState({}, document.title, window.location.pathname);
          setMode('login');
          setStatus({ type: 'success', message: 'Please log in using your new password.' });
        }, 3000);
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to reset password.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection to server failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = () => {
    if (!newLink.url) {
      setStatus({ type: 'error', message: 'Please enter a valid URL.' });
      return;
    }
    
    // Quick validation for protocol
    let formattedUrl = newLink.url;
    if (!/^https?:\/\//i.test(formattedUrl) && newLink.platform !== 'Email') {
      formattedUrl = `https://${formattedUrl}`;
    } else if (newLink.platform === 'Email' && !/^mailto:/i.test(formattedUrl)) {
      formattedUrl = `mailto:${formattedUrl}`;
    }

    const updated = [...links, { ...newLink, url: formattedUrl }];
    setLinks(updated);
    setNewLink({ platform: 'Instagram', url: '', icon: 'Instagram' });
    setStatus({ type: 'success', message: 'Link added to list. Remember to save changes.' });
  };

  const handleDeleteLink = (index) => {
    const updated = links.filter((_, idx) => idx !== index);
    setLinks(updated);
    setStatus({ type: 'success', message: 'Link removed from list. Remember to save changes.' });
  };

  const handleSave = async () => {
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/settings/socials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, links })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Social links updated successfully in database!' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to save changes.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Server connection failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformChange = (e) => {
    const platformName = e.target.value;
    const selected = platforms.find(p => p.name === platformName);
    setNewLink(prev => ({
      ...prev,
      platform: platformName,
      icon: selected ? selected.defaultIcon : 'Link'
    }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_username');
    sessionStorage.removeItem('admin_password');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setLinks([]);
    setStatus({ type: '', message: '' });
  };

  // Login / Forgot / Reset Views Render
  if (!isAuthenticated) {
    return (
      <div className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '440px' }}>
          <div className="card" style={{ padding: '2.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--primary-glow)',
                color: 'var(--primary)',
                marginBottom: '1rem'
              }}>
                <Lock size={26} />
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                {mode === 'login' && 'Admin Control'}
                {mode === 'forgot' && 'Reset Password'}
                {mode === 'reset' && 'Set New Password'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {mode === 'login' && 'Enter the official credentials to update website settings.'}
                {mode === 'forgot' && 'We will send a secure password reset link to the official email: eximgurumantra@gmail.com'}
                {mode === 'reset' && 'Enter your new admin password below to apply updates.'}
              </p>
            </div>

            {status.message && (
              <div style={{
                background: status.type === 'error' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                border: `1px solid ${status.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
                color: status.type === 'error' ? 'var(--error)' : 'var(--success)',
                padding: '0.8rem 1rem',
                borderRadius: '6px',
                marginBottom: '1.5rem',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {status.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                <span style={{ flex: 1 }}>{status.message}</span>
              </div>
            )}

            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" htmlFor="username">Username</label>
                  <input 
                    type="text"
                    id="username"
                    className="form-input"
                    placeholder="e.g. exim_admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="password">Password</label>
                  <input 
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }}
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Access Dashboard'}
                </button>

                <div style={{ textAlign: 'center' }}>
                  <button 
                    type="button"
                    onClick={() => { setMode('forgot'); setStatus({ type: '', message: '' }); }}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            )}

            {mode === 'forgot' && (
              <form onSubmit={handleForgotSubmit}>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }}
                  disabled={loading}
                >
                  {loading ? 'Sending Request...' : 'Send Reset Link'}
                </button>

                <div style={{ textAlign: 'center' }}>
                  <button 
                    type="button"
                    onClick={() => { setMode('login'); setStatus({ type: '', message: '' }); }}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )}

            {mode === 'reset' && (
              <form onSubmit={handleResetSubmit}>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" htmlFor="newPassword">New Password</label>
                  <input 
                    type="password"
                    id="newPassword"
                    className="form-input"
                    placeholder="Min 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                  <input 
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }}
                  disabled={loading}
                >
                  {loading ? 'Updating Password...' : 'Save New Password'}
                </button>

                <div style={{ textAlign: 'center' }}>
                  <button 
                    type="button"
                    onClick={() => { setMode('login'); setStatus({ type: '', message: '' }); }}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Cancel Reset
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Render
  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-subtitle">Website Settings</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Admin Control Center</h2>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Logout
          </button>
        </div>

        {/* Tab Selection Row */}
        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem', borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => { setActiveTab('socials'); setStatus({ type: '', message: '' }); }}
            className={`btn ${activeTab === 'socials' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
          >
            Social Links
          </button>
          <button 
            onClick={() => { setActiveTab('services'); setStatus({ type: '', message: '' }); }}
            className={`btn ${activeTab === 'services' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
          >
            Services & Dropdowns
          </button>
          <button 
            onClick={() => { setActiveTab('content'); setStatus({ type: '', message: '' }); }}
            className={`btn ${activeTab === 'content' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
          >
            Manage Content
          </button>
          <button 
            onClick={() => { setActiveTab('careers'); setStatus({ type: '', message: '' }); }}
            className={`btn ${activeTab === 'careers' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
          >
            Manage Careers
          </button>
        </div>

        {/* Action Status Notification */}
        {status.message && (
          <div style={{
            background: status.type === 'error' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
            border: `1px solid ${status.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
            color: status.type === 'error' ? 'var(--error)' : 'var(--success)',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
            <span>{status.message}</span>
          </div>
        )}

        {/* TAB 1: SOCIAL LINKS MANAGEMENT */}
        {activeTab === 'socials' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }} className="admin-grid-layout">
            {/* List of existing links */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '0.75rem' }}>
                Active Social Links
              </h3>

              {links.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>
                  No social links configured yet. Use the panel on the right to add some.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {links.map((link, idx) => {
                    const IconComp = iconMap[link.icon] || LinkIcon;
                    return (
                      <div 
                        key={idx} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          padding: '0.85rem 1rem', 
                          background: 'var(--bg-primary)', 
                          borderRadius: '6px',
                          border: '1px solid var(--bg-tertiary)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: 0 }}>
                          <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                            <IconComp size={18} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.1rem' }}>{link.platform}</h4>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={{ 
                                fontSize: '0.8rem', 
                                color: 'var(--text-secondary)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.2rem',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              <span>{link.url}</span>
                              <ExternalLink size={10} style={{ flexShrink: 0 }} />
                            </a>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleDeleteLink(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            transition: 'var(--transition-fast)'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--error)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                          title="Delete Link"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {links.length > 0 && (
                <button 
                  onClick={handleSave} 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '2rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
                  disabled={loading}
                >
                  <Save size={18} />
                  <span>{loading ? 'Saving Changes...' : 'Save Configuration'}</span>
                </button>
              )}
            </div>

            {/* Add link panel */}
            <div className="card" style={{ padding: '2rem', height: 'fit-content' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '0.75rem' }}>
                Add New Channel
              </h3>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" htmlFor="platform">Platform</label>
                <select 
                  id="platform" 
                  className="form-select"
                  value={newLink.platform}
                  onChange={handlePlatformChange}
                >
                  {platforms.map((p, idx) => (
                    <option key={idx} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" htmlFor="url">URL / Destination</label>
                <input 
                  type="text" 
                  id="url"
                  className="form-input"
                  placeholder={newLink.platform === 'Email' ? 'eximgurumantra@gmail.com' : 'e.g. instagram.com/eximgurumantra'}
                  value={newLink.url}
                  onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" htmlFor="icon">Display Icon</label>
                <select 
                  id="icon" 
                  className="form-select"
                  value={newLink.icon}
                  onChange={(e) => setNewLink(prev => ({ ...prev, icon: e.target.value }))}
                >
                  <option value="Instagram">Instagram (Brand)</option>
                  <option value="Twitter">Twitter/X (Brand)</option>
                  <option value="Facebook">Facebook (Brand)</option>
                  <option value="Linkedin">LinkedIn (Brand)</option>
                  <option value="Youtube">YouTube (Brand)</option>
                  <option value="Phone">Phone (Call)</option>
                  <option value="Mail">Mail (Email)</option>
                  <option value="Link">Generic Link</option>
                </select>
              </div>

              <button 
                onClick={handleAddLink} 
                className="btn btn-secondary" 
                style={{ width: '100%', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
              >
                <Plus size={18} />
                <span>Add to List</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES & DROPDOWN MANAGEMENT */}
        {activeTab === 'services' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }} className="admin-grid-layout">
            
            {/* List of current service categories */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '0.75rem' }}>
                Active Portfolios
              </h3>

              {categories.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>
                  No services configured in database.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {categories.map((cat) => (
                    <div key={cat.key} style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--bg-tertiary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '700' }}>{cat.title}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>/services/category/{cat.key}</span>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.2rem' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', background: 'var(--bg-secondary)', padding: '0.1rem 0.4rem', borderRadius: '3px', border: '1px solid var(--bg-tertiary)', fontWeight: '600' }}>
                              Group: {cat.division === 'import-export' ? 'Import-Export' : cat.division === 'certification' ? 'Certification' : 'Taxation'}
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteCategory(cat.key, cat.title)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem', transition: '0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--error)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                          title="Delete Subheading Portfolio"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.4' }}>
                        {cat.desc}
                      </p>

                      <div style={{ borderTop: '1px solid var(--bg-tertiary)', paddingTop: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Service Links & Reorder:
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {cat.services.map((svc, idx) => (
                            <div 
                              key={idx} 
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                background: 'var(--bg-secondary)', 
                                padding: '0.4rem 0.75rem', 
                                borderRadius: '4px',
                                fontSize: '0.82rem',
                                border: '1px solid var(--bg-tertiary)'
                              }}
                            >
                              <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{svc}</span>
                              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                {/* Up Arrow */}
                                <button
                                  type="button"
                                  onClick={() => handleMoveServiceItem(cat.key, idx, 'up')}
                                  disabled={idx === 0}
                                  style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    color: idx === 0 ? 'var(--text-muted)' : 'var(--primary)', 
                                    cursor: idx === 0 ? 'default' : 'pointer',
                                    fontSize: '0.75rem',
                                    opacity: idx === 0 ? 0.35 : 1,
                                    padding: '0.1rem 0.3rem'
                                  }}
                                  title="Move Up"
                                >
                                  ▲
                                </button>
                                {/* Down Arrow */}
                                <button
                                  type="button"
                                  onClick={() => handleMoveServiceItem(cat.key, idx, 'down')}
                                  disabled={idx === cat.services.length - 1}
                                  style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    color: idx === cat.services.length - 1 ? 'var(--text-muted)' : 'var(--primary)', 
                                    cursor: idx === cat.services.length - 1 ? 'default' : 'pointer',
                                    fontSize: '0.75rem',
                                    opacity: idx === cat.services.length - 1 ? 0.35 : 1,
                                    padding: '0.1rem 0.3rem'
                                  }}
                                  title="Move Down"
                                >
                                  ▼
                                </button>
                                {/* Delete Link */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteServiceItem(cat.key, svc)}
                                  style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    color: 'var(--text-muted)', 
                                    cursor: 'pointer',
                                    padding: '0.2rem',
                                    marginLeft: '0.25rem',
                                    transition: '0.2s'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--error)'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                                  title="Delete Service Link"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Creation Panels (Right Column) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Card A: Create Dynamic Category */}
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '0.5rem' }}>
                  AI Create Subheading
                </h3>
                <form onSubmit={handleCreateCategory}>
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label" htmlFor="catTitle">Subheading / Category Title</label>
                    <input 
                      type="text" 
                      id="catTitle" 
                      className="form-input" 
                      placeholder="e.g. Customs Auditing"
                      value={newCategoryTitle}
                      onChange={(e) => setNewCategoryTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label" htmlFor="catDivision">Parent Category Group</label>
                    <select
                      id="catDivision"
                      className="form-select"
                      value={newCategoryDivision}
                      onChange={(e) => setNewCategoryDivision(e.target.value)}
                    >
                      <option value="import-export">Import-Export Services</option>
                      <option value="taxation">Taxation & Auditing Services</option>
                      <option value="certification">Certification & Licensing Services</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-secondary" 
                    style={{ width: '100%', padding: '0.65rem' }}
                    disabled={loading}
                  >
                    {loading ? 'Generating Content...' : 'AI Generate Category'}
                  </button>
                </form>
              </div>

              {/* Card B: Create Service Link */}
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '0.5rem' }}>
                  Add Service Link
                </h3>
                <form onSubmit={handleCreateServiceItem}>
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label" htmlFor="targetCat">Target Subheading</label>
                    <select 
                      id="targetCat" 
                      className="form-select"
                      value={selectedCategoryKey}
                      onChange={(e) => setSelectedCategoryKey(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <option key={cat.key} value={cat.key}>{cat.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label" htmlFor="svcName">Service Name</label>
                    <input 
                      type="text" 
                      id="svcName" 
                      className="form-input" 
                      placeholder="e.g. RoDTEP Claim Filing"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-secondary" 
                    style={{ width: '100%', padding: '0.65rem' }}
                    disabled={loading}
                  >
                    Add Service Item
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: MANAGE DYNAMIC CONTENT (INFO PAGES) */}
        {activeTab === 'content' && (
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '0.75rem' }}>
              Edit Informational Page Bulletins
            </h3>

            <div className="form-group" style={{ marginBottom: '1.5rem', maxWidth: '300px' }}>
              <label className="form-label" htmlFor="pageSelect">Select Page to Edit</label>
              <select 
                id="pageSelect" 
                className="form-select"
                value={selectedPageId}
                onChange={(e) => setSelectedPageId(e.target.value)}
              >
                <option value="insurance">Insurance Services Page</option>
                <option value="certificates">Certificates & Registrations Page</option>
                <option value="buying-house">Buying House (Procurement) Page</option>
              </select>
            </div>

            {/* Bulletins List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {pageBulletins.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{
                    border: '1px solid var(--bg-tertiary)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    background: '#ffffff',
                    position: 'relative'
                  }}
                >
                  <button 
                    onClick={() => {
                      const updated = pageBulletins.filter((_, i) => i !== idx);
                      setPageBulletins(updated);
                    }}
                    className="btn btn-secondary"
                    style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                  >
                    Delete Bullet
                  </button>

                  <div className="form-group" style={{ marginBottom: '0.75rem', width: '80%' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={item.title || ''}
                      onChange={(e) => {
                        const updated = [...pageBulletins];
                        updated[idx].title = e.target.value;
                        setPageBulletins(updated);
                      }}
                    />
                  </div>

                  {selectedPageId === 'certificates' && (
                    <div className="form-group" style={{ marginBottom: '0.75rem', width: '80%' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Governing Authority</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={item.authority || ''}
                        onChange={(e) => {
                          const updated = [...pageBulletins];
                          updated[idx].authority = e.target.value;
                          setPageBulletins(updated);
                        }}
                      />
                    </div>
                  )}

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Description Paragraph</label>
                    <textarea 
                      rows="2"
                      className="form-input" 
                      style={{ resize: 'none', fontFamily: 'inherit', fontSize: '0.88rem' }}
                      value={item.desc || ''}
                      onChange={(e) => {
                        const updated = [...pageBulletins];
                        updated[idx].desc = e.target.value;
                        setPageBulletins(updated);
                      }}
                    />
                  </div>
                </div>
              ))}

              {pageBulletins.length === 0 && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>
                  No bulletins configured for this page. Add some below.
                </p>
              )}
            </div>

            {/* Add New Bulletin Form */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--bg-tertiary)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Add New Bulletin / Section</h4>
              <div style={{ display: 'grid', gridTemplateColumns: selectedPageId === 'certificates' ? '1fr 1fr' : '1fr', gap: '1rem', marginBottom: '1rem' }} className="responsive-grid-calculator">
                <div>
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Air Cargo Cover / MSME Register"
                    value={newBulletin.title}
                    onChange={(e) => setNewBulletin(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                {selectedPageId === 'certificates' && (
                  <div>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Governing Authority</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. DGFT / FSSAI / Ministry"
                      value={newBulletin.authority}
                      onChange={(e) => setNewBulletin(prev => ({ ...prev, authority: e.target.value }))}
                    />
                  </div>
                )}
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Description Paragraph</label>
                <textarea 
                  rows="2"
                  className="form-input" 
                  style={{ resize: 'none', fontFamily: 'inherit', fontSize: '0.88rem' }}
                  placeholder="Explain coverages, licensing requirements, or services audits..."
                  value={newBulletin.desc}
                  onChange={(e) => setNewBulletin(prev => ({ ...prev, desc: e.target.value }))}
                />
              </div>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
                onClick={() => {
                  if (!newBulletin.title.trim() || !newBulletin.desc.trim()) {
                    alert('Title and description cannot be empty!');
                    return;
                  }
                  setPageBulletins(prev => [...prev, { ...newBulletin }]);
                  setNewBulletin({ title: '', desc: '', authority: '' });
                }}
              >
                Add Bulletin to Page List
              </button>
            </div>

            {/* Save Buttons */}
            <form onSubmit={handleSavePageContent}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.8rem', fontWeight: 700 }}
                disabled={loading}
              >
                Save Page Bulletins to Server
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: MANAGE CAREERS (JOBS POSTING) */}
        {activeTab === 'careers' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }} className="admin-grid-layout">
            
            {/* Active Jobs List */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '0.75rem' }}>
                Active Job Openings
              </h3>

              {jobsList.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>
                  No open career roles configured yet. Add some using the panel on the right.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {jobsList.map((job, idx) => (
                    <div 
                      key={idx}
                      style={{
                        border: '1px solid var(--bg-tertiary)',
                        borderRadius: '8px',
                        padding: '1.25rem',
                        background: '#ffffff',
                        position: 'relative'
                      }}
                    >
                      <button 
                        onClick={() => handleDeleteJob(job.title)}
                        className="btn btn-secondary"
                        style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--error)' }}
                      >
                        Delete Job
                      </button>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)', width: '80%' }}>
                        {job.title}
                      </h4>
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                        <span>{job.dept}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                        {job.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Job Posting form */}
            <div>
              <div className="card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '0.75rem' }}>
                  Post New Job Opening
                </h3>

                <form onSubmit={handleSaveJob}>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Job Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Customs Broker Exec"
                      value={newJob.title}
                      onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Department</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Customs Clearance"
                      value={newJob.dept}
                      onChange={(e) => setNewJob(prev => ({ ...prev, dept: e.target.value }))}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Location</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. New Delhi Office"
                      value={newJob.location}
                      onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Job Type</label>
                    <select 
                      className="form-select"
                      value={newJob.type}
                      onChange={(e) => setNewJob(prev => ({ ...prev, type: e.target.value }))}
                    >
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Description / Qualifications</label>
                    <textarea 
                      rows="4"
                      className="form-input" 
                      style={{ resize: 'none', fontFamily: 'inherit', fontSize: '0.88rem' }}
                      placeholder="List core job tasks, HSN clearing operations, work schedules..."
                      value={newJob.desc}
                      onChange={(e) => setNewJob(prev => ({ ...prev, desc: e.target.value }))}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '0.75rem', fontWeight: 700 }}
                    disabled={loading}
                  >
                    Post Career Role
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
