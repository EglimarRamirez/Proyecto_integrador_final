import React from 'react';
// Importaciones de react-chartjs-2
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Registramos los componentes necesarios para Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function StatsPanel(props) {
    // Aseguramos que las props relacionadas con datos sean objetos/arrays válidos desde el inicio
    const productsByCategory = props.productsByCategory || {};
    const filteredProducts = props.filteredProducts || [];
    const categoryStats = props.categoryStats || {}; // 


    // 1. Gráfico de Barras: Cantidad de productos por categoría
    const categoryLabels = Object.keys(productsByCategory);
    const categoryDataValues = Object.values(productsByCategory);

    const categoryBarChartData = {
        labels: categoryLabels,
        datasets: [
            {
                label: 'Cantidad de Productos',
                data: categoryDataValues,
                backgroundColor: categoryLabels.map((_, i) => `hsl(${i * 60}, 70%, 50%)`), // Colores dinámicos
                borderRadius: 8,
            },
        ],
    };

    const categoryBarChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: props.darkMode ? '#e0e0e0' : '#333' }
            },
            title: {
                display: true,
                text: 'Productos por Categoría',
                color: props.darkMode ? '#e0e0e0' : '#333'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: props.darkMode ? '#e0e0e0' : '#333' },
                grid: { color: props.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            },
            x: {
                ticks: { color: props.darkMode ? '#e0e0e0' : '#333' },
                grid: { color: props.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            }
        },
    };

    // 2. Gráfico de Líneas: Evolución de precios simulada
    const lineChartLabels = filteredProducts.map((_, index) => `P-${index + 1}`);
    const lineChartPriceValues = filteredProducts.map(p => p.price);

    const lineChartData = {
        labels: lineChartLabels,
        datasets: [
            {
                label: 'Precio',
                data: lineChartPriceValues,
                borderColor: '#82ca9d',
                backgroundColor: 'rgba(130, 202, 157, 0.2)',
                tension: 0.4, 
                pointBackgroundColor: '#82ca9d',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: props.darkMode ? '#e0e0e0' : '#333' }
            },
            title: {
                display: true,
                text: 'Evolución de Precios (Simulada)',
                color: props.darkMode ? '#e0e0e0' : '#333'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `$${context.raw}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: props.darkMode ? '#e0e0e0' : '#333' },
                grid: { color: props.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            },
            x: {
                ticks: { color: props.darkMode ? '#e0e0e0' : '#333' },
                grid: { color: props.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            }
        },
    };

    // 3. Pie Chart: Proporción de productos según stock
    const lowStockCount = filteredProducts.filter(p => p.stock < 10).length;
    const mediumStockCount = filteredProducts.filter(p => p.stock >= 10 && p.stock <= 50).length;
    const highStockCount = filteredProducts.filter(p => p.stock > 50).length;

    const pieChartLabels = ['Stock Bajo (<10)', 'Stock Medio (10-50)', 'Stock Alto (>50)'];
    const pieChartValues = [lowStockCount, mediumStockCount, highStockCount];

    const filteredPieLabels = [];
    const filteredPieValues = [];
    const filteredPieColors = [];

    const PIE_COLORS = ['#FF8042', '#00C49F', '#0088FE']; 

    pieChartValues.forEach((value, index) => {
        if (value > 0) {
            filteredPieLabels.push(pieChartLabels[index]);
            filteredPieValues.push(value);
            filteredPieColors.push(PIE_COLORS[index]);
        }
    });

    const stockPieChartData = {
        labels: filteredPieLabels,
        datasets: [
            {
                data: filteredPieValues,
                backgroundColor: filteredPieColors,
                borderColor: props.darkMode ? '#2d3748' : '#ffffff', 
                borderWidth: 1,
            },
        ],
    };

    const stockPieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right', 
                labels: { color: props.darkMode ? '#e0e0e0' : '#333' }
            },
            title: {
                display: true,
                text: 'Proporción de Productos por Stock',
                color: props.darkMode ? '#e0e0e0' : '#333'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((sum, current) => sum + current, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
    };


    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-gray-900 dark:text-white">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Estadísticas de la Página Actual</h2>

            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Productos mostrados (total):</span> {props.total || 0}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Precio promedio:</span> ${props.averagePrice || 0}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Precio máximo (max):</span> ${props.max || 0}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Precio mínimo (min):</span> ${props.min || 0}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Rating promedio:</span> {props.averageRating || 0}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Productos con stock &gt; 50:</span> {props.stockOver50 || 0}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Productos con rating &gt; 4.5:</span> {props.ratingOver4_5 || 0}
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Cantidad de Productos por Categoría</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {Object.entries(productsByCategory).map(([category, count]) => (
                    <li key={category}>
                        <span className="font-medium">{category}:</span> {count} productos
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Estadísticas Detalladas por Categoría</h3>
            
            {Object.entries(categoryStats).map(([category, stats]) => (
                <div key={category} className="mb-4 p-3 border rounded-md dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white">{category}:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Precio promedio:</span> ${stats?.averagePrice || 0}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Producto más caro:</span> {stats?.mostExpensiveProduct?.title || 'N/A'} (${stats?.mostExpensiveProduct?.price || 0})
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Producto más barato:</span> {stats?.cheapestProduct?.title || 'N/A'} (${stats?.cheapestProduct?.price || 0})
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Rating promedio:</span> {stats?.averageRating || 0}
                    </p>
                </div>
            ))}

            {/* Contenedores de gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Gráfico de Barras: Cantidad de productos por categoría  */}
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Productos por Categoría</h4>
                    {categoryBarChartData.datasets[0].data.length > 0 ? (
                        <div style={{ maxWidth: '500px', width: '100%' }}>
                            <Bar data={categoryBarChartData} options={categoryBarChartOptions} />
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400">No hay datos para mostrar el gráfico de categorías.</p>
                    )}
                </div>

                {/* Gráfico de Líneas: Evolución de precios simulada  */}
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Evolución de Precios (Simulada)</h4>
                    {lineChartData.datasets[0].data.length > 0 ? (
                        <div style={{ maxWidth: '500px', width: '100%' }}>
                            <Line data={lineChartData} options={lineChartOptions} />
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400">No hay datos para mostrar la evolución de precios.</p>
                    )}
                </div>

                {/* Pie Chart: Proporción de productos según stock */}
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner md:col-span-2 flex flex-col justify-center items-center">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Proporción de Productos por Stock</h4>
                    {stockPieChartData.datasets[0].data.length > 0 ? (
                        <div style={{ maxWidth: '500px', width: '100%' }}>
                            <Pie data={stockPieChartData} options={stockPieChartOptions} />
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400">No hay datos para mostrar la proporción de stock.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default StatsPanel;
