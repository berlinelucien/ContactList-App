import React from "react";
import AddContact from "./AddContact";
import { useState, useEffect } from "react";
import ContactCard from "./ContactCards";

const Contacts = () => {
  const [contact, setContact] = useState([]);
  //const [editContactId, setEditContactId] = useState(null);
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
  // const updateContact = (savedContact) => {
  //   console.log("Line here savedStudent", savedContact);
  //   setContact((contacts) => {
  //     const newArrayContacts = [];
  //     for (let contact of contacts) {
  //       if (contact.id === savedContact.id) {
  //         newArrayContacts.push(savedContact);
  //       } else {
  //         newArrayContacts.push(contact);
  //       }
  //     }
  //     return newArrayContacts;
  //   });
  //   // this line is only to close the form
  //   setEditContactId(null);
  // };

  // // edit function
  // const onEdit = (contact) => {
  //   console.log("This is line 26 on student component", contact);
  //   const editingID = contact.id;
  //   console.log("Just the student id", contact.id);
  //   setEditContactId(editingID);
  // };

  // DELETE contact
  const onDelete = async (id) => {
    return fetch(`http://localhost:4000/contacts/${id}`, {
      method: "DELETE",
    }).then((response) => {
      const newList = contact.filter((contact) => contact.id !== id);
      setContact(newList);
      console.log(response);
      // if (response.ok) {
      //   getContacts();
      // }
    });

    // await response.json();
    // const newContact = contact.filter((contact) => contact.id !== id);
    // setContact(newContact);
  };

  return (
    <React.Fragment>
      {contact.map((contact) => (
        <ContactCard
          contact={contact}
          onDelete={onDelete}
          key={contact.email}
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
