import Nav from '../components/Nav/Nav';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImgInput from '../components/ImgInput/ImgInput';
import ImgDisply from '../components/ImgDisplay/ImgDisplay';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import { Component } from 'react';
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
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }, imgUrl: ''})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  calculateFaceLocations = (data) => {
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

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes});
  }

  onButtonChange = () => {
    this.setState({imgUrl: this.state.input})
    fetch("http://localhost:3000/image", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
          })
      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch("http://localhost:3000/image", {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
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

  render() {
    const { imgUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Nav onRouteChange={ this.onRouteChange } route={ route }/>
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
          :<Register onRouteChange={this.onRouteChange} loadUser ={this.loadUser} />}
        </div>}
      </div>
  );
  }
  
}

export default App;
