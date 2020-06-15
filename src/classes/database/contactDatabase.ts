import { Datastore } from '@google-cloud/datastore';
import ContactModel from '../../models/ContactModel';
import CreateContactModel from '../../models/CreateContactModel';
const settings = require("../../settings");

const datastore = new Datastore(settings.datastore);

class contactDatabase {

    async listContactsAsync(): Promise<ContactModel[] | false> {
        const query = datastore.createQuery('contacts').order('created');
        try {
            const [contacts] = await datastore.runQuery(query);

            let contactList:ContactModel[] = [];

            contacts.map(contact => {
                const contactKey = contact[datastore.KEY];
                contactList.push(new ContactModel(contactKey.id,contact.email,contact.name,contact.mobile,contact.updated,contact.created));
            });
            
            return contactList;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    async addContactAsync(contact:CreateContactModel): Promise<boolean> {
        const contactKey = datastore.key('contacts');
        const entity = {
            key: contactKey,
            data: [
                {
                    name: 'created',
                    value: new Date().toJSON(),
                },
                {
                    name: 'name',
                    value: contact.name,
                    excludeFromIndexes: true
                },
                {
                    name: 'email',
                    value: contact.email
                },
                {
                    name: 'mobile',
                    value: contact.mobile
                },
                {
                    name: 'updated',
                    value: false,
                    excludeFromIndexes: true
                },
            ]
        };
        try {
            await datastore.save(entity);
            return true;
        }
        catch (e) {
            console.log(e);
            throw {message:'Adding to contacts failed'}
        }
    }

    async patchContactAsync(contact:ContactModel): Promise<boolean>{
        const transaction = datastore.transaction();
        const contactKey = datastore.key(['contacts', contact.id]);
        console.log(contactKey);
        console.log(contactKey.path);
        try {
            await transaction.run();
            const [contactFromDb] = await transaction.get(contactKey);
            contactFromDb.email = contact.email;
            contactFromDb.name = contact.name;
            contactFromDb.mobile = contact.mobile;
            contactFromDb.updated = new Date().toJSON();
            transaction.save({
                key: contactKey,
                data: contactFromDb,
            });
            await transaction.commit();
            return true;
        } catch (e) {
            await transaction.rollback();
            console.log(e);
            throw{message:'Error updating contact'};
        }
    }

    async deleteContactAsync(id:number):Promise<boolean>{
        try{
            const contactKey = datastore.key(['contacts', id]);
            await datastore.delete(contactKey);
            return true;
        }
        catch(e){
            console.log(e);
            throw{message: 'Error deleting contact'}
        }
    }
}

export default new contactDatabase();