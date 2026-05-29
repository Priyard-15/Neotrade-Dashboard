import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import Sidebar from "../components/Sidebar"
import StockCard from "../components/StockCard"
import TrendChart from "../components/TrendChart"
import AiInsightPanel from "../components/dashboard/AiInsightPanel"
import AlertsPanel from "../components/dashboard/AlertsPanel"
import ComparePanel from "../components/dashboard/ComparePanel"
import DashboardHeader from "../components/dashboard/DashboardHeader"
import DecisionEnginePanel from "../components/dashboard/DecisionEnginePanel"
import MarketNewsPanel from "../components/dashboard/MarketNewsPanel"
import PortfolioPanel from "../components/dashboard/PortfolioPanel"
import SectorAllocation from "../components/dashboard/SectorAllocation"
import StatGrid from "../components/dashboard/StatGrid"
import StockFilters from "../components/dashboard/StockFilters"
import stocks, { marketNews } from "../data/stocks"
import { auth } from "../firebase"
import {
  fetchMarketNews,
  fetchStockCandles,
  fetchStockQuotes,
  hasMarketApiKey,
} from "../services/stockApi"
import {
  getMarketMood,
  getPrediction,
  getPredictionTone,
  getPortfolioDiagnostics,
  getRiskProfile,
  getSectorAllocation,
  getTechnicalSignal,
} from "../utils/marketMetrics"

function Dashboard(){
  const navigate = useNavigate()
  const [alertPrice, setAlertPrice] = useState("")
  const [compareSymbol, setCompareSymbol] = useState("MSFT")
  const [query, setQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("All")
  const [selectedSymbol, setSelectedSymbol] = useState(stocks[0].symbol)
  const [sortMode, setSortMode] = useState("aiScore")
  const [watchlist, setWatchlist] = useState(["AAPL", "MSFT", "NVDA"])
  const [liveCandles, setLiveCandles] = useState([])
  const [liveNews, setLiveNews] = useState([])
  const [liveQuotes, setLiveQuotes] = useState({})
  const [marketDataStatus, setMarketDataStatus] = useState("connecting")

  const selectedStock = stocks.find((stock) => stock.symbol === selectedSymbol) || stocks[0]
  const enrichedStocks = useMemo(() => {
    return stocks.map((stock) => {
      const quote = liveQuotes[stock.symbol]

      if(!quote?.c){
        return stock
      }

      const change = quote.pc
        ? Number((((quote.c - quote.pc) / quote.pc) * 100).toFixed(2))
        : stock.change

      return {
        ...stock,
        change,
        price: quote.c,
      }
    })
  }, [liveQuotes])
  const displayedStock = {
    ...(enrichedStocks.find((stock) => stock.symbol === selectedSymbol) || selectedStock),
    history: liveCandles.length ? liveCandles : selectedStock.history,
  }

  const sectors = useMemo(() => {
    return ["All", ...new Set(enrichedStocks.map((stock) => stock.sector))]
  }, [enrichedStocks])

  const filteredStocks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return enrichedStocks
      .filter((stock) => (
        selectedSector === "All" || stock.sector === selectedSector
      ))
      .filter((stock) => {
        if(!normalizedQuery){
          return true
        }

        return (
          stock.name.toLowerCase().includes(normalizedQuery) ||
          stock.symbol.toLowerCase().includes(normalizedQuery) ||
          stock.sector.toLowerCase().includes(normalizedQuery)
        )
      })
      .toSorted((first, second) => {
        if(sortMode === "symbol"){
          return first.symbol.localeCompare(second.symbol)
        }

        return second[sortMode] - first[sortMode]
      })
  }, [enrichedStocks, query, selectedSector, sortMode])

  const watchlistStocks = enrichedStocks.filter((stock) => watchlist.includes(stock.symbol))
  const portfolioValue = watchlistStocks.reduce((total, stock) => {
    return total + stock.price * stock.holdings
  }, 0)
  const prediction = getPrediction(displayedStock.change)
  const predictionTone = getPredictionTone(prediction)
  const marketMood = getMarketMood(enrichedStocks)
  const riskProfile = getRiskProfile(displayedStock)
  const sectorAllocation = getSectorAllocation(watchlistStocks)
  const technicalSignal = getTechnicalSignal(displayedStock)
  const portfolioDiagnostics = getPortfolioDiagnostics(watchlistStocks)
  const displayedNews = liveNews.length ? liveNews : marketNews

  useEffect(() => {
    let ignore = false

    async function loadMarketData(){
      if(!hasMarketApiKey()){
        setMarketDataStatus("no-key")
        return
      }

      try{
        const [quoteResult, news] = await Promise.all([
          fetchStockQuotes(stocks.map((stock) => stock.symbol)),
          fetchMarketNews(),
        ])
        const quoteCount = Object.keys(quoteResult.quotes).length

        if(!ignore){
          setLiveQuotes(quoteResult.quotes)
          setLiveNews(news)
          setMarketDataStatus(
            quoteResult.rateLimited
              ? "rate-limited"
              : quoteCount === stocks.length
                ? "live"
                : quoteCount > 0
                  ? "partial-live"
                  : "fallback"
          )
        }
      }catch(error){
        console.warn(error.message)

        if(!ignore){
          setLiveQuotes({})
          setLiveNews([])
          setMarketDataStatus("fallback")
        }
      }
    }

    loadMarketData()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false

    async function loadCandles(){
      try{
        const candles = await fetchStockCandles(selectedSymbol)

        if(!ignore){
          setLiveCandles(candles)
        }
      }catch(error){
        console.warn(error.message)

        if(!ignore){
          setLiveCandles([])
        }
      }
    }

    loadCandles()

    return () => {
      ignore = true
    }
  }, [selectedSymbol])

  const toggleWatchlist = (symbol) => {
    setWatchlist((current) => (
      current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol]
    ))
  }

  const selectStock = (stock) => {
    setSelectedSymbol(stock.symbol)
    setAlertPrice("")
  }

  const logout = async() => {
    try{
      await signOut(auth)
    }catch(error){
      console.warn(error.message)
    }finally{
      navigate("/")
    }
  }

  return(
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
        <DashboardHeader
          marketDataStatus={marketDataStatus}
          marketMood={marketMood}
          onLogout={logout}
        />

        <StatGrid
          marketMood={marketMood}
          portfolioValue={portfolioValue}
          prediction={prediction}
          predictionTone={predictionTone}
          stockCount={enrichedStocks.length}
          watchlistCount={watchlist.length}
        />

        <StockFilters
          activeSector={selectedSector}
          query={query}
          sectors={sectors}
          sortMode={sortMode}
          onQueryChange={setQuery}
          onSectorChange={setSelectedSector}
          onSortModeChange={setSortMode}
        />

        <section id="dashboard" className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {
            filteredStocks.map((stock)=>(
              <StockCard
                key={stock.id}
                stock={stock}
                active={stock.symbol === displayedStock.symbol}
                saved={watchlist.includes(stock.symbol)}
                onSelect={selectStock}
                onToggleWatchlist={toggleWatchlist}
              />
            ))
          }
        </section>

        <section id="market-trends" className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
          <TrendChart stock={displayedStock} />

          <AiInsightPanel
            prediction={prediction}
            predictionTone={predictionTone}
            riskProfile={riskProfile}
            stock={displayedStock}
          />
        </section>

        <section className="mt-6">
          <DecisionEnginePanel
            portfolioDiagnostics={portfolioDiagnostics}
            technicalSignal={technicalSignal}
          />
        </section>

        <section id="smart-tools" className="mt-6 grid gap-6 xl:grid-cols-2">
          <AlertsPanel
            alertPrice={alertPrice}
            riskProfile={riskProfile}
            stock={displayedStock}
            onAlertPriceChange={setAlertPrice}
          />

          <ComparePanel
            compareSymbol={compareSymbol}
            selectedStock={displayedStock}
            stocks={enrichedStocks}
            onCompareSymbolChange={setCompareSymbol}
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-3">
          <PortfolioPanel stocks={watchlistStocks} />

          <SectorAllocation allocation={sectorAllocation} />

          <MarketNewsPanel newsItems={displayedNews} />
        </section>
      </main>
    </div>
  )
}

export default Dashboard
