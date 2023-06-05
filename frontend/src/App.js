import "./App.css";
import HomePage from "./views/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useRoutes } from "react-router-dom";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/catalog",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <HomePage />,
    },
    {
      path: "/contacts",
      element: <HomePage />,
    },
  ]);

  return (
    <div className="app">
      <Header />
      <main className="container"> {routes}</main>
      <Footer />
    </div>
  );
}

export default App;
