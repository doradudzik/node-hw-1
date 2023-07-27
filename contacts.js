const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}
function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const findContactById = contacts.find(
        (contact) => contact.id === contactId
      );
      console.log(findContactById);
    })
    .catch((err) => console.log(err.message));
}
function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = { name: name, email: email, phone: phone };
      const updatedContacts = [...contacts, newContact];
      return fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    })
    .then(() => {
      console.log("New contact added");
      return fs.readFile(contactsPath, "utf-8");
    })
    .then((updatedContactsData) => {
      console.table(JSON.parse(updatedContactsData));
    })
    .catch((err) => console.log(err.message));
}
function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      console.table(updatedContacts);
    })
    .catch((err) => console.log(err.message));
}

module.exports = { listContacts, getContactById, addContact, removeContact };
