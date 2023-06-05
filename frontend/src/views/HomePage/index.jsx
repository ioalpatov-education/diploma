import Preloader from "../../components/Preloader";

const HomePage = () => {
  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <Preloader />
      </section>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Preloader />
      </section>
    </>
  );
};

export default HomePage;
