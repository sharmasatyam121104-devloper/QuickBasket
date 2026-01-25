'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <AntdRegistry>
        <SessionProvider>
                {children}
        </SessionProvider>
    </AntdRegistry>
  )
}

export default Provider