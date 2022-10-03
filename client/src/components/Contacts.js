import React from "react";
import AddContact from "./AddContact";
import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";


const Contacts = () => {
  const [contact, setContact] = useState([]);
// api practice https://randomuser.me/api/?results=10
  // get list of contact from DB
  const getContacts = async () => {
        const response = await fetch("http://localhost:4000/contacts");
        const contact = await response.json();
        setContact(contact);
    };
  useEffect(() => {
    // fetch("http://localhost:4000/contacts")
    //   .then((response) => response.json())
    //   .then((contact) => {
    //     setContact(contact);
    //   });
      // useEffect will run getContacts
      // automatically upload new list every time I post
      getContacts();
  }, []);

  // add contact
// connected to add contact post request page
    const addContact = async (newContact) => { 
        setContact((contact) => [...contact, newContact]);      
    };
  
  // DELETE contact
const onDelete = async (id) => {
    return fetch(`http://localhost:4000/contacts/${id}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        getContacts();
      }
    })
  
    // await response.json();
    // const newContact = contact.filter((contact) => contact.id !== id);
    // setContact(newContact);
  };

  return (
    <React.Fragment>
      {contact.map(contact=> (
        <ContactCard
          contact={contact}
          onDelete={onDelete}
          key={contact.id}
        />
      ))}
    
{/*       
      <ul>
        {contact.map((contact, index) => (
          <li key={index}>
                {contact.name}
                {contact.email}
                {contact.phone}
                {contact.notes}
          </li>
        ))}
          </ul> */}
        <AddContact addContact={addContact} />
    </React.Fragment>
  );
};

export default Contacts;
