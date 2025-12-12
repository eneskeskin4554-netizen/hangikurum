import React, { useEffect, useRef, memo } from 'react';

const MarketChart: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": "BIST:XU100",
      "interval": "D",
      "timezone": "Europe/Istanbul",
      "theme": "dark",
      "style": "1", // Candlesticks
      "locale": "tr",
      "enable_publishing": false,
      "backgroundColor": "rgba(15, 15, 15, 1)", // Matches app background #0f0f0f
      "gridColor": "rgba(255, 255, 255, 0.05)",
      "withdateranges": true,
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
      "watchlist": [
        "BIST:XU100",
        "BIST:XU030",
        "BIST:XBANK",
        "BIST:XUSIN",
        "FX:USDTRY",
        "FX:EURTRY",
        "OANDA:XAUUSD",
        "BINANCE:BTCUSDT"
      ],
      "details": true,
      "hotlist": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    });

    if (container.current) {
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="glass-panel rounded-3xl p-1 md:p-2 w-full border border-white/10 shadow-2xl relative overflow-hidden h-[600px] md:h-[700px]">
      <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
        <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      </div>
    </div>
  );
};

export default memo(MarketChart);