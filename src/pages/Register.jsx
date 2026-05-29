import { useState } from "react"
import { Link } from "react-router-dom"

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { FcGoogle } from "react-icons/fc"

import {
  auth,
  googleProvider,
} from "../firebase"

import { useNavigate } from "react-router-dom"
import {
  Lock,
  Mail,
  UserPlus,
} from "lucide-react"

function Register(){

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)

  const registerUser = async(event)=>{
    event.preventDefault()
    setError("")
    setLoading(true)

    try{

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      navigate("/dashboard")

    }catch(error){

      setError(error.message.replace("Firebase: ", ""))
    }finally{
      setLoading(false)
    }
  }

  const continueWithGoogle = async()=>{
    setError("")
    setLoading(true)

    try{
      await signInWithPopup(auth, googleProvider)
      navigate("/dashboard")
    }catch(error){
      setError(error.message.replace("Firebase: ", ""))
    }finally{
      setLoading(false)
    }
  }

  return(

    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">

      <form onSubmit={registerUser} className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-900 p-6 sm:p-10">

        <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
          Firebase authentication
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Create account
        </h1>

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
              placeholder="student@example.com"
              onChange={(e)=>setEmail(e.target.value)}
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
              placeholder="Minimum 6 characters"
              onChange={(e)=>setPassword(e.target.value)}
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
          <UserPlus size={18} />
          {loading ? "Creating..." : "Register"}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={continueWithGoogle}
          className="mt-3 inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-950 font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <FcGoogle size={21} />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already registered?{" "}
          <Link to="/" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Login
          </Link>
        </p>

      </form>

    </div>
  )
}

export default Register
