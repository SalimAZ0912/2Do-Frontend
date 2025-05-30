import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./components/content/content";
import Sidebar from "./components/sidebar/sidebar";
import Login from "./components/login/login";

import "./App.css";

function App() {
  const [selected, setSelected] = useState<
    "notes" | "report" | "profile" | "calendar"
  >("notes");
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <>
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
                <div style={{ padding: "1rem" }}></div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
