import React from "react";
import './app.css';
import { StockSearchClient, MarketStatusClient, StockAdvancedQuoteClient } from "../stocks-api-client.ts";

import StockInfo from "./StockInfo/stockInfo";
import StockPrice from "./StockPrice/stockprice";
import MarketStatus from "./MarketStatus/marketstatus";
import StockAdditionalInfo from "./StockAdditionalInfo/stockadditionalinfo";

const initialState = {
    ActiveStockTickerSymbol: "QCOM",
    ActiveStockPreview: null,
    ActiveStockAdvancedQuote: null,
    MarketStatus: null,
    SearchResults: null
};

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = initialState;
    }

    componentDidMount()
    {
        this.searchStock();
        this.updateMarketStatus();
        this.retrieveAdvancedQuote();
    }

    async searchStock()
    {
        let client = new StockSearchClient();
        await client
            .get(this.state.ActiveStockTickerSymbol)
            .then(data => this.setState({ ActiveStockPreview: data[0], SearchResults: data }));
    }

    async updateMarketStatus()
    {
        let client = new MarketStatusClient();
        await client
            .get(this.state.ActiveStockTickerSymbol)
            .then(data => this.setState({ MarketStatus: data}));
    }

    async retrieveAdvancedQuote()
    {
        let client = new StockAdvancedQuoteClient();
        await client
            .get(this.state.ActiveStockTickerSymbol)
            .then(data => this.setState({ ActiveStockAdvancedQuote: data}));
    }

    render()
    {
        return(
            <div className="app">
                <div className="side-bar">
                    <div className="component search">&#128296;</div>
                    <div className="component search-results">&#128296;</div>
                    <div className="side-bar-bottom">
                        <div className="component title">IEXCloud</div>
                        <MarketStatus marketStatus={this.state.MarketStatus} />
                    </div>
                </div>
                <div className="main-content">
                    <div className="main-content-top">
                        <div className="main-content-top-spacer"></div>
                        <div className="main-content-top-body">
                            <StockInfo activeStockPreview={this.state.ActiveStockPreview} />
                            <StockPrice activeStockPreview={this.state.ActiveStockPreview} />
                        </div>
                    </div>
                    <div className="main-content-bottom">
                        <div className="component chart">&#128296;</div>
                        <StockAdditionalInfo activeStockAdvancedQuote={this.state.ActiveStockAdvancedQuote} />
                        <div className="component news">&#128296;</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
