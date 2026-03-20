'use client'

import { signIn, useSession } from "next-auth/react"
import { Building2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const error = searchParams?.get("error")

  // If already logged in, redirect handled by middleware/wrapper
  if (status === "authenticated") {
    return (
      <div className="min-h-screen bg-[#0a0f17] flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
          <Building2 className="w-12 h-12 text-orange-400 mb-4 animate-bounce" />
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0f17] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background styling matching landing page */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,138,61,0.18),transparent_30%),linear-gradient(180deg,#0a0f17_0%,#0f1724_45%,#111927_100%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:30px_30px]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-orange-400/10 flex items-center justify-center border border-orange-500/20">
            <Building2 className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-white">
          TILISTHER
        </h2>
        <p className="mt-2 text-center text-sm uppercase tracking-widest text-orange-300/80">
          Client Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-4 shadow-2xl border border-white/10 sm:rounded-[2rem] sm:px-10">
          
          {error === 'AccessDenied' && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm text-center">
              Access Denied. You do not have permission to view this portal.
            </div>
          )}

          <div className="text-center mb-8">
            <h3 className="text-lg font-medium text-slate-200">Secure Access</h3>
            <p className="text-sm text-slate-400 mt-2">Sign in with your authorized Google account to view projects and invoices.</p>
          </div>

          <div>
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-white/10 rounded-xl shadow-sm bg-white text-gray-900 font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-900"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}