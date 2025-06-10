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
        <div ref={containerRef}
        >
            <div className="flex justify-between items-center mb-6">         
              <h1 className="text-2xl font-bold">Lista de Productos</h1>
            
              <button
                onClick={toggleDarkMode}
                className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black"
              >
                Modo {darkMode ? "Claro" : "Oscuro"}
              </button>
            
            </div> 
            
            <SearchBar search={search} setSearch={setSearch} />            
            

            <ProductList products={filteredProducts} />

            <div className="mt-6">

            <button onClick={() => setShowStats(!showStats)}
                    className="mb-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
                {showStats ? "Ocultar" : "Mostrar"} estadísticas
            </button>


            {showStats && filteredProducts.length > 0 && (
                <StatsPanel total={total}  max={max}  min={min} />
            )}

            {filteredProducts.length === 0 && (
              <p className="text-center text-red-500 font-semibold">
                No se encontraron productos
              </p>
            )}

            </div>
        </div>
    );
}

export default App;
