import Preloader from "../../components/Preloader";

const HomePage = () => {
  const bannerSrc = require("../../assets/img/banner.jpg");
  return (
    <div className="row">
      <div className="col">
        <div className="banner">
          <img src={bannerSrc} className="img-fluid" alt="К весне готовы!" />
          <h2 className="banner-header">К весне готовы!</h2>
        </div>
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          <Preloader />
        </section>
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          <Preloader />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
