import React, { useState } from 'react';
import { Calculator, ArrowDownCircle, ArrowUpCircle, RefreshCw, Info, AlertTriangle } from 'lucide-react';

export default function DutyCalculator() {
  const [formData, setFormData] = useState({
    hsCode: '',
    flowType: 'import',
    country: 'USA',
    cifValue: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!formData.hsCode || !formData.cifValue) {
      setError('Please fill in both the HS Code and Value fields.');
      return;
    }

    if (formData.hsCode.length < 2 || isNaN(formData.hsCode)) {
      setError('Please enter a valid numeric HS Code (at least 2 digits).');
      return;
    }

    const value = parseFloat(formData.cifValue);
    if (isNaN(value) || value <= 0) {
      setError('Value must be a positive number.');
      return;
    }

    setLoading(true);

    try {
      // Connect to Express backend API
      const response = await fetch('http://localhost:5005/api/duty-estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate duty estimates');
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Server connection failed. Showing simulated offline estimates.');
      
      // Fallback local calculations in case server is not running
      simulateOfflineCalculation();
    } finally {
      setLoading(false);
    }
  };

  const simulateOfflineCalculation = () => {
    const val = parseFloat(formData.cifValue);
    const code = formData.hsCode.substring(0, 2);
    let bcdRate = formData.flowType === 'import' ? 10.0 : 0;
    let igstRate = 18;
    let drawbackRate = 1.5;

    if (code === '84' || code === '85') {
      bcdRate = formData.flowType === 'import' ? 7.5 : 0;
      igstRate = 18;
      drawbackRate = 1.2;
    }

    const basicDuty = val * (bcdRate / 100);
    const sws = formData.flowType === 'import' ? basicDuty * 0.10 : 0;
    const igst = (val + basicDuty + sws) * (igstRate / 100);
    const total = basicDuty + sws + igst;
    const drawback = formData.flowType === 'export' ? val * (drawbackRate / 100) : 0;

    setResult({
      hsCode: formData.hsCode,
      flowType: formData.flowType,
      country: formData.country,
      cifValue: val,
      rates: {
        basicDutyRate: bcdRate,
        socialWelfareSurchargeRate: formData.flowType === 'import' ? 10 : 0,
        additionalTaxRate: igstRate,
        drawbackRate
      },
      breakdown: {
        basicDuty,
        socialWelfareSurcharge: sws,
        additionalTax: igst,
        totalDuty: formData.flowType === 'import' ? total : 0,
        estimatedDrawback: drawback
      }
    });
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Compliance Calculator</span>
          <h2 className="section-title">Duties & Drawback Estimator</h2>
          <p className="section-desc">
            Obtain immediate estimates of Basic Customs Duty (BCD), Social Welfare Surcharges, and IGST for imports, or Duty Drawback rebates for exports.
          </p>
        </div>

        <div className="calc-wrapper">
          <div className="calc-grid">
            {/* Input Form */}
            <div>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calculator size={22} style={{ color: 'var(--primary)' }} />
                <span>Declaration Details</span>
              </h3>

              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: 'var(--error)',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <AlertTriangle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleCalculate}>
                <div className="form-group">
                  <label className="form-label">Flow Direction</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, flowType: 'import' }))}
                      style={{
                        padding: '0.75rem',
                        background: formData.flowType === 'import' ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${formData.flowType === 'import' ? 'var(--primary)' : 'var(--card-border)'}`,
                        color: formData.flowType === 'import' ? '#ffffff' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <ArrowDownCircle size={18} style={{ color: '#60a5fa' }} />
                      <span>Import Duty</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, flowType: 'export' }))}
                      style={{
                        padding: '0.75rem',
                        background: formData.flowType === 'export' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${formData.flowType === 'export' ? 'var(--accent)' : 'var(--card-border)'}`,
                        color: formData.flowType === 'export' ? '#ffffff' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <ArrowUpCircle size={18} style={{ color: 'var(--accent)' }} />
                      <span>Export Benefits</span>
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="hsCode" className="form-label">HS Code (e.g. 8471)</label>
                    <input
                      type="text"
                      id="hsCode"
                      name="hsCode"
                      maxLength="8"
                      placeholder="Enter 4 to 8 digit code"
                      className="form-input"
                      value={formData.hsCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country" className="form-label">Trading Country</label>
                    <select
                      id="country"
                      name="country"
                      className="form-select"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="USA">United States (USA)</option>
                      <option value="Germany">Germany (EU)</option>
                      <option value="China">China</option>
                      <option value="Japan">Japan</option>
                      <option value="UAE">United Arab Emirates (UAE)</option>
                      <option value="UK">United Kingdom (UK)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cifValue" className="form-label">
                    {formData.flowType === 'import' ? 'Assessed CIF Value (INR)' : 'FOB Export Value (INR)'}
                  </label>
                  <input
                    type="number"
                    id="cifValue"
                    name="cifValue"
                    placeholder="e.g. 500000"
                    className="form-input"
                    value={formData.cifValue}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      <span>Fetching Duty Tariff...</span>
                    </>
                  ) : (
                    <span>Calculate Tariff Estimate</span>
                  )}
                </button>
              </form>
            </div>

            {/* Results Display */}
            <div>
              <div className="calc-result-box">
                {!result ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <Info size={36} style={{ color: 'var(--text-muted)', marginBottom: '1rem', strokeWidth: 1.5 }} />
                    <h4 style={{ marginBottom: '0.5rem', color: '#ffffff' }}>Awaiting Calculations</h4>
                    <p style={{ fontSize: '0.9rem', maxWidth: '260px', margin: '0 auto' }}>
                      Enter your HS code, declared transaction values, and hit calculate to generate estimates.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Estimated Summary</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                      HS Code: <strong>{result.hsCode}</strong> | Type: <strong>{result.flowType.toUpperCase()}</strong>
                    </p>

                    {result.flowType === 'import' ? (
                      <>
                        <div style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Customs Liability</span>
                          <div className="calc-final-amount">{formatCurrency(result.breakdown.totalDuty)}</div>
                        </div>

                        <table className="calc-table">
                          <thead>
                            <tr>
                              <th>Duty Component</th>
                              <th style={{ textAlign: 'right' }}>Rate</th>
                              <th style={{ textAlign: 'right' }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Basic Customs Duty (BCD)</td>
                              <td style={{ textAlign: 'right' }}>{result.rates.basicDutyRate}%</td>
                              <td style={{ textAlign: 'right' }}>{formatCurrency(result.breakdown.basicDuty)}</td>
                            </tr>
                            <tr>
                              <td>Social Welfare Surcharge (SWS)</td>
                              <td style={{ textAlign: 'right' }}>{result.rates.socialWelfareSurchargeRate}%</td>
                              <td style={{ textAlign: 'right' }}>{formatCurrency(result.breakdown.socialWelfareSurcharge)}</td>
                            </tr>
                            <tr>
                              <td>Integrated GST (IGST)</td>
                              <td style={{ textAlign: 'right' }}>{result.rates.additionalTaxRate}%</td>
                              <td style={{ textAlign: 'right' }}>{formatCurrency(result.breakdown.additionalTax)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <>
                        <div style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Estimated Duty Drawback Rebate</span>
                          <div className="calc-final-amount" style={{ color: 'var(--accent)' }}>
                            {formatCurrency(result.breakdown.estimatedDrawback)}
                          </div>
                        </div>

                        <table className="calc-table">
                          <thead>
                            <tr>
                              <th>Benefit Component</th>
                              <th style={{ textAlign: 'right' }}>Rate</th>
                              <th style={{ textAlign: 'right' }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Drawback Rebate (DBK)</td>
                              <td style={{ textAlign: 'right' }}>{result.rates.drawbackRate}%</td>
                              <td style={{ textAlign: 'right' }}>{formatCurrency(result.breakdown.estimatedDrawback)}</td>
                            </tr>
                            <tr>
                              <td>RoDTEP Scrap Value</td>
                              <td style={{ textAlign: 'right' }}>Exempt</td>
                              <td style={{ textAlign: 'right' }}>Eligible</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}

                    <div style={{
                      marginTop: '1.5rem',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <Info size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span>Note: These values are estimated simulation markers and are subject to DGFT Notification updates.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
