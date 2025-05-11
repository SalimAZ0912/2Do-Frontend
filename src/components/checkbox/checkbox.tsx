import { useState } from "react";
import "./Checkbox.css";

export default function Checkbox() {
  const [checked, setChecked] = useState(false);

  return (
    <label className={`glass-checkbox ${checked ? "checked" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <span className="checkmark" />
      <span className="text">{checked ? "Erledigt" : "Noch offen"}</span>
    </label>
  );
}
