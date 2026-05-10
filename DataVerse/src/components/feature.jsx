

const Feature = ({icon,head,text}) =>{
    return(
        <div className="w-full h-24 flex items-center bg-themeblack rounded-lg shadow-md">
            <div className="flex items-center px-4">
                <div className="flex items-center justify-center w-14 h-14 bg-theme rounded-full">
                    <img src={icon} alt="img here" className="w-8 h-8"/>
                </div>
                <div className="flex flex-col ml-4">
                    <p className="text-base font-semibold text-theme font-sans">{head}</p>
                    <p className="text-sm text-white font-sans">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default Feature;