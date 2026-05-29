import {
  Newspaper,
  Star,
} from "lucide-react"

function MarketNewsPanel({ newsItems }) {
  return(
    <section id="market-news" className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center gap-3">
        <Newspaper size={21} className="text-cyan-200" />

        <h2 className="text-xl font-semibold">
          Market News
        </h2>
      </div>

      <div className="space-y-3">
        {
          newsItems.map((news) => (
            <article
              key={news.id}
              className="rounded-lg bg-slate-950 p-4"
            >
              <div className="flex items-start gap-3">
                <Star size={17} className="mt-1 shrink-0 text-amber-200" />

                <div>
                  <h3 className="font-semibold">
                    {news.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {news.source} - {news.time}
                  </p>
                </div>
              </div>
            </article>
          ))
        }
      </div>
    </section>
  )
}

export default MarketNewsPanel
