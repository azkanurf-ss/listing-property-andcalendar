import { css } from '@linaria/core'
import { styled } from '@linaria/react'

interface DropdownContentProps {
  display: string
  width: number
  buttonWidth?: number
  direction?: string
}

let x: DropdownContentProps = {
  display: 'none',
  width: 0,
  buttonWidth: 0,
  direction: 'ltr',
}

export const DropdownWrapper = styled.div`
  position: relative;
`

export const DropdownContent = styled.div<DropdownContentProps>`
  padding: 1rem;
  display: ${(props) => props.display};
  background-color: #f2f2f2;
  position: absolute;
  margin-top: 0.25rem;
  margin-left: ${(props) =>
    `calc(${props.width * -1}px + ${props.buttonWidth}px)`};
  // transition: all 0.25s;
`
//   margin-left: ${(props) =>props.direction === 'ltr' ? '0px !important' : ''};
