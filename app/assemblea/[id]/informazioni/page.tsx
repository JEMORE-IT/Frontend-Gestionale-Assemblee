'use client'

import { useEffect, useState } from 'react'
import { Button } from "@atoms/components/ui/button"
import { Input } from "@atoms/components/ui/input"
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function InformazioniPage() {
  const [formData, setFormData] = useState({
    luogo: '',
    scopo: '',
    costituzione: '',
    scioglimento: ''
  })

  const [initialData, setInitialData] = useState({
    luogo: '',
    scopo: '',
    costituzione: '',
    scioglimento: ''
  })

  const [modified, setModified] = useState(false)

  const router = useRouter()
  const { id } = useParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()    
    try {
      const response = await axios.put(`http://${API_BASE_URL}/assembly/${id}`, {
        luogo: formData.luogo,
        scopo: formData.scopo,
        orarioCostituzione: formData.costituzione,
        orarioScioglimento: formData.scioglimento,
      }, {
        withCredentials: true,
      });
      setInitialData(formData)
      setModified(false)
    } catch (error) {
      console.log('Errore in fase di aggiornamento dei dati')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
     ...prev,
      [name]: value
    }))
    setModified(true)
  }

  useEffect(() => {
    const getAssembleaData = async () => {
      try {
        const assembly = await axios.get(`http://${API_BASE_URL}/assembly/${id}`, {
          withCredentials: true,
        });
        setFormData({ 
          luogo: assembly.data.luogo,
          scopo: assembly.data.scopo,
          costituzione: assembly.data.orarioCostituzione,
          scioglimento: assembly.data.orarioScioglimento,
        });
        setInitialData({ 
          luogo: assembly.data.luogo,
          scopo: assembly.data.scopo,
          costituzione: assembly.data.orarioCostituzione,
          scioglimento: assembly.data.orarioScioglimento,
        });
        setModified(false)
      } catch (error) {
        router.push('/assemblee')
      }
    }; 
    
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/authentication/verify-token`, {
          withCredentials: true,
        });
        
        if (response.status === 200) {
          getAssembleaData()
        }
      } catch (error) {
        router.push('/')
      }
    };
  
    verifyToken();
  }, []);

  return (
    <div className="flex h-full flex-col p-4 md:p-8">
      <h1 className="mb-4 md:mb-8 text-2xl md:text-3xl font-bold text-white text-center">
        Informazioni
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="rounded-lg bg-white p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="text-base md:text-lg font-semibold md:min-w-[200px]">
                Luogo
              </label>
              <Input
                name="luogo"
                value={formData.luogo}
                onChange={handleChange}
                className="flex-1"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="text-base md:text-lg font-semibold md:min-w-[200px]">
                Scopo dela riunione
              </label>
              <Input
                name="scopo"
                value={formData.scopo}
                onChange={handleChange}
                className="flex-1"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="text-base md:text-lg font-semibold md:min-w-[200px]">
                Costituzione
              </label>
              <Input
                type="time"
                name="costituzione"
                value={formData.costituzione}
                onChange={handleChange}
                className="flex-1"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="text-base md:text-lg font-semibold md:min-w-[200px]">
                Scioglimento
              </label>
              <Input
                type="time"
                name="scioglimento"
                value={formData.scioglimento}
                onChange={handleChange}
                className="flex-1"
              />
            </div>
            {modified && (
              <div className="text-red-600 text-sm mt-2">
                Attenzione: sono state apportate modifiche non salvate.
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit"
            className="w-full md:w-auto bg-[#FFD241] text-[#3B44AC] hover:bg-[#FFD241]/90 text-base md:text-lg py-2 px-4 md:py-3 md:px-6"
          >
            Salva
          </Button>
        </div>
      </form>
    </div>
  )
}
