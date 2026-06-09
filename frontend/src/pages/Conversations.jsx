import { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import "./Conversations.css";
import ReactMarkdown from 'react-markdown'

const BASE_URL = "http://localhost:5000";

const SOURCES = ["WhatsApp", "Email", "Instagram", "LinkedIn", "SMS", "Other"];
const TONES = ["Formal", "Friendly", "Apologetic", "Assertive", "Concise"];

export default function Conversations() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState([]);

  // New client form
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showAddClient, setShowAddClient] = useState(false);

  // New message form
  const [msgContent, setMsgContent] = useState("");
  const [msgSource, setMsgSource] = useState("");
  const [msgDirection, setMsgDirection] = useState("inbound");
  const [showAddMsg, setShowAddMsg] = useState(false);

  // AI outputs
  const [summary, setSummary] = useState("");
  const [pending, setPending] = useState("");
  const [draft, setDraft] = useState("");
  const [draftTone, setDraftTone] = useState("");
  const [showDraftOptions, setShowDraftOptions] = useState(false);

  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [error, setError] = useState("");

  // ── FETCH CLIENTS ──
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${BASE_URL}/clients`);
      const data = await res.json();
      setClients(data);
    } catch {
      setError("Could not load clients. Is Flask running?");
    }
  };

  // ── FETCH MESSAGES ──
  const fetchMessages = async (clientId) => {
    try {
      const res = await fetch(`${BASE_URL}/clients/${clientId}/messages`);
      const data = await res.json();
      setMessages(data);
    } catch {
      setError("Could not load messages.");
    }
  };

  const selectClient = (client) => {
    setSelectedClient(client);
    setSummary("");
    setPending("");
    setDraft("");
    setError("");
    fetchMessages(client.id);
  };

  // ── ADD CLIENT ──
  const handleAddClient = async () => {
    if (!newName) return;
    try {
      const res = await fetch(`${BASE_URL}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });
      await res.json();
      setNewName("");
      setNewEmail("");
      setShowAddClient(false);
      fetchClients();
    } catch {
      setError("Failed to add client.");
    }
  };

  // ── ADD MESSAGE ──
  const handleAddMessage = async () => {
    if (!msgContent || !msgSource) return;
    try {
      await fetch(`${BASE_URL}/clients/${selectedClient.id}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: msgContent,
          source: msgSource,
          direction: msgDirection,
        }),
      });
      setMsgContent("");
      setMsgSource("");
      setMsgDirection("inbound");
      setShowAddMsg(false);
      fetchMessages(selectedClient.id);
    } catch {
      setError("Failed to save message.");
    }
  };

  // ── AI ACTIONS ──
  const handleSummarize = async () => {
    setLoadingSummary(true);
    setSummary("");
    try {
      const res = await fetch(
        `${BASE_URL}/clients/${selectedClient.id}/summarize`
      );
      const data = await res.json();
      setSummary(data.summary);
    } catch {
      setError("Failed to generate summary.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const handlePending = async () => {
    setLoadingPending(true);
    setPending("");
    try {
      const res = await fetch(
        `${BASE_URL}/clients/${selectedClient.id}/pending`
      );
      const data = await res.json();
      setPending(data.pending);
    } catch {
      setError("Failed to get pending tasks.");
    } finally {
      setLoadingPending(false);
    }
  };

  const handleDraft = async () => {
    setLoadingDraft(true);
    setDraft("");
    try {
      const res = await fetch(
        `${BASE_URL}/clients/${selectedClient.id}/draft`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tone: draftTone }),
        }
      );
      const data = await res.json();
      setDraft(data.draft);
    } catch {
      setError("Failed to generate draft.");
    } finally {
      setLoadingDraft(false);
    }
  };

  const copyText = (text) => navigator.clipboard.writeText(text);

  return (
    <AppLayout>
      <div className="convo-page">
        <div className="page-header">
          <p className="page-eyebrow">Module 03</p>
          <h1 className="page-title">Conversations</h1>
          <p className="page-subtitle">
            Manage client messages, get AI summaries, surface pending tasks, and
            draft professional replies.
          </p>
        </div>

        <div className="convo-layout">
          {/* ── CLIENT LIST ── */}
          <div className="client-col">
            <div className="client-col-header">
              <h2 className="col-title">Clients</h2>
              <button
                className="icon-btn"
                onClick={() => setShowAddClient(!showAddClient)}
                title="Add client"
              >
                +
              </button>
            </div>

            {showAddClient && (
              <div className="add-client-form">
                <input
                  placeholder="Client name *"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <input
                  placeholder="Email (optional)"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <button className="btn-submit-sm" onClick={handleAddClient}>
                  Add Client
                </button>
              </div>
            )}

            <div className="client-list">
              {clients.length === 0 && (
                <p className="empty-hint">No clients yet. Add one above.</p>
              )}
              {clients.map((c) => (
                <div
                  key={c.id}
                  className={`client-item ${
                    selectedClient?.id === c.id ? "active" : ""
                  }`}
                  onClick={() => selectClient(c)}
                >
                  <div className="client-avatar">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="client-info">
                    <span className="client-name">{c.name}</span>
                    {c.email && (
                      <span className="client-email">{c.email}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── MESSAGES + AI ── */}
          <div className="messages-col">
            {!selectedClient ? (
              <div className="no-client-selected">
                <p>← Select a client to view their conversation</p>
              </div>
            ) : (
              <>
                {/* Messages Header */}
                <div className="messages-header">
                  <div>
                    <h2 className="col-title">{selectedClient.name}</h2>
                    {selectedClient.email && (
                      <p className="client-email-small">
                        {selectedClient.email}
                      </p>
                    )}
                  </div>
                  <button
                    className="icon-btn"
                    onClick={() => setShowAddMsg(!showAddMsg)}
                    title="Log message"
                  >
                    +
                  </button>
                </div>

                {/* Add Message Form */}
                {showAddMsg && (
                  <div className="add-msg-form form-section">
                    <h3 className="form-section-title">Log a Message</h3>

                    {/* Source chips */}
                    <div className="form-group">
                      <label>Source *</label>
                      <div className="chip-group">
                        {SOURCES.map((s) => (
                          <button
                            key={s}
                            className={`chip chip-sm ${
                              msgSource === s ? "selected" : ""
                            }`}
                            onClick={() => setMsgSource(s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Direction */}
                    <div className="form-group">
                      <label>Direction</label>
                      <div className="chip-group">
                        {["inbound", "outbound"].map((d) => (
                          <button
                            key={d}
                            className={`chip chip-sm ${
                              msgDirection === d ? "selected" : ""
                            }`}
                            onClick={() => setMsgDirection(d)}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Message Content *</label>
                      <textarea
                        value={msgContent}
                        onChange={(e) => setMsgContent(e.target.value)}
                        placeholder="Paste or type the message here..."
                        rows={4}
                      />
                    </div>
                    <button className="btn-submit-sm" onClick={handleAddMessage}>
                      Save Message
                    </button>
                  </div>
                )}

                {/* Message Thread */}
                <div className="message-thread">
                  {messages.length === 0 && (
                    <p className="empty-hint">
                      No messages logged yet. Add one above.
                    </p>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`message-bubble ${msg.direction}`}
                    >
                      <div className="bubble-meta">
                        <span className="bubble-source">{msg.source}</span>
                        <span className="bubble-dir">{msg.direction}</span>
                      </div>
                      <p className="bubble-content">{msg.content}</p>
                    </div>
                  ))}
                </div>

                {/* AI Actions */}
                {messages.length > 0 && (
                  <div className="ai-actions">
                    <h3 className="ai-actions-title">AI Actions</h3>
                    <div className="ai-btns">
                      <button
                        className="ai-btn"
                        onClick={handleSummarize}
                        disabled={loadingSummary}
                      >
                        {loadingSummary ? "..." : "Summarize"}
                      </button>
                      <button
                        className="ai-btn"
                        onClick={handlePending}
                        disabled={loadingPending}
                      >
                        {loadingPending ? "..." : "Pending Tasks"}
                      </button>
                      <button
                        className="ai-btn"
                        onClick={() => setShowDraftOptions(!showDraftOptions)}
                      >
                        Draft Reply
                      </button>
                    </div>

                    {/* Draft tone options */}
                    {showDraftOptions && (
                      <div className="draft-options">
                        <div className="chip-group">
                          {TONES.map((t) => (
                            <button
                              key={t}
                              className={`chip chip-sm ${
                                draftTone === t ? "selected" : ""
                              }`}
                              onClick={() => setDraftTone(t)}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        <button
                          className="btn-submit-sm"
                          onClick={handleDraft}
                          disabled={loadingDraft}
                          style={{ marginTop: "0.75rem" }}
                        >
                          {loadingDraft ? "Generating..." : "Generate Draft"}
                        </button>
                      </div>
                    )}

                    {/* AI Outputs */}
                    {summary && (
                      <div className="ai-output-card">
                        <div className="ai-output-header">
                          <span className="ai-output-label">Summary</span>
                          <button
                            className="copy-btn"
                            onClick={() => copyText(summary)}
                          >
                            Copy
                          </button>
                        </div>
                        <div className="ai-output-text"><ReactMarkdown>{summary}</ReactMarkdown></div>
                      </div>
                    )}

                    {pending && (
                      <div className="ai-output-card">
                        <div className="ai-output-header">
                          <span className="ai-output-label">Pending Tasks</span>
                          <button
                            className="copy-btn"
                            onClick={() => copyText(pending)}
                          >
                            Copy
                          </button>
                        </div>
                        <div className="ai-output-text"> <ReactMarkdown>{pending}</ReactMarkdown> </div>
                      </div>
                    )}

                    {draft && (
                      <div className="ai-output-card">
                        <div className="ai-output-header">
                          <span className="ai-output-label">Draft Reply</span>
                          <button
                            className="copy-btn"
                            onClick={() => copyText(draft)}
                          >
                            Copy
                          </button>
                        </div>
                        <div className="ai-output-text"> <ReactMarkdown className="ai-output-text">{draft}</ReactMarkdown></div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {error && <p className="form-error" style={{ marginTop: "1rem" }}>{error}</p>}
      </div>
    </AppLayout>
  );
}