import "./button.css";
import Icon from "../icon/icon";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: string;
  tag?: string;
  customClass?: string;
  rightIcon?: string; // ▼ oder ▲
}

function Button({
  label,
  onClick,
  onMouseDown,
  icon,
  tag,
  customClass,
  rightIcon,
}: ButtonProps) {
  return (
    <div className="button-container">
      <button
        className={customClass}
        onClick={onClick}
        onMouseDown={onMouseDown}
      >
        {icon && <Icon logo={icon} alt={tag || "alt tag"} />}
        {label}
        {rightIcon && <span style={{ marginLeft: "auto" }}>{rightIcon}</span>}
      </button>
    </div>
  );
}

export default Button;
