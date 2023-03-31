import ReactDOM from "react-dom/client";
import VaultList from "./VaultList";
import "./index.css";

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="column column-50 column-offset-25">
          <VaultList />
        </div>
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
