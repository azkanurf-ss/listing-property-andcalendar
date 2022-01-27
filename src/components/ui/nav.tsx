import React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { NavResponsive } from '@reapit/elements'
import { useHistory } from 'react-router-dom'

export const Nav: React.FC = () => {
  const history = useHistory()
  const { connectLogoutRedirect } = useReapitConnect(
    reapitConnectBrowserSession
  )

  return (
    <NavResponsive
      options={[
        {
          itemIndex: 0,
        },
        {
          itemIndex: 1,
          callback: () => history.push('/'),
          href: window.reapit.config.marketplaceUrl,
          iconId: 'appsMenu',
          text: 'Apps',
        },
        {
          itemIndex: 2,
          callback: () => history.push('/properties'),
          href: '/properties',
          iconId: 'resultsMenu',
          text: 'Properties',
        },
        {
          itemIndex: 3,
          callback: connectLogoutRedirect,
          isSecondary: true,
          iconId: 'logoutMenu',
          text: 'Logout',
        },
      ]}
    />
  )
}

export default Nav
