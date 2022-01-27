import React from 'react'
// import { reapitConnectBrowserSession } from '../core/connect-session'
// import { useReapitConnect } from '@reapit/connect-session'
import { Icon } from '@reapit/elements'
// import { getAppointment } from '../platform-api/appointment'

export const ConvertExpandableContentToRC = (props) => (
  <h2>Expandable Content {props?.id} </h2>
)

export const TableAction: React.FC<{}> = (handleCalendarClicked) => {
  // console.log(handleCalendarClicked)
  return <Icon icon='calendarSystem' className='' />
}
