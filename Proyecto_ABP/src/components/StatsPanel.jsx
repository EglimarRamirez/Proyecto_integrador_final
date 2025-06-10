import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';

// Registramos los componentes del gráfico
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function StatsPanel(props) { 
    const data = {
        labels: ['Precio Mínimo', 'Precio Máximo'],
        datasets: [
            {
                label: 'Precios',
                data: [props.min, props.max],
                backgroundColor: ['#4ade80', '#f87171'], // verde y rojo
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Estadísticas de Precios',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
     
    
    
    
    
    return (
        <div>
            <h2>Estadísticas</h2>
            <p>Productos totales: {props.total}</p>
            <p>Precio máximo: {props.max}</p>
            <p>Precio mínimo: {props.min}</p>
            
            <div style={{ maxWidth: '500px', margin: 'auto' }}>
                <Bar data={data} options={options} />
            </div>

        </div>
    );
}

export default StatsPanel;