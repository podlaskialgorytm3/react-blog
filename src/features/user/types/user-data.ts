export interface  UserData {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    dateOfBirth: string;
}
export interface ResultData extends UserData{
    id: number;
}