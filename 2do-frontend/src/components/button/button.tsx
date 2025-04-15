import "./button.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

function Button({ label }: ButtonProps) {
  return (
    <>
      <button className="button">{label}</button>
    </>
  );
}

export default Button;
