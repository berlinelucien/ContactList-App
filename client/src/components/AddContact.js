import React from "react";
import { useState } from "react";

const Addcontact = ({ addcontact }) => {
  // initial state of contacts
  const [contacts, setContacts] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    image: "",
  });
  // const { initialcontacts = { id: null, name: "", email: "", phone: "", notes: "", avatar: "" } } = addcontacts;
  // const [contacts, setcontacts] = useState(initialcontacts);

  // this shows if user is typing capturing their input
  console.log(contacts);

  //handle the event of user typing into the form
  //function handle name change
  const handleNameChange = (event) => {
    const name = event.target.value;
    setContacts((contacts) => ({ ...contacts, name }));
  };
  //function handle email change
  const handleEmailChange = (event) => {
    const email = event.target.value;
    setContacts((contacts) => ({ ...contacts, email }));
  };
  //handle user typing phone number
  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setContacts((contacts) => ({ ...contacts, phone }));
  };
  // handle user typing notes
  const handleNotesChange = (event) => {
    const notes = event.target.value;
    setContacts((contacts) => ({ ...contacts, notes }));
  };
  // handle image upload
  const handleImage = (event) => {
    const image = event.target.value;
    setContacts((contacts) => ({ ...contacts, image }));
  };
  // POST REQUEST
  const postcontacts = async (newcontacts) => {
    const response = await fetch("http://localhost:4000/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newcontacts),
    });
    const content = await response.json();
    setContacts(contacts);
    setContacts([...contacts, content]);
  };

  // updating contacts information
  const updatecontacts= (existingcontacts) =>{
    return fetch(`http://localhost:8080/contactss/${existingcontacts.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(existingcontacts)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        console.log("From put request ", data);
        addcontact.savecontacts(data);
    });
}

  //submit user contacts information when they click on submit
  const handleSubmit = (e) => {
    //e.preventDefault();
    if (contacts.id) {
      updatecontacts(contacts);
    } else {
      postcontacts(contacts);
    }
   
  };
  //console.log("contacts", contacts);

  return (
    /** react.fragment serve a cleamre alternative to using unnecessary divs in the code. Fragment do not produce any extra element in the DOM */
    <React.Fragment>
      {/* <NavLink to="/">BACK</NavLink> */}
      <form className="field" onSubmit={handleSubmit}>
        <div className="control">
          <input
            type="text"
            name="name"
            id="contacts-name"
            placeholder="contacts Name"
            value={contacts.name}
            onChange={handleNameChange}
          />
          <input
            type="text"
            name="email"
            id="contacts-email"
            placeholder="contacts Email"
            value={contacts.email}
            onChange={handleEmailChange}
          />
          <input
            type="tel"
            name="phone"
            id="contacts-phone"
            placeholder="contacts Number"
            value={contacts.phone}
            onChange={handlePhoneChange}
          />
          <input
            type="text"
            name="notes"
            id="contacts-notes"
            placeholder="Notes"
            value={contacts.notes}
            onChange={handleNotesChange}
          />
          <input
            type="text"
            name="image"
            id="contacts-image"
            placeholder="image"
            value={contacts.image}
            onChange={handleImage}
          />
        </div>
        <div className="control">
        <button className="button is-primary">ADD</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Addcontact;
