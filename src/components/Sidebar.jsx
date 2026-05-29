import {
  BrainCircuit,
  BellRing,
  BriefcaseBusiness,
  GitCompareArrows,
  LayoutDashboard,
  Newspaper,
  Search,
  ServerCog,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react"

function Sidebar(){
  const items = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Search", icon: Search },
    { label: "Market Trends", icon: TrendingUp },
    { label: "AI Prediction", icon: BrainCircuit },
    { label: "Decision Engine", icon: SlidersHorizontal },
    { label: "Smart Tools", icon: BellRing },
    { label: "Stock Compare", icon: GitCompareArrows, href: "#smart-tools" },
    { label: "Portfolio", icon: BriefcaseBusiness },
    { label: "Market News", icon: Newspaper },
  ]

  return(
    <aside className="hidden min-h-screen w-64 border-r border-slate-800 bg-slate-950 px-5 py-6 text-white lg:block">
      <h1 className="text-2xl font-bold">
        NeoTrade AI
      </h1>

      <p className="mt-2 text-sm text-slate-400">
        Stock trend dashboard
      </p>

      <nav className="mt-10 space-y-2">
        {
          items.map((item) => {
            const Icon = item.icon

            return(
              <a
                key={item.label}
                href={item.href || `#${item.label.toLowerCase().replaceAll(" ", "-")}`}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-cyan-200"
              >
                <Icon size={18} />
                {item.label}
              </a>
            )
          })
        }
      </nav>

      <div className="mt-10 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
          <ServerCog size={16} />
          Market data layer
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Finnhub-ready quotes, Firebase auth, explainable signals, and portfolio diagnostics in one workspace.
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
