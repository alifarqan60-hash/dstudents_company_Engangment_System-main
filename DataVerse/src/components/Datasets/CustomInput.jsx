import React from 'react'
import { IoSearch } from 'react-icons/io5';


const CustomInput = ({onchangetext}) => {
    return (
        <div className=''>
            <div className='border border-black/20 focus-within:border-black rounded-3xl items-center flex px-6 '>
                <p><IoSearch size={24} /> </p>
                <input onChange={(e) => {onchangetext(e.target.value)}} type="text" placeholder='Search datasets' className='outline-none w-full py-3 px-4 bg-transparent' />
            </div>
        </div>
    )
};

export default CustomInput
