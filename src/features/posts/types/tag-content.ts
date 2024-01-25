export interface TagContent {
    id: number;
    name: string;
    color: string;
    handleTagClick: (id: number) => void;
    tagsId: number[];
}