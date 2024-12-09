import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function TextForm(props) {
  const [text, setText] = useState("");

  // Toast notifications
  const notify = (message) => toast.success(message);

  const handleUpclick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    notify("Converted to Uppercase");
  };

  const handleOrchange = (event) => {
    setText(event.target.value);
  };

  const handleLoclick = () => {
    let newText = text.toLowerCase();
    setText(newText);
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
    let newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    notify("Extra Spaces Removed");
  };

  return (
    <>
      <div className="container">
        <h1
          style={{
            color: props.mode === "dark" ? "white" : "#343a40",
            fontWeight: "bold",
          }}
        >
          {props.heading}
        </h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="mybox"
            value={text}
            onChange={handleOrchange}
            style={{
              background: props.mode === "dark" ? "#555" : "white",
              color: props.mode === "dark" ? "white" : "#333",
              border: "2px solid",
              borderColor: props.mode === "dark" ? "#ccc" : "#ddd",
              borderRadius: "8px",
            }}
            rows="8"
          ></textarea>
        </div>
        <div className="d-flex justify-content-start">
          <button
            className="btn btn-primary mx-2 my-1"
            onClick={handleUpclick}
            style={{
              borderRadius: "5px",
              padding: "10px 20px",
              fontWeight: "bold",
            }}
          >
            Convert to Uppercase
          </button>
          <button
            className="btn btn-primary mx-2 my-1"
            onClick={handleLoclick}
            style={{
              borderRadius: "5px",
              padding: "10px 20px",
              fontWeight: "bold",
            }}
          >
            Convert to Lowercase
          </button>
          <button
            className="btn btn-primary mx-2 my-1"
            onClick={handleCopy}
            style={{
              borderRadius: "5px",
              padding: "10px 20px",
              fontWeight: "bold",
            }}
          >
            Copy Text
          </button>
          <button
            className="btn btn-primary mx-2 my-1"
            onClick={handleExtraSpace}
            style={{
              borderRadius: "5px",
              padding: "10px 20px",
              fontWeight: "bold",
            }}
          >
            Remove Extra Spaces
          </button>
          <button
            className="btn btn-danger mx-2 my-1"
            onClick={handleClearClick}
            style={{
              borderRadius: "5px",
              padding: "10px 20px",
              fontWeight: "bold",
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="container my-4">
        <h2
          style={{
            color: props.mode === "dark" ? "white" : "#343a40",
            fontWeight: "bold",
          }}
        >
          Your Text Summary
        </h2>
        <p
          style={{
            color: props.mode === "dark" ? "white" : "#343a40",
            fontSize: "16px",
          }}
        >
          {text.split(" ").filter((word) => word.length > 0).length} Words and{" "}
          {text.length} Characters
        </p>
        <p
          style={{
            color: props.mode === "dark" ? "white" : "#343a40",
            fontSize: "16px",
          }}
        >
          {0.008 * text.split(" ").filter((word) => word.length > 0).length}{" "}
          Minutes read
        </p>
        <h2
          style={{
            color: props.mode === "dark" ? "white" : "#343a40",
            fontWeight: "bold",
          }}
        >
          Preview
        </h2>
        <p
          style={{
            color: props.mode === "dark" ? "white" : "#343a40",
            fontSize: "16px",
          }}
        >
          {text.length > 0 ? text : "Enter something to preview here."}
        </p>
      </div>
    </>
  );
}
