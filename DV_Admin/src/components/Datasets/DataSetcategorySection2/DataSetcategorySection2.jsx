import React from 'react'
import DatasetCard from './components/DatasetCard'
import { MdAutoGraph } from 'react-icons/md'

const DataSetcategorySection2 = ({ data }) => {
    return (
        <div className='flex flex-1 flex-col'>
            <div className='flex justify-between pb-10 items-center'>
                <div className='flex items-center gap-2'>
                    <p><MdAutoGraph size={34} /></p>
                    <p className='text-black text-4xl font-semibold'>{data?.heading} </p>
                </div>
                <div className=''>
                    <p className='cursor-pointer py-2 px-8 rounded-3xl hover:bg-black/5'>See All</p>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {data?.datasets?.map((item) => {
                    return (
                        <DatasetCard item={item} />
                    )
                })}
            </div>
        </div>
    )
}

export default DataSetcategorySection2
