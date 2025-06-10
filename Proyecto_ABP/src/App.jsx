import axios from "axios";
import { useEffect, useState, useRef } from "react";
import StatsPanel from "./components/StatsPanel";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";

function App() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showStats, setShowStats] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    
    const containerRef = useRef(null);


    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=100").then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    const total = filteredProducts.length;
    const max = Math.max(...filteredProducts.map(p => p.price));
    const min = Math.min(...filteredProducts.map(p => p.price));

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        containerRef.current.classList.toggle("dark-mode");
    };

    return (
        <div ref={containerRef}>
            <h1>Lista de Productos</h1>
            <button onClick={toggleDarkMode}>Modo {darkMode ? "Claro" : "Oscuro"}</button>

            <SearchBar search={search} setSearch={setSearch} />            


            <ProductList products={filteredProducts} />


            <button onClick={() => setShowStats(!showStats)}>
                {showStats ? "Ocultar" : "Mostrar"} estadísticas
            </button>


            {showStats && filteredProducts.length > 0 && (
                <StatsPanel total={total}  max={max}  min={min} />
            )}

            {filteredProducts.length === 0 && <p>No se encontraron productos</p>}
        </div>
    );
}

export default App;
