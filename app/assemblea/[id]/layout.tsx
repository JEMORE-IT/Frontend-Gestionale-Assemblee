'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useParams, usePathname  } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import '../../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const { id } = useParams()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <html lang="it">
      <body className={inter.className}>
        <div className="flex h-screen">
          {/* Hamburger menu for mobile */}
          <button
            className="fixed top-4 left-4 z-50 md:hidden text-white"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X className="text-red-600" size={24} /> : <Menu size={24} />}
          </button>

          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="p-6 flex-grow">
                <div className="mb-6" >
                  <h2 className="mt-6 md:mt-0 text-xl font-bold">Assemblea</h2>
                  <p className="text-sm text-gray-600">10-10-2024</p>
                </div>
                
                <nav className="space-y-2">
                  {[
                    { href: "/assemblea/" + id +"/ordine-del-giorno", label: "Ordine del giorno" },
                    { href: "/assemblea/" + id +"/presenti", label: "Presenti" },
                    { href: "/assemblea/" + id +"/deleghe", label: "Deleghe" },
                    { href: "/assemblea/" + id +"/informazioni", label: "Informazioni" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-lg px-4 py-2 text-sm ${
                        pathname === link.href
                          ? "bg-[#3B44AC] text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-2 p-6">
                <button className="w-full rounded-lg bg-black px-4 py-2 text-sm text-white">
                  Download
                </button>
                <button className="w-full rounded-lg bg-[#FFD241] px-4 py-2 text-sm">
                  Anagrafica
                </button>
                <button className="w-full rounded-lg bg-[#FFD241] px-4 py-2 text-sm">
                  Assemblee
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto bg-[#3B44AC] relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

