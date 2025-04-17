import "./App.css";
import Button from "./components/button/button";
import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <>
      <div>
        <Sidebar />
        <Button label="Meine Notizen" icon="notes.svg" />
      </div>
    </>
  );
}

export default App;
