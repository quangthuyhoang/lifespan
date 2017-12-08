import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <Application />
      </div>
    );
  }
}
// Creates Each Visual Time Length
class Square extends Component {

  render() {
    return (
      <div id={this.props.id} onClick={this.props.modal} className={this.props.lived} >{this.props.id + 1}</div>
    )
  }
};
// Creates a pop modal
class ModalContent extends Component {
  constructor(props){
    super(props);
    this.state ={
      value: "hello"
    };
  }

  ModalDataModal(id, content){
    this._id = id + 1;
    this.content = content;
  }

  render() {
    return (
      <div className="modal-content" >
        Modal Popup - {this.props.unitType.type.toUpperCase()} {this.props.unitType.current + 1}
        <input ref="modalInput" id={this.props.unitType.current} type='text' onKeyPress={this.props.onContent.bind(this)}/>
      </div>
      )
  }
}

class Modal extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: {
        unit: this.props.dataType,
      }
    }
  }

  render() {
    return (
      <div className={this.props.display} onClick={this.props.onModal}>
        <ModalContent onContent={this.props.onModalInput} unitType={this.props.unitType}/>
      </div>
    )
  }
}

class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      age: 0,
      data: {
        years: [],
        months: [],
        weeks: [],
        days: [],
      },
      unit: {
        type: 'year',
        length: 1,
        current: '',
            },
      avglife: 78,
      modal: false
         }
  }

  _handleKeyPress(e) {
    if(e.key && e.key === 'Enter') {

      if(!this.refs ){
        console.log("_handleKeyPress Error")
        return;
      }

      if(this.refs.age){
        var age = this.refs.age.value;
        if(isNaN(Number(age))) {
            console.log(this.refs.age.value + "is not a number. Please enter a number value");
            alert(this.refs.age.value + "is not a number. Please enter a number value");
        } else {
            this.setState({age: Number(this.refs.age.value) }, function() {
            console.log(this.state.age)
          })
        }       
      }
      // && this.refs.modalInput.id === 'modalInput'
      if(this.refs.modalInput) {
        // get modal input data
        console.log("where",this)
        var arr = [];
        var modalID = this.refs.modalInput.id;
        console.log(this.refs.modalInput, modalID)
        var content = this.refs.modalInput.value;
        var newItem = new this.ModalDataModal(modalID, content)

        console.log(newItem)

        // check if specific unit already exist
        // if state data packet already exist - use update function
        // if state data packet does not exist - add new data function e.g. push method

        // this.setState({data: })

      }

    }
  }
  // GET USER INPUT
  getUnit() {
    var str = this.refs.unit.value;
    str = str.split(" ");
      this.setState({
        unit: {
          type: str[0],
          length: Number(str[1]),  
        }
    }, function(){
      console.log(this.state.unit.type, this.state.unit.length)
    })
  }

  pluralize(unitType) {
    return unitType + 's'
  }

// MODAL ON/OFF on click
  updateModal(e) {
    // avoids exiting on modal-content and input
    if(e.target.className === 'modal-content' || e.target.nodeName === 'INPUT'){
      return;
    }
    console.log(e.target.id)
    if(this.state.modal){
      console.log()
      this.setState({modal: false}, function() {
        console.log(this.state)
      })
    } else {
      var curr = {type: this.state.unit.type, length: this.state.unit.length, current: Number(e.target.id)};
      this.setState({
        modal: true,
        unit: curr,
      }, function() {
        console.log(this.state)
      })
      // this.setState({modal: true})
    }
  }


  // Determine if data type storage alrady exist and to save data
  initialDataStorage(timeUnit, timelength) {
    var arr = [];
    if(timeUnit === 'year'){

    }
    else if (timeUnit === 'month') {

    }
    else if (timeUnit === "week") {

    }
    else if (timeUnit === 'day') {

    }
    var unitObj = {content: timeUnit };
    for(var i = 0; i < timelength; i++) {
      unitObj._id = i + 1;
      arr.push(unitObj);
    }

    // return an array to save into the state.data
    return arr;
  }
// RENDERS ALL UNITS AND THEIR STATUS
  eachSQR() {
    var sqr = [];
    var filled = this.state.unit.type + 'Fill';
    var unfilled = this.state.unit.type;
    var dataStorageType = this.pluralize(unfilled)
    for(var i = 0; i < this.state.avglife*this.state.unit.length; i++) {
      if(i < this.state.age*this.state.unit.length){
        sqr.push(<Square key={i} id={i} lived={filled} modal={this.updateModal.bind(this)}/>)
      } else {
        sqr.push(<Square key={i} id={i} lived={unfilled} modal={this.updateModal.bind(this)}/>)
      }
    }
    return sqr
  }
  
  render() {    
    return (
      <div> 
        Enter you age: <input onKeyPress={this._handleKeyPress.bind(this)} ref="age" id="age" type="text" />
        <select onChange={this.getUnit.bind(this)} ref="unit">
          <option value="year 1">Year</option>
          <option value="month 12">Month</option>
          <option value="week 52">Week</option>
          <option value="day 365">Day</option>
        </select>
        <h1>A Picture of Your Life: One Accomplishment at a Time</h1>
        <Modal display={this.state.modal?'modalOn':'modalOff'} onModal={this.updateModal.bind(this)}
         onModalInput={this._handleKeyPress} unitType={this.state.unit} />
        <div id="outerPortrait">
          <div id="innerPortrait">
            {this.eachSQR()}
          </div>
        </div>
        
      </div>
    )
  }
} 


export default App;
