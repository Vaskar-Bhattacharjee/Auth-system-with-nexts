'use client'

import React, { useEffect } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [btnDisabled, setBtnDisabled] = useState(true)   
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setBtnDisabled(false)
        }else{
            setBtnDisabled(true)
        }
    }, [user])

    const onLogin = async () => {
        try {
            console.log("onLogin called");
            
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            if (response.status === 200 && response.data?.success) {
            console.log("Login successful", response.data);
            toast.success("Login successful");

            // redirect to dashboard or home page, not API route
            router.push('/profile');
        } else {
            toast.error("Login failed: " + (response.data?.message || "Unknown error"));
        }

        } catch (error :any) {
            setLoading(false)
            const backendMessage = error.response?.data?.message
            const finalMessage = backendMessage || error.message || "Something went wrong"
            toast.error(finalMessage)
            console.log("Error logging in:", finalMessage)
        }
    }

    return (
           <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2"> Login </h1>
          </div>

          <div className="space-y-5">

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
              onClick={onLogin}
              disabled={btnDisabled || loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${btnDisabled || loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Loging Up...' : 'Login'}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
                Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
    )

}