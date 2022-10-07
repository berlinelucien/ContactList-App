import { useState, useEffect } from "react";
import Form from "./form";
import ContactCard from "./ContactCard";
import EditForm from "./EditForm";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  // New state to check if we are working on editing a contact
  const [editedContact, setEditedContact] = useState(null);

  //A function to do the get request and set the state contacts
  const loadContacts = () => {
    fetch("http://localhost:4000/contacts")
      .then((response) => response.json())
      .then((contacts) => {
        setContacts(contacts);
      });
  };

  useEffect(() => {
    loadContacts();
  }, []);

  //A function to delete a contact
  const deleteContact = (contact) => {
    return fetch(`http://localhost:4000/contacts/${contact.id}`, {
      method: "DELETE",
    }).then((response) => {
      //console.log(response);
      if (response.ok) {
        loadContacts();
      }
    });
  };

  //A function to Edit a contact - PUT method
  const updateContact = (existingContact) => {
    return fetch(`http://localhost:4000/contacts/${existingContact.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(existingContact),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From put request ", data);
        setContacts(data);
        setEditedContact(null);
      });
  };

  //A function to handle the post request
  const postContact = (newContact) => {
    return fetch("http://localhost:4000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data); // this is all the contacts
        setContacts(data);
      });
  };

  return (
    <div className="contacts">
      {editedContact ? (
        <EditForm onUpdate={updateContact} editedContact={editedContact} />
      ) : null}
      {contacts.map((contact) => (
        <ContactCard
          onEdit={(contact) => {
            setEditedContact(contact);
          }}
          onDelete={deleteContact}
          contact={contact}
          key={contact.id}
        />
      ))}
      <Form
        saveContact={postContact}
        setContacts={(contacts) => {
          setContacts(contacts);
        }}
      />
    </div>
  );
}

export default Contacts;
