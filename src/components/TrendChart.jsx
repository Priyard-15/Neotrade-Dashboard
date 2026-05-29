import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

function TrendChart({stock}){
  const isPositive = stock.change >= 0

  return(
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
            Trend Analysis
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-white">
            {stock.name} weekly movement
          </h2>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-400">
            Current price
          </p>

          <p className="text-xl font-semibold text-white">
            ${stock.price.toFixed(2)}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stock.history}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 8", "dataMax + 8"]}
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#f8fafc",
            }}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "#22c55e" : "#fb7185"}
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </section>
  )
}

export default TrendChart
