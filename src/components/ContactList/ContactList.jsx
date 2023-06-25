import PropTypes from 'prop-types';
import { ContactListItem } from './ContactListItem';
import { useContacts } from 'hooks/useContacts';
import { toast } from 'react-toastify';

export function ContactList() {
  const { contacts, filter, deleteContact } = useContacts();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  function handleDeleteContact(id, name) {
    deleteContact(id);
    toast.info(`${name.toUpperCase()} has been removed from contacts.`);
  }

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => {
        const cleanedNumber = number.replace(/\D/g, '');
        return (
          <ContactListItem
            key={id}
            name={name}
            number={cleanedNumber}
            onDeleteContact={() => handleDeleteContact(id, name)}
          />
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
