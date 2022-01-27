import React, { useState } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import {
  // PropertyModelPagedResult,
  PropertyModel,
} from '@reapit/foundations-ts-definitions'
import { useHistory } from 'react-router-dom'
import {
  Title,
  // Subtitle,
  Table,
  // StatusIndicator,
  // Icon,
  // Input,
  InputGroup,
  Pagination,
  Loader,
  TableHeadersRow,
  TableHeader,
  TableRowContainer,
  TableRow,
  TableCell,
  // StatusIndicator,
  TableCtaTriggerCell,
  Button,
  // FloatingButton,
  // BodyText,
} from '@reapit/elements'

// import { getAllProperties } from '../../platform-api/properties'
// import { getAppointment } from '../../platform-api/appointment'
import { useProperties } from '../../hooks/useProperties'
import { useAppoinments } from '../../hooks/useAppointments'
import { useSingleNegotiator } from '../../hooks/useNegotiators'
import useDebounce from '../../utils/useDebounce'
import convertText from '../../utils/textConverter'
// import { rowsForTableProperties } from '../../utils/table'
// import DropdownSortAndFilter from '../ui/dropdownSortAndFilter'
import CalendarAppointment from '../ui/calendar'
import ModalSortAndFilter from '../ui/modalSortAndFilter'
import { paginationCustom } from './__styles__/styles'
import { HeaderWrapper } from './__styles__/properties'

export interface PropertiesParams extends PropertiesFilterParams {
  currentPage: number
  pageSize: number
  sortBy: string
  sortType: string
  marketingMode: string
}

// export interface PropertiesFilterParams extends PropertiesParams {}

export interface PropertiesFilterParams {
  type: string[]
  style: string[]
  locality: string[]
  parking: string[]
  age: string[]
}

const Appointment: React.FC<{}> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const history = useHistory()
  const [address, setAddress] = useState<String>('')
  const debounceAddress = useDebounce(address, 500)
  const [negotiatorsId, setNegotiatorsId] = useState<String | undefined>()
  const [modalCalendar, setModalCalendar] = useState<{
    isOpen: boolean
    propertyId: string
  }>({ isOpen: false, propertyId: '' })
  const [propertiesParam, setPropertiesParam] = useState<PropertiesParams>({
    currentPage: 1,
    pageSize: 22,
    sortBy: 'price',
    sortType: '',
    marketingMode: 'selling',
    type: [],
    style: [],
    locality: [],
    parking: [],
    age: [],
  })
  const allPropertiesV2 = useProperties(connectSession, {
    ...propertiesParam,
    address: debounceAddress,
  })
  const appointment = useAppoinments(connectSession, { negotiatorsId })
  const negotiators = useSingleNegotiator(connectSession, { id: negotiatorsId })

  const handleCalendarClicked = (dataProperties: PropertyModel) => {
    if (dataProperties?.id) {
      setNegotiatorsId(dataProperties?.negotiatorId)
      setModalCalendar({ isOpen: true, propertyId: dataProperties?.id })
    }
  }

  const handleSortSelected = (e, name) => {
    setPropertiesParam({ ...propertiesParam, [name]: e.target.value })
  }

  return (
    <>
      <HeaderWrapper>
        <Title>
          {`${allPropertiesV2.data?.totalCount || 0} List of Properties`}
        </Title>
        <div className='el-flex el-flex-row el-flex-align-end'>
          <Button
            intent={
              propertiesParam.marketingMode === 'selling' ? 'primary' : 'low'
            }
            className='el-mr3'
            onClick={() =>
              setPropertiesParam({
                ...propertiesParam,
                marketingMode: 'selling',
              })
            }
          >
            For Sell
          </Button>
          <Button
            intent={
              propertiesParam.marketingMode === 'letting' ? 'primary' : 'low'
            }
            className='el-mr3'
            onClick={() =>
              setPropertiesParam({
                ...propertiesParam,
                marketingMode: 'letting',
              })
            }
          >
            For Rent
          </Button>
          <InputGroup
            type='search'
            placeholder='Search by address'
            className='el-mb4'
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {allPropertiesV2?.data?.totalPageCount && (
          <div
            className='el-my4 el-flex el-flex-row el-flex-align-end el-flex-justify-end'
            // style={{ width: 'max-content' }}
          >
            <div className='el-mr6'>
              <ModalSortAndFilter
                value={propertiesParam}
                setValue={setPropertiesParam}
              />
            </div>
            <section>
              <div className='el-flex el-flex-row'>
                <select
                  style={{ maxWidth: 'max-content' }}
                  className='el-mr4 el-select'
                  onChange={(e) => handleSortSelected(e, 'sortBy')}
                  value={propertiesParam.sortBy}
                >
                  <option disabled value=''>
                    -- sort option --
                  </option>
                  <option value='bedrooms'>Bedrooms</option>
                  <option value='price'>Price</option>
                </select>

                <select
                  style={{ maxWidth: 'max-content' }}
                  className='el-mr4 el-select'
                  onChange={(e) => handleSortSelected(e, 'sortType')}
                  value={propertiesParam.sortType}
                >
                  <option value=''>asc</option>
                  <option value='-'>desc</option>
                </select>
              </div>
            </section>
            <Pagination
              callback={(data) =>
                setPropertiesParam({ ...propertiesParam, currentPage: data })
              }
              currentPage={propertiesParam?.currentPage}
              numberPages={allPropertiesV2?.data?.totalPageCount}
              className={paginationCustom}
            />
          </div>
        )}
      </HeaderWrapper>
      {allPropertiesV2?.isLoading && <Loader className='el-mx-auto el-mt4' />}
      {allPropertiesV2?.data?._embedded && (
        <Table data-num-columns-excl-action-col='8' data-has-call-to-action>
          <TableHeadersRow>
            {[
              'Property Id',
              'Type',
              'Address',
              'Bedrooms',
              'Bathrooms',
              'Price',
              'Status',
              '',
              '',
            ].map((data, index) => (
              <TableHeader key={index}>{data}</TableHeader>
            ))}
          </TableHeadersRow>
          <TableRowContainer>
            {allPropertiesV2?.data?._embedded &&
              allPropertiesV2?.data?._embedded.map(
                (data: PropertyModel, index) => (
                  <TableRow key={index}>
                    <TableCell>{data?.id}</TableCell>
                    <TableCell>
                      {data?.type?.length ? data?.type[0] : '-'}
                    </TableCell>
                    <TableCell>{data?.address?.buildingName || '-'}</TableCell>
                    <TableCell>{data?.bedrooms}</TableCell>
                    <TableCell>{data?.bathrooms}</TableCell>
                    <TableCell>
                      {propertiesParam.marketingMode === 'selling'
                        ? data?.selling?.price
                        : data?.letting?.rent}
                      {data?.currency}
                    </TableCell>
                    <TableCell>
                      {propertiesParam.marketingMode === 'selling'
                        ? convertText(data?.selling?.status)
                        : convertText(data?.letting?.status)}
                    </TableCell>
                    <TableCtaTriggerCell
                      icon='calendarSystem'
                      onClick={() => handleCalendarClicked(data)}
                    />
                    <TableCtaTriggerCell
                      icon='arrowRightSystem'
                      onClick={() => history.push(`/property/${data?.id}`)}
                    />
                  </TableRow>
                )
              )}
          </TableRowContainer>
        </Table>
      )}
      {allPropertiesV2?.data?.totalPageCount && (
        <div className='el-mt8'>
          <Pagination
            callback={(data) =>
              setPropertiesParam({ ...propertiesParam, currentPage: data })
            }
            currentPage={propertiesParam?.currentPage}
            numberPages={allPropertiesV2?.data?.totalPageCount}
          />
        </div>
      )}

      {modalCalendar.isOpen && (
        <CalendarAppointment
          modalCalendar={modalCalendar}
          setModalCalendar={setModalCalendar}
          setNegotiatorsId={setNegotiatorsId}
          appointment={appointment}
          negotiators={negotiators}
        />
      )}
    </>
  )
}

export default Appointment
