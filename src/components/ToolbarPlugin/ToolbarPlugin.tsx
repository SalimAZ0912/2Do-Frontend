import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [selectedText, setSelectedText] = useState<string>("");

  const format = (type: "bold" | "italic" | "underline" | "strikethrough") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  const insertList = (isOrdered: boolean) => {
    if (isOrdered) {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  };

  const setTextColor = (color: string) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "text-color", color);
  };

  const setBackgroundColor = (color: string) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "background-color", color);
  };

  const setFontSize = (size: string) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "font-size", size);
  };

  const alignText = (alignment: string) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "alignment", alignment);
  };

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          // Optional: Toolbar state syncing
        }
      });
    });
  }, [editor]);

  return (
    <div className="editor-toolbar">
      <button onClick={() => format("bold")}>B</button>
      <button onClick={() => format("italic")}>I</button>
      <button onClick={() => format("underline")}>U</button>
      <button onClick={() => format("strikethrough")}>S</button>
      <button onClick={() => insertList(false)}>• Liste</button>
      <button onClick={() => insertList(true)}>1. Liste</button>

      <select
        onChange={(e) => setTextColor(e.target.value)}
        defaultValue="black"
      >
        <option value="black">Schwarz</option>
        <option value="red">Rot</option>
        <option value="green">Grün</option>
        <option value="blue">Blau</option>
        <option value="purple">Lila</option>
      </select>

      <select
        onChange={(e) => setBackgroundColor(e.target.value)}
        defaultValue="white"
      >
        <option value="white">Weiß</option>
        <option value="yellow">Gelb</option>
        <option value="pink">Pink</option>
        <option value="lightgray">Grau</option>
      </select>

      <select onChange={(e) => setFontSize(e.target.value)} defaultValue="16px">
        <option value="16px">Normal</option>
        <option value="20px">Groß</option>
        <option value="24px">Sehr Groß</option>
      </select>

      <button onClick={() => alignText("left")}>Links ausrichten</button>
      <button onClick={() => alignText("center")}>Zentriert</button>
      <button onClick={() => alignText("right")}>Rechts ausrichten</button>
    </div>
  );
}
