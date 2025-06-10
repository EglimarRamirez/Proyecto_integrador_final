function StatsPanel(props) {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-4">
            <h2 className="text-lg font-semibold mb-2">Estadísticas</h2>
            <p>Productos totales: {props.total}</p>
            <p>Precio máximo: {props.max}</p>
            <p>Precio mínimo: {props.min}</p>
        </div>
    );
}

export default StatsPanel;