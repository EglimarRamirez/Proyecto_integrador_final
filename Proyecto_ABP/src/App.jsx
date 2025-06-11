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
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(1);
    const [totalProductsApi, setTotalProductsApi] = useState(0);

    const containerRef = useRef(null);

    const limit = 30;

    useEffect(() => {
        axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`).then((res) => {
            setProducts(res.data.products);
            setTotalProductsApi(res.data.total);
        });
        
        axios.get(`https://dummyjson.com/products/categories`).then((res) => {
            setCategories(res.data);    
        });        
    }, [page]);

    let filteredProducts = products;

    filteredProducts = products.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
        );

    if (category !== "all") {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category
      );
    }
    
    if (sortBy === "price" || sortBy === "rating") {
      filteredProducts = [...filteredProducts].sort((a, b) =>
        sortOrder === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
      );
    }

    const total = filteredProducts.length;
    const max = filteredProducts.length > 0 ? Math.max(...filteredProducts.map(p => p.price)) : 0;
    const min = filteredProducts.length > 0 ? Math.min(...filteredProducts.map(p => p.price)) : 0;
    const averagePrice = filteredProducts.length > 0 ? (filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length).toFixed(2) : 0;

    const productsByCategory = filteredProducts.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    const stockOver50 = filteredProducts.filter(p => p.stock > 50).length;

    const ratingOver4_5 = filteredProducts.filter(p => p.rating > 4.5).length;

    const averageRating = filteredProducts.length > 0 ? (filteredProducts.reduce((sum, p) => sum + p.rating, 0) / filteredProducts.length).toFixed(2) : 0;

    const categoryStats = {};
    Object.keys(productsByCategory).forEach(cat => {
        const productsInCat = filteredProducts.filter(p => p.category === cat);
        const pricesInCat = productsInCat.map(p => p.price);
        const ratingsInCat = productsInCat.map(p => p.rating);

        categoryStats[cat] = {
            averagePrice: (pricesInCat.reduce((sum, price) => sum + price, 0) / pricesInCat.length).toFixed(2),
            maxPrice: Math.max(...pricesInCat),
            minPrice: Math.min(...pricesInCat),
            averageRating: (ratingsInCat.reduce((sum, rating) => sum + rating, 0) / ratingsInCat.length).toFixed(2),
            mostExpensiveProduct: productsInCat.reduce((prev, current) => (prev.price > current.price) ? prev : current, {price: 0}),
            cheapestProduct: productsInCat.reduce((prev, current) => (prev.price < current.price) ? prev : current, {price: Infinity}),
        };
    });

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

            {/* Controles de filtro y orden */}
            <div className="flex flex-wrap gap-4 my-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="all">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Ordenar por...</option>
                <option value="price">Precio</option>
                <option value="rating">Rating</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>
         
            
            <ProductList products={filteredProducts} />

            <small>Página {page}</small>
            <br />
            <button
                disabled={page === 1}
                onClick={() => {
                    setPage(page - 1);
                }}
            >
                Página anterior
            </button>
            <button
                disabled={(page * limit) >= totalProductsApi}
                onClick={() => {
                    setPage(page + 1);
                }}
            >
                Página siguiente
            </button> 

            <div className="mt-6">

            <button onClick={() => setShowStats(!showStats)}
                    className="mb-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
                {showStats ? "Ocultar" : "Mostrar"} estadísticas
            </button>


            {showStats && filteredProducts.length > 0 && (
                <StatsPanel 
                total={total}
                    max={max}          
                    min={min}          
                    averagePrice={averagePrice}
                    productsByCategory={productsByCategory}
                    stockOver50={stockOver50}
                    ratingOver4_5={ratingOver4_5}
                    averageRating={averageRating}
                    categoryStats={categoryStats} 
                />
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
