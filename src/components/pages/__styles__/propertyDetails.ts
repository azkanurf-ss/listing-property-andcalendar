import { styled } from '@linaria/react'

export const HouseCard = styled.div`
  .propery-img {
    max-width: -webkit-fill-available;
  }
`
export const TabContainer = styled.section`
  // position: relative;
  // overflow-y: auto;
  max-height: calc(100vh - 55px);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  // .el-tabs-wrap {
  //   position: fixed;
  //   border-radius: unset;
  //   width: calc(50% - 4rem);
  // }
`
export const TabContentContainer = styled.div`
  overflow-y: auto;
  // margin-top: 55px;
  max-height: calc(100vh - 105px);
`

export const NegotiatorCard = styled.section`
  margin-left: 0.5rem;
  padding: 1rem;
  background: var(--color-blue-light2);

  // p {
  //   color: white !important;
  // }

  img {
    max-height: 120px;
    width: 120px;
    object-fit: cover;
    border-radius: 50%;
    margin: auto;

    //other option

    // max-height: 120px;
    // width: calc(100% + 2rem);
    // object-fit: cover;
    // margin: -1rem -1rem 0;
  }
`
