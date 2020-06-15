import IContact from '../interfaces/IContact';

export default class CreateContactModel implements IContact {
    email: string;
    name: string;
    mobile: number;
    updated: Date | false = false;

    constructor(
        email: string,
        name: string,
        mobile: number,
    ){
        this.email = email;
        this.name = name;
        this.mobile = mobile;
    }

    public toObj(){
        return{
            email:this.email,
            name: this.name,
            mobile: this.mobile,
            updated: this.updated
        }
    }

    public toEntity(){
        return[
            {
                name: 'email',
                value: this.email
            },
            {
                name: 'name',
                value: this.name
            },
            {
                name: 'mobile',
                value: this.mobile
            },
            {
                name:'updated',
                value: this.updated
            }
        ]
    }
}