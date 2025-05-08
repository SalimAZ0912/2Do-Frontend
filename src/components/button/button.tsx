import "./button.css";
import Icon from "../icon/icon";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: string;
  tag?: string;
  customClass?: string;
  rightIcon?: string;
  active?: boolean;
}

function Button({
  label,
  onClick,
  onMouseDown,
  icon,
  tag,
  customClass = "",
  rightIcon,
  active = false,
}: ButtonProps) {
  const classes = [
    "toolbar-button", // Standard-Klasse
    customClass,
    active ? "active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="button-container">
      <button
        className={classes}
        onClick={onClick}
        onMouseDown={onMouseDown}
        type="button"
      >
        {icon && <Icon logo={icon} alt={tag || "alt tag"} />}
        {label}
        {rightIcon && <span style={{ marginLeft: "auto" }}>{rightIcon}</span>}
      </button>
    </div>
  );
}

export default Button;
