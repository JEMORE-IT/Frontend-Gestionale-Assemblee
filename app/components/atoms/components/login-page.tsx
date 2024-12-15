'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import LoginCard from '@molecules/LoginCard'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/authentication/verify-token`, {
          withCredentials: true,
        });
        
        if (response.status === 200) {
          router.push('/assemblee');
        }
      } catch (error) {
        console.log('Errore durante la verifica del token');
      }
    };
  
    verifyToken();
  }, []);

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
      
      <LoginCard/>

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