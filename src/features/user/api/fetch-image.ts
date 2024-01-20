import { ref, listAll, getDownloadURL } from "firebase/storage";
import { imageDatabase } from "../../../shared/config/firebase-image";

export const fetchImage = async (id: number) => {
  try {
    const res = await listAll(ref(imageDatabase, "uploads"));

    const promises = res.items.map(async (item) => {
      const url = await getDownloadURL(item);
      const originalString = item.fullPath;
      const trimmedString = parseInt(originalString.substring("uploads/".length));
      if (trimmedString === id) {
        return url;
      }
    });

    const urls = await Promise.all(promises);
    const filteredUrls = urls.filter((url) => url !== undefined);

    return filteredUrls[0]; // Zakładając, że istnieje tylko jedno pasujące URL do obrazu
  } catch (error) {
    console.error("Błąd podczas pobierania obrazu:", error);
    throw error;
  }
};
