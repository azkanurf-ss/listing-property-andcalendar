import * as React from 'react'
import { shallow, render } from 'enzyme'
import { QueryClient, QueryClientProvider } from 'react-query'
import Appointment from '../listProperties'
import { useProperties } from '../../../hooks/useProperties'

const AppointmentWrapper = () => {
  // ✅ creates a new QueryClient for each test
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Appointment />
    </QueryClientProvider>
  )
}

// Solves TypeScript Errors
const mockedUseProperties = useProperties as jest.Mock<any>

// Mock the module
jest.mock('../../../hooks/useProperties')

describe('Appointment Page', () => {
  beforeEach(() => {
    mockedUseProperties.mockImplementation(() => ({ isLoading: true }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('Renders without crashing', () => {
    render(<AppointmentWrapper />)
  })
  // it('should match a snapshot', () => {
  //   expect(shallow(<AppointmentWrapper />)).toMatchSnapshot()
  // })

  it('should render table', () => {})
})
