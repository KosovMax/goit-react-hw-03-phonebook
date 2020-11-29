import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

import { v4 as uuidv4 } from 'uuid';

export default class ContactForm extends Component{

    constructor(props){
        super(props);

        this.state={
            contacts: this.props.contacts,
            name: this.props.name,
            number: this.props.number
        }
    }

    static defaultProps = {
        contacts: [],
        name: '',
        number: ''
    }

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,     
        number: PropTypes.string.isRequired     
    }

    handleChange = ({target}) => {
        const { name, value } = target;
        this.setState({ [name] : value })
    }

    handleSubmit = evt => {
        evt.preventDefault();

        const { changePhonebook } = this.props;
        const { name, contacts, number } = this.state;

        if( this.findIsName(name) != null){
            alert(name + ' is already in contacts.');
            return false;
        }

        contacts.push({
            id:uuidv4(), 
            name:name,
            number:number
        });

        changePhonebook({
            name:name,
            number:number,
            contacts:contacts
        })

        this.clearAllInputs();

    }

    clearAllInputs= () =>{
        this.setState({ name: '' })
        this.setState({ number: '' })
    }

    findIsName = (name) => {
        const { contacts } = this.state;
        return contacts.find((contact) => {
            return contact.name === name
        })
    }

    render(){

        const { name, number } = this.state;
        const { phonebook } = styles;
        return (
            
            <form className={phonebook} onSubmit={this.handleSubmit}>
                <label htmlFor="name_1">Name</label><br/>
                <input type="text" name="name" id="name_1" value={name} onChange={this.handleChange}/>
                <br/>
                <label htmlFor="number_1">Number</label><br/>
                <input type="number" name="number" id="number_1" value={number} onChange={this.handleChange}/>
                <br/>
                <br/>
                <button type="submit">Add contact</button>
            </form>

        );

    }
}