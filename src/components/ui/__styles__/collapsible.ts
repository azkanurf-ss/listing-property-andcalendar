import { css } from '@linaria/core'

export const triggerCustomStyle = css`
  .el-flex {
    margin-bottom: 0.25rem !important;
    padding-left: 0.25rem;
  }
  &.is-open {
    .el-flex {
      background: var(--color-blue-light2);
    }
  }
`
