import { useQuery } from 'react-query'
import axios from 'axios'
import { ReapitConnectSession } from '@reapit/connect-session'
import {
  AppointmentModelPagedResult,
  CreateAppointmentModel,
} from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'
import { Event } from 'react-big-calendar'

export const useAppoinments = (
  session: ReapitConnectSession | null,
  { negotiatorsId }: { negotiatorsId: String | undefined },
  successcb?
) => {
  return useQuery<AppointmentModelPagedResult, Error>(
    ['appointments', { negotiatorsId }],
    () =>
      axios
        .get(
          `${window.reapit.config.platformApiUrl}${URLS.APPOINTMENT}/?sortBy=-start`,
          {
            headers: {
              ...BASE_HEADERS,
              Authorization: `Bearer ${session?.accessToken}`,
            },
            params: {
              negotiatorsId,
              pageSize: 100,
            },
          }
        )
        .then((res) => res.data),

    {
      enabled: !!session && !!negotiatorsId,
      retry: false,
    }
  )
}

export const createAppointment = async ({
  connectSession,
  data,
}: {
  connectSession: ReapitConnectSession | null
  data: CreateAppointmentModel
}) => {
  console.log({ data })
  const { data: response } = await axios.post(
    `${window.reapit.config.platformApiUrl}${URLS.APPOINTMENT}`,
    { ...data },
    {
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${connectSession?.accessToken}`,
      },
    }
  )
  return response.data
}
