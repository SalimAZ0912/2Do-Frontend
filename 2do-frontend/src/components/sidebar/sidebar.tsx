import "./sidebar.css";
import Button from "../button/button";

function Sidebar() {
  return (
    <>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome to 2Do</h2>

        <div className="menu">
          <Button label="Meine Notizen" icon="notes.svg" />

          <Button label="Report" icon="report.svg" />

          <Button label="Profil" icon="report.svg" />

          <Button label="Calendar" icon="calendar.svg" />

          <form className="logout-form" method="post">
            <Button label="Log out" icon="logout.svg" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
