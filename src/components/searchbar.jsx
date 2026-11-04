import SpecularButton from './searchButton';


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
      <SpecularButton 
        size="md"
  radius={40}
  tint="#94b8ee"
  tintOpacity={0.2}
  textColor="#f5f5f5"
  lineColor="#c3d4f2"
  baseColor="#63f1cc"
  intensity={1}
  idleIntensity={0.35}
  shineSize={14}
  shineFade={40}
  thickness={1.5}
  glow={1.4}
  followMouse
  proximity={250}
  type="submit"
  >
    Buscar
    </SpecularButton>
    </form>
  );
}


export default SearchBar;
