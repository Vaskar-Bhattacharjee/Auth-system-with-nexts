'use client'

import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface UserProfile {
  username?: string
  email: string
}

export default function ProfilePage() {
  const [profile, setProfile] = React.useState<UserProfile | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

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

  const fetchedProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get('/api/users/me')
      console.log('Profile fetch response:', response.data)

      if (response.data?.success) {
        setProfile(response.data.user)
        toast.success('Profile fetched successfully')
      } else {
        setError(response.data?.message || 'Failed to fetch profile')
      }
    } catch (error: any) {
      console.error('Profile fetch error:', error)
      toast.error(error.response?.data?.message || 'Something went wrong')
      setError(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchedProfile()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-slate-200">
        <h1 className="text-3xl font-semibold text-slate-800 mb-6 text-center">
          Profile Page
        </h1>

        {loading && (
          <div className="text-center text-slate-500">Loading profile...</div>
        )}

        {error && !loading && (
          <div className="text-center text-red-500 font-medium">{error}</div>
        )}

        {!loading && !error && profile && (
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-semibold shadow">
                {profile.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-3 text-center">
              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wide">
                  Name
                </p>
                <p className="text-slate-800 text-lg font-semibold">
                  {profile.username || 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wide">
                  Email
                </p>
                <p className="text-slate-800 text-lg font-semibold">
                  {profile.email}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={clickLogout}
                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
