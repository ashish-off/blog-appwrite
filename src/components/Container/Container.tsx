import React, { FC, ReactHTMLElement } from 'react'

const Container: FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 bg-amber-300'>{children}</div>
  )
}

export default Container