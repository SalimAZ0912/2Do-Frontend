import React, { forwardRef } from "react";
import "./slashMenu.css";

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
}

interface SlashMenuProps {
  items: MenuItem[];
  position: { x: number; y: number };
  activeIndex: number;
  onHover: (index: number) => void;
  onSelect: (index: number) => void;
}

const SlashMenu = forwardRef<HTMLDivElement, SlashMenuProps>(
  ({ items, position, activeIndex, onHover, onSelect }, ref) => {
    return (
      <div
        ref={ref}
        className="slash-menu"
        style={{
          top: position.y,
          left: position.x,
          position: "absolute",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 1000,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`slash-menu-item ${activeIndex === idx ? "active" : ""}`}
            onMouseEnter={() => onHover(idx)}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(idx);
            }}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              backgroundColor: activeIndex === idx ? "#f0f0f0" : "transparent",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
            {item.label}
          </div>
        ))}
      </div>
    );
  }
);

export default SlashMenu;
