import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  FiType, FiCopy, FiTrash2, FiScissors, FiMail, FiLink, FiVolume2, FiEdit3, 
  FiRefreshCcw, FiCode, FiAlignLeft, FiFileText, FiGlobe, FiHash, 
  FiMinimize2, FiMaximize2 
} from "react-icons/fi";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const isDark = props.mode === "dark";
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

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

  const handleRemoveNewlines = () => {
    setText(text.replace(/\n+/g, ' '));
    notify("Newlines Removed");
  };

  const handleTitleCase = () => {
    let newText = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    setText(newText);
    notify("Converted to Title Case");
  };

  const handleReverseText = () => {
    setText(text.split('').reverse().join(''));
    notify("Text Reversed");
  };

  const handleBase64Encode = () => {
    try {
      setText(btoa(text));
      notify("Encoded to Base64");
    } catch (e) {
      notifyError("Cannot encode to Base64");
    }
  };

  const handleBase64Decode = () => {
    try {
      setText(atob(text));
      notify("Decoded from Base64");
    } catch (e) {
      notifyError("Invalid Base64 string");
    }
  };

  const handleFormatJSON = () => {
    try {
      const parsed = JSON.parse(text);
      setText(JSON.stringify(parsed, null, 2));
      notify("JSON Formatted");
    } catch (e) {
      notifyError("Invalid JSON string");
    }
  };

  const handleMinifyJSON = () => {
    try {
      const parsed = JSON.parse(text);
      setText(JSON.stringify(parsed));
      notify("JSON Minified");
    } catch (e) {
      notifyError("Invalid JSON string");
    }
  };

  const handleURLEncode = () => {
    try {
      setText(encodeURIComponent(text));
      notify("URL Encoded");
    } catch (e) {
      notifyError("Cannot encode URL");
    }
  };

  const handleURLDecode = () => {
    try {
      setText(decodeURIComponent(text));
      notify("URL Decoded");
    } catch (e) {
      notifyError("Invalid URL string");
    }
  };

  const handleRemoveHTML = () => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    setText(doc.body.textContent || "");
    notify("HTML Tags Removed");
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
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to find an Indian Female voice
      const indianFemale = voices.find(v => 
        (v.lang === 'en-IN' || v.lang === 'hi-IN') && 
        (v.name.toLowerCase().includes('female') || v.name.includes('Heera'))
      ) || voices.find(v => v.lang === 'en-IN' || v.lang === 'hi-IN') 
        || voices.find(v => v.name.toLowerCase().includes('female'));

      if (indianFemale) {
        utterance.voice = indianFemale;
      }
      
      window.speechSynthesis.speak(utterance);
      notify("Speaking (Indian Female Voice)...");
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

      <div className="mb-3 d-flex flex-wrap gap-2">
        <h5 className="w-100 mb-2" style={{color: isDark ? "#94a3b8" : "#64748b", fontSize: "0.9rem", fontWeight: "600"}}>Developer Tools</h5>
        <button className="modern-btn modern-btn-primary btn-sm" onClick={handleFormatJSON}>
          <FiMaximize2 /> Format JSON
        </button>
        <button className="modern-btn modern-btn-primary btn-sm" onClick={handleMinifyJSON}>
          <FiMinimize2 /> Minify JSON
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={handleBase64Encode}>
          <FiCode /> Encode Base64
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={handleBase64Decode}>
          <FiCode /> Decode Base64
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={handleURLEncode}>
          <FiGlobe /> URL Encode
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={handleURLDecode}>
          <FiGlobe /> URL Decode
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={handleRemoveHTML}>
          <FiHash /> Remove HTML
        </button>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-5">
        <h5 className="w-100 mb-2" style={{color: isDark ? "#94a3b8" : "#64748b", fontSize: "0.9rem", fontWeight: "600"}}>Standard Tools</h5>
        <button className="modern-btn modern-btn-primary btn-sm" onClick={handleUpclick}>
          UPPERCASE
        </button>
        <button className="modern-btn modern-btn-primary btn-sm" onClick={handleLoclick}>
          lowercase
        </button>
        <button className="modern-btn modern-btn-primary btn-sm" onClick={handleTitleCase}>
          <FiEdit3 /> Title Case
        </button>
        <button className="modern-btn modern-btn-primary btn-sm" onClick={handleReverseText}>
          <FiRefreshCcw /> Reverse
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={handleExtraSpace}>
          <FiScissors /> Remove Spaces
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={handleRemoveNewlines}>
          <FiAlignLeft /> Remove Newlines
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={extractEmails}>
          <FiMail /> Extract Emails
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={extractLinks}>
          <FiLink /> Extract Links
        </button>
        <button className="modern-btn modern-btn-secondary btn-sm" onClick={speakText}>
          <FiVolume2 /> Speak (India)
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

