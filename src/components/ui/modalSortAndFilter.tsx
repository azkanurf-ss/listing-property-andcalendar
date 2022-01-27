import { useState, useEffect } from 'react'
import {
  BodyText,
  Button,
  // elHasGreyChips,
  Icon,
  Input,
  InputGroup,
  Label,
  Modal,
  // MultiSelect,
  // MultiSelectChip,
  MultiSelectInput,
  Subtitle,
} from '@reapit/elements'
import {
  PropertiesParams,
  PropertiesFilterParams,
} from '../pages/listProperties'
import {
  typeOptions,
  styleOption,
  localityOption,
} from '../../constants/properties'
import { CutomModalWrapper } from './__styles__/modal'

const ModalSortAndFilter = ({
  value,
  setValue,
}: {
  value: PropertiesParams
  setValue: React.Dispatch<React.SetStateAction<PropertiesParams>>
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  //   const [sortValue, setSortValue] = useState({ sortBy: '', type: '+' })
  const [filterValue, setFilterValue] = useState<PropertiesFilterParams>({
    type: [],
    style: [],
    locality: [],
    parking: [],
    age: [],
  })

  useEffect(() => {
    // setSortValue({ sortBy: value?.sortBy, type: value?.type })
    setFilterValue({ ...filterValue, type: value.type, style: value.style })
  }, [isModalOpen])

  const handleReset = () => {}

  const handleApply = (e) => {
    e.preventDefault()
    setValue({ ...value, ...filterValue })
  }

  const handleSelectType = (e, name) => {
    setFilterValue({ ...filterValue, [name]: e.target.value.split(',') })
  }

  //   const handleSortSelected = (e) => {
  //     setSortValue({ ...sortValue, sortBy: e.target.value })
  //   }

  return (
    <>
      <Button intent='low' onClick={() => setIsModalOpen(!isModalOpen)}>
        <Icon icon='filterSystem' className='el-pr2' intent='primary' />
        filter
      </Button>
      <CutomModalWrapper>
        <Modal
          isOpen={isModalOpen}
          onModalClose={() => setIsModalOpen(!isModalOpen)}
        >
          <div className=''>
            <section>
              <div>
                <Subtitle className='el-pb2' hasNoMargin>
                  Price Range
                </Subtitle>
                <div className='el-grid'>
                  <InputGroup className='el-col-split'>
                    <Input id='minPrice' type='number' />
                    <Label htmlFor='minPrice'>Min</Label>
                  </InputGroup>
                  <InputGroup>
                    <Input
                      id='maxPrice'
                      className='el-col-split'
                      type='number'
                    />
                    <Label htmlFor='maxPrice'>Max</Label>
                  </InputGroup>
                </div>
              </div>
              <div>
                <Subtitle className='el-pb2 el-pt4' hasNoMargin>
                  Bedrooms
                </Subtitle>
                <div className='el-grid'>
                  <InputGroup className='el-col-split'>
                    <Input id='minBd' type='number' />
                    <Label htmlFor='minBd'>Min</Label>
                  </InputGroup>
                  <InputGroup>
                    <Input id='maxBd' className='el-col-split' type='number' />
                    <Label htmlFor='maxBd'>Max</Label>
                  </InputGroup>
                </div>
              </div>
              <div>
                {/* <MultiSelect>
                {typeOptions.map((d) => (
                  <MultiSelectChip
                    className={elHasGreyChips}
                    id={d.value}
                    // onChange={(e) => console.log(e.target)}
                    // value={d.value}
                  >
                    {d.name}
                  </MultiSelectChip>
                ))}
              </MultiSelect> */}
                <Subtitle className='el-pb2 el-pt4' hasNoMargin>
                  Type
                </Subtitle>
                <MultiSelectInput
                  id='type-properties'
                  options={typeOptions}
                  defaultValues={filterValue.type}
                  onChange={(e) => handleSelectType(e, 'type')}
                />
              </div>
              <div>
                <Subtitle className='el-pb2 el-pt4' hasNoMargin>
                  Style
                </Subtitle>
                <MultiSelectInput
                  id='style-properties'
                  options={styleOption}
                  defaultValues={filterValue.style}
                  onChange={(e) => handleSelectType(e, 'style')}
                />
              </div>
              <div>
                <Subtitle className='el-pb2 el-pt4' hasNoMargin>
                  Locacity
                </Subtitle>
                <MultiSelectInput
                  id='locality-properties'
                  options={localityOption}
                  defaultValues={filterValue.locality}
                  onChange={(e) => handleSelectType(e, 'locality')}
                />
              </div>
            </section>

            <section className='el-flex el-flex-row el-flex-justify-end el-mt4'>
              <Button intent='danger' className='el-mr2' onClick={handleReset}>
                Reset
              </Button>
              <Button intent='primary' onClick={handleApply}>
                Apply
              </Button>
            </section>
          </div>
        </Modal>
      </CutomModalWrapper>
    </>
  )
}

export default ModalSortAndFilter
