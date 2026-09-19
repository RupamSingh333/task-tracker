import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiHash, FiSearch, FiTrash2 } from "react-icons/fi";

export default function CommonNumbers({ mode }) {
  const [firstList, setFirstList] = useState('');
  const [secondList, setSecondList] = useState('');
  const [commonNumbers, setCommonNumbers] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const isDark = mode === "dark";

  const handleFindCommon = () => {
    try {
      if (!firstList.trim() && !secondList.trim()) {
        toast.error("Please enter numbers in both lists.");
        return;
      }

      const parseList = (list) =>
        list.split(",").map((num) => num.trim().replace(/^['"]|['"]$/g, "")).filter(n => n !== "");

      const list1 = parseList(firstList);
      const list2 = parseList(secondList);

      if (list1.length === 0 || list2.length === 0) {
        toast.error("Lists must contain valid comma-separated values.");
        return;
      }

      const common = list1.filter((num) => list2.includes(num));
      const uniqueCommon = [...new Set(common)]; // Remove duplicates from the result
      setCommonNumbers(uniqueCommon);
      setHasSearched(true);

      if (uniqueCommon.length > 0) {
        toast.success("Common numbers found!");
      } else {
        toast.info("No common numbers found.");
      }
    } catch (error) {
      toast.error("An error occurred formatting your lists.");
    }
  };

  const handleClear = () => {
    setFirstList('');
    setSecondList('');
    setCommonNumbers([]);
    setHasSearched(false);
    toast.success("Fields cleared.");
  };

  return (
    <div className="premium-card">
      <div className="d-flex align-items-center gap-2 mb-4">
        <FiHash size={28} style={{ color: "var(--accent-light)" }} />
        <h2 className="mb-0" style={{
          color: isDark ? "#fff" : "#111",
          fontWeight: "700"
        }}>
          Find Common Elements
        </h2>
      </div>
      
      <p style={{ color: mode === "dark" ? "#94a3b8" : "#64748b", marginBottom: "1.5rem" }}>
        Enter two comma-separated lists to find overlapping items instantly.
      </p>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-bold" style={{ color: mode === "dark" ? "#f8fafc" : "#0f172a" }}>
            First List
          </label>
          <input
            type="text"
            className="modern-input"
            value={firstList}
            onChange={(e) => setFirstList(e.target.value)}
            placeholder="e.g. 1, 2, 3, apple, orange"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold" style={{ color: mode === "dark" ? "#f8fafc" : "#0f172a" }}>
            Second List
          </label>
          <input
            type="text"
            className="modern-input"
            value={secondList}
            onChange={(e) => setSecondList(e.target.value)}
            placeholder="e.g. 3, 4, apple, banana"
          />
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <button className="modern-btn modern-btn-primary" onClick={handleFindCommon}>
          <FiSearch /> Compare Lists
        </button>
        <button className="modern-btn modern-btn-secondary" onClick={handleClear}>
          <FiTrash2 /> Clear All
        </button>
      </div>

      {hasSearched && (
        <div 
          className="p-4 rounded mt-4" 
          style={{ 
            background: commonNumbers.length > 0 
              ? (mode === "dark" ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.05)")
              : (mode === "dark" ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.05)"),
            border: `1px solid ${
              commonNumbers.length > 0
                ? (mode === "dark" ? "rgba(16, 185, 129, 0.3)" : "rgba(16, 185, 129, 0.2)")
                : (mode === "dark" ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.2)")
            }`
          }}
        >
          <h5 className="fw-bold mb-2" style={{ 
            color: commonNumbers.length > 0 
              ? (mode === "dark" ? "#34d399" : "#059669")
              : (mode === "dark" ? "#f87171" : "#dc2626") 
          }}>
            {commonNumbers.length > 0 ? `Found ${commonNumbers.length} Common Elements:` : "No matches found."}
          </h5>
          
          {commonNumbers.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-3">
              {commonNumbers.map((num, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-pill"
                  style={{
                    background: mode === "dark" ? "rgba(255,255,255,0.1)" : "#fff",
                    color: mode === "dark" ? "#f8fafc" : "#0f172a",
                    border: mode === "dark" ? "1px solid rgba(255,255,255,0.2)" : "1px solid #e2e8f0",
                    fontWeight: "500",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                  }}
                >
                  {num}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
