import React from 'react';

function StatsPanel(props) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Estadísticas de la Página Actual</h2>

            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Productos mostrados (total):</span> {props.total}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Precio promedio:</span> ${props.averagePrice}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Precio máximo (max):</span> ${props.max}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Precio mínimo (min):</span> ${props.min}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Rating promedio:</span> {props.averageRating}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Productos con stock &gt; 50:</span> {props.stockOver50}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Productos con rating &gt; 4.5:</span> {props.ratingOver4_5}
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Cantidad de Productos por Categoría</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {Object.entries(props.productsByCategory).map(([category, count]) => (
                    <li key={category}>
                        <span className="font-medium">{category}:</span> {count} productos
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Estadísticas Detalladas por Categoría</h3>
            {Object.entries(props.categoryStats).map(([category, stats]) => (
                <div key={category} className="mb-4 p-3 border rounded-md dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white">{category}:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Precio promedio:</span> ${stats.averagePrice}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Producto más caro:</span> {stats.mostExpensiveProduct.title} (${stats.mostExpensiveProduct.price})
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Producto más barato:</span> {stats.cheapestProduct.title} (${stats.cheapestProduct.price})
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Rating promedio:</span> {stats.averageRating}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default StatsPanel;