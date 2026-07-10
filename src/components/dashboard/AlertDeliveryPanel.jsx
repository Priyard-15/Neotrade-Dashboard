import {
  Clipboard,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { formatCurrency } from "../../utils/marketMetrics"

function AlertDeliveryPanel({
  backtestMetrics,
  stock,
  technicalSignal,
}) {
  const [copied, setCopied] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [isCustomText, setIsCustomText] = useState(false)
  const previousDefaultRef = useRef("")

  const defaultAlertMessage = `${stock.symbol} alert: ${technicalSignal.action} with ${technicalSignal.confidence}% confidence, ${backtestMetrics.accuracy}% backtest accuracy, and current price ${formatCurrency(stock.price, { maximumFractionDigits: 2 })}.`

  useEffect(() => {
    const shouldReset = !isCustomText || alertMessage === previousDefaultRef.current

    if (shouldReset) {
      setAlertMessage(defaultAlertMessage)
      setIsCustomText(false)
    }

    previousDefaultRef.current = defaultAlertMessage
  }, [defaultAlertMessage, alertMessage, isCustomText])

  const handleAlertChange = (event) => {
    setAlertMessage(event.target.value)
    setIsCustomText(true)
  }

  const resetAlertMessage = () => {
    setAlertMessage(defaultAlertMessage)
    setIsCustomText(false)
  }

  const encodedSubject = encodeURIComponent(`NeoTrade alert for ${stock.symbol}`)
  const encodedMessage = encodeURIComponent(alertMessage)
  const emailLink = `mailto:?subject=${encodedSubject}&body=${encodedMessage}`
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodedSubject}&body=${encodedMessage}`
  const outlookLink = `https://outlook.live.com/mail/0/deeplink/compose?subject=${encodedSubject}&body=${encodedMessage}`
  const telegramLink = `https://t.me/share/url?url=${encodeURIComponent("https://neotrade-ai-26d0b.web.app")}&text=${encodedMessage}`
  const copyAlert = async() => {
    await navigator.clipboard.writeText(alertMessage)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return(
    <section id="alert-delivery" className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center gap-3">
        <Send size={21} className="text-cyan-200" />

        <h2 className="text-xl font-semibold">
          Alert Delivery
        </h2>
      </div>

      <div className="rounded-lg bg-slate-950 p-4">
        <label className="block">
          <span className="text-sm text-slate-400">
            Alert preview
          </span>

          <textarea
            rows="4"
            value={alertMessage}
            onChange={handleAlertChange}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
        </label>

        <button
          type="button"
          onClick={resetAlertMessage}
          className="mt-3 inline-flex h-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
        >
          Reset alert text
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <a
          href={emailLink}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-cyan-300 font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          <Mail size={18} />
          Mail app
        </a>

        <a
          href={gmailLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
        >
          <Mail size={18} />
          Gmail
        </a>

        <a
          href={outlookLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
        >
          <Mail size={18} />
          Outlook
        </a>

        <a
          href={telegramLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
        >
          <MessageCircle size={18} />
          Open Telegram
        </a>
      </div>

      <button
        type="button"
        onClick={copyAlert}
        className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-700 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
      >
        <Clipboard size={17} />
        {copied ? "Copied alert" : "Copy alert text"}
      </button>
    </section>
  )
}

export default AlertDeliveryPanel
