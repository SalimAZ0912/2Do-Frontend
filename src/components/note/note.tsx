import { useState, useEffect, useRef } from "react";
import "./note.css";

function Note() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontStyle, setFontStyle] = useState("normal");
  const [fontWeight, setFontWeight] = useState("normal");
  const [backgroundColor, setBackgroundColor] = useState("transparent");

  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("note");
    if (saved) setText(saved);
  }, []);

  const saveNote = () => {
    localStorage.setItem("note", text);
    alert("Notiz gespeichert!");
  };

  const createNewNote = () => {
    if (text.trim() !== "" && !confirm("Ungespeicherte Änderungen verwerfen?"))
      return;
    setText("");
  };

  const handleTextChange = (e: React.FormEvent) => {
    setText(noteRef.current?.innerHTML || "");
  };

  // Text-Formatierungsfunktionen
  const changeFontSize = (size: number) => {
    setFontSize(size);
    if (noteRef.current) noteRef.current.style.fontSize = `${size}px`;
  };

  const changeFontColor = (color: string) => {
    setFontColor(color);
    if (noteRef.current) noteRef.current.style.color = color;
  };

  const changeFontStyle = (style: string) => {
    setFontStyle(style);
    if (noteRef.current) noteRef.current.style.fontStyle = style;
  };

  const changeFontWeight = (weight: string) => {
    setFontWeight(weight);
    if (noteRef.current) noteRef.current.style.fontWeight = weight;
  };

  const changeBackgroundColor = (color: string) => {
    setBackgroundColor(color);
    if (noteRef.current) noteRef.current.style.backgroundColor = color;
  };

  return (
    <div className="note-container">
      <div className="note-buttons">
        <button className="new-note-button" onClick={createNewNote}>
          ➕ Neue Notiz
        </button>
        <button className="save-button" onClick={saveNote}>
          Speichern
        </button>
      </div>

      {/* Formatierungs-Buttons */}
      <div className="format-toolbar">
        <button onClick={() => changeFontSize(14)}>A</button>
        <button onClick={() => changeFontSize(18)}>A</button>
        <button onClick={() => changeFontSize(22)}>A</button>
        <button onClick={() => changeFontColor("#FF5733")}>🖍️</button>
        <button onClick={() => changeFontColor("#008080")}>🖍️</button>
        <button onClick={() => changeFontStyle("italic")}>Italics</button>
        <button onClick={() => changeFontStyle("normal")}>Normal</button>
        <button onClick={() => changeFontWeight("bold")}>B</button>
        <button onClick={() => changeFontWeight("normal")}>N</button>
        <button onClick={() => changeBackgroundColor("#f0f0f0")}>
          Hintergrund
        </button>
      </div>

      {/* Editable Content Area */}
      <div
        ref={noteRef}
        className="note-text"
        contentEditable
        placeholder="Schreibe deine Notiz hier..."
        onInput={handleTextChange}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </div>
  );
}

export default Note;
