import { useState, useEffect, useRef } from "react";
import { useNoteEditor } from "./noteEditorLogic";
import "./NoteEditor.css";
import Button from "../button/button";
import SlashMenu from "../slashMenu/SlashMenu";

export default function NoteEditor() {
  const {
    editorRef,
    handleSave,
    handleButtonClick,
    handleKeyDown: baseKeyDown,
  } = useNoteEditor();

  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [slashActiveIndex, setSlashActiveIndex] = useState(0);
  const [slashTriggered, setSlashTriggered] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  const slashMenuRef = useRef<HTMLDivElement>(null);

  const insertBlockElement = (tag: string) => {
    const html = `<${tag}><br></${tag}>`;
    document.execCommand("insertHTML", false, html);

    // Cursor ins neue Element setzen
    setTimeout(() => {
      const selection = window.getSelection();
      const element = editorRef.current?.querySelector(`${tag}:last-of-type`);
      if (element) {
        const range = document.createRange();
        range.setStart(element, 0);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, 0);
  };

  const slashItems = [
    {
      label: "Text",
      icon: "✏️",
      action: () => insertBlockElement("p"),
    },
    {
      label: "H1",
      icon: "🔠",
      action: () => insertBlockElement("h1"),
    },
    {
      label: "H2",
      icon: "🔡",
      action: () => insertBlockElement("h2"),
    },
    {
      label: "H3",
      icon: "🔤",
      action: () => insertBlockElement("h3"),
    },
    {
      label: "Aufzählung",
      icon: "•",
      action: () => handleButtonClick("insertUnorderedList"),
    },
    {
      label: "Nummerierung",
      icon: "1.",
      action: () => handleButtonClick("insertOrderedList"),
    },
    {
      label: "To-Do Liste",
      icon: "☑️",
      action: () =>
        handleButtonClick("insertHTML", '<input type="checkbox" /> '),
    },
    {
      label: "Zitat",
      icon: "❝❞",
      action: () => insertBlockElement("blockquote"),
    },
  ];

  const closeSlashMenu = () => {
    setSlashMenuOpen(false);
    setSlashTriggered(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (slashMenuOpen) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSlashActiveIndex((prev) => (prev + 1) % slashItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSlashActiveIndex(
          (prev) => (prev - 1 + slashItems.length) % slashItems.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        slashItems[slashActiveIndex].action();
        closeSlashMenu();
      } else if (e.key === "Escape") {
        closeSlashMenu();
      }
      return;
    }

    if (e.key === "/") {
      if (!slashMenuOpen && !slashTriggered) {
        e.preventDefault();
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        if (range) {
          const rect = range.getBoundingClientRect();
          setSlashMenuPosition({
            x: rect.left,
            y: rect.bottom + window.scrollY,
          });
          setSlashActiveIndex(0);
          setSlashTriggered(true);
          setSlashMenuOpen(true);
        }
        setPlaceholderVisible(false);
      } else {
        e.preventDefault();
        document.execCommand("insertText", false, "/");
        closeSlashMenu();
      }
      return;
    }

    setSlashTriggered(false);
    checkIfEditorIsEmpty();
    baseKeyDown(e);
  };

  const checkIfEditorIsEmpty = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.innerText.trim();
      setPlaceholderVisible(editorContent === "");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        slashMenuRef.current &&
        !slashMenuRef.current.contains(event.target as Node)
      ) {
        closeSlashMenu();
      }
    };

    if (slashMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [slashMenuOpen]);

  useEffect(() => {
    checkIfEditorIsEmpty();
  }, []);

  return (
    <div className="note-wrapper">
      <div
        className="note-editor"
        contentEditable
        ref={editorRef}
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
      >
        {placeholderVisible && (
          <div className="placeholder">
            Drücke /, um die Befehlsliste aufzurufen...
          </div>
        )}
      </div>

      {slashMenuOpen && (
        <SlashMenu
          ref={slashMenuRef}
          items={slashItems}
          position={slashMenuPosition}
          activeIndex={slashActiveIndex}
          onHover={setSlashActiveIndex}
          onSelect={(i) => {
            slashItems[i].action();
            closeSlashMenu();
          }}
        />
      )}

      <Button
        label="Speichern"
        onClick={handleSave}
        customClass="save-button"
      />
    </div>
  );
}
