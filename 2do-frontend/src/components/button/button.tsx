import "./button.css";
import Icon from "../icon/icon";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: string;
  tag?: string;
  customClass?: string;
}

function Button({ label, onClick, icon, tag, customClass }: ButtonProps) {
  return (
    <>
      <div className="button-container">
        <a>
          <button className={customClass} onClick={onClick}>
            {icon && <Icon logo={icon} alt={tag || "alt tag"} />}
            {label}
          </button>
        </a>
      </div>
    </>
  );
}

export default Button;
