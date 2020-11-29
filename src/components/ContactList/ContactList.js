import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContactList extends Component{
    constructor(props){
        super(props);
    }

    deleteContact = (id) => {

        const { contacts, changeContacts } = this.props;

        const index = contacts.map(contact => { return contact.id; }).indexOf(id);
        if(index != -1) contacts.splice(index, 1);
        
        changeContacts(contacts);
    } 

    render(){
        const { contacts, filter } = this.props;

        return(
                <ul>
                    {
                        contacts.filter(function(contact){
                            return contact.name.toLowerCase().startsWith(filter.toLowerCase());
                        }).map(contact => (
                            <li key={contact.id}><span> {contact.name}: {contact.number} </span><button onClick={()=>{this.deleteContact(contact.id)}}>Delete</button> </li>
                        ))
                    }
                </ul>
        )
    }
}