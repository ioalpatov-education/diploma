import "./App.css";
import HomePage from "./views/HomePage";
import CatalogPage from "./views/CatalogPage";
import AboutPage from "./views/AboutPage";
import ContactsPage from "./views/ContactsPage";
import ShoeDetailsPage from "./views/ShoeDetailsPage";
import NotFoundPage from "./views/NotFoundPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartPage from "./views/CartPage";
import { useRoutes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./components/Toast";
import bannerSrc from "./assets/img/banner.jpg";

function App() {
  const routes = useRoutes([
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/not-found",
      element: <NotFoundPage />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/catalog",
      element: <CatalogPage />,
    },
    {
      path: "/catalog/:id",
      element: <ShoeDetailsPage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/contacts",
      element: <ContactsPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
  ]);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img
                src={bannerSrc}
                className="img-fluid banner-img"
                alt="К весне готовы!"
              />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            {routes}
          </div>
        </div>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}

export default App;
