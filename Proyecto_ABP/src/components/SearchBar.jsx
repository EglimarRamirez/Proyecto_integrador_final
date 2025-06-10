function SearchBar(props) {
  return (
    <input
      className="border p-2 w-full md:w-1/2 rounded"
      type="text"
      placeholder="Buscar producto"
      value={props.search}
      onChange={(e) => props.setSearch(e.target.value)}
    />
  );
}

export default SearchBar;