import "./sidebar.css";
import Button from "../button/button";

interface SidebarProps {
  onSelect: (selection: "notes" | "report" | "profile" | "calendar") => void;
  onNoteSelect: (id: number) => void;
  active: string;
}

function Sidebar({ onSelect, onNoteSelect, active }: SidebarProps) {
  const isActive = (key: string) => (active === key ? "active" : "");
  const notes: string[] = JSON.parse(localStorage.getItem("notes") || "[]");

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Welcome to 2Do</h2>

      <div className="menu">
        <Button
          label="Meine Notizen"
          icon="notes.svg"
          onClick={() => onSelect("notes")}
          customClass={isActive("notes")}
        />
        {active === "notes" &&
          notes.map((note, index) => (
            <div
              key={index}
              className="note-preview"
              onClick={() => onNoteSelect(index)}
              style={{
                background: "rgba(255,255,255,0.2)",
                margin: "5px",
                padding: "8px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              📝 {note.substring(0, 20) || "Leere Notiz"}
            </div>
          ))}

        <Button
          label="Report"
          icon="report.svg"
          onClick={() => onSelect("report")}
          customClass={isActive("report")}
        />
        <Button
          label="Profil"
          icon="report.svg"
          onClick={() => onSelect("profile")}
          customClass={isActive("profile")}
        />
        <Button
          label="Calendar"
          icon="calendar.svg"
          onClick={() => onSelect("calendar")}
          customClass={isActive("calendar")}
        />

        <form className="logout-form" method="post">
          <Button label="Log out" customClass="logout" icon="logout.svg" />
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
