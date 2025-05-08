// noteEditorLogic.ts

import { useState, useRef, useEffect } from "react";

export function useNoteEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("16px");

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

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () =>
      document.removeEventListener("selectionchange", updateActiveFormats);
  }, []);

  const isActive = (format: string) => activeFormats.includes(format);

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    if (selection && range) {
      const span = document.createElement("span");
      span.style.fontSize = value;
      range.surroundContents(span);
    } else {
      if (editorRef.current) {
        editorRef.current.style.fontSize = value;
      }
    }
  };

  return {
    editorRef,
    activeFormats,
    selectedSize,
    handleSave,
    handleButtonClick,
    handleKeyDown,
    isActive,
    handleSizeChange,
  };
}
