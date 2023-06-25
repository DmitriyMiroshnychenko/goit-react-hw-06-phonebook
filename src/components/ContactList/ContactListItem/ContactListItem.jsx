import PropTypes from 'prop-types';
import styles from './ContactListItem.module.css';
import { MdDelete, MdPerson, MdPhone } from 'react-icons/md';

export function ContactListItem({ name, number, onDeleteContact }) {
  return (
    <li className={styles.Item}>
      <span className={styles.Contact}>
        <span className={styles.Name}>
          <MdPerson className={styles.Icon} />
          {name}
        </span>{' '}
        <span className={styles.Number}>
          <MdPhone className={styles.Icon} />
          {number}
        </span>
      </span>
      <button
        type="button"
        className={styles.DeleteBtn}
        onClick={onDeleteContact}
      >
        <MdDelete className={styles.Icon} />
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
