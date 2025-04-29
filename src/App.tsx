import { useState } from "react";
import Content from "./components/content/content";
import Sidebar from "./components/sidebar/sidebar";
import "./App.css";

function App() {
  const [selected, setSelected] = useState<
    "notes" | "report" | "profile" | "calendar"
  >("notes");
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  return (
    <div className="app-container">
      <Sidebar
        active={selected}
        onSelect={(section) => {
          setSelected(section);
          if (section !== "notes") setSelectedNoteId(null);
        }}
        onNoteSelect={(id) => {
          setSelected("notes");
          setSelectedNoteId(id);
        }}
      />
      <Content selected={selected} selectedNoteId={selectedNoteId} />
    </div>
  );
}

export default App;
