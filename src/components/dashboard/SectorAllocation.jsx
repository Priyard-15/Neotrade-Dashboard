import { PieChart } from "lucide-react"
import { formatCurrency } from "../../utils/marketMetrics"

function SectorAllocation({ allocation }) {
  return(
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center gap-3">
        <PieChart size={21} className="text-cyan-200" />

        <h2 className="text-xl font-semibold">
          Sector Allocation
        </h2>
      </div>

      <div className="space-y-4">
        {
          allocation.map((item) => (
            <div key={item.sector}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-slate-200">
                  {item.sector}
                </span>

                <span className="text-slate-400">
                  {item.weight}% - {formatCurrency(item.value)}
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-950">
                <div
                  className="h-2 rounded-full bg-cyan-300"
                  style={{ width: `${item.weight}%` }}
                />
              </div>
            </div>
          ))
        }

        {
          allocation.length === 0 && (
            <p className="rounded-lg bg-slate-950 p-4 text-slate-400">
              Add watchlist stocks to see allocation.
            </p>
          )
        }
      </div>
    </section>
  )
}

export default SectorAllocation
