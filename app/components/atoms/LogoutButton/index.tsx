import React, { FC } from "react";
import LogoutButtonProps from "./index.types"
import { Button } from "../../ui/button";
import { ExitIcon } from "@radix-ui/react-icons"
import { useRouter } from 'next/navigation'

const LogoutButton: FC<LogoutButtonProps> = ({ }) => {
  const router = useRouter()
  
  const handleLogout = async () => {
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    router.push('/')
  }
  
  return <>
    <Button className="bg-red-600" onClick={handleLogout}>
      <ExitIcon/>
      Logout
    </Button>
  </>
}

export default LogoutButton