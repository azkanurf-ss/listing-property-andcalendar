import { useState, useRef, useEffect } from 'react'
import { Button } from '@reapit/elements'
import { DropdownContent, DropdownWrapper } from './__styles__/dropdown'
import { PropertiesParams } from '../pages/listProperties'

const DropdownSortAndFilter = ({
  value,
  setValue,
}: {
  value: PropertiesParams
  setValue: React.Dispatch<React.SetStateAction<PropertiesParams>>
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [widthOf, setWidthOf] = useState({ dropdown: 0, button: 0 })
  const contentRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLHeadingElement>(null)
  //   const [sortAndFilterValue, setSortAndFilterValue] = useState({ sortBy: '' })
  const [sortValue, setSortValue] = useState({ sortBy: '', sortType: '+' })
  const [filterValue, setFilterValue] = useState({})

  useEffect(() => {
    setWidthOf((prevState) => ({
      ...prevState,
      dropdown: contentRef.current ? contentRef.current.offsetWidth : 0,
    }))
    setWidthOf((prevState) => ({
      ...prevState,
      button: buttonRef.current ? buttonRef.current.offsetWidth : 0,
    }))
  }, [contentRef, buttonRef, isDropdownOpen])

  useEffect(() => {
    setSortValue({ sortBy: value?.sortBy, sortType: value?.sortType })
  }, [isDropdownOpen])

  const handleReset = () => {}

  const handleApply = (e) => {
    e.preventDefault()
    setValue({ ...value, ...sortValue, ...filterValue })
  }

  const handleSortSelected = (e) => {
    setSortValue({ ...sortValue, sortBy: e.target.value })
  }
  return (
    <DropdownWrapper>
      <div ref={buttonRef}>
        <Button intent='low' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          sort&filter
        </Button>
      </div>
      <DropdownContent
        display={isDropdownOpen ? 'block' : 'none'}
        ref={contentRef}
        width={widthOf.dropdown}
        buttonWidth={widthOf.button}
      >
        <>
          <div>
            <div className='el-flex el-flex-row'>
              <select
                style={{ maxWidth: 'max-content' }}
                className='el-mr4 el-select'
                onChange={handleSortSelected}
                value={sortValue.sortBy}
              >
                <option disabled value=''>
                  -- sort option --
                </option>
                {/* <option value='created'>Created</option>
                <option value='modified'>Modified</option>
                <option value='address'>Address</option> */}
                <option value='bedrooms'>Bedrooms</option>
                <option value='price'>Price</option>
                <option value='rent'>Rent</option>
              </select>
            </div>
          </div>
          <div className='el-mt3'>
            <h5>Filter</h5>
          </div>
          <div className='el-flex el-flex-row el-flex-justify-end el-mt4'>
            <Button intent='danger' className='el-mr2'>
              Reset
            </Button>
            <Button intent='primary' onClick={handleApply}>
              Apply
            </Button>
          </div>
        </>
      </DropdownContent>
    </DropdownWrapper>
  )
}

export default DropdownSortAndFilter
