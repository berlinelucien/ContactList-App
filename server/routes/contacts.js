import express from "express";
const router = express.Router();
import cors from 'cors'
// connection to the db
import db from "../db/db-connection.js";


/* GET contact listing. */
router.get('/', async (req, res) => {
  try {
    const contacts = await db.any('SELECT * FROM contact');
    res.send(contacts);
  } catch (e) {
    return res.status(400).json({ e });
  }
})

// ADD new contact to listing
router.post('/', async (req, res) => {
  const contact = {
   
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    notes: req.body.notes,
  };
  console.log(contact);
  try {
    const createContact = await db.query(
      'INSERT INTO contact(name, email, phone, notes) VALUES($1, $2, $3, $4) RETURNING *', [contact.name, contact.email, contact.phone, contact.notes],
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
router.delete(`/contacts/:id`,cors(), async (req, res) => {
  const contactId = req.params.id;
  console.log(req.params);
  // !! DELETE THE SPECIFIED CONTACT, $1 = eventId
  await db.query("DELETE FROM contact WHERE id=$1", [contactId]);
  res.status(200).end();
});






export default router;
