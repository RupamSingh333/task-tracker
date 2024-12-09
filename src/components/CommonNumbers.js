import React, { useState } from "react";
import toast from "react-hot-toast"; // Import react-hot-toast

export default function CommonNumbers({ mode }) {
  const [firstList, setFirstList] = useState('');
  const [secondList, setSecondList] = useState('');
  const [commonNumbers, setCommonNumbers] = useState([]);

  const handleFindCommon = () => {
    try {
      // Convert input strings to arrays and remove quotes
      const parseList = (list) =>
        list.split(",").map((num) => num.trim().replace(/^['"]|['"]$/g, "")); // Remove single/double quotes

      const list1 = parseList(firstList);
      const list2 = parseList(secondList);

      // Check if both lists are empty or invalid
      if (list1.length === 0 || list2.length === 0) {
        toast.error("Please enter valid lists of numbers separated by commas."); // Show error toast
        return; // Prevent further execution
      }

      // Find common elements
      const common = list1.filter((num) => list2.includes(num));
      setCommonNumbers(common);

      // Show success message if common numbers are found
      if (common.length > 0) {
        toast.success("Common numbers found!");
      } else {
        toast.info("No common numbers found.");
      }
    } catch (error) {
      toast.error(
        "An error occurred. Please check the format of your input." +
          error.message
      );
    }
  };

  const handleClear = () => {
    setFirstList('');
    setSecondList('');
    setCommonNumbers([]);
    toast.success("Fields cleared.");
  };

  const textStyle = {
    color: mode === "dark" ? "white" : "black",
  };

  const inputStyle = {
    backgroundColor: mode === "dark" ? "#333" : "#fff",
    color: mode === "dark" ? "white" : "black",
    border: `1px solid ${mode === "dark" ? "white" : "#ccc"}`,
  };

  return (
    <div className="container my-4" style={textStyle}>
      <h2>Find Common Numbers in Two Lists</h2>
      <div className="mb-3">
        <label htmlFor="firstList" className="form-label">
          First List (Comma-separated numbers)
        </label>
        <input
          type="text"
          className="form-control"
          id="firstList"
          style={inputStyle}
          value={firstList}
          onChange={(e) => setFirstList(e.target.value)}
          placeholder={`e.g., 123, '34', "34", 6656`}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="secondList" className="form-label">
          Second List (Comma-separated numbers)
        </label>
        <input
          type="text"
          className="form-control"
          id="secondList"
          style={inputStyle}
          value={secondList}
          onChange={(e) => setSecondList(e.target.value)}
          placeholder={`e.g., "123", 545, '34', 978`}
        />
      </div>
      <div>
        <button className="btn btn-primary mx-2" onClick={handleFindCommon}>
          Find Common Numbers
        </button>
        <button className="btn btn-secondary mx-2" onClick={handleClear}>
          Clear
        </button>
      </div>
      {commonNumbers.length > 0 && (
        <div className="mt-4">
          <h4>Common Numbers</h4>
          <p>{commonNumbers.join(", ")}</p>
        </div>
      )}
      {commonNumbers.length === 0 && firstList && secondList && (
        <div className="mt-4">
          <h4>No Common Numbers Found</h4>
        </div>
      )}
    </div>
  );
}
