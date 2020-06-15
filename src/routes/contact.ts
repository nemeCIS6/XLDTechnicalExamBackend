import jsonResponder from "../classes/jsonResponder";
import Express, { NextFunction, json } from "express";
import validator from "validator";
import missingFields from "../classes/missingFields";
import contactService from "../classes/services/contactService";
import ContactModel from "../models/ContactModel";
import CreateContactModel from "../models/CreateContactModel";
const contactRouter = Express.Router();

export default contactRouter
    .put("/create", async (req, res, next) => {
        let missing = missingFields(req.body, [
            "name",
            "email",
            "mobile"
        ]);
        if (missing) {
            return res
                .status(417)
                .json(jsonResponder.fail([], "Expected post field for " + missing.join(", ")));
        }
        const { name, email, mobile } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(417).json(jsonResponder.fail("Email invalid"));
        }

        if (name.length < 2) {
            return res.status(417).json(jsonResponder.fail("Name invalid or less than 2 characters"));
        }

        if (!validator.isNumeric(mobile)) {
            return res.status(417).json(jsonResponder.fail("Mobile number can only contain numbers"));
        }

        const contact = new CreateContactModel(email, name, mobile);

        try {
            await contactService.addContactAsync(contact);
            return res
                .status(201)
                .send(jsonResponder.success({ name }, `${name} added to contacts`));
        } catch (e) {
            return res
                .status(e.code || 400)
                .json(jsonResponder.fail({ name, email, mobile }, e.message || "UNKNOWN ERROR"));
        }
    }).get("/list", async (req, res, next) => {
        try {
            const list = await contactService.listContactsAsync();

            return res
                .status(201)
                .send(jsonResponder.success(list && list.map(contact=>contact.toObj()), `List successfully retrieved`));
        } catch (e) {
            console.log(e);
            return res
                .status(e.code || 400)
                .json(jsonResponder.fail({}, e.message || "UNKNOWN ERROR"));
        }
    }).patch("/:id", async (req, res, next) => {
        if (!validator.isInt(req.params.id)) {
            return next();
        }

        let missing = missingFields(req.body, [
            "name",
            "email",
            "mobile"
        ]);
        if (missing) {
            return res
                .status(417)
                .json(jsonResponder.fail([], "Expected post field for " + missing.join(", ")));
        }
        const id = parseInt(req.params.id);
        const { name, email, mobile } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(417).json(jsonResponder.fail("Email invalid"));
        }

        if (name.length < 2) {
            return res.status(417).json(jsonResponder.fail("Name invalid or less than 2 characters"));
        }

        if (!validator.isNumeric(mobile)) {
            return res.status(417).json(jsonResponder.fail("Mobile number can only contain numbers"));
        }

        const contact = new ContactModel(id,email, name, mobile);

        try {
            const patch = await contactService.patchContactAsync(contact);
            return res
                .status(202)
                .send(jsonResponder.success({name}, `${name} contact details updated`));
        } catch (e) {
            console.log(e);
            return res
                .status(e.code || 400)
                .json(jsonResponder.fail({}, e.message || "UNKNOWN ERROR"));
        }
    }).delete("/:id", async (req, res, next) => {
        if (!validator.isInt(req.params.id)) {
            return next();
        }
        const id = parseInt(req.params.id);

        try {
            const list = await contactService.deleteContactAsync(id);
            return res
                .status(202)
                .send(jsonResponder.success({id}, `Contact deleted`));
        } catch (e) {
            console.log(e);
            return res
                .status(e.code || 400)
                .json(jsonResponder.fail({}, e.message || "UNKNOWN ERROR"));
        }
    })
;

