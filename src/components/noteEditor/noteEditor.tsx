import { useState, useEffect, useRef } from "react";
import "./noteEditor.css";

interface NoteEditorProps {
  noteIndex: number | null;
  onBack: () => void;
}

function NoteEditor({ noteIndex, onBack }: NoteEditorProps) {
  const [text, setText] = useState("");
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  const noteRef = useRef<HTMLDivElement>(null);

  // Formatierungszustände
  const [fontSize, setFontSize] = useState("16px");
  const [fontColor, setFontColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

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

  // Textänderung erkennen
  const handleTextChange = () => {
    if (noteRef.current) {
      setText(noteRef.current.innerHTML); // Speichern des Textes bei Änderungen
    }
  };

  // Formatierungen anwenden
  const applyStyles = () => {
    if (noteRef.current) {
      noteRef.current.style.fontSize = fontSize;
      noteRef.current.style.color = fontColor;
      noteRef.current.style.backgroundColor = bgColor;
      noteRef.current.style.fontFamily = fontFamily;
      noteRef.current.style.fontWeight = isBold ? "bold" : "normal";
      noteRef.current.style.fontStyle = isItalic ? "italic" : "normal";
      noteRef.current.style.textDecoration = isUnderline ? "underline" : "none";
    }
  };

  useEffect(() => {
    applyStyles(); // Styles anwenden, wenn sich etwas ändert
  }, [fontSize, fontColor, bgColor, fontFamily, isBold, isItalic, isUnderline]);

  // Dropdown-Handler
  const handleFontSizeChange = (size: string) => setFontSize(size);
  const handleFontColorChange = (color: string) => setFontColor(color);
  const handleBgColorChange = (color: string) => setBgColor(color);
  const handleFontFamilyChange = (font: string) => setFontFamily(font);

  const toggleBold = () => setIsBold(!isBold);
  const toggleItalic = () => setIsItalic(!isItalic);
  const toggleUnderline = () => setIsUnderline(!isUnderline);

  return (
    <div className="note-container">
      {/* Formatierungs-Toolbar */}
      <div className="format-toolbar">
        {/* Schriftgröße Dropdown */}
        <div className="dropdown">
          <button className="dropdown-btn">Schriftgröße</button>
          <div className="dropdown-content">
            <button onClick={() => handleFontSizeChange("14px")}>14px</button>
            <button onClick={() => handleFontSizeChange("16px")}>16px</button>
            <button onClick={() => handleFontSizeChange("18px")}>18px</button>
            <button onClick={() => handleFontSizeChange("20px")}>20px</button>
          </div>
        </div>

        {/* Schriftfarbe Dropdown */}
        <div className="dropdown">
          <button className="dropdown-btn">Schriftfarbe</button>
          <div className="dropdown-content">
            <button onClick={() => handleFontColorChange("#FF5733")}>
              Rot
            </button>
            <button onClick={() => handleFontColorChange("#008080")}>
              Türkis
            </button>
            <button onClick={() => handleFontColorChange("#000000")}>
              Schwarz
            </button>
            <button onClick={() => handleFontColorChange("#3B3B3B")}>
              Grau
            </button>
          </div>
        </div>

        {/* Hintergrundfarbe Dropdown */}
        <div className="dropdown">
          <button className="dropdown-btn">Hintergrundfarbe</button>
          <div className="dropdown-content">
            <button onClick={() => handleBgColorChange("#f0f0f0")}>
              Hellgrau
            </button>
            <button onClick={() => handleBgColorChange("#fffcf1")}>
              Beige
            </button>
            <button onClick={() => handleBgColorChange("#ffffff")}>Weiß</button>
          </div>
        </div>

        {/* Schriftart Dropdown */}
        <div className="dropdown">
          <button className="dropdown-btn">Schriftart</button>
          <div className="dropdown-content">
            <button onClick={() => handleFontFamilyChange("Arial")}>
              Arial
            </button>
            <button onClick={() => handleFontFamilyChange("Courier New")}>
              Courier New
            </button>
            <button onClick={() => handleFontFamilyChange("Georgia")}>
              Georgia
            </button>
            <button onClick={() => handleFontFamilyChange("Times New Roman")}>
              Times New Roman
            </button>
          </div>
        </div>

        {/* Textstil Buttons */}
        <button onClick={toggleBold}>B</button>
        <button onClick={toggleItalic}>I</button>
        <button onClick={toggleUnderline}>U</button>
      </div>

      {/* Editable Content Area */}
      <div
        ref={noteRef}
        className="note-text"
        contentEditable
        placeholder="Schreibe deine Notiz hier..."
        onInput={handleTextChange}
        dangerouslySetInnerHTML={{ __html: text }} // Hier speichern wir den Text
      ></div>

      <button className="save-button" onClick={saveNote}>
        Speichern
      </button>
    </div>
  );
}

export default NoteEditor;
