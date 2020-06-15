import ContactModel from '../../models/ContactModel';
import CreateContactModel from '../../models/CreateContactModel';
import contactDatabase from '../database/contactDatabase';

class contactService {
    async listContactsAsync():Promise<ContactModel[]|false>{
        return await contactDatabase.listContactsAsync();
    }

    async addContactAsync(contact:CreateContactModel):Promise<boolean>{
        return await contactDatabase.addContactAsync(contact);
    }

    async patchContactAsync(contact:ContactModel):Promise<boolean>{
        return await contactDatabase.patchContactAsync(contact);
    }

    async deleteContactAsync(id:number):Promise<boolean>{
        return await contactDatabase.deleteContactAsync(id);
    }
}

const cs = new contactService();
export default cs;