import {
  Bell,
  DatabaseZap,
  LogOut,
  Sparkles,
} from "lucide-react"

function DashboardHeader({
  marketDataStatus,
  marketMood,
  onLogout,
}) {
  const dataStatusLabel = marketDataStatus === "live"
    ? "Live API data"
    : marketDataStatus === "partial-live"
      ? "Partial live data"
      : marketDataStatus === "rate-limited"
        ? "API limit reached"
        : marketDataStatus === "no-key"
          ? "API key missing"
    : marketDataStatus === "connecting"
      ? "Connecting data"
      : "Static fallback"
  const dataStatusTone = marketDataStatus === "live"
    ? "text-emerald-300"
    : marketDataStatus === "partial-live"
      ? "text-amber-200"
    : marketDataStatus === "connecting"
      ? "text-amber-200"
      : "text-rose-200"

  return(
    <header className="flex flex-col gap-5 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
          Live market workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Stock Market Trend Analysis
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200">
          <Sparkles size={17} className="text-cyan-200" />
          {marketMood.label} market
        </div>

        <div className={`inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm ${dataStatusTone}`}>
          <DatabaseZap size={17} />
          {dataStatusLabel}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-cyan-300 hover:text-cyan-200"
          title="Notifications"
        >
          <Bell size={19} />
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </header>
  )
}

export default DashboardHeader
