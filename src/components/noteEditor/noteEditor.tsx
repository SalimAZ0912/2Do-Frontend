import { useNoteEditor } from "./noteEditorLogic"; // Importiere die Logik
import "./NoteEditor.css";
import Button from "../button/button";
import Select from "../select/select";

export default function NoteEditor() {
  const {
    editorRef,
    activeFormats,
    selectedSize,
    handleSave,
    handleButtonClick,
    handleKeyDown,
    isActive,
    handleSizeChange,
  } = useNoteEditor(); // Nutze die Logik hier

  const sizeOptions = [
    { label: "16px", value: "16px" },
    { label: "18px", value: "18px" },
    { label: "24px", value: "24px" },
    { label: "30px", value: "30px" },
    { label: "36px", value: "36px" },
  ];

  return (
    <div className="note-wrapper">
      <div className="editor-toolbar">
        <Button
          label="B"
          onClick={() => handleButtonClick("bold")}
          active={isActive("bold")} // Dynamisch je nach Status
          customClass="custom-bold" // Custom-Klasse für fetten Text
        />
        <Button
          label="I"
          onClick={() => handleButtonClick("italic")}
          active={isActive("italic")}
          customClass="custom-italic" // Custom-Klasse für kursiv
        />
        <Button
          label="U"
          onClick={() => handleButtonClick("underline")}
          active={isActive("underline")}
          customClass="custom-underline" // Custom-Klasse für unterstrichen
        />
        <Button
          label="S"
          onClick={() => handleButtonClick("strikeThrough")}
          active={isActive("strikeThrough")}
          customClass="custom-strikeThrough" // Custom-Klasse für durchgestrichen
        />
        <Button
          label="•"
          onClick={() => handleButtonClick("insertUnorderedList")}
          customClass="custom-list" // Eine Custom-Klasse für Aufzählungszeichen
        />

        {/* Dropdown für Schriftgrößen */}
        <Select
          options={sizeOptions}
          value={selectedSize}
          onChange={handleSizeChange} // Änderung der Schriftgröße
        />

        <Button
          label="—"
          onClick={() => handleButtonClick("insertHorizontalRule")}
          customClass="custom-rule" // Eine Custom-Klasse für horizontale Linie
        />
        <Button
          label="☐"
          onClick={() =>
            handleButtonClick("insertHTML", '<input type="checkbox" /> ')
          }
          customClass="custom-checkbox" // Eine Custom-Klasse für Checkbox
        />
      </div>

      <div
        className="note-editor"
        contentEditable
        ref={editorRef}
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
      />

      <Button
        label="Speichern"
        onClick={handleSave}
        customClass="save-button"
      />
    </div>
  );
}
