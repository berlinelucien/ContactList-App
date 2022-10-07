import express from "express";
const router = express.Router();
import cors from "cors"
// connection to the db
import db from "../db/db-connection.js";


/* GET contact listing. */
router.get('/', async (req, res) => {
  try {
    const contact = await db.any('SELECT * FROM contacts');
    res.send(contact);
  } catch (e) {
    return res.status(400).json({ e });
  }
})

// ADD new contact to listing
router.post('/', async (req, res) => {
  const contacts = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    notes: req.body.notes,
    avatar: req.body.avatar,
  };
  console.log(contacts);
  try {
    const createContact = await db.query(
      'INSERT INTO contacts(name, email, phone, notes, avatar) VALUES($1, $2, $3, $4, $5, ) RETURNING *', [contacts.name, contacts.email, contacts.phone, contacts.notes, contacts.image]
  );
    console.log(req.body);
  // !! SEND THE INSERTED VALUE TO THE BACK END SO FRONT END CAN ACCESS WITH FETCH
  res.send(createContact);
} catch (e) {
  console.log(e);
  return res.status(400).json({ e });
}
})

/** delete method not working yet  */
/** DELETE CONTACT BY ID */
// : acts as a placeholder
// GRABS THE ID SPECIFIED IN THE DELETE REQUEST MADE IN FRONTEND
//http://localhost:4000/contacts/28 404 (Not Found)
router.delete('/:id', cors(), async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  // !! DELETE THE SPECIFIED CONTACT, $1 = eventId
  try {
    await db.none("DELETE FROM contacts WHERE id=$1", [contacts.id]);
res.send({ status: "success" });
  } catch (e) {
    return res.statusMessage(400).json({ e });
  }

});


//A put request - Update a contact
// router.put('/contacts/:contactId', cors(), async (req, res) =>{
//   console.log(req.params);
//   //This will be the id that I want to find in the DB - the student to be updated
//   const contactId = req.params.contactId
//   const updatedContact = {
//     id: req.body.id, 
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone,
//     notes: req.body.notes,
//   }
//   console.log("In the server from the url - the student id", contactId);
//   console.log("In the server, from the react - the student to be edited", updatedContact);
//   // UPDATE contact SET name = "something" WHERE id="16";
//   const query = `UPDATE students SET name=$1, email=$2, phone=$3, notes=$4 WHERE id=${contactId} RETURNING *`;
//   const values = [updatedContact.id, updatedContact.name, updatedContact.email, updatedContact.phone, updatedContact.notes];
//   try {
//     const updated = await db.query(query, values);
//     console.log(updated.rows[0]);
//     res.send(updated.rows[0]);

//   }catch(e){
//     console.log(e);
//     return res.status(400).json({e})
//   }
// })



export default router;
