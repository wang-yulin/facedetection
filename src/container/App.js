import './App.css';
import Nav from '../components/Nav/Nav';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImgInput from '../components/ImgInput/ImgInput';
import ImgDisply from '../components/ImgDisplay/ImgDisplay';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import { Component } from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '9141438601714a39a5ff9cb7162fbc6e'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl:'',
      box: {},
      route: "signin"
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onButtonChange = () => {
    this.setState({imgUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
    this.setState({ route: route})
  }

  render() {
    return (
      <div className="App">
        <Nav onRouteChange={ this.onRouteChange } route={ this.state.route }/>
        {this.state.route === 'signin'?
          <SignIn onRouteChange={ this.onRouteChange }/>
        :<div>
          {this.state.route === 'home'?
          <div>
            <Logo />
            <Rank />
            <ImgInput onInputChange = {this.onInputChange} onButtonChange = {this.onButtonChange}/>
            <ImgDisply url={ this.state.imgUrl } box={this.state.box}/>
          </div>
          :<Register onRouteChange={ this.onRouteChange }/>}
        </div>}
      </div>
  );
  }
  
}

export default App;
