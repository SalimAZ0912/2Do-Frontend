import { useState, useEffect, useRef } from "react";
import "./noteEditor.css";

interface NoteEditorProps {
  noteIndex: number | null;
  onBack: () => void;
}

const commands = [
  { label: "Fett", action: () => document.execCommand("bold") },
  { label: "Kursiv", action: () => document.execCommand("italic") },
  { label: "Unterstrichen", action: () => document.execCommand("underline") },
  {
    label: "Durchgestrichen",
    action: () => document.execCommand("strikeThrough"),
  },
  {
    label: "Textfarbe: Rot",
    action: () => document.execCommand("foreColor", false, "#e74c3c"),
  },
  {
    label: "Hintergrund: Gelb",
    action: () => document.execCommand("hiliteColor", false, "#fef65b"),
  },
  { label: "Linksbündig", action: () => document.execCommand("justifyLeft") },
  { label: "Zentriert", action: () => document.execCommand("justifyCenter") },
  { label: "Rechtsbündig", action: () => document.execCommand("justifyRight") },
];

function NoteEditor({ noteIndex, onBack }: NoteEditorProps) {
  const [text, setText] = useState("");
  const [showCommands, setShowCommands] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [filteredCommands, setFilteredCommands] = useState(commands);
  const [commandQuery, setCommandQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const noteRef = useRef<HTMLDivElement>(null);

  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  useEffect(() => {
    if (noteIndex !== null && notes[noteIndex]) {
      setText(notes[noteIndex]);
    } else {
      setText("");
    }
  }, [noteIndex]);

  const saveNote = () => {
    const html = noteRef.current?.innerHTML || "";
    const updated = [...notes];
    if (noteIndex !== null) {
      updated[noteIndex] = html;
    } else {
      updated.push(html);
    }
    localStorage.setItem("notes", JSON.stringify(updated));
    alert("Notiz gespeichert!");
    onBack();
  };

  const handleInput = () => {
    const content = noteRef.current?.innerHTML || "";
    setText(content);

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const precedingRange = range.cloneRange();
    precedingRange.setStart(noteRef.current!, 0);
    const precedingText = precedingRange.toString();
    const lastWordMatch = precedingText.match(/\/([^\s]*)$/); // Wort nach Slash

    if (lastWordMatch) {
      const query = lastWordMatch[1];
      setCommandQuery(query);
      filterCommands(query);
      setShowCommands(true);
      setSelectedIndex(0);

      const rect = range.getBoundingClientRect();
      if (rect) {
        setMenuPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    } else {
      setShowCommands(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (showCommands) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) =>
            (prev - 1 + filteredCommands.length) % filteredCommands.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleCommandClick(filteredCommands[selectedIndex].action);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowCommands(false);
      } else if (e.key === "Backspace") {
        const newQuery = commandQuery.slice(0, -1);
        setCommandQuery(newQuery);
        filterCommands(newQuery);
        if (newQuery === "") setShowCommands(false);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        const newQuery = commandQuery + e.key;
        setCommandQuery(newQuery);
        filterCommands(newQuery);
        if (
          !commands.some((cmd) =>
            cmd.label.toLowerCase().includes(newQuery.toLowerCase())
          )
        ) {
          setShowCommands(false);
        }
      } else {
        setShowCommands(false);
      }
    }
  };

  const filterCommands = (query: string) => {
    const filtered = commands.filter((cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCommands(filtered);
    setSelectedIndex(0);
  };

  const handleCommandClick = (cmd: () => void) => {
    setShowCommands(false);
    restoreFocus(() => {
      removeLastSlash();
      cmd();
    });
  };

  const removeLastSlash = () => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;

    const range = sel.getRangeAt(0);
    const precedingRange = range.cloneRange();
    precedingRange.setStart(noteRef.current!, 0);
    const precedingText = precedingRange.toString();
    const match = precedingText.match(/\/[^\s]*$/);
    if (!match) return;

    // Entferne den Slash-Befehl rückwirkend
    const startOffset = precedingText.length - match[0].length;
    const newRange = document.createRange();
    const node = noteRef.current!;
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    let charCount = 0;
    let startNode: Text | null = null;
    let startOffsetInNode = 0;

    while (walker.nextNode()) {
      const textNode = walker.currentNode as Text;
      const len = textNode.length;
      if (charCount + len >= startOffset) {
        startNode = textNode;
        startOffsetInNode = startOffset - charCount;
        break;
      }
      charCount += len;
    }

    if (startNode) {
      startNode.deleteData(startOffsetInNode, match[0].length);
    }
  };

  const restoreFocus = (callback: () => void) => {
    noteRef.current?.focus();
    setTimeout(callback, 0);
  };

  return (
    <div className="note-container">
      <div
        ref={noteRef}
        className="note-text"
        contentEditable
        tabIndex={0}
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        style={{ textAlign: "left" }}
      />

      {showCommands && (
        <ul
          className="slash-menu"
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          {filteredCommands.map((cmd, i) => (
            <li
              key={i}
              onMouseDown={() => handleCommandClick(cmd.action)}
              className={i === selectedIndex ? "selected" : ""}
            >
              {cmd.label}
            </li>
          ))}
        </ul>
      )}

      <button className="save-button" onClick={saveNote}>
        Speichern
      </button>
    </div>
  );
}

export default NoteEditor;
