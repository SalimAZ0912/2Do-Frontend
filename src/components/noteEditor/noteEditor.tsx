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
          active={isActive("bold")}
          customClass="toolbar-button"
        />
        <Button
          label="I"
          onClick={() => handleButtonClick("italic")}
          active={isActive("italic")}
          customClass="toolbar-button"
        />
        <Button
          label="U"
          onClick={() => handleButtonClick("underline")}
          active={isActive("underline")}
          customClass="toolbar-button"
        />
        <Button
          label="S"
          onClick={() => handleButtonClick("strikeThrough")}
          active={isActive("strikeThrough")}
          customClass="toolbar-button"
        />
        <Button
          label="•"
          onClick={() => handleButtonClick("insertUnorderedList")}
          customClass="toolbar-button"
        />
        <Select
          options={sizeOptions}
          value={selectedSize}
          onChange={handleSizeChange}
        />
        <Button
          label="—"
          onClick={() => handleButtonClick("insertHorizontalRule")}
          customClass="toolbar-button"
        />
        <Button
          label="☐"
          onClick={() =>
            handleButtonClick("insertHTML", '<input type="checkbox" /> ')
          }
          customClass="toolbar-button"
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
