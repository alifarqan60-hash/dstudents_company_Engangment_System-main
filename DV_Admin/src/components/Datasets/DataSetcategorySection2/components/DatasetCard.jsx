import React from 'react'
import { MdOutlineArrowDropUp } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { IMAGES } from "../../../../constants/images"
import { PiDotLight } from "react-icons/pi"

const DatasetCard = ({item}) => {

    return (
        <div className='flex flex-col flex-1 gap-0 rounded-xl bg-white border w-full py-4 px-4'>
            <div className='flex flex-1 w-full h-full'>
                <div className='flex flex-1'>
                    <img src={IMAGES.solar} alt="" className=' rounded-t-xl h-20 rounded-md w-20 object-contain' />
                </div>
                <div className='flex flex-col flex-[8] px-4  gap-1'>
                    <div className='flex justify-between items-center'>
                        <p className='font-semibold text-lg'>{item?.title}</p>
                    </div>
                    <div className='flex gap-1 text-sm'>
                        <p className='underline cursor-pointer'>{item?.author} </p>
                        <p>{item?.time} </p>
                    </div>
                    <div className='flex text-sm gap-0'>
                        {/* <p className='flex items-center'>Usability <span className='font-bold'>{item?.usability}</span> <PiDotLight /> <span>2 </span> Files (CSV) <PiDotLight />   <span>237 KB</span> </p> */}
                        <p className={"flex items-center"}>Usability <span className='font-bold'>{item?.usability} </span> <PiDotLight /> <span>{item?.size} </span> </p>
                        <p><span>{item?.filetypes?.length}</span> Files ({item?.filetypes?.map((item) => ( <span>{item} &nbsp;</span> ))})</p>
                    </div>
                </div>
                <div className='flex justify-center gap-4 flex-col items-center flex-[2]  border-black/20 py-2'>
                    <div className='flex gap-2 border rounded-3xl items-center w-20 h-8 '>
                        <p className='flex-1 flex items-center justify-center cursor-pointer'>
                            <MdOutlineArrowDropUp />
                        </p>
                        <p className='h-8 w-[0.5px] bg-black'></p>
                        <p className='flex-[2] flex text-center text-sm font-semibold'>569</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <div className='flex gap-1 items-center'>
                            <img src={IMAGES.bronze} alt="medal" className='w-2 h-2 rounded-full' />
                            <p className='text-xs'>Bronze</p>
                        </div>
                        <p className='cursor-pointer hover:bg-black/10 hover:rounded-full p-1'><BsThreeDots /></p>
                    </div>
                </div>
            </div>
        </div>
    )
};




export default DatasetCard
