import { styled } from '@linaria/react'

export const HeaderWrapper = styled.header`
  background-color: var(--intent-secondary);
  // color: white;
  margin-top: -2rem;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  padding: 2rem 1.5rem 0.25rem;
  min-height: 204px;

  h1 {
    color: white !important;
  }

  .el-input-group {
    margin-bottom: 0;
    input {
      border-bottom: var(--component-input-border-bottom-focus) !important;
    }
  }
`
