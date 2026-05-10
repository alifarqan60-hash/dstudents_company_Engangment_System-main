import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const Tag = ({title, onclick, active }) => {
    const [activeStatus, setActiveStatus] = useState(active);

    const clickAction = () =>{
        setActiveStatus(!activeStatus);
        onclick({active:true, title});
    }

    const cancelAction = () =>{
        setActiveStatus(false);
        onclick({active:false, title})
    }


    useEffect(() =>{
        setActiveStatus(active);
    }, [])
    return (
        <div onClick={clickAction} className={`border flex items-center gap-2 cursor-pointer transition transform-all duration-200 ${activeStatus ? "border-theme text-theme" : ""} border-black/20 hover:border-theme hover:scale-95 hover:text-theme rounded-3xl py-2 px-4`}>
            <p>{title}</p>
            {activeStatus && <p className='hover:bg-gray-200 p-1 hover:rounded-full' onClick={cancelAction}><IoCloseOutline /></p>}
        </div>
    )
}

export default Tag
