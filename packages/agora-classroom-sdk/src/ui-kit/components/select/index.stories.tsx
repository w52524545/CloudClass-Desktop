import React, { useState } from 'react'
import { Meta } from '@storybook/react';
import { Select } from '~components/select'

const meta: Meta = {
    title: 'Components/Select',
    component: Select,
}


export const Docs = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedOption, setSelectedOption] = useState('chocolate');
    return (
        <>
            <div className="mt-4">
                <Select
                    value={selectedOption}
                    onChange={value => {
                        console.log(value)
                        setSelectedOption(value) 
                    }}
                    options={options}
                />
            </div>
        </>
    )
}

export default meta;