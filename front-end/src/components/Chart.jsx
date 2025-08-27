import React, { useEffect, useRef } from 'react';

const Chart = ({ coinId = 'bitcoin' }) => {
    const chartContainerRef = useRef(null);
    
    //load coin gecko script
    useEffect(() => {
        if (!document.querySelector('script[src="https://widgets.coingecko.com/gecko-coin-price-chart-widget.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://widgets.coingecko.com/gecko-coin-price-chart-widget.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);
    
    //update chart when coinid changes
    useEffect(() => {
        if (!coinId) return;
        
        // Clear previous chart
        if (chartContainerRef.current) {
            chartContainerRef.current.innerHTML = '';
            
            //create new chart with coin id
            const chartWidget = document.createElement('gecko-coin-price-chart-widget');
            chartWidget.setAttribute('locale', 'en');
            chartWidget.setAttribute('dark-mode', 'true');
            chartWidget.setAttribute('outlined', 'true');
            chartWidget.setAttribute('coin-id', coinId);
            chartWidget.setAttribute('initial-currency', 'usd');
            chartWidget.setAttribute('width', '200');
            chartWidget.setAttribute('height', '200');
            
            chartContainerRef.current.appendChild(chartWidget);
        }
    }, [coinId]);

    return (
        <div className="chart-container" ref={chartContainerRef}></div>
    );
};

export default Chart;