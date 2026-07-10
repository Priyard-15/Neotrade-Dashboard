import {
  FileText,
  Lightbulb,
  ShieldAlert,
} from "lucide-react"

function InvestmentThesisPanel({ thesis }) {
  return(
    <section id="investment-thesis" className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center gap-3">
        <FileText size={21} className="text-cyan-200" />

        <h2 className="text-xl font-semibold">
          AI Investment Thesis
        </h2>
      </div>

      <div className="space-y-3">
        <article className="rounded-lg bg-slate-950 p-4">
          <p className="text-sm font-semibold text-cyan-100">
            Thesis
          </p>

          <p className="mt-2 leading-7 text-slate-300">
            {thesis.thesis}
          </p>
        </article>

        <article className="rounded-lg bg-slate-950 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
            <Lightbulb size={15} />
            Catalyst
          </div>

          <p className="mt-2 leading-7 text-slate-300">
            {thesis.catalyst}
          </p>
        </article>

        <article className="rounded-lg bg-slate-950 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
            <ShieldAlert size={15} />
            Risk note
          </div>

          <p className="mt-2 leading-7 text-slate-300">
            {thesis.risk}
          </p>
        </article>
      </div>
    </section>
  )
}

export default InvestmentThesisPanel
