import express from "express";
import { Contact } from "./../model/Contact.js";

// SAVE CONTACT
export const save = async (req, res) => {
    const { name, email, mobile, bloodgroup } = req.body;

    if (name == "" || email == "" || mobile == "" || bloodgroup == "") {
        return res.json({ message: "all Field Required", status: false });
    } 
    else {
        let checkData = await Contact.findOne({ email }); // fixed FindOne

        if (!checkData) {
            let contact = await Contact.create({   // fixed Contact.create
                name,
                email,
                mobile,
                bloodgroup,
            });

            return res.json({
                message: "contact save Successfully",
                status: true,
            });
        } 
        else {
            return res.json({ message: "contact Already exist", status: false });
        }
    }
};


// GET ALL CONTACTS
export const getContacts = async (req, res) => {
    let contacts = await Contact.find();

    if (!contacts || contacts.length === 0) {
        return res.json({ message: "no contact available", status: false });
    }
    else {
        return res.json({
            message: "All contact fetch",
            contacts,   // fixed variable name
            status: true
        });
    }
};


// GET CONTACT BY ID
export const getContactById = async (req, res) => {
    let id = req.params.id;
    let contact = await Contact.findById(id);  // simplified

    if (!contact) {
        return res.json({ message: "no data found", status: false });
    }
    else {
        return res.json({
            message: "Data fetch Successfully",
            contact,
            status: true
        });
    }
};


// UPDATE CONTACT
export const updateContactById = async (req, res) => {

    let id = req.params.id;
    let { name, email, mobile, bloodgroup } = req.body;

    let updateContact = await Contact.findByIdAndUpdate(
        id,
        { name, email, mobile, bloodgroup },
        { new: true }
    );

    if (updateContact) {
        return res.json({ message: "Update contact Successfully", status: true });
    }
    else {
        return res.json({ message: "contact not update", status: false });
    }
};


// DELETE CONTACT
export const DeleteContactById = async (req, res) => {

    let id = req.params.id;

    let deleteContact = await Contact.findByIdAndDelete(id); // fixed variable name

    if (deleteContact) {
        return res.json({ message: "delete contact Successfully", status: true });
    }
    else {
        return res.json({ message: "contact not delete", status: false });
    }
};
