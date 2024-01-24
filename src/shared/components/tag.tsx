import { useState } from "react";

export const TagLabel = ({name, color} : {name: string, color: string}) => {
    const [tagColor, setTagColor] = useState<string>("");

    const handleChangeColor = (color: string) => {
        if(tagColor){
            setTagColor("");
        }
        else{
            setTagColor(color);
        }
    }

    return(
        <div 
        onClick={() => handleChangeColor(color)}
        className={`m-4 overflow-hidden text-center leading-[40px] w-[200px] h-[50px] rounded-2xl border-[2px] border-solid mt-4 cursor-pointer`} style={{ borderColor: color , backgroundColor: tagColor}}>
                {name}
        </div>
    )
}