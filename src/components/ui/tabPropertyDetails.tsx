import { BodyText, Subtitle } from '@reapit/elements'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import Collapsible from 'react-collapsible'
import {
  BiBed,
  BiBuildingHouse,
  BiCheck,
  // BiLayer,
  BiLayerPlus,
  BiChevronUp,
  BiChevronDown,
} from 'react-icons/bi'
import {
  MdOutlineMeetingRoom,
  MdOutlineBathroom,
  MdOutlineYard,
} from 'react-icons/md'
import { RiParkingBoxLine } from 'react-icons/ri'
import convertText from '../../utils/textConverter'
import { numberWithCommas } from '../../utils/numberConverter'
import { TabContentContainer } from '../pages/__styles__/propertyDetails'
import { triggerCustomStyle } from './__styles__/collapsible'
import { useState } from 'react'

const defaultRooms = [
  {
    name: 'Kitchen',
    dimensions: '4.5m x 5.2m',
    description:
      'The breakfast kitchen, with utility, comprises a matching range of wall and base units with ceramic hob and eye level double oven. A side door leads to the front courtyard area.',
  },
  {
    name: 'Lounge',
    dimensions: '6.5m x 7.8m',
    description:
      'The lounge, with a brick feature fireplace housing a Clearview stove, provides an ideal space to relax and unwind, whilst enjoying views over the Golf Course.',
  },
  {
    name: 'Dining Room',
    dimensions: '5.1m x 6.2m',
    description:
      'The formal dining room is the perfect space to entertain and provides access to the useful study.',
  },
]
const TabPropertyDetails = ({ data }: { data: PropertyModel }) => {
  const readableParking =
    data?.parking && data?.parking?.map((data) => convertText(data))
  const readableSituation =
    data?.situation && data?.situation?.map((data) => convertText(data))
  const [openedRoomsDetails, setOpenedRoomsDetails] = useState<number[]>([])
  //internal area - building size
  //external area - land size
  //bedrooms
  //
  //rooms
  //special features
  //parking
  //situation
  const handleCollapseClosed = (index: number) => {
    let newOpenedRoomsDetails = openedRoomsDetails.filter(
      (data) => data !== index
    )
    return setOpenedRoomsDetails(newOpenedRoomsDetails)
  }
  console.log({ openedRoomsDetails })
  return (
    <TabContentContainer>
      <div className='el-grid'>
        <div className='el-col-split'>
          <Subtitle>
            <BiBed color='#262f69' size={24} />
            {data?.bedrooms} Bedrooms
          </Subtitle>
          <Subtitle>
            <MdOutlineMeetingRoom color='#262f69' size={24} />
            {data?.receptions} Receptions
          </Subtitle>
          <Subtitle>
            <MdOutlineBathroom color='#262f69' size={24} />
            {data?.bathrooms} Bathrooms
          </Subtitle>
          <div className='el-flex el-flex-row'>
            <Subtitle>
              <BiLayerPlus color='#262f69' size={24} />
              Situation:
              {readableSituation &&
                readableSituation?.length === 0 &&
                ' No Data'}
            </Subtitle>
            {readableSituation && readableSituation?.length > 0 && (
              <div className='el-pt3 el-pl2'>
                {readableSituation?.map((data, index) => (
                  <div
                    key={index}
                    style={{ display: 'block' }}
                    className='el-flex'
                  >
                    <BiCheck />
                    <span>{data}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='el-col-split'>
          <div className='el-flex el-flex-row'>
            <Subtitle>
              <RiParkingBoxLine color='#262f69' size={24} />
              Parking:
              {readableParking && readableParking?.length === 0 && ' No Data'}
            </Subtitle>
            {readableParking && readableParking?.length > 0 && (
              <div className='el-pt3 el-pl2'>
                {readableParking?.map((data, index) => (
                  <div
                    key={index}
                    style={{ display: 'block' }}
                    className='el-flex'
                  >
                    <BiCheck />
                    <span>{data}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Subtitle>
            <BiBuildingHouse color='#262f69' size={24} />
            Building Size: &nbsp;
            {data?.internalArea?.min
              ? `${numberWithCommas(data?.internalArea?.min)} ${convertText(
                  data?.internalArea?.type
                )}`
              : 'No Data'}
          </Subtitle>
          <Subtitle>
            <MdOutlineYard color='#262f69' size={24} />
            Land Size: &nbsp;
            {data?.externalArea?.min
              ? `${numberWithCommas(data?.externalArea?.min)} ${
                  data?.externalArea?.type
                }`
              : 'No Data'}
          </Subtitle>
        </div>
      </div>
      <hr />
      <div>
        <Subtitle style={{ color: '#262f69' }}>Rooms Details</Subtitle>
        {data?.rooms &&
          data?.rooms.map((room, index) => (
            <div key={index}>
              <Collapsible
                trigger={
                  <div className='el-flex el-flex-row el-flex-justify-between el-flex-align-center'>
                    <Subtitle hasNoMargin>
                      {room?.name}
                      <BodyText hasNoMargin hasGreyText>
                        {room?.dimensions || '4.5m x 5.2m'}
                      </BodyText>
                    </Subtitle>
                    {openedRoomsDetails.includes(index) ? (
                      <BiChevronUp color='#262f69' size={24} />
                    ) : (
                      <BiChevronDown color='#262f69' size={24} />
                    )}
                  </div>
                }
                className='custom-collapsible'
                triggerClassName={triggerCustomStyle}
                triggerOpenedClassName={triggerCustomStyle}
                onOpen={() =>
                  setOpenedRoomsDetails(openedRoomsDetails.concat(index))
                }
                onClose={() => handleCollapseClosed(index)}
              >
                <BodyText className='el-mt2'>{room?.description}</BodyText>
              </Collapsible>
            </div>
          ))}
      </div>
    </TabContentContainer>
  )
}

export default TabPropertyDetails
