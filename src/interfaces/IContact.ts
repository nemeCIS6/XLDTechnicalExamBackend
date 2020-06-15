export default interface IContact{
    id?: number;
    name: string;
    email: string;
    mobile: number;
    updated?: Date|false;
    created?:Date|false;
}