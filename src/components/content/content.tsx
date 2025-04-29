import NoteEditor from "../noteEditor/noteEditor";
import "./content.css";

interface ContentProps {
  selected: "notes" | "report" | "profile" | "calendar";
  selectedNoteId: number | null;
}

function Content({ selected, selectedNoteId }: ContentProps) {
  return (
    <div className="content-container">
      {selected === "notes" && (
        <NoteEditor noteIndex={selectedNoteId} onBack={() => {}} />
      )}
      {selected === "report" && <h2>Report kommt hier hin</h2>}
      {selected === "profile" && <h2>Profil-Infos</h2>}
      {selected === "calendar" && <h2>Kalender kommt später</h2>}
    </div>
  );
}

export default Content;
