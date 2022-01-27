import { useQuery } from 'react-query'
import axios from 'axios'
import { ReapitConnectSession } from '@reapit/connect-session'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'

export const useSingleNegotiator = (
  session: ReapitConnectSession | null,
  { id, embed }: { id: String | undefined; embed?: string[] }
) => {
  return useQuery<NegotiatorModel, Error>(
    ['negotiators', { id }],
    () =>
      axios
        .get(
          `${window.reapit.config.platformApiUrl}${URLS.NEGOTIATORS}/${id}`,
          {
            headers: {
              ...BASE_HEADERS,
              Authorization: `Bearer ${session?.accessToken}`,
            },
            params: {
              embed,
            },
          }
        )
        .then((res) => res.data),

    {
      enabled: !!session && !!id,
      retry: false,
    }
  )
}
