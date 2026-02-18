import express from "express";
import { Contact }  from "./../model/Contact.js"

export const save = async(req , res) => {
    const { name, email, mobile, bloodgroup } = req.body;

    if(name == "" || email == ""|| mobile == "" || bloodgroup == ""){
        res.json({message: " all Field Required", status: false});
    }
    else{
        let checkData = await Contact.FindOne({email});

        if(!checkData){
            let contact = await contact.create({
                name,
                email,
                mobile,
                bloodgroup,
            });
            res.json({
                message: "contact save Successgully",
                status:true,
            });

        }
        else{
            res.json({message: " contact Already exist", status: false});

        }
    }
    res.json({message: "Its working"});
    
     
};

export const getContacts = async (req, res)=>{
    let contacts =await Contact.find();

    if(!contacts) {
        res.json({ message: "no contact available", status:false});
    }
    else{
        res.json({message: "All contact fetch", contact ,status :true})
    }
};

export const getContactById = async (req, res) =>{
    let id = req.params.id;
    let contacts = await Contact.findById({ _id: id });

    if(!contacts){
        res.json({message: "no data found", status:false});
    }
    else{
        res.json({message: "Data fetch Successfully", contacts, status:true});
    }
};

export const updateContactById = async (req , res)=> {

    let id = req.params.id;
    let{ name,email,  mobile, bloodgroup } = req.body;

    let updateContact = await Contact.findByIdAndUpdate(id ,{ name, email ,mobile , bloodgroup}, 
        {new : true}
    );
     
    if(updateContact){
        res.json({message: "Update contact Successfully", status:true});
    }
    else {
        res.json({message : "contact not update " , status: true})
    }
};

export const DeleteContactById = async (req , res)=> {

    let id = req.params.id;
    let{ name,email,  mobile, bloodgroup } = req.body;

    let updateContact = await Contact.findByIdAndDelete(id 
    );
     
    if(deleteContact){
        res.json({message: "delete contact Successfully", status:true});
    }
    else {
        res.json({message : "contact not delete " , status: true})
    }
};

