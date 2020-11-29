import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'

export default class Section extends Component{

    constructor(props){
        super(props);

        this.state = {
            contacts: JSON.parse(localStorage.getItem('CONTACTS')) || [],
            name: '',
            number: '',
            filter:''
        }
    }

    updatePhonebook = (data) => {
        const $this = this;
        Object.keys(data).forEach(k => {
            const v = data[k];
            $this.setState({ [k]: v })
        });
    }

    updateFilter = (filter) =>{
      this.setState({filter:filter})
    }

    updateContacts = (contacts) => {
      this.setState({contacts:contacts})
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        // console.log(prevProps, prevState, snapshot);
        localStorage.setItem( 'CONTACTS', JSON.stringify(prevState.contacts) );
    }

    render(){

        console.log(this.state);

        const { name, contacts, filter} = this.state;

        return (
           <>   
                <h2>Phonebook</h2>
                <ContactForm name={name} contacts={contacts} changePhonebook={this.updatePhonebook} />

                <h2>Contacts</h2>
                <Filter filter={filter} changeFilter={this.updateFilter} />
                <ContactList filter={filter} contacts={contacts} changeContacts={this.updateContacts}/> 
           </>
        );
    }
}
