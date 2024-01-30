import { jsx as _jsx } from "react/jsx-runtime";
export const TagLabel = ({ name, color, id, handleTagClick, tagsId }) => {
    let tagColor = "";
    if (tagsId.includes(id)) {
        tagColor = color;
    }
    return (_jsx("div", { onClick: () => handleTagClick(id), className: `m-4 overflow-hidden text-center leading-[40px] w-[200px] h-[50px] rounded-2xl border-[2px] border-solid mt-4 cursor-pointer`, style: { borderColor: color, backgroundColor: tagColor }, children: name }));
};
