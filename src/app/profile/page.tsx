'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ProfilePage() {
  const [userId, setUserId] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // ✅ Fetch Logged-in User ID
  const fetchId = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users/me')
      console.log('Profile fetch response:', response)

      if (response.data?.success) {
        const id = response.data.user._id
        setUserId(id)
        toast.success('Profile fetched successfully')
        console.log('Fetched user ID:', id)
      } else {
        toast.error(response.data?.message || 'Failed to fetch profile')
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Logout handler
  const clickLogout = async () => {
    try {
      const response = await axios.post('/api/users/logout')
      if (response.data?.success) {
        toast.success('Logged out successfully')
        window.location.href = '/login'
      } else {
        toast.error(response.data?.message || 'Failed to logout')
      }
    } catch (error: any) {
      console.error('Logout error:', error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    fetchId()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <h1 className="text-3xl font-semibold text-slate-800 mb-8 text-center">
          👤 User Profile
        </h1>

        {loading ? (
          <p className="text-center text-slate-500">Loading...</p>
        ) : (
          <div className="space-y-6 text-center">
            {/* ✅ Show link to user info */}
            {userId ? (
              <Link
                href={`/profile/${userId}`}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
              >
                View User Information
              </Link>
            ) : (
              <p className="text-slate-500 text-sm">No user ID found</p>
            )}

            {/* ✅ Logout Button */}
            <button
              onClick={clickLogout}
              className="w-full px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none transition-all duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
