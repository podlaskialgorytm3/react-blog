import { ref, listAll, getDownloadURL } from "firebase/storage";
import { imageDatabase } from "../../../shared/config/firebase-image";

export const fetchUserImage = async (id: number) => {
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

    return filteredUrls[0] || null; // Return null if no matching URL is found
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
