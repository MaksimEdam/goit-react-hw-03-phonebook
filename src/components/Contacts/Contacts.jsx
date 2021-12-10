import s from './Contacts.module.css';

function Contacts({ contacts, onDeleteContact }) {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.ContactItem}>
          <p>{name}</p>
          <p>{number}</p>
          <button
            className={s.ContactButton}
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Contacts;
