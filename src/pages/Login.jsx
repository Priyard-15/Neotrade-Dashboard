import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import {
  auth,
  googleProvider,
} from "../firebase"
import {
  Lock,
  LogIn,
  Mail,
  TrendingUp,
} from "lucide-react"

function Login(){

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const loginUser = async(event) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/dashboard")
    }catch(authError){
      setError(authError.message.replace("Firebase: ", ""))
    }finally{
      setLoading(false)
    }
  }

  const loginWithGoogle = async() => {
    setError("")
    setLoading(true)

    try{
      await signInWithPopup(auth, googleProvider)
      navigate("/dashboard")
    }catch(authError){
      setError(authError.message.replace("Firebase: ", ""))
    }finally{
      setLoading(false)
    }
  }

  return(
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-800 bg-slate-900 md:grid-cols-[1fr_420px]">
        <section className="hidden bg-[linear-gradient(135deg,#0f172a,#164e63)] p-10 md:flex md:flex-col md:justify-between">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-300 text-slate-950">
              <TrendingUp size={24} />
            </span>

            <h1 className="mt-8 text-4xl font-bold">
              NeoTrade AI
            </h1>

            <p className="mt-4 max-w-md leading-7 text-cyan-50">
              Analyze stocks with explainable trend signals, portfolio risk diagnostics, and watchlist-based decision support.
            </p>
          </div>

          <p className="text-sm text-cyan-100">
            React | Tailwind CSS | Firebase | Recharts | Finnhub-ready
          </p>
        </section>

        <form onSubmit={loginUser} className="p-6 sm:p-10">
          <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
            Secure login
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Welcome back
          </h2>

          <label className="mt-8 block">
            <span className="text-sm text-slate-300">
              Email address
            </span>

            <span className="relative mt-2 block">
              <Mail
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="student@example.com"
                className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 pl-11 pr-4 outline-none transition focus:border-cyan-300"
                required
              />
            </span>
          </label>

          <label className="mt-5 block">
            <span className="text-sm text-slate-300">
              Password
            </span>

            <span className="relative mt-2 block">
              <Lock
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 pl-11 pr-4 outline-none transition focus:border-cyan-300"
                required
              />
            </span>
          </label>

          {
            error && (
              <p className="mt-4 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">
                {error}
              </p>
            )
          }

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LogIn size={18} />
            {loading ? "Signing in..." : "Login"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={loginWithGoogle}
            className="mt-3 inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-950 font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FcGoogle size={21} />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            New user?{" "}
            <Link to="/register" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Create an account
            </Link>
          </p>
        </form>
      </div>

    </div>
  )
}

export default Login
