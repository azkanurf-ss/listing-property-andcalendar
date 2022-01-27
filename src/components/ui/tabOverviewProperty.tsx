import React from 'react'
import { BodyText, Subtitle } from '@reapit/elements'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { elMb3 } from '@reapit/elements'
import convertText from '../../utils/textConverter'
import { TabContentContainer } from '../pages/__styles__/propertyDetails'
import { BiCheck } from 'react-icons/bi'
const TabOverviewProperty = ({ data }: { data: PropertyModel }) => {
  const readableTypes =
    data?.type && data?.type?.map((data) => convertText(data))
  const readableStyles =
    data?.style && data?.style?.map((data) => convertText(data))

  // type
  // style
  // council tax
  // age

  // rent frequency
  // selling or renting status
  // negotiators info
  return (
    <TabContentContainer>
      <div className='el-grid'>
        <div className='el-col-split'>
          <div className='el-flex el-flex-row'>
            <Subtitle hasNoMargin>
              Building Type: &nbsp;
              {readableTypes && readableTypes?.length === 0 && 'No Data'}
            </Subtitle>
            {readableTypes && readableTypes?.length > 0 && (
              <div className='el-pt1 el-pl1'>
                {readableTypes?.map((data, index) => (
                  <div key={index} className='el-flex'>
                    <BiCheck />
                    <span>{data}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='el-flex el-flex-row'>
            <Subtitle hasNoMargin className='el-mt4'>
              Building Style:&nbsp;
              {readableStyles && readableStyles?.length === 0 && 'No Data'}
            </Subtitle>
            {readableStyles && readableStyles?.length > 0 && (
              <div className='el-pt5 el-pl1'>
                {readableStyles?.map((data, index) => (
                  <div key={index} className='el-flex'>
                    <BiCheck />
                    <span>{data}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='el-col-split'>
          <Subtitle hasNoMargin>
            Council Tax: {data?.councilTax || 'No Data'}
          </Subtitle>
          <Subtitle hasNoMargin className='el-mt4'>
            {data?.marketingMode === 'selling'
              ? `Selling Status: ${convertText(data?.selling?.status)}`
              : `Renting Status: ${convertText(data?.letting?.status)}`}
          </Subtitle>
        </div>
      </div>
      <BodyText className='el-mt6'>{data?.description}</BodyText>
    </TabContentContainer>
  )
}

export default TabOverviewProperty
