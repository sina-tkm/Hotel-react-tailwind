import { useRef, useState } from "react"
import { MinusCircleIcon } from "@heroicons/react/16/solid"
import { PlusCircleIcon } from "@heroicons/react/16/solid"
import useOutsideClick from "./hooks/useOutsideClick"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';


function Dateselector() {
    const [destination,setDestination] =useState("")
    const [openOption,setOpenOption] = useState(false)
    const [option , setOption] = useState({
        اتاق: 1,
        کودک:1,
        بزرگسال:1,
    })
    const [date,setDate] = useState([
            {
        startDate: new Date(),
        endDate: new Date(),
        key: 'traveling-date-range',
    }
])

    const [openDate,setOpenDate] = useState(false)
    console.log(openDate)

    const handleOption = (name,operation)=>{
        setOption((prev) =>{
          return {
            ... prev , 
            [name] : operation === "inc" ? option[name] + 1  : option[name] - 1,
          }
        })
    }
  return (
    <div className="flex mx-auto w-full justify-between pt-20 pb-10 px-16">
      
        <div className="border w-[160px] flex justify-center items-center  bg-yellow-500 rounded-md">
            <button>جستجو</button>
        </div>

      <div>
      <div id="mouseDropDown" className="  z-[100] flex cursor-pointer border-input justify-center items-center   px-4 h-[40px] w-[200px]  rounded-md relative gap-x-3 text-[13px] whitespace-nowrap" onClick={() => setOpenOption(!openOption)} >
            <h4 className="absolute  top-0 right-2 mt-[-13px] bg-white px-2 text-[12px] icon-color  ">تعداد مسافران</h4>
                کودک : ({option.کودک}) &nbsp;&bull;&nbsp; بزرگسال: ({option.بزرگسال}) &nbsp;&bull;&nbsp; اتاق: ({option.اتاق})
       </div>
        {openOption && <Minicard option ={option} handleOption={handleOption} setOpenOption={setOpenOption}/>}
      </div>
        
        <div onClick={()=>setOpenDate(!openDate)} className="flex gap-x-4 border-input justify-center items-center p-4 h-[40px] rounded-md">
            <div className="border-right">
                <span className="text-sizes">20/10/20204</span>
            </div>
            <div className="border-right">
                <span className="text-sizes">20/11/2023</span>
            </div>
            {openDate && <DateRange ranges={date} onChange={(item) => setDate([item.selection])} minDate={new Date()}  />}
        </div>
        <div className="flex flex-col relative">
            <h4 className="absolute top-0 right-2 mt-[-12px] bg-white px-2 text-[12px] icon-color">انتخاب مقصد</h4>
            <input 
            value={destination}
            onChange={e => setDestination(e.target.value)}
            type="search" className="border-input   w-[250px] rounded-md h-[40px] flex   text-[16px] font-regular text-end" placeholder="مقصد" />
        </div>

        

    </div>
  )
}

export default Dateselector




// mini card of select count of peape 

export function Minicard({option,handleOption,setOpenOption}) {
    const optionRef = useRef()
    useOutsideClick(optionRef,"mouseDropDown",()=>setOpenOption(false))

 return (
    <div className="absolute flex flex-col p-[6px] w-fit  gap-y-4 border rounded-md px-[14px] bg-white shadow-minicard" ref={optionRef}>
        <Peaples handleOption={handleOption} type="کودک" minLimit={1} option={option} maxLimit={9}/>
        <Peaples handleOption={handleOption} type= "اتاق" minLimit={1} option={option} maxLimit={9}/>
        <Peaples handleOption={handleOption} type="بزرگسال" minLimit={1} option={option} maxLimit={9} /> 
        
    </div>
  )
}


function Peaples({type,minLimit,option,handleOption,maxLimit}){
return(
    <div className="flex gap-x-6">
    <button disabled={option[type] >= maxLimit} onClick={()=>handleOption(type,"inc")} ><PlusCircleIcon className="font-size plus-color"/></button>
    <span>{option[type]}</span>
    <button disabled={option[type] <= minLimit} onClick={()=>handleOption(type,"dec")}><MinusCircleIcon className="font-size minus-color"/></button>
    <div>
        <span className="text-[16px]">
            {type} 
        </span>
    </div>
</div>
)
}
