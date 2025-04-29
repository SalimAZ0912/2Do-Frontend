import { useState, useEffect } from "react";
import "./noteEditor.css";

interface NoteEditorProps {
  noteIndex: number | null;
  onBack: () => void;
}

function NoteEditor({ noteIndex, onBack }: NoteEditorProps) {
  const [text, setText] = useState("");
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  useEffect(() => {
    if (noteIndex !== null && notes[noteIndex]) {
      setText(notes[noteIndex]);
    } else {
      setText("");
    }
  }, [noteIndex]);

  const saveNote = () => {
    const updated = [...notes];
    if (noteIndex !== null) {
      updated[noteIndex] = text;
    } else {
      updated.push(text);
    }
    localStorage.setItem("notes", JSON.stringify(updated));
    alert("Notiz gespeichert!");
    onBack();
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

export default NoteEditor;
