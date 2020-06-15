import IExistingContact from '../interfaces/IExistingContact';

export default class ContactModel implements IExistingContact {
    id: number;
    email: string;
    name: string;
    mobile: number;
    updated?: Date | false;
    created?: Date;

    public constructor(
        id: number,
        email: string,
        name: string,
        mobile: number,
        updated?: Date | false,
        created?: Date
    ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.mobile = mobile;
        this.updated = updated;
        this.created = created;

/*         console.log({
            id: this.id,
            email: this.email,
            name: this.name,
            mobile: this.mobile,
            updated: this.updated
        }) */
    }

    public test(){
        console.log('test');
    }

    public toObj():Object{
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            mobile: this.mobile,
            updated: this.updated
        }
    }
}