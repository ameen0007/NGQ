"use client";

import React from 'react';
import { SymbolOverview } from "react-ts-tradingview-widgets";

export default function TradingViewTicker() {
  return (
    <div className="w-full mt-4 border border-neutral-100 shadow-sm rounded-2xl bg-[#F9FAFB] overflow-hidden p-6 h-[450px]">
        <SymbolOverview 
            colorTheme="light" 
            chartType="area"
            symbols={[
                ["SENSEX", "BSE:SENSEX"],
                ["NIFTY 50", "BSE:SENSEX50"],
                ["S&P 500", "AMEX:SPY"],
                ["NASDAQ", "NASDAQ:QQQ"]
            ]}
            width="100%"
            height="100%"
            gridLineColor="#e5e7eb"
            fontFamily="Arial, sans-serif"
            dateFormat="dd MMM 'yy"
        />
    </div>
  );
}
