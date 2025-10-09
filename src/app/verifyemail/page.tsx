"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
function VerifyEmailPage() {
    const [token, settoken] = useState("")
    const [verified, setverified] = useState(false)
    const [error, seterror] = useState("")
    
    const verifyEmail = async () => {
        try {
            
            const response = await axios.post('/api/users/verifyemail', { token })
            console.log("Email verified successfully", response.data);
            setverified(true)

        } catch (error :any) {
            seterror(error.message)
            console.log("Error verifying email:", error.response.data);
        }
    }
    useEffect(() => {
      const urlToken = window.location.search.split("=")[1]
      settoken(urlToken || "")
    }, [])
    

  return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Verify Your Email</h1>
            <p className="text-slate-500 text-sm">Please click the button below to verify your email address.</p>
          </div>
            <div>
                {token && (
                        <div className="space-y-5">
                        {verified ? (
                            <div className="text-green-600 text-center font-medium">Your email has been verified successfully!</div>
                        ) : error ? (
                            <div className="text-red-600 text-center font-medium">{error}</div>
                        ) : (
                            <button
                                onClick={verifyEmail}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                            >
                                Verify Email
                            </button>
                        )}
                    </div>
                )
                }
                {!token && (
                    <div className="text-red-600 text-center font-medium">
                        Invalid verification link. Please check your email for the correct link.
                    </div>
                )}
            </div>

        </div>
      </div>                                

    </div>
    </div>
  )
}

export default VerifyEmailPage;