
const Track = ({icon, bgIcon, bgColor, head, text, textcolor }) => {
    
    
    return(
        <div className={`flex flex-col w-72 bg-${bgColor} h-72 rounded-2xl p-6 shadow-lg`}>
            <div className="flex justify-center">
                <div className={`w-20 h-20 bg-${bgIcon} flex items-center justify-center rounded-xl shadow-md`}>
                    <img src={icon} alt="icon here" className="w-12 h-12"/>
                </div>    
            </div>
            <p className={`text-xl font-semibold font-sans text-${textcolor} mt-4`}>{head}</p>
            <p className={`text-sm text-${textcolor} font-sans mt-4`}>{text}</p>
        </div>
    )
}

export default Track;