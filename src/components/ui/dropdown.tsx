import React, { useState, useRef, useEffect } from 'react'
import { DropdownContent, DropdownWrapper } from './__styles__/dropdown'

export const Dropdown = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [DDWidth, setDDWidth] = useState(0)
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    setDDWidth(ref.current ? ref.current.offsetWidth : 0)
  }, [ref, isDropdownOpen])

  return (
    <DropdownWrapper>
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        sort&filter
      </button>
      <DropdownContent
        display={isDropdownOpen ? 'block' : 'none'}
        ref={ref}
        width={DDWidth}
      ></DropdownContent>
    </DropdownWrapper>
  )
}

export const DropdownButton = ({ children }) => {
  return <div>{children}</div>
}
