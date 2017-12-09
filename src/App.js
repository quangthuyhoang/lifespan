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

class Birthday extends Component {
  render() {
    return (
      <div className="wrapper">
  <div className="flame"></div>
      
      </div>
    )
  }
}
    // <div className="candle">
       
        // <div className="wick"></div>
        // <div className="flame"></div>
        // </div>

// Creates Each Visual Time Length
class TextBox extends Component {
  render() {
    return (
        <div className={this.props.display}>
          <p>You've lived and celebrated {this.props.age} <strong>AMAZING</strong> years!</p>
        </div>
      )
  }
  
}

class Square extends Component {
  render() {
    return (
      <div id={this.props.id} onClick={this.props.modal} className={this.props.lived} >{this.props.id + 1}</div>
    )
  }
};

// Creates a popup modal
class ModalContent extends Component {

  render() {
    return (
      <div className="modal-content" >
       <p>{this.props.unitType.type.toUpperCase()} {this.props.unitType._id + 1} </p>
        <p> Add content: </p><input ref="modalInput" id={this.props.unitType._id} type='text' onKeyPress={this.props.onHandleEnter} onChange={this.props.onContent} value={this.props.data}/>
      </div>
      )
  }
}

class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      age: 0,
      data: [],
      unit: {
        type: 'year',
        length: 1,
        _id: '',
        _content: '',
            },
      avglife: 78,
      modal: false
         }
  }

  ModalDataModal(id, content, unit){
    this._id = id + 1;
    this.content = content;
    this.unitType = pluralize(unit)
    function pluralize(unitType){
      return unitType + 's';
    }
  }

  _handleKeyPress(e) {
    if(e.key && e.key === 'Enter') {

      if(!this.refs ){
        console.log("_handleKeyPress Error")
        return;
      }
      console.log(this.refs)
      if(this.refs.age){
        var age = this.refs.age.value;
        if(isNaN(Number(age))) {
            alert(this.refs.age.value + "is not a number. Please enter a number value");
        } else {
            this.setState({age: Number(this.refs.age.value) }, function() {
            console.log(this.state.age)
          })
        }       
      }

      // && this.refs.modalInput.id === 'modalInput'
      if(this.state.data) {
        // get modal input data
        console.log("check",this.state.data);
        var arr = this.state.data;
        var modalID = this.state.unit._id;
        var content = this.state.unit._content;
        var type = this.state.unit.type;
        var newItem = new this.ModalDataModal(modalID, content, type)

        // check if specific unit already exist

        // if state data packet already exist - use update function

        // if state data packet does not exist - add new data function e.g. push method
        arr.push(newItem)
        this.setState({data: arr}, function(){
          this.setState({
        type: this.state.unit.type,
        length: this.state.unit.length,
        _id: '',
        _content: '',
            })
        })

      }

    }
  }

  onChangeValue(e){
    var type = this.state.unit.type,
        length = this.state.unit.length,
        id = this.state.unit._id,
        content = e.target.value;
    var obj = {type: type, length: length, _id: id, _content: content}
    this.setState({unit: obj}, function(){
      console.log(this)
    })
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

  // pluralize(unitType) {
  //   unitType + 's'
  // }

// MODAL ON/OFF on click
  updateModal(e) {
    // avoids exiting on modal-content and input
    if(e.target.className === 'modal-content' || e.target.nodeName === 'INPUT'){
      return;
    }

    var curr;

    // MAIN AGE INPUT
    if(this.state.modal){
      console.log("more",this)
      curr = {type: this.state.unit.type, length: this.state.unit.length, _id: this.state.unit._id, _content: ''};
      this.setState({
        modal: false,
        unit: curr,

      }, function() {
        console.log(this.state)
      })

      // CONTENT INPUT
    } else {
      curr = {type: this.state.unit.type, length: this.state.unit.length, _id: Number(e.target.id), _content: ''};
      this.setState({
        modal: true,
        unit: curr,
      }, function() {
        console.log(this.state)
      })
      // this.setState({modal: true})
    }
  }

// RENDERS ALL UNITS AND THEIR STATUS
  eachSQR() {
    var sqr = [];
    var filled = this.state.unit.type + 'Fill';
    var unfilled = this.state.unit.type;
    sqr.push(<TextBox display={this.state.age > 0 ? 'contextOn':'contextOff'} age={this.state.age}/>)
    for(var i = 0; i < this.state.avglife*this.state.unit.length; i++) {
      if(i < this.state.age*this.state.unit.length){
        sqr.push(<Square key={i} id={i} lived={filled} modal={this.updateModal.bind(this)}/>)
      } else {
        // sqr.push(<Square key={i} id={i} lived={unfilled} modal={this.updateModal.bind(this)}/>)
      }
    }
    return sqr
  }
  
  eachPresident() {
    var sqr = [];
    var filled = this.state.unit.type + 'Fill';
    var unfilled = this.state.unit.type;
    sqr.push(<TextBox text="If you live in the U.S., you've witness" display={this.state.age > 0 ? 'contextOn':'contextOff'} age={Math.floor(this.state.age/4)}/>)
    for(var i = 0; i < Math.floor((this.state.avglife*this.state.unit.length)/4); i++) {
      if(i < Math.floor(this.state.age*this.state.unit.length/4)){
        sqr.push(<Square key={i} id={i} lived={unfilled} modal={this.updateModal.bind(this)}/>)
      } else {
        // sqr.push(<Square key={i} id={i} lived={unfilled} modal={this.updateModal.bind(this)}/>)
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
       
       
         <div className={this.state.modal?'modalOn':'modalOff'} onClick={this.updateModal.bind(this)}>
          <ModalContent data={this.state.data.years} onHandleEnter={this._handleKeyPress.bind(this)} onContent={this.onChangeValue.bind(this)} unitType={this.state.unit} />
         </div>
           
        
        <div id="outerPortrait">
          <div id="innerPortrait">
            <div>
            {this.eachSQR()}
            </div>
            <br/>
            <br/>

            <div>
            {this.eachPresident()}
            </div>
            <br/>
            <br/>

            <div>
            {this.eachSQR()}
            </div>
            <br/>
            <br/>

          </div>
        </div>
        <Birthday />
      </div>
    )
  }
} 
//  // <Modal display={this.state.modal?'modalOn':'modalOff'} onModal={this.updateModal.bind(this)}
 //  onModalInput={this._handleKeyPress} unitType={this.state.unit}>
// </Modal>

export default App;
