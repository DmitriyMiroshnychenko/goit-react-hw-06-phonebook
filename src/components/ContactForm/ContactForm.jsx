import { useState } from 'react';
import { useContacts } from 'hooks/useContacts';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const { contacts, addContact } = useContacts();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function resetState() {
    setName('');
    setNumber('');
  }

  function handleInputChange(event) {
    const { name, value } = event.currentTarget;

    if (name === 'name') {
      setName(value);
    }

    if (name === 'number') {
      const numericValue = value.replace(/\D/g, '');
      setNumber(numericValue);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const alreadyInContacts = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (alreadyInContacts) {
      toast.error(`${newContact.name.toUpperCase()} is already in contacts.`);
    } else {
      addContact(newContact);
      toast.success(`${newContact.name.toUpperCase()} is added to contacts.`);
    }

    resetState();
  }

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <label className={styles.Label}>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="name"
          value={name}
          autoComplete="off"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
        />
      </label>

      <label className={styles.Label}>
        <input
          className={styles.Input}
          type="tel"
          name="number"
          placeholder="number"
          value={number}
          autoComplete="off"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputChange}
        />
      </label>
      <button type="submit" className={styles.SubmitBtn}>
        Add contact
      </button>
    </form>
  );
}
