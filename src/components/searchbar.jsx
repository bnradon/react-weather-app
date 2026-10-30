function SearchBar({ city, setCity, onSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(city);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Busca una ciudad..."
        aria-label="Nombre de la ciudad"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
