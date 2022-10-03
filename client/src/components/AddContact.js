import React from "react";
import { useState } from "react";
//import NavLink from 'react-router-dom';

const AddContact = ({addContact}) => {
    // initial state of contact
  const [contact, setContact] = useState({
      
      name: "",
      email: "",
      phone: "",
      notes: "",
    });
    
    // this shows if user is typing capturing their input
    console.log(contact);
    
    //handle the event of user typing into the form
    //function handle name change
    const handleNameChange = (event) => {
      const name = event.target.value;
      setContact((contact) => ({ ...contact, name }));
    };
    //function handle email change
    const handleEmailChange = (event) => {
      const email = event.target.value;
      setContact((contact) => ({ ...contact, email }));
    };
    //handle user typing phone number
    const handlePhoneChange = (event) => {
      const phone = event.target.value;
      setContact((contact) => ({ ...contact, phone }));
    };
    // handle user typing notes
    const handleNotesChange = (event) => {
      const notes = event.target.value;
      setContact((contact) => ({ ...contact, notes }));
    };
    // POST REQUEST
    const postContact = async (newContact) => {
      return await fetch("http://localhost:4000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            console.log("From the post ", data);
            // addcontact deconstructed prop
            // get this from contact.js
          addContact(data);
        });
    };
    //submit user contact information when they click on submit
    const handleSubmit = (e) => {
     //e.preventDefault();
      postContact(contact);
    };
     //console.log("contact", contact);
  

  return (
    /** react.fragment serve a cleamre alternative to using unnecessary divs in the code. Fragment do not produce any extra element in the DOM */
    <React.Fragment>
      {/* <NavLink to="/">BACK</NavLink> */}
      <form className="field" onSubmit={handleSubmit}>
        <div className="control">
    
          <input
            type="text"
            name="name"
            id="contact-name"
            placeholder="Contact Name"
            value={contact.name}
            onChange={handleNameChange}
          />
          <input
            type="text"
            name="email"
            id="contact-email"
            placeholder="Contact Email"
            value={contact.email}
            onChange={handleEmailChange}
          />
          <input
            type="tel"
            name="phone"
            id="contact-phone"
            placeholder="Contact Number"
            value={contact.phone}
            onChange={handlePhoneChange}
          />
          <input
            type="text"
            name="notes"
            id="contact-notes"
            placeholder="Notes"
            value={contact.notes}
            onChange={handleNotesChange}
          />
         
        </div>
        <div className="control">
        <button className="button is-primary">Add</button>
        </div>
        
      </form>
    </React.Fragment>
  );
};

export default AddContact;
