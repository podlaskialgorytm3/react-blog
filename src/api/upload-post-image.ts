import { ref, uploadBytes } from "firebase/storage";
import { imageDatabase } from '../shared/config/firebase-image';

export const uploadImage = (image: Blob,id: number) => {
    uploadBytes(ref(imageDatabase, `posts/${id}`), image).then(() => {
        window.location.reload();
    })
}