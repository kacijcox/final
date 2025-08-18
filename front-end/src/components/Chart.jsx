import React, {useEffect} from 'react';

const Chart = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://widgets.coingecko.com/gecko-coin-price-chart-widget.js';
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);


    return (
        <>
        <div className="chart-container">
            <gecko-coin-price-chart-widget
                locale="en"
                dark-mode="true"
                outlined="true"
                coin-id="bitcoin"
                initial-currency="usd"
                width="200"
                height="200">
            </gecko-coin-price-chart-widget>
        </div>
            {/*<div className="chart-container">*/}
            {/*    <gecko-coin-price-chart-widget*/}
            {/*        locale="en"*/}
            {/*        dark-mode="true"*/}
            {/*        outlined="true"*/}
            {/*        coin-id="ethereum"*/}
            {/*        initial-currency="usd"*/}
            {/*        width="200"*/}
            {/*        height="200">*/}
            {/*    </gecko-coin-price-chart-widget>*/}
            {/*</div>*/}
            {/*<div className="chart-container">*/}
            {/*    <gecko-coin-price-chart-widget*/}
            {/*        locale="en"*/}
            {/*        dark-mode="true"*/}
            {/*        outlined="true"*/}
            {/*        coin-id="solana"*/}
            {/*        initial-currency="usd"*/}
            {/*        width="200"*/}
            {/*        height="200">*/}
            {/*    </gecko-coin-price-chart-widget>*/}
            {/*</div>*/}
            </>
    );
};

export default Chart;