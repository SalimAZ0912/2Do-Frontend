import "./icon.css";

interface IconProps {
  logo: string;
  alt: string;
}

function Icon({ logo, alt }: IconProps) {
  return (
    <>
      <img className="img" src={`/public/assets/${logo}`} alt={alt} />
    </>
  );
}

export default Icon;
