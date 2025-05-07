import { useState } from "react";
import "./sidebar.css";
import Button from "../button/button";

interface SidebarProps {
  onSelect: (selection: "notes" | "report" | "profile" | "calendar") => void;
  onNoteSelect: (id: number) => void;
  active: string;
}

function Sidebar({ onSelect, active }: SidebarProps) {
  const [notesExpanded, setNotesExpanded] = useState(true); // Zustand für ausklappen
  const isActive = (key: string) => (active === key ? "active" : "");

  const toggleNotes = () => {
    onSelect("notes"); // Ansicht auf Notes setzen
    setNotesExpanded((prev) => !prev);
  };

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Welcome to 2Do</h2>

      <div className="menu">
        <Button
          label="Meine Notizen"
          icon="notes.svg"
          onClick={toggleNotes}
          customClass={isActive("sidebar-button")}
          rightIcon={notesExpanded ? "▲" : "▼"} // Pfeil abhängig vom Zustand
        />

        <Button
          label="Report"
          icon="report.svg"
          onClick={() => onSelect("report")}
          customClass="sidebar-button"
        />
        <Button
          label="Profil"
          icon="report.svg"
          onClick={() => onSelect("profile")}
          customClass="sidebar-button"
        />
        <Button
          label="Calendar"
          icon="calendar.svg"
          onClick={() => onSelect("calendar")}
          customClass="sidebar-button"
        />

        <form className="logout-form" method="post">
          <Button
            label="Log out"
            customClass="logout"
            icon="logout.svg"
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
