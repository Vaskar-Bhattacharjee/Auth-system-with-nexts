"use client"
import React, { useEffect } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


function SignupPage() {
   const router = useRouter() 
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: ""
  })
  const [btnDisabled, setBtnDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onSignup = async () => {

    try {
        setLoading(true)
        const response = await axios.post('/api/users/signup', user)
        setLoading(false)
        console.log("Signup successful", response.data);
        router.push('/login')
    } catch (error :any) {
        console.log("Error signing up:", error.message);
        toast.error(error.message)
        setLoading(false)
    }
  }
 useEffect(() => {
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
        setBtnDisabled(false)
    }else{
        setBtnDisabled(true)
    }
 }, [user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h1>
            <p className="text-slate-500 text-sm">Sign up to get started</p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-slate-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-slate-800"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-slate-800"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-slate-800"
              />
            </div>

            <button
              onClick={onSignup}
              disabled={btnDisabled || loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${btnDisabled || loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage