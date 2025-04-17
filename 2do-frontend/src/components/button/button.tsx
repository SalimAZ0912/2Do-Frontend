import "./button.css";
import Icon from "../icon/icon";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: string;
  tag?: string;
}

function Button({ label, onClick, icon, tag }: ButtonProps) {
  return (
    <>
      <div className="button-container">
        <a>
          <button className="button" onClick={onClick}>
            {icon && <Icon logo={icon} alt={tag || "Button alt tag"} />}
            {label}
          </button>
        </a>
      </div>
    </>
  );
}

export default Button;
