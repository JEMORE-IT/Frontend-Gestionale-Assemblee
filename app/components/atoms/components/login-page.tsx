'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@atoms/components/ui/button"
import { Input } from "@atoms/components/ui/input"
import { Card, CardContent } from "@atoms/components/ui/card"
import { useRouter } from 'next/navigation'
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export function LoginPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async  (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(`http://${API_BASE_URL}/authentication`, {
        password: formData.password,
      });
  
      if (response.status === 200) {
        router.push('/assemblee');
      } else {
        console.log('Errore di autenticazione');
      }
    } catch (error) {
      console.log('Errore di rete');
    }
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#3B44AC] to-[#2d3584] flex flex-col items-center justify-center p-4 relative">
      <div className="mb-8 w-full max-w-md">
        <Image
          src="/logo-completo.png"
          alt="Gestionale Assemblee Logo"
          width={400}
          height={100}
          className="w-full h-auto drop-shadow-md"
          priority
        />
      </div>
      
      <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center" 
          style={{ fontFamily: 'Gotham, sans-serif' }}>
        Gestionale Assemblee
      </h1>
      
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-[#3B44AC]"
                style={{ fontFamily: 'Gotham, sans-serif' }}
              >
                Username:
              </label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full rounded-md border-[#3B44AC]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-[#3B44AC]"
                style={{ fontFamily: 'Gotham, sans-serif' }}
              >
                Password:
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full rounded-md border-[#3B44AC]"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full mx-auto block bg-[#FFD241] hover:bg-[#3B44AC] text-[#3B44AC] hover:text-white transition-colors font-bold"
              style={{ fontFamily: 'Gotham, sans-serif' }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 left-4">
        <Link 
          href="https://jemore.it" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white text-sm hover:text-[#FFD241] transition-colors"
          style={{ fontFamily: 'Gotham, sans-serif' }}
        >
          Powered by JEMORE
        </Link>
      </div>
    </main>
  )
}