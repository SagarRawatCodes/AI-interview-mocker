"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path=usePathname();
    useEffect(()=>{
        console.log(path);
    })
  return (
    <div>
       <div className='flex p-4 items-center justify-between bg-secondary shadow-mediem'>
         <div className="text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 drop-shadow-lg">
    Ai-Interview-Mocker
  </div>
        <ul className='hidden md:flex gap-6 '>
            <Link href="/dashboard" className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}`}>Dashboard</Link>
            {/*
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
          
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how-it-works' && 'text-primary font-bold'}`}>How it works?</li>
            */}
            <Link href="/dashboard/how-it-works" className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how-it-works' && 'text-primary font-bold'}`}>How It Works?
          </Link>
        </ul>
        <UserButton/>
       </div>
      
    </div>
  )
}

export default Header
