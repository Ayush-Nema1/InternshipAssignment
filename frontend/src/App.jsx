
import Dashboard from "./Dashboard.jsx";
import Auth from "./Auth.jsx";

function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <>
       <Auth/>
      </>
    );
  }

  return <Dashboard />;
}

export default App;
