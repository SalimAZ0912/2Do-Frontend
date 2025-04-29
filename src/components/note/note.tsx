import { useState, useEffect } from "react";
import "./note.css";

function Note() {
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("note");
    if (saved) setText(saved);
  }, []);

  const saveNote = () => {
    localStorage.setItem("note", text);
    alert("Notiz gespeichert!");
  };

  return (
    <div className="note-container">
      <textarea
        className="note-text"
        placeholder="Schreibe deine Notiz hier..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="save-button" onClick={saveNote}>
        Speichern
      </button>
    </div>
  );
}

export default Note;
