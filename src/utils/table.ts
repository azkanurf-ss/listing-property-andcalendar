// import React from 'react'
import { RowProps } from '@reapit/elements'
// import { PropertyModel } from '@reapit/foundations-ts-definitions'
// import { ConvertExpandableContentToRC, TableAction } from './tableToRC'
// import {
//   ConvertExpandableContentToRC,
//   TableAction,
// } from '../components/pages/appointment'

export const rowsForTableProperties = (
  rawData,
  handleCalendarClicked
): RowProps[] => {
  const rowsData: RowProps[] = []

  // rawData.map((data) => {
  //   return rowsData.push({
  //     cells: [
  //       {
  //         label: 'Address',
  //         value: data.address?.buildingName,
  //         icon: 'homeSystem',
  //         cellHasDarkText: true,
  //         // narrowTable?: NarrowOptionsType;
  //       },
  //       {
  //         label: 'Bedrooms',
  //         value: data.bedrooms,
  //         // icon?: IconNames;
  //         cellHasDarkText: false,
  //       },
  //       {
  //         label: 'Bathrooms',
  //         value: data.bathrooms,
  //         // icon?: IconNames;
  //         cellHasDarkText: false,
  //       },
  //       {
  //         label: 'Price',
  //         value: `£${data?.selling?.price || 0}`,
  //         cellHasDarkText: true,
  //       },
  //       {
  //         label: '',
  //         value: ``,
  //         children: TableAction(handleCalendarClicked),
  //         cellHasDarkText: true,
  //       },
  //     ],
  //     expandableContent: {
  //       content: ConvertExpandableContentToRC(data),
  //     },
  //   })
  // })

  return rowsData
}
