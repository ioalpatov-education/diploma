import ShoeCatalog from "./ShoeCatalog";

const CatalogPage = () => {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline">
        <input className="form-control" placeholder="Поиск" />
      </form>

      <ShoeCatalog />
    </section>
  );
};

export default CatalogPage;
