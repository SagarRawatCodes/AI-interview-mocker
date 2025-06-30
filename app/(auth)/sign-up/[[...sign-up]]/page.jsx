
'use client';
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f9f9f9', // Optional: light background
      overflow: 'hidden' // Prevent scrollbars
    }}>
      <SignUp />
    </div>
  );
}

