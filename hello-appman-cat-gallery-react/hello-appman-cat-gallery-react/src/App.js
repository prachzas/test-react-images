import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Service from './service';



/*
  GetImage ==> Service.getImageItems(number)
*/
class App extends Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangpicNumber = this.handleChangpicNumber.bind(this)
      this.state = {
      isLoading: true,
      picNumber: Number,
      imageCat: [] ,
      colorStatus: '',
      textStatus: ''
    }
  }
  
  handleChangpicNumber(e){
    this.setState({
      picNumber: e.target.value 
    });
  }
   
  handleSubmit(){
    this.setState({
      isLoading: false,
      textStatus: 'LOADING...',
      colorStatus: 'orange'
    });
    Service.getImageItems(this.state.picNumber).then(res =>{
      this.setState({
        isLoading: true,
        textStatus: 'SUCCESS',
        colorStatus: 'green',
        imageCat: res
      })
    }).catch((error) =>{
      this.setState({
        isLoading: true,
        textStatus: 'FAILED',
        colorStatus: 'red'
      })
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Cat Gallery</h2>
        </div>
        <p>Type amount of image : <input type="text" onChange={this.handleChangpicNumber} disabled={!this.state.isLoading}></input> <button type="submit" onClick={this.handleSubmit} disabled={!this.state.isLoading}>Submit</button></p>    
        <p style={{color: this.state.colorStatus}}>{this.state.textStatus}</p>
        {this.state.imageCat.map( (res) =>
          <div className="card" key={res.id}>
            <img className="picture" src={res.image} alt="logo"/>
            <br></br>
            <p>{res.label}</p>
          </div>
          )}
       </div>
    );
  }
}

export default App;
