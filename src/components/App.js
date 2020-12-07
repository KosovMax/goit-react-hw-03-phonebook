import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'

export default class App extends Component{

    state = {
        contacts: [],
        filter: ''
    }

    addContact = (newContact) => {
        this.setState(prevState => {
            return{ contacts: [...prevState.contacts, newContact] }
        })
    }

    findName = (name) => {
        const { contacts } = this.state;
        return contacts.find((contact) => {
            return contact.name === name
        })
    }

    updateFilter = (filter) =>{
      this.setState({filter:filter})
    }

    removeContactId = (id) => {
        this.setState(prevState => {
            return {contacts: prevState.contacts.filter(contact => contact.id !== id)}
        });
    }

    componentDidMount = () => {
        const parseJsonContacts = JSON.parse(localStorage.getItem('CONTACTS'));

        if(parseJsonContacts)
        this.setState({contacts: parseJsonContacts})
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { contacts } = this.state;

        if(contacts !== prevState.contacts){
            localStorage.setItem('CONTACTS', JSON.stringify(contacts));
        }
    }

    render(){

        console.log(this.state);

        const { contacts, filter } = this.state;

        return (
           <>   
                <h2>Phonebook</h2>
                <ContactForm onFindName={this.findName} onAddContact ={this.addContact} />

                <h2>Contacts</h2>
                <Filter filter={filter} onFilter={this.updateFilter} />
                <ContactList contacts={contacts} filter={filter} removeContactId={this.removeContactId}/> 
           </>
        );
    }
}
