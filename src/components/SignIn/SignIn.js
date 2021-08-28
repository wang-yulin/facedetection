import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            isValid: false,
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token', token);
    }

    onSubmitSignIn = (event) => {
        event.preventDefault();
        if (this.state.signInEmail && this.state.signInPassword) {
            fetch('http://localhost:3000/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.userID && data.success === 'true') {
                    this.saveAuthTokenInSession(data.token);
                    this.setState({isValid: false})
                    fetch(`http://localhost:3000/profile/${data.userID}`, {
                        method: 'get',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': data.token
                        }
                    })
                    .then(resp => resp.json())
                    .then(user => {
                        if (user && user.email) {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                        }
                    })
                } else {
                    this.setState({isValid: true})
                }
            })
        } 
    }

    render() {
        const{ onRouteChange } = this.props;
        return (
            <div className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80 ">
                <form className="measure" onSubmit={this.onSubmitSignIn}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            onChange={ this.onEmailChange } 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" 
                            type="text" 
                            name="email-address"  
                            id="email-address" 
                            placeholder="Email address"
                            required
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            onChange={ this.onPasswordChange } 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" 
                            type="password" 
                            name="password"  
                            id="password" 
                            placeholder="Password"
                            required
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <button
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                    >Sign In
                    </button>
                    </div>
                    {this.state.isValid && <span className="error">Email or Password is wrong!</span>}
                    <div className="lh-copy mt3">
                    <a href="#0" onClick= {() => onRouteChange('register')} className="f6 link dim black db">Register</a>
                    </div>
                </form>
            </main>
            </div>
            
        )
    }
    
}

export default SignIn;