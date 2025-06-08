import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showStats, setShowStats] = useState(true);


    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=100").then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    const total = filteredProducts.length;
    const max = filteredProducts.length ? Math.max(...filteredProducts.map(p => p.price)) : 0;
    const min = filteredProducts.length ? Math.min(...filteredProducts.map(p => p.price)) : 0;

    return (
        <div>
            <h1>Lista de Productos</h1>

            <input
                type="text"
                placeholder="Buscar producto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={() => setShowStats(!showStats)}>
                {showStats ? "Ocultar" : "Mostrar"} estadísticas
            </button>

            {showStats && filteredProducts.length > 0 && (
                <div>
                    <p>Total: {total}</p>
                    <p>Precio Máximo: {max}</p>
                    <p>Precio Mínimo: {min}</p>
                </div>
            )}

            <ul>
                {filteredProducts.map((p) => (
                    <li key={p.id}>
                        {p.title} - ${p.price}
                    </li>
                ))}
            </ul>

            {filteredProducts.length === 0 && <p>No se encontraron productos</p>}
        </div>
    );
}

export default App;
