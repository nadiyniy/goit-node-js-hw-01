const { v4: uuidv4 } = require('uuid');

const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('db', 'contacts.json');

async function readContactsFile() {
	const data = await fs.readFile(contactsPath, 'utf-8');
	return JSON.parse(data);
}
readContactsFile();
async function writeContactsFile(contact) {
	await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

function listContacts() {
	return readContactsFile();
}

async function getContactById(contactId) {
	const contacts = await readContactsFile();
	const foundContact = contacts.find((contact) => contact.id === contactId);
	return foundContact || null;
}

async function removeContact(contactId) {
	const contacts = await readContactsFile();
	const index = contacts.findIndex((contact) => contact.id === contactId);

	if (index !== -1) {
		const removeContact = contacts.splice(index, 1);
		await writeContactsFile(contacts);

		return removeContact;
	}
	return null;
}

async function addContact(name, email, phone) {
	const contacts = await readContactsFile();
	const newContact = { id: uuidv4(), name: name, email: email, phone: phone };
	contacts.push(newContact);
	await writeContactsFile(contacts);
	return newContact;
}

module.exports = { addContact, listContacts, removeContact, getContactById };
