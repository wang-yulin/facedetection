import { Component } from 'react';
import Nav from '../components/Nav/Nav';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImgInput from '../components/ImgInput/ImgInput';
import ImgDisply from '../components/ImgDisplay/ImgDisplay';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Modal from '../components/Modal/Modal';
import Profile from '../components/Profile/Profile';
import Particles from 'react-particles-js';
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl:'',
      boxes: [],
      route: "signin",
      isProfileOpen: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        age: '',
        pet: ''
      }
    }
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (data && data.id) {
          fetch(`http://localhost:3000/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(resp => resp.json())
          .then(user => {
            if (user && user.email) {
              this.loadUser(user);
              this.onRouteChange('home');
            }
          })
        }
      })
      .catch(console.log)
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      age: data.age,
      pet: data.pet
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      });
    }
    return;
  }

  displayFaceBoxes = (boxes) => {
    if (boxes) {
      this.setState({boxes: boxes});
    }
  }

  onButtonChange = () => {
    this.setState({imgUrl: this.state.input})
    fetch("http://localhost:3000/image", {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                input: this.state.input
            })
          })
      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch("http://localhost:3000/image", {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
          .catch(console.log)
        }

        this.displayFaceBoxes(this.calculateFaceLocations(response));
      })
      .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
    this.setState({ route: route})
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  render() {
    const { imgUrl, route, boxes, isProfileOpen, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Nav 
          onRouteChange={ this.onRouteChange } 
          route={ route }
          toggleModal={this.toggleModal}
        />
        { isProfileOpen && 
          <Modal>
              <Profile 
                isProfileOpen={isProfileOpen} 
                toggleModal={this.toggleModal}
                loadUser={this.loadUser}
                user={user}
              />
          </Modal>
        }
        {route === 'signin'?
          <SignIn onRouteChange={ this.onRouteChange } loadUser={ this.loadUser }/>
        :<div>
          {route === 'home'?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImgInput onInputChange = {this.onInputChange} onButtonChange = {this.onButtonChange}/>
            <ImgDisply url={ imgUrl } boxes={boxes}/>
          </div>
          :<div>
            {route === "register"?
             <Register onRouteChange={this.onRouteChange} loadUser ={this.loadUser} />
             :
             <SignIn onRouteChange={ this.onRouteChange } loadUser={ this.loadUser }/>
            }
          </div>
         }
        </div>}
      </div>
  );
  }
  
}

export default App;
