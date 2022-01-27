import { useQuery } from 'react-query'
import axios from 'axios'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PropertyImageModel } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'

export const useSinglePropertyImages = (
  session: ReapitConnectSession | null,
  { propertyId, embed }: { propertyId: string; embed?: string[] }
) => {
  return useQuery<PropertyImageModel, Error>(
    ['property-images', { propertyId }],
    () =>
      axios
        .get(`${window.reapit.config.platformApiUrl}${URLS.PROPERTYIMAGES}`, {
          headers: {
            ...BASE_HEADERS,
            Authorization: `Bearer ${session?.accessToken}`,
          },
          params: {
            embed,
            propertyId,
          },
        })
        .then((res) => res.data),

    {
      enabled: !!session && !!propertyId,
      retry: false,
    }
  )
}
