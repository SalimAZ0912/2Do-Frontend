import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import "./NoteEditor.css";

import { useState } from "react";
import { ToolbarPlugin } from "../ToolbarPlugin/ToolbarPlugin";

export default function NoteEditor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme: {
      paragraph: "editor-paragraph",
    },
    onError: (error: Error) => {
      console.error(error);
    },
  };

  // Zustand für den Editor-Text
  const [editorState, setEditorState] = useState<string>("");

  // Speichern der Notiz in localStorage
  const handleSave = () => {
    localStorage.setItem("note", editorState);
    alert("Notiz gespeichert!");
  };

  // Diese Funktion wird verwendet, um den Editor-Zustand zu verfolgen
  const handleEditorChange = (editorState: any) => {
    editorState.read(() => {
      setEditorState(JSON.stringify(editorState.toJSON()));
    });
  };

  return (
    <div className="note-wrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="note-editor" id="editor-scroll-container">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">Schreibe deine Notiz...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* Die OnChangePlugin-Funktion wird nur für den Text verwendet */}
          <OnChangePlugin onChange={handleEditorChange} />
        </div>
      </LexicalComposer>
      {/* Speichern-Button */}
      <button className="save-button" onClick={handleSave}>
        Speichern
      </button>
    </div>
  );
}
