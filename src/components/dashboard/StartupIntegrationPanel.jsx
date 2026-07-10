import { useMemo } from "react"
import {
  Building2,
  Database,
  Link2,
  ShieldCheck,
} from "lucide-react"

function StartupIntegrationPanel({
  startupId,
  apiKey,
  onStartupIdChange,
  onApiKeyChange,
  onFetchStartupData,
  status,
  error,
  metrics,
}) {
  const hasData = Boolean(metrics && Object.keys(metrics).length)

  const summaryText = useMemo(() => {
    if(status === "loading") return "Connecting to startup analytics..."
    if(status === "idle") return "Enter a startup ID and API key to fetch business metrics."
    if(status === "success") return "Startup data loaded successfully."
    if(status === "error") return "Unable to load startup data. Check the ID or API key."
    return ""
  }, [status])

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center gap-3">
        <Building2 size={21} className="text-cyan-200" />

        <div>
          <h2 className="text-xl font-semibold">Startup analytics</h2>
          <p className="text-sm text-slate-400">Connect a business or store ID and start analyzing sales metrics.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Startup ID</span>
          <input
            value={startupId}
            onChange={(event) => onStartupIdChange(event.target.value)}
            placeholder="e.g. shop-12345"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">API key / secret</span>
          <input
            value={apiKey}
            onChange={(event) => onApiKeyChange(event.target.value)}
            placeholder="Optional key for private stores"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onFetchStartupData}
          disabled={!startupId || status === "loading"}
          className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-cyan-300 px-4 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Link2 size={18} />
          Connect startup
        </button>

        <p className="text-sm text-slate-400">{summaryText}</p>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </div>
      )}

      {hasData && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(metrics).map(([key, value]) => (
            <article key={key} className="rounded-2xl bg-slate-950 p-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Database size={20} />
                <span className="text-sm uppercase tracking-wide text-slate-500">{key.replaceAll("_", " ")}</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
            </article>
          ))}
        </div>
      )}

      {!hasData && status === "success" && (
        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-cyan-300" />
            <span>Connected successfully, but no metrics were returned.</span>
          </div>
        </div>
      )}

      <p className="mt-5 text-sm text-slate-500">
        This feature lets business users connect their startup data source with an ID and optional API key. The dashboard can then show business metrics instead of only stock quotes.
      </p>
    </section>
  )
}

export default StartupIntegrationPanel
