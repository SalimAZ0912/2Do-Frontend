import "./sidebar.css";
import Button from "../button/button";
import Icon from "../icon/icon";

function Sidebar() {
  return (
    <>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome to 2Do</h2>

        <div className="menu">
          <Button label="Meine Notizen" icon="notes.svg" />

          <Button label="Report" icon="report.svg" />

          <a className="profile-link" href="/notes/profile">
            <Icon logo="account.svg" alt="Report" />
            Profil
          </a>
          <a className="calendar-link" href="/notes/calendar">
            <Icon logo="calendar.svg" alt="Calendar" />
            Calendar
          </a>

          <form className="logout-form" method="post">
            <button className="logout-button" type="submit">
              <Icon logo="logout.svg" alt="Notes" />
              Logout
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
