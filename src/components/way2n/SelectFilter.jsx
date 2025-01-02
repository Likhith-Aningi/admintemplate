import React from 'react'
import { CFormSelect } from '@coreui/react'
function SelectFilter({ initialOption, options, onChange, value }) {
    const op = [{ label: initialOption, value: '' }, ...options]
    return (
        <CFormSelect
            value={value}
            onChange={onChange}
            className='select-filter mx-1'
            options={op}
        />
    )
}

export default SelectFilter