import React, { FC, useState } from "react";
import LoginCardProps from "./index.types"
import { Button } from "@atoms/ui/button"
import { Input } from "@atoms/ui/input"
import { Card, CardContent } from "@atoms/ui/card"
import axios from "axios";
import { useRouter } from 'next/navigation'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const LoginCard: FC<LoginCardProps> = ({ }) => {
  const [loginerror, setLoginerror] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  
  const router = useRouter()

  const handleSubmit = async  (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(`http://${API_BASE_URL}/authentication`, {
        password: formData.password,
        username: formData.username,
      }, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        router.push('/assemblee');
      } else {
        setLoginerror(true)
        console.log('Errore di autenticazione');
      }
    } catch (error) {
      setLoginerror(true)
      console.log('Errore di rete');
    }
  }
  
  return <>
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
                onClick={() => {
                  setLoginerror(false)
                }}
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
                onClick={() => {
                  setLoginerror(false)
                }}
                required
              />
            </div>
            {loginerror && <label className='text-red-600'>Username o password errati</label> }
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
  </>
}

export default LoginCard