'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'


interface UserProfile {
  username?: string
  email: string

}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching profile...')  // ✅ add this

      const response = await axios.get('/api/users/me') as any
      console.log('Profile fetch response:', response);
      
      if (response.data?.success) {
        setProfile(response.data.user)
        console.log('Profile data:', response.data);
        
        toast.success('Profile fetched successfully')
      } else {
        setError(response.data?.message || 'Failed to fetch profile')
        toast.error(response.data?.message || 'Failed to fetch profile')
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Something went wrong'
      setError(message)
      toast.error(message)
      console.error('Profile fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
     console.log('useEffect fired');  // ✅ add this
     fetchProfile()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            👤 User Profile
          </h1>

          {loading && (
            <div className="text-center text-slate-500">Loading profile...</div>
          )}

          {error && !loading && (
            <div className="text-center text-red-500 font-medium">{error}</div>
          )}

          {!loading && !error && profile && (
            <div className="space-y-4">
              <div>
                <p className="text-slate-500 text-sm">Name:</p>
                <p className="text-slate-800 text-lg font-semibold">
                  {profile.username || 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Email</p>
                <p className="text-slate-800 text-lg font-semibold">
                  {profile.email}
                </p>
              </div>

              {/* {profile.createdAt && (
                <div>
                  <p className="text-slate-500 text-sm">Joined on</p>
                  <p className="text-slate-800 text-lg font-semibold">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
