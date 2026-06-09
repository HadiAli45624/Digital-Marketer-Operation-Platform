import { useState } from "react";
import AppLayout from "../components/AppLayout";
import "./CopyCrafter.css";

const BASE_URL = "http://localhost:5000";

const PLATFORMS = ["Instagram", "Facebook", "Google", "LinkedIn", "TikTok", "Twitter/X", "YouTube"];
const TYPES = ["Image Ad", "Video Ad", "Carousel", "Story", "Search Ad", "Display Ad"];
const TONES = ["Professional", "Casual", "Witty", "Urgent", "Inspirational", "Minimalist"];
const FORMATS = ["Short Form", "Long Form", "Bullet Points", "Single Hook", "Question-Led"];

export default function CopyCrafter() {
  const [form, setForm] = useState({
    name: "",
    industry: "",
    platform: "",
    type: "",
    numberofcopies: 1,
    icp: "",
    price: "",
    tone: "",
    format: "",
    info: "",
  });

  const [showMore, setShowMore] = useState(false);
  const [copies, setCopies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSelect = (field, value) =>
    setForm({ ...form, [field]: value });

  const handleSubmit = async () => {
    if (!form.name || !form.industry || !form.platform || !form.type) {
      setError("Product name, industry, platform and type are required.");
      return;
    }
    setError("");
    setLoading(true);
    setCopies([]);
    try {
      const res = await fetch(`${BASE_URL}/copycrafter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      const split = data.copies
        .split("###COPY_END###")
        .map((c) => c.trim())
        .filter(Boolean);
      setCopies(split);
    } catch (err) {
      setError("Failed to connect to server. Is Flask running?");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <AppLayout>
      <div className="copy-page">
        <div className="page-header">
          <p className="page-eyebrow">Module 02</p>
          <h1 className="page-title">CopyCrafter</h1>
          <p className="page-subtitle">
            Generate platform-specific ad copy that converts. Fill in the
            details below and let the AI do the heavy lifting.
          </p>
        </div>

        <div className="copy-layout">
          {/* ── FORM ── */}
          <div className="copy-form-col">

            {/* Product Info */}
            <div className="form-section">
              <h2 className="form-section-title">Product Info</h2>
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. NovaSkin Serum"
                />
              </div>
              <div className="form-group">
                <label>Industry *</label>
                <input
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder="e.g. Skincare, E-commerce, SaaS"
                />
              </div>
            </div>

            {/* Platform */}
            <div className="form-section">
              <h2 className="form-section-title">Platform *</h2>
              <div className="chip-group">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    className={`chip ${form.platform === p ? "selected" : ""}`}
                    onClick={() => handleSelect("platform", p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Copy Type */}
            <div className="form-section">
              <h2 className="form-section-title">Copy Type *</h2>
              <div className="chip-group">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    className={`chip ${form.type === t ? "selected" : ""}`}
                    onClick={() => handleSelect("type", t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Copies */}
            <div className="form-section">
              <h2 className="form-section-title">Number of Copies</h2>
              <div className="copies-selector">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className={`copies-btn ${form.numberofcopies === n ? "selected" : ""}`}
                    onClick={() => handleSelect("numberofcopies", n)}
                  >
                    {n}
                  </button>
                ))}
                <input
                  type="number"
                  name="numberofcopies"
                  value={form.numberofcopies}
                  onChange={handleChange}
                  min={1}
                  max={10}
                  className="copies-input"
                  placeholder="Custom"
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
                <div className="more-options-content">
                  {/* Tone */}
                  <div className="form-group">
                    <label>Tone</label>
                    <div className="chip-group">
                      {TONES.map((t) => (
                        <button
                          key={t}
                          className={`chip chip-sm ${form.tone === t ? "selected" : ""}`}
                          onClick={() => handleSelect("tone", t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Format */}
                  <div className="form-group">
                    <label>Format</label>
                    <div className="chip-group">
                      {FORMATS.map((f) => (
                        <button
                          key={f}
                          className={`chip chip-sm ${form.format === f ? "selected" : ""}`}
                          onClick={() => handleSelect("format", f)}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ICP */}
                  <div className="form-group">
                    <label>Target Audience (ICP)</label>
                    <input
                      name="icp"
                      value={form.icp}
                      onChange={handleChange}
                      placeholder="e.g. Women 25–40 interested in skincare"
                    />
                  </div>

                  {/* Price */}
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="e.g. $49, Starting from $19/mo"
                    />
                  </div>

                  {/* Extra Info */}
                  <div className="form-group">
                    <label>Additional Product Info</label>
                    <textarea
                      name="info"
                      value={form.info}
                      onChange={handleChange}
                      placeholder="Key benefits, USPs, offers, anything the AI should know..."
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              className="btn-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Copy"}
            </button>
          </div>

          {/* ── OUTPUT ── */}
          <div className="copy-output-col">
            <h2 className="form-section-title">Generated Copies</h2>

            {loading && (
              <div className="output-loading">
                <span className="spinner" />
                <p>Crafting your copies...</p>
              </div>
            )}

            {!loading && copies.length === 0 && (
              <div className="output-box empty-box">
                <p className="output-placeholder">
                  Your generated copies will appear here.
                </p>
              </div>
            )}

            {!loading && copies.length > 0 && (
              <div className="copies-list">
                {copies.map((copy, i) => (
                  <div key={i} className="copy-card">
                    <div className="copy-card-header">
                      <span className="copy-number">Copy {i + 1}</span>
                      <button
                        className="copy-btn"
                        onClick={() => handleCopy(copy, i)}
                      >
                        {copiedIndex === i ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="copy-text">{copy}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}