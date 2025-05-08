import "./select.css";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  defaultValue?: string;
  onChange: (value: string) => void;
  customClass?: string;
}

function Select({
  label,
  options,
  defaultValue,
  onChange,
  customClass,
}: SelectProps) {
  return (
    <div className={`select-container ${customClass || ""}`}>
      {label && <label className="select-label">{label}</label>}
      <select
        className="select-element"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
