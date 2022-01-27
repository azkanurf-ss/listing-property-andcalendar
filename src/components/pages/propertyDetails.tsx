import { useState } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import {
  BodyText,
  StatusIndicator,
  Subtitle,
  Tabs,
  Title,
  Loader,
  Button,
} from '@reapit/elements'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import {
  BiBed,
  BiBuildingHouse,
  BiBookmarkMinus,
  BiBookmarkPlus,
} from 'react-icons/bi'
import { MdOutlineMeetingRoom, MdOutlineBathroom } from 'react-icons/md'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

import { useSingleProperty } from '../../hooks/useProperties'
import { useSingleNegotiator } from '../../hooks/useNegotiators'
// import { useSinglePropertyImages } from '../../hooks/usePropertyImages'
import TabPropertyDetails from '../ui/tabPropertyDetails'
import TabOverviewProperty from '../ui/tabOverviewProperty'
import TabNearbyProperty from '../ui/tabNearbyProperty'
import { currencyConverter } from '../../utils/currencyConverter'
import { numberWithCommas } from '../../utils/numberConverter'
import dummy1 from '../../assets/images/dummy/dummy-prop-1.webp'
import dummy2 from '../../assets/images/dummy/dummy-prop-2.webp'
import dummy3 from '../../assets/images/dummy/dummy-prop-3.webp'
import dummy4 from '../../assets/images/dummy/dummy-prop-4.webp'
import dummy5 from '../../assets/images/dummy/dummy-prop-5.webp'
import dummy6 from '../../assets/images/dummy/dummy-prop-6.webp'
import dummy7 from '../../assets/images/dummy/dummy-prop-7.webp'
import dummyFloorPlan from '../../assets/images/dummy/dummy-floor-plan.png'
import negoProfpic from '../../assets/images/dummy/dummy-negotiator-pic.jpg'
import { HouseCard } from './__styles__/propertyDetails'
import { customCarouselContainer } from '../ui/__styles__/carousel'
import { TabContainer } from './__styles__/propertyDetails'
import { NegotiatorCard } from './__styles__/propertyDetails'

const PropertyDetails = ({}): JSX.Element => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useSingleProperty(connectSession, {
    id,
    embed: ['images', 'negotiator'],
  })
  const { data: negotiatorData } = useSingleNegotiator(connectSession, {
    id: data?.negotiatorId,
  })
  // const { data: images, isLoading: isImageLoading } = useSinglePropertyImages(
  //   connectSession,
  //   { propertyId: id }
  // )
  const [tab, setTab] = useState<boolean[]>([true, false, false])
  const [isBookmarked, setAsBookmark] = useState<Boolean>(false)

  const renderTabContent = () => {
    if (data) {
      return (
        <>
          {tab[0] && <TabOverviewProperty data={data} />}
          {tab[1] && <TabPropertyDetails data={data} />}
          {tab[2] && <TabNearbyProperty data={data} />}
        </>
      )
    }
  }
  if (isLoading || isError) {
    return <Loader className='el-mx-auto' />
  }
  return (
    <div>
      <header className='el-flex el-flex-row el-flex-justify-between'>
        <div>
          <Title hasNoMargin className='el-pb3'>{` ${
            data?.address?.buildingNumber || 'Building Number'
          } ${data?.address?.buildingName || 'Building Name'}`}</Title>
          <Subtitle>
            {`${data?.address?.line1}, ${data?.address?.line3 || 'City'}, ${
              data?.address?.line4 || 'State'
            }, ${data?.address?.postcode || 'PostCode'} `}
            {/*    ${data?.address?.line2}, ${data?.address?.line3}, ${data?.address?.line4} */}
          </Subtitle>
        </div>
        {isBookmarked ? (
          <BiBookmarkMinus
            color='#262f69'
            size={36}
            style={{ cursor: 'pointer' }}
            onClick={() => setAsBookmark(!isBookmarked)}
          />
        ) : (
          <BiBookmarkPlus
            color='#262f69'
            size={36}
            style={{ cursor: 'pointer' }}
            onClick={() => setAsBookmark(!isBookmarked)}
          />
        )}
      </header>
      <div className='el-grid'>
        <section className='el-col-split'>
          <HouseCard>
            {/* <img src={dummy1} alt='dummy img' className='propery-img' /> */}
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={100}
              totalSlides={9}
              isIntrinsicHeight
              className={customCarouselContainer}
            >
              <Slider>
                <Slide index={2}>
                  <img src={dummy1} alt='dummy img' className='propery-img' />
                </Slide>
                <Slide index={3}>
                  <img src={dummy2} alt='dummy img' className='propery-img' />
                </Slide>
                <Slide index={4}>
                  <img src={dummy3} alt='dummy img' className='propery-img' />
                </Slide>
                <Slide index={5}>
                  <img src={dummy4} alt='dummy img' className='propery-img' />
                </Slide>
                <Slide index={6}>
                  <img src={dummy5} alt='dummy img' className='propery-img' />
                </Slide>
                <Slide index={7}>
                  <img src={dummy6} alt='dummy img' className='propery-img' />
                </Slide>
                <Slide index={8}>
                  <img src={dummy7} alt='dummy img' className='propery-img' />
                </Slide>
                <Slide index={9}>
                  <img
                    src={dummyFloorPlan}
                    alt='dummy img'
                    className='propery-img'
                  />
                </Slide>
                <Slide index={1}>
                  <ReactPlayer
                    controls
                    url='https://youtu.be/ThvZJqYSenc'
                    width={'100%'}
                  />
                </Slide>
              </Slider>
              <ButtonBack>
                <FaChevronCircleLeft color='#262f69' size={32} />
              </ButtonBack>
              <ButtonNext>
                <FaChevronCircleRight color='#262f69' size={32} />
              </ButtonNext>
            </CarouselProvider>
            <div className='el-flex el-flex-row el-flex-justify-between el-mt4'>
              <div>
                <div className='el-flex el-flex-row'>
                  <BodyText hasNoMargin>
                    {data?.marketingMode === 'selling' && (
                      <>
                        <StatusIndicator intent='primary' /> For Sale
                      </>
                    )}
                    {data?.marketingMode === 'letting' && (
                      <>
                        <StatusIndicator intent='secondary' />
                        For Rent
                      </>
                    )}
                    {data?.marketingMode === 'sellingAndLetting' && (
                      <>
                        <BodyText>
                          <StatusIndicator intent='primary' /> For Sale
                        </BodyText>
                        <BodyText>
                          <StatusIndicator intent='secondary' /> For Rent
                        </BodyText>
                      </>
                    )}
                    &nbsp;|&nbsp;
                  </BodyText>
                  <BodyText hasNoMargin className='el-has-grey-text'>
                    On Market Since&nbsp;
                    {data?.marketingMode === 'selling'
                      ? data?.selling?.instructed || 'No Data'
                      : data?.letting?.instructed || 'No Data'}
                  </BodyText>
                </div>

                <div className='el-flex el-flex-row el-flex-align-end'>
                  <Title hasNoMargin className='el-pr4'>
                    {data?.marketingMode === 'selling'
                      ? currencyConverter(data?.selling?.price, data?.currency)
                      : currencyConverter(data?.letting?.rent, data?.currency)}
                  </Title>
                  <div className='el-flex el-flex-row'>
                    <BodyText hasNoMargin className='el-pr3 el-has-grey-text'>
                      {data?.bedrooms || 0}
                      <BiBed color='#262f69' size={20} />
                    </BodyText>
                    &nbsp;
                    <BodyText hasNoMargin className='el-pr3 el-has-grey-text'>
                      {data?.receptions || 0}
                      <MdOutlineMeetingRoom color='#262f69' size={20} />
                    </BodyText>
                    &nbsp;
                    <BodyText hasNoMargin className='el-pr3 el-has-grey-text'>
                      {data?.bathrooms || 0}
                      <MdOutlineBathroom color='#262f69' size={20} />
                    </BodyText>
                    &nbsp;
                    <BodyText hasNoMargin className='el-has-grey-text'>
                      <BiBuildingHouse color='#262f69' size={20} />
                      {numberWithCommas(data?.internalArea?.min) || 0}ft&#178;
                    </BodyText>
                  </div>
                </div>
              </div>
              <NegotiatorCard>
                <div className='el-flex'>
                  <img alt='agent profpic' src={negoProfpic} />
                </div>
                <BodyText hasNoMargin>{negotiatorData?.name}</BodyText>
                <BodyText hasNoMargin>
                  {negotiatorData?.workPhone || '(021) 82758899'}
                </BodyText>
                <BodyText hasNoMargin className='el-pb3'>
                  {negotiatorData?.email}
                </BodyText>
                <Button>Contact The Agent</Button>
              </NegotiatorCard>
            </div>
          </HouseCard>
        </section>
        <TabContainer className='el-col-split'>
          <Tabs
            name='my-tabs'
            isFullWidth
            options={[
              {
                id: 'tab-1',
                value: '0',
                text: 'Overview',
                isChecked: tab[0],
              },
              {
                id: 'tab-2',
                value: '1',
                text: 'Property Details',
                isChecked: tab[1],
              },
              {
                id: 'tab-3',
                value: '2',
                text: 'Nearby',
                isChecked: tab[2],
              },
            ]}
            onChange={(event: any) =>
              setTab((prevTab) => {
                const changeTab = prevTab.map(() => false)
                const trueIndex = Number(event.target.value)
                changeTab[trueIndex] = !changeTab[trueIndex]
                return changeTab
              })
            }
          />
          {renderTabContent()}
        </TabContainer>
      </div>
    </div>
  )
}

export default PropertyDetails
