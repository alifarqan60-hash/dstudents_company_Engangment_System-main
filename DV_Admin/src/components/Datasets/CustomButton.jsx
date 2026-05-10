import React from 'react'

const CustomButton = ({ label, icon, bgcolor ,onClick }) => {
    return (
        <div onClick={onClick} className='flex'>
            <div className={`flex gap-2 items-center ${bgcolor} rounded-3xl text-white py-2 px-4 hover:scale-95 cursor-pointer`}>
                <p>{icon}</p>
                <p>{label} </p>
            </div>
        </div>
    )
};


export default CustomButton
