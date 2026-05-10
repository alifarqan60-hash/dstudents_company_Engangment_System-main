import React, { useEffect } from 'react'
import { MdAutoGraph } from 'react-icons/md'
import DatasetCard from './components/DatasetCard'


const DataSetcategorySection = ({data}) => {
    useEffect(() =>{
        console.log("data in section comp is : ", data)
    }, [])
    return (
        <div className='flex flex-1 flex-col'>
            <div className='flex justify-between pb-10 items-center'>
                <div className='flex items-center gap-2'>
                    <p>{data?.icon}</p>
                    <p className='text-black text-4xl font-semibold'>All Datasets</p>
                </div>
                {/* <div className=''>
                    <p className='cursor-pointer py-2 px-8 rounded-3xl hover:bg-black/5'>See All</p>
                </div> */}
            </div>
            <div className='flex gap-4 flex-wrap'>
                {data?.map((item) =>{
                    return(
                        <DatasetCard item={item} />
                    )
                })}
            </div>
        </div>
    )
}


// const DataSetcategorySection = ({data}) => {
//     return (
//         <div className='flex flex-1 flex-col'>
//             <div className='flex justify-between pb-10 items-center'>
//                 <div className='flex items-center gap-2'>
//                     <p>{data?.icon}</p>
//                     <p className='text-black text-4xl font-semibold'>{data?.heading}</p>
//                 </div>
//                 <div className=''>
//                     <p className='cursor-pointer py-2 px-8 rounded-3xl hover:bg-black/5'>See All</p>
//                 </div>
//             </div>
//             <div className='flex gap-4'>
//                 {data?.datasets?.map((item) =>{
//                     return(
//                         <DatasetCard item={item} />
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }

export default DataSetcategorySection
