/* eslint-disable no-useless-escape */
import React from 'react';


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fullName: '',
            errors: {
                email: '',
                fullName: '',
                password: '',
            }
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'fullName':
                errors.fullName = value.length < 5 ? 
                    'Full Name must be 5 charcters long!' : '';
                break;
            case 'email':
                errors.email = validEmailRegex.test(value) ?
                    '' : 'Email is not valid!'
                break;
            case 'password':
                errors.password = value.length < 8 ?
                    'Password must be 8 characters long!' : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value })
    }

    onSubmitChange = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            fetch('/api/register',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
                })
            })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
        } 
        
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80 ">
                <form className="measure" onSubmit={this.onSubmitChange}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input 
                            onChange={this.handleInputChange} 
                            value={this.state.fullName} 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            required
                            name="fullName"  
                            id="name" 
                            placeholder="Name"
                        />
                        {errors.fullName.length > 0 && 
                            <span className="error">{errors.fullName}</span>}
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            onChange={this.handleInputChange} 
                            value={this.state.email} 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email"  
                            id="email-address" 
                            placeholder="Email"
                            required
                        />
                        {errors.email.length > 0 &&
                            <span className="error">{errors.email}</span>}
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            onChange={this.handleInputChange} 
                            value={this.state.password} 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            placeholder="Password"
                            required
                        />
                        {errors.password.length > 0 &&
                            <span className="error">{errors.password}</span>}
                    </div>
                    </fieldset>
                    <div className="">
                    <button 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit"
                    >
                        Register
                    </button>
                    </div>
                </form>
            </main>
            </div> 
        )
    }
}

export default Register;