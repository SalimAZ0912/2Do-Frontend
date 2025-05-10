import React from "react";
import "./link.css";

interface LinkComponentProps {
  label: string;
  href: string;
  customClass?: string;
}

const Link: React.FC<LinkComponentProps> = ({
  label,
  href,
  customClass = "",
}) => {
  return (
    <a href={href} className={`custom-link ${customClass}`}>
      {label}
    </a>
  );
};

export default Link;
