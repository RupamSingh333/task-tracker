import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FiType, FiCopy, FiTrash2, FiScissors, FiMail, FiLink, FiVolume2, FiEdit3 } from "react-icons/fi";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const isDark = props.mode === "dark";

  const notify = (message) => toast.success(message);

  const handleUpclick = () => {
    setText(text.toUpperCase());
    notify("Converted to Uppercase");
  };

  const handleLoclick = () => {
    setText(text.toLowerCase());
    notify("Converted to Lowercase");
  };

  const handleClearClick = () => {
    setText("");
    notify("Text Cleared");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    notify("Text Copied");
  };

  const handleExtraSpace = () => {
    setText(text.split(/[ ]+/).join(" "));
    notify("Extra Spaces Removed");
  };

  const handleTitleCase = () => {
    let newText = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    setText(newText);
    notify("Converted to Title Case");
  };

  const extractEmails = () => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const foundEmails = text.match(emailRegex);
    if (foundEmails) {
      setExtractedEmails([...new Set(foundEmails)]);
      notify(`Found ${[...new Set(foundEmails)].length} emails!`);
    } else {
      setExtractedEmails([]);
      toast.error("No emails found.");
    }
  };

  const extractLinks = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const foundLinks = text.match(urlRegex);
    if (foundLinks) {
      setExtractedLinks([...new Set(foundLinks)]);
      notify(`Found ${[...new Set(foundLinks)].length} links!`);
    } else {
      setExtractedLinks([]);
      toast.error("No links found.");
    }
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
      notify("Speaking...");
    } else {
      toast.error("Sorry, your browser doesn't support text to speech.");
    }
  };

  const handleOrchange = (event) => {
    setText(event.target.value);
  };

  const [extractedEmails, setExtractedEmails] = useState([]);
  const [extractedLinks, setExtractedLinks] = useState([]);

  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const readTime = (0.008 * wordCount).toFixed(2);

  return (
    <div className="premium-card">
      <div className="d-flex align-items-center gap-2 mb-4">
        <FiType size={28} style={{ color: "var(--accent-light)" }} />
        <h2 className="mb-0" style={{
          color: isDark ? "#fff" : "#111",
          fontWeight: "700"
        }}>
          {props.heading}
        </h2>
      </div>

      <div className="mb-4">
        <textarea
          className="modern-input"
          value={text}
          onChange={handleOrchange}
          placeholder="Paste or type your text here..."
          rows="8"
          style={{ resize: "vertical", fontSize: "1rem", lineHeight: "1.5" }}
        ></textarea>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-5">
        <button className="modern-btn modern-btn-primary btn-sm" onClick={handleUpclick}>
          UPPERCASE
        </button>
        <button className="modern-btn modern-btn-primary btn-sm" onClick={handleLoclick}>
          lowercase
        </button>
        <button className="modern-btn modern-btn-primary btn-sm" onClick={handleTitleCase}>
          <FiEdit3 /> Title Case
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={handleExtraSpace}>
          <FiScissors /> Remove Spaces
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={extractEmails}>
          <FiMail /> Extract Emails
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={extractLinks}>
          <FiLink /> Extract Links
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={speakText}>
          <FiVolume2 /> Speak
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={handleCopy}>
          <FiCopy /> Copy
        </button>
        <button className="modern-btn modern-btn-danger btn-sm ms-auto" onClick={handleClearClick}>
          <FiTrash2 /> Clear
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="p-4 rounded h-100" style={{ background: props.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
            <h4 className="fw-bold mb-3">Summary</h4>
            <div className="d-flex flex-column gap-2" style={{ color: props.mode === "dark" ? "#cbd5e1" : "#475569" }}>
              <div className="d-flex justify-content-between border-bottom pb-2" style={{ borderColor: props.mode === "dark" ? "#334155" : "#e2e8f0" }}>
                <span>Words</span>
                <strong style={{ color: props.mode === "dark" ? "#f8fafc" : "#0f172a" }}>{wordCount}</strong>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2" style={{ borderColor: props.mode === "dark" ? "#334155" : "#e2e8f0" }}>
                <span>Characters</span>
                <strong style={{ color: props.mode === "dark" ? "#f8fafc" : "#0f172a" }}>{text.length}</strong>
              </div>
              <div className="d-flex justify-content-between pb-2">
                <span>Reading Time</span>
                <strong style={{ color: props.mode === "dark" ? "#f8fafc" : "#0f172a" }}>{readTime} mins</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4 rounded h-100" style={{ background: props.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
            <h4 className="fw-bold mb-3">Preview</h4>
            <div 
              style={{ 
                color: props.mode === "dark" ? "#94a3b8" : "#64748b",
                maxHeight: "150px",
                overflowY: "auto",
                whiteSpace: "pre-wrap"
              }}
            >
              {text.length > 0 ? text : <span style={{ opacity: 0.5 }}>Your preview will appear here...</span>}
            </div>
          </div>
        </div>
      </div>

      {(extractedEmails.length > 0 || extractedLinks.length > 0) && (
        <div className="row g-4 mt-2">
          {extractedEmails.length > 0 && (
            <div className="col-md-6">
              <div className="p-4 rounded h-100" style={{ background: props.mode === "dark" ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)", border: `1px solid ${props.mode === "dark" ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.2)"}` }}>
                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#3b82f6" }}><FiMail /> Extracted Emails</h5>
                <ul className="list-unstyled mb-0" style={{ color: props.mode === "dark" ? "#f8fafc" : "#0f172a" }}>
                  {extractedEmails.map((email, idx) => (
                    <li key={idx} className="mb-1 p-2 rounded" style={{ background: props.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff" }}>{email}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {extractedLinks.length > 0 && (
            <div className="col-md-6">
              <div className="p-4 rounded h-100" style={{ background: props.mode === "dark" ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.05)", border: `1px solid ${props.mode === "dark" ? "rgba(16,185,129,0.3)" : "rgba(16,185,129,0.2)"}` }}>
                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: props.mode === "dark" ? "#34d399" : "#059669" }}><FiLink /> Extracted Links</h5>
                <ul className="list-unstyled mb-0" style={{ color: props.mode === "dark" ? "#f8fafc" : "#0f172a" }}>
                  {extractedLinks.map((link, idx) => (
                    <li key={idx} className="mb-1 p-2 rounded" style={{ background: props.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff" }}>
                      <a href={link} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
