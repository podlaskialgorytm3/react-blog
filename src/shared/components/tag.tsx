export const TagLabel = ({name, color} : {name: string, color: string})  => {
    return(
        <div
        className={`m-4 overflow-hidden text-center leading-[40px] w-[200px] h-[50px] rounded-2xl border-[2px] border-solid mt-4 cursor-pointer`} 
        style={{ borderColor: color }}>
                {name}
        </div>
    )
}