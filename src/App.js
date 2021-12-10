import { Component } from 'react';
import Contacts from './components/Contacts';
import Form from './components/Form';
import Filter from './components/Filter';
import { nanoid } from 'nanoid';
import 'modern-normalize/modern-normalize.css';
import './index.css';
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  formSubmitHandler = data => {
    console.log(data);
  };
  addContact = (name, number) => {
    const duplicateContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (duplicateContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contactId = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contactId, ...prevState.contacts],
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
    console.log(parsedContacts);
  }
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <div className="Wrapper">
          <h1 className="Title">Phonebook</h1>

          <Form onSubmit={this.addContact} />
        </div>
        <div className="Wrapper">
          <h2 className="Title">Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />

          <Contacts
            contacts={visibleContacts}
            onDeleteContact={this.deleteContacts}
          />
        </div>
      </div>
    );
  }
}

export default App;
