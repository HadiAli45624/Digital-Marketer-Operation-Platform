import { useState } from "react";
import AppLayout from "../components/AppLayout";
import "./ReportGenerator.css";
import ReactMarkdown from 'react-markdown'

const BASE_URL = "http://localhost:5000";

export default function ReportGenerator() {
  const [form, setForm] = useState({
    name: "",
    period: "",
    goal: "",
    notes: "",
  });

  const [google, setGoogle] = useState({
    spend: "",
    impressions: "",
    clicks: "",
    conversions: "",
    cvalue: "",
  });

  const [meta, setMeta] = useState({
    spend: "",
    impressions: "",
    clicks: "",
    conversions: "",
    cvalue: "",
  });

  const [showMore, setShowMore] = useState(false);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleGoogle = (e) =>
    setGoogle({ ...google, [e.target.name]: e.target.value });
  const handleMeta = (e) =>
    setMeta({ ...meta, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.period) {
      setError("Client name and reporting period are required.");
      return;
    }
    setError("");
    setLoading(true);
    setReport("");
    try {
      const res = await fetch(`${BASE_URL}/project_report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, google, meta }),
      });
      const data = await res.json();
      setReport(data.report);
    } catch (err) {
      setError("Failed to connect to server. Is Flask running?");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(report);
  };

  return (
    <AppLayout>
      <div className="report-page">
        <div className="page-header">
          <p className="page-eyebrow">Module 01</p>
          <h1 className="page-title">Report Generator</h1>
          <p className="page-subtitle">
            Enter campaign data and get a client-ready performance report.
          </p>
        </div>

        <div className="report-layout">
          {/* ── FORM ── */}
          <div className="report-form-col">

            {/* Client Info */}
            <div className="form-section">
              <h2 className="form-section-title">Client Info</h2>
              <div className="form-group">
                <label>Client Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleForm}
                  placeholder="e.g. Ahmad Textiles"
                />
              </div>
              <div className="form-group">
                <label>Reporting Period *</label>
                <input
                  name="period"
                  value={form.period}
                  onChange={handleForm}
                  placeholder="e.g. May 2025"
                />
              </div>
              <div className="form-group">
                <label>Campaign Goal</label>
                <input
                  name="goal"
                  value={form.goal}
                  onChange={handleForm}
                  placeholder="e.g. Lead generation, Brand awareness"
                />
              </div>
            </div>

            {/* Google Ads */}
            <div className="form-section">
              <h2 className="form-section-title">Google Ads Metrics</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Spend ($)</label>
                  <input
                    name="spend"
                    value={google.spend}
                    onChange={handleGoogle}
                    placeholder="e.g. 1200"
                  />
                </div>
                <div className="form-group">
                  <label>Impressions</label>
                  <input
                    name="impressions"
                    value={google.impressions}
                    onChange={handleGoogle}
                    placeholder="e.g. 45000"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Clicks</label>
                  <input
                    name="clicks"
                    value={google.clicks}
                    onChange={handleGoogle}
                    placeholder="e.g. 1800"
                  />
                </div>
                <div className="form-group">
                  <label>Conversions</label>
                  <input
                    name="conversions"
                    value={google.conversions}
                    onChange={handleGoogle}
                    placeholder="e.g. 120"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Conversion Value ($)</label>
                <input
                  name="cvalue"
                  value={google.cvalue}
                  onChange={handleGoogle}
                  placeholder="e.g. 5040"
                />
              </div>
            </div>

            {/* Meta */}
            <div className="form-section">
              <h2 className="form-section-title">Meta Metrics</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Spend ($)</label>
                  <input
                    name="spend"
                    value={meta.spend}
                    onChange={handleMeta}
                    placeholder="e.g. 800"
                  />
                </div>
                <div className="form-group">
                  <label>Impressions</label>
                  <input
                    name="impressions"
                    value={meta.impressions}
                    onChange={handleMeta}
                    placeholder="e.g. 30000"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Clicks</label>
                  <input
                    name="clicks"
                    value={meta.clicks}
                    onChange={handleMeta}
                    placeholder="e.g. 960"
                  />
                </div>
                <div className="form-group">
                  <label>Conversions</label>
                  <input
                    name="conversions"
                    value={meta.conversions}
                    onChange={handleMeta}
                    placeholder="e.g. 74"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Conversion Value ($)</label>
                <input
                  name="cvalue"
                  value={meta.cvalue}
                  onChange={handleMeta}
                  placeholder="e.g. 3100"
                />
              </div>
            </div>

            {/* More Options */}
            <div className="form-section">
              <button
                className="more-options-btn"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "▲ Hide options" : "▼ More options"}
              </button>
              {showMore && (
                <div className="form-group" style={{ marginTop: "1rem" }}>
                  <label>Additional Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleForm}
                    placeholder="Any extra context for the AI — client preferences, known issues, campaign changes mid-period..."
                    rows={4}
                  />
                </div>
              )}
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              className="btn-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Report"}
            </button>
          </div>

          {/* ── OUTPUT ── */}
          <div className="report-output-col">
            <div className="output-header">
              <h2 className="form-section-title">Report Output</h2>
              {report && (
                <button className="copy-btn" onClick={handleCopy}>
                  Copy
                </button>
              )}
            </div>
            <div className={`output-box ${report ? "has-content" : ""}`}>
              {loading && (
                <div className="output-loading">
                  <span className="spinner" />
                  <p>Generating your report...</p>
                </div>
              )}
              {!loading && !report && (
                <p className="output-placeholder">
                  Your report will appear here.
                </p>
              )}
              {!loading && report && (
                <div className="output-text">
                <ReactMarkdown>{report}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}