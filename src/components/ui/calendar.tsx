import { useEffect, useState } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import {
  CreateAppointmentModel,
  NegotiatorModel,
} from '@reapit/foundations-ts-definitions'
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import moment from 'moment'
import {
  BodyText,
  Modal,
  Input,
  SnackProvider,
  // Snack,
  // useSnack,
  Loader,
  SnackHolder,
  InputGroup,
  Label,
  InputWrap,
  Button,
  InputAddOn,
} from '@reapit/elements'
import { useMutation, useQueryClient } from 'react-query'
import { createAppointment } from '../../hooks/useAppointments'
const localizer = momentLocalizer(moment)

const CalendarAppointment = ({
  modalCalendar,
  setModalCalendar,
  setNegotiatorsId,
  appointment: { data, isLoading, isSuccess, isError },
  negotiators,
}) => {
  const queryClient = useQueryClient()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [events, setEvents] = useState([
    {
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2022, 1, 0),
      end: new Date(2022, 1, 1),
    },
  ] as Event[])
  const [singleEvent, setSingleEvent] = useState<Event>({})
  const [newEvent, setNewEvent] = useState<CreateAppointmentModel>({
    description: '',
    typeId: 'VW',
    start: '',
    end: '',
  })
  const [negotiatorsData, setNegotiatorsData] = useState<NegotiatorModel[]>([])
  const [modalInfoEvent, setModalInfoEvent] = useState<boolean>(false)
  const [modalNewAppointment, setModalNewAppointment] = useState<boolean>(false)
  const [errorSnack, setErrorSnack] = useState<boolean>(false)

  console.log({ negotiators })

  useEffect(() => {
    if (data?._embedded) {
      data?._embedded.map((data) =>
        setEvents((prevState) => [
          ...prevState,
          {
            title: data?.description,
            start: new Date(data?.start),
            end: new Date(data?.end),
            // allDay: true,
          },
        ])
      )
    }
  }, [data])
  useEffect(() => {
    if (negotiators.data?._embedded) {
      const { data } = negotiators
      data?._embedded.map((data) =>
        setNegotiatorsData((prevState) => [
          ...prevState,
          {
            name: data?.name,
            email: data?.email,
            id: data?.id,
            officeId: data?.officeId,
          },
        ])
      )
    }
  }, [negotiators.data])

  const handleSelectSlot = (data) => {
    console.log('select slot', data)
    const dateNow = Date.now()
    const selectedDate = new Date(data?.start).getTime()
    console.log({ dateNow, selectedDate }, selectedDate - dateNow)
    if (selectedDate - dateNow >= 0) {
      setModalNewAppointment(true)
    } else {
      setErrorSnack(true)
    }
  }

  const handleSelectEvent = (data) => {
    if (data?.title) {
      setSingleEvent(data)
      setModalInfoEvent(true)
    }
  }
  const onModalClose = () => {
    setNegotiatorsId()
    setModalCalendar({ isOpen: false, propertyId: '' })
  }

  const {
    mutate,
    isLoading: isCreateLoading,
    mutateAsync,
  } = useMutation(createAppointment, {
    onSuccess: (data) => {
      console.log(data)
      const message = 'success'
      alert(message)
    },
    onError: () => {
      alert('there was an error')
    },
    onSettled: () => {
      queryClient.invalidateQueries('create')
    },
  })

  const handleCreateAppointment = (e) => {
    e.preventDefault()
    let negotiatorIds: string[] = []
    let officeIds: string[] = []

    negotiatorsData[0]?.id && negotiatorIds.push(negotiatorsData[0].id)
    negotiatorsData[0].officeId && officeIds.push(negotiatorsData[0].officeId)

    const data: CreateAppointmentModel = {
      ...newEvent,
      negotiatorIds,
      propertyId: modalCalendar?.propertyId,
      officeIds,
    }
    // console.log({ data })
    mutate({ connectSession, data })
  }

  return (
    <SnackProvider>
      <Modal
        isOpen={modalCalendar.isOpen}
        onModalClose={onModalClose}
        title='Check and Create Appointment'
      >
        {isLoading || isError ? (
          <Loader className='el-mx-auto' />
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            popup
            // startAccessor='start'
            // endAccessor='end'
            step={60}
            defaultView={'month'}
            selectable
            onSelectEvent={(data) => handleSelectEvent(data)}
            onSelectSlot={(data) => handleSelectSlot(data)}
            style={{ height: 500 }}
          />
        )}

        {errorSnack && (
          <SnackHolder
            snacks={[
              {
                icon: 'errorSolidSystem',
                intent: 'danger',
                text: `You only can create appointment for the next day!`,
                onRemove: () => setErrorSnack(false),
              },
            ]}
          />
        )}
      </Modal>

      <Modal
        isOpen={modalInfoEvent}
        onModalClose={() => setModalInfoEvent(false)}
        title='Event Details'
      >
        <BodyText>Title : {singleEvent.title}</BodyText>
      </Modal>
      <Modal
        isOpen={modalNewAppointment}
        onModalClose={() => setModalNewAppointment(false)}
        title='Create New Appointment'
      >
        <form>
          <InputGroup>
            <Input
              type='text'
              placeholder='Title Event'
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <InputAddOn>Required</InputAddOn>
          </InputGroup>
          <div>
            <InputWrap>
              <InputGroup>
                <Label htmlFor='start'>Start:</Label>
                <Input
                  id='start'
                  type='datetime-local'
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      start: new Date(e.target.value).toString(),
                    })
                  }
                />
                <InputAddOn>Required</InputAddOn>
              </InputGroup>
            </InputWrap>
            <InputGroup>
              <Label htmlFor='start'>End:</Label>
              <Input
                id='start'
                type='datetime-local'
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    end: new Date(e.target.value).toString(),
                  })
                }
              />
              <InputAddOn>Required</InputAddOn>
            </InputGroup>
          </div>
          <div className='el-flex el-flex-row el-flex-justify-end el-mt6'>
            <Button intent='primary' onClick={handleCreateAppointment}>
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </SnackProvider>
  )
}

export default CalendarAppointment
