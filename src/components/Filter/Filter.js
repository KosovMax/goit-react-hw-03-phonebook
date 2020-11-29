import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Filter extends Component{
    constructor(props){
        super(props)

        this.state = {
            filter: this.props.filter
        }
    }

    static defaultProps = {
        filter:''
    }

    static propTypes = {
        filter: PropTypes.string.isRequired
    }

    handleChange = evt => {

        console.log("filter", evt.target.value)

        this.setState({ filter: evt.target.value });

        const { changeFilter } = this.props;

        changeFilter(evt.target.value);

    }

    handleSubmit = evt => {
        evt.preventDefault();
    }


    render(){
        const { filter } = this.state;
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="filter_1">Find contacts by name</label><br/>
                <input type="text" name="filter" id="filter_1" value={filter}  onChange={this.handleChange} />
            </form>
        );
    }
}