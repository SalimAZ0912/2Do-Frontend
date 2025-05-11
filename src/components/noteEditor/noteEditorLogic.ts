import { useState, useRef, useEffect } from "react";

export function useNoteEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("16px");
  const [selectedColor, setSelectedColor] = useState<string>("black");

  const handleSave = () => {
    const content = editorRef.current?.innerHTML || "";
    localStorage.setItem("note", content);
    alert("Notiz gespeichert!");
  };

  const handleButtonClick = (command: string, value?: string) => {
    if (value !== undefined) {
      document.execCommand(command, false, value);
    } else {
      document.execCommand(command);
    }
    editorRef.current?.focus();
    updateActiveFormats();
  };

  const updateActiveFormats = () => {
    const formats = ["bold", "italic", "underline", "strikeThrough"];
    const active: string[] = [];

    formats.forEach((format) => {
      if (document.queryCommandState(format)) {
        active.push(format);
      }
    });

    setActiveFormats(active);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          handleButtonClick("bold");
          break;
        case "i":
          e.preventDefault();
          handleButtonClick("italic");
          break;
        case "u":
          e.preventDefault();
          handleButtonClick("underline");
          break;
        default:
          break;
      }
    }
  };

  const isActive = (format: string) => activeFormats.includes(format);

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);

    const selection = window.getSelection();
    const editor = editorRef.current;
    if (!selection || !editor) return;

    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (range.collapsed) {
      // Kein Text markiert → Schreibe einen unsichtbaren Platzhalter-Span mit der gewünschten Größe
      const span = document.createElement("span");
      span.style.fontSize = value;
      span.appendChild(document.createTextNode("\u200B")); // Zero-width space
      range.insertNode(span);

      // Cursor nach dem neuen Span setzen
      range.setStartAfter(span);
      range.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      // Text markiert → Markierung in <span> mit Größe wrappen
      const span = document.createElement("span");
      span.style.fontSize = value;

      try {
        range.surroundContents(span);
      } catch {
        // Wenn surroundContents fehlschlägt (z. B. über mehrere Nodes), fallback:
        const frag = range.extractContents();
        span.appendChild(frag);
        range.insertNode(span);
      }

      // Optional: Cursor nach span setzen
      range.setStartAfter(span);
      range.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    editor.focus();
  };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
    document.execCommand("foreColor", false, value);
  };

  const handleInsertTable = () => {
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.border = "1px solid #ccc";
    for (let i = 0; i < 3; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 3; j++) {
        const cell = row.insertCell();
        cell.style.border = "1px solid #ccc";
        cell.style.padding = "8px";
        cell.innerHTML = "Zelle";
      }
    }
    editorRef.current?.appendChild(table);
    editorRef.current?.focus();
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () =>
      document.removeEventListener("selectionchange", updateActiveFormats);
  }, []);

  return {
    editorRef,
    activeFormats,
    selectedSize,
    selectedColor,
    handleSave,
    handleButtonClick,
    handleKeyDown,
    isActive,
    handleSizeChange,
    handleColorChange,
    handleInsertTable,
  };
}
