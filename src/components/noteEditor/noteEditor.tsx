import { useRef } from "react";
import "./NoteEditor.css";

export default function NoteEditor() {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    const content = editorRef.current?.innerHTML || "";
    localStorage.setItem("note", content);
    alert("Notiz gespeichert!");
  };

  return (
    <div className="note-wrapper">
      <div className="editor-toolbar">
        <button onClick={() => document.execCommand("bold")}>B</button>
        <button onClick={() => document.execCommand("italic")}>I</button>
        <button onClick={() => document.execCommand("underline")}>U</button>
        <button onClick={() => document.execCommand("strikeThrough")}>S</button>
        <button onClick={() => document.execCommand("insertUnorderedList")}>
          •
        </button>
      </div>

      <div
        className="note-editor"
        contentEditable
        ref={editorRef}
        placeholder="Schreibe deine Notiz hier..."
        suppressContentEditableWarning
      />

      <button className="save-button" onClick={handleSave}>
        Speichern
      </button>
    </div>
  );
}
