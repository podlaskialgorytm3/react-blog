import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfigData } from "./confidential-data";

const firebaseConfig = firebaseConfigData;

const app = initializeApp(firebaseConfig);
export const imageDatabase = getStorage(app);
