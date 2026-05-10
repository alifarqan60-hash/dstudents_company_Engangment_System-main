import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { MdOutlineArrowDropUp } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IMAGES } from "../../../../constants/images";
import { PiDotLight } from "react-icons/pi";
import { LuDownload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const DatasetCard = ({ item }) => {
  const navigate = useNavigate();
  const handleProfileClick = () => { };

  const handleDataSetClick = (item) => {
    navigate("/admin/dataset-details", { state: { item } });
  };

  return (
    <div className="flex flex-col gap-0 rounded-xl bg-white border w-72 h-96">
      <div className="flex flex-col h-full">
        <div className="flex flex-[2]">
          <img
            src={item?.imgurl}
            alt=""
            className=" rounded-t-xl h-32 w-full object-cover"
          />
        </div>
        <div
          className="flex flex-col flex-[4] px-4 pt-10  gap-2 cursor-pointer"
          onClick={() => handleDataSetClick(item)}
        >
          <div className="flex justify-between items-center ">
            <p className="font-semibold "> {item?.title}</p>
            {/* <p className='cursor-pointer hover:bg-black/10 hover:rounded-full p-1'><BsThreeDotsVertical /></p> */}
          </div>
          {/* <div className='flex items-center text-sm'>
                        <p className='underline cursor-pointer'>{item?.author}</p>
                        <PiDotLight />
                        <p>Updated 5 days ago</p>
                    </div> */}
          {/* <div className='flex flex-col text-sm gap-1'>
                        <p className={"flex items-center"}>Usability &nbsp;<span className='font-bold'>{item?.usability} </span> <PiDotLight /> <span>{item?.size} </span> </p>
                        <p><span>{item?.filetypes?.length}</span> Files ({item?.filetypes?.map((item) => (<span>{item} &nbsp;</span>))})</p>
                    </div> */}
        </div>
        <div className="flex justify-between items-center flex-1 border-t border-black/20 py-2 px-6">
          <div className="flex gap-2 border rounded-3xl items-center w-20 h-8 ">
            <p className="flex-1 flex items-center justify-center cursor-pointer">
              <MdOutlineArrowDropUp />
            </p>
            <p className="h-8 w-[0.5px] bg-black"></p>
            <p className="flex-1 flex text-center text-sm font-semibold">5</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="cursor-pointer">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <LuDownload size={24} />
              </a>
            </p>
            <img
              src={IMAGES.bronze}
              alt="medal"
              className="w-7 h-7 rounded-full"
            />
            <CircularProgressbarWithChildren
              value={60}
              styles={{
                path: {
                  stroke: `rgba(62, 152, 199)`,
                  strokeLinecap: "butt",
                  transition: "stroke-dashoffset 0.5s ease 0s",
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                // trail: {
                //     stroke: '#fdfdfd',
                //     strokeLinecap: 'butt',
                //     transform: 'rotate(0.25turn)',
                //     transformOrigin: 'center center',
                // },
              }}
              className="w-8"
            >
              <img
                src={IMAGES.person}
                onClick={handleProfileClick}
                alt="person"
                className="w-7 h-7 rounded-full cursor-pointer"
              />
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
    </div>
  );
};

// const DatasetCard = ({ item }) => {

//     return (
//         <div className='flex flex-col gap-0 rounded-xl bg-white border w-80 h-96'>
//             <div className='flex flex-col h-full'>
//                 <div className='flex flex-[2]'>
//                     <img src={item?.imgurl} alt="" className=' rounded-t-xl h-32 w-full object-cover' />
//                 </div>
//                 <div className='flex flex-col flex-[4] px-4 pt-10  gap-2'>
//                     <div className='flex justify-between items-center'>
//                         <p className='font-semibold text-lg'> {item?.title} </p>
//                         <p className='cursor-pointer hover:bg-black/10 hover:rounded-full p-1'><BsThreeDotsVertical /></p>
//                     </div>
//                     <div className='flex items-center text-sm'>
//                         <p className='underline cursor-pointer'>{item?.author}</p>
//                         <PiDotLight />
//                         <p>Updated 5 days ago</p>
//                     </div>
//                     <div className='flex flex-col text-sm gap-1'>
//                         <p className={"flex items-center"}>Usability &nbsp;<span className='font-bold'>{item?.usability} </span> <PiDotLight /> <span>{item?.size} </span> </p>
//                         <p><span>{item?.filetypes?.length}</span> Files ({item?.filetypes?.map((item) => (<span>{item} &nbsp;</span>))})</p>
//                     </div>
//                 </div>
//                 <div className='flex justify-between items-center flex-1 border-t border-black/20 py-2 px-6'>
//                     <div className='flex gap-2 border rounded-3xl items-center w-20 h-8 '>
//                         <p className='flex-1 flex items-center justify-center cursor-pointer'>
//                             <MdOutlineArrowDropUp />
//                         </p>
//                         <p className='h-8 w-[0.5px] bg-black'></p>
//                         <p className='flex-1 flex text-center text-sm font-semibold'>5</p>
//                     </div>
//                     <div className='flex gap-4'>
//                         <img src={IMAGES.bronze} alt="medal" className='w-7 h-7 rounded-full' />
//                         <CircularProgressbarWithChildren value={60} styles={{
//                             path: {
//                                 stroke: `rgba(62, 152, 199)`,
//                                 strokeLinecap: 'butt',
//                                 transition: 'stroke-dashoffset 0.5s ease 0s',
//                                 transform: 'rotate(0.25turn)',
//                                 transformOrigin: 'center center',
//                             },
//                             // trail: {
//                             //     stroke: '#fdfdfd',
//                             //     strokeLinecap: 'butt',
//                             //     transform: 'rotate(0.25turn)',
//                             //     transformOrigin: 'center center',
//                             // },
//                         }} className='w-8' >
//                             <img src={IMAGES.person} alt="person" className='w-7 h-7 rounded-full cursor-pointer' />
//                         </CircularProgressbarWithChildren>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

export default DatasetCard;
