export interface EnteredData {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    dateOfBirth: string;
}
export interface ResultData extends EnteredData{
    id: number;
}