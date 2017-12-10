import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import candle from './candle-icon.';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Powered by React</h1>
        </header>
        
        <Application />
      </div>
    );
  }
}

class Moon extends Component {
  render() {
    return (
      // <div className="wrapper">
        <img className="moon" src={require('./moon.png')} alt="moon" />
      // </div>
      )
  }
}

class Person extends Component {
  render() {
    return (
      <img className="candle" src={require('./people.png')} alt="person"/>
    )
  }
}

class Candle extends Component {
  render() {
    return (
      // <div className="wrapper">
        <img className="candle" src={require('./candle-icon.png')} alt="candle"/>
      // </div>
      )
  }
}
// Creates Each Visual Time Length
class TextBox extends Component {

  unitCheck() {
    return this.props.age*this.props.data.length;
  }

  pluralCheck(text){
    const t = text;
    if(this.props.age*this.props.data.length > 1) {
      return t + 's'
    }
    return t;
  }

  render() {
    if(this.props.text) {
      return (
        <div className={this.props.display}>
            <p>{this.props.text}</p>
        </div>
        )
    }
    if(this.props.age < 1){
      return (
        <div className={this.props.display}>
          <p>Welcome to this beautiful world. You're still new and you haven't experienced much. You lived and experienced {this.unitCheck().toFixed(2)} <strong>AMAZING</strong> and probably <strong>CONFUSING</strong> {this.pluralCheck(this.props.data.type)}!</p>
        </div>
      )    
    }
      return (
        <div className={this.props.display}>
          <p>You've lived and celebrated {this.unitCheck()} <strong>AMAZING</strong> {this.pluralCheck(this.props.data.type)}!</p>
        </div>
      )
    
  }
  
}
// <p>You've lived and celebrated {this.props.data.age} <strong>AMAZING</strong> {this.props.data}!</p>

class Square extends Component {
  render() {
    const animal = this.props.image;
    if(animal){
      if(animal === 'chicken'){
        return (
          <img id={this.props.id} onClick={this.props.modal} className="candle" src={require('./chicken.png')} alt="chicken" />
        )
      }
      if(animal === 'pig') {
        return (
          <img id={this.props.id} onClick={this.props.modal} className="candle" src={require('./pig.png')} alt="pig"/>
        )
      }
      if(animal === 'cow') {
        return (
          <img id={this.props.id} onClick={this.props.modal} className="candle" src={require('./cow.png')} alt="cow"/>
        )
      }
    }
    return (
        <div id={this.props.id} onClick={this.props.modal} className={this.props.lived} > {this.props.id + 1}</div>
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
// 59 lbs of beef per person per year - cow avg weight is 1400 lbs
//  60 lbs of chicken per person per year - chicken avg weight is 2 lbs
// 41 lbs of pork per person per year - 144 lbs of meat from one pig
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
      modal: false,
      animal: 'chicken',
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
      if(this.refs.age){
        var age = this.refs.age.value;
        if(isNaN(Number(age))) {
            alert(this.refs.age.value + "is not a number. Please enter a number value");
        } else {
          if(this.state.unit.type === 'month'){
            this.setState({age: Number(this.refs.age.value/this.state.unit.length) })
          } else {
            this.setState({age: Number(this.refs.age.value) })
          }
          this.refs.age.value = "";
        }       
      }

      // && this.refs.modalInput.id === 'modalInput'
      if(this.state.data) {
        // get modal input data
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
    this.setState({unit: obj})
  }

  
  // GET USER INPUT
  getUnit() {
    var str;
    if(this.refs.unit) {
      str = this.refs.unit.value;
      str = str.split(" ");
      this.setState({
        unit: {
          type: str[0],
          length: Number(str[1]),  
        }
      })
    }
    if(this.refs.animaloption){
      str = this.refs.animaloption.value;
      this.setState({animal: str})
    }
  }

  // Decides which icon to use
  unitTypeHandler(unit) {
    if(unit === 'month') {
      return <Moon />;
    }
    return <Candle />
  }

// MODAL ON/OFF on click
  updateModal(e) {
    // avoids exiting on modal-content and input
    if(e.target.className === 'modal-content' || e.target.nodeName === 'INPUT'){
      return;
    }

    var curr;

    // MAIN AGE INPUT
    if(this.state.modal){
      curr = {type: this.state.unit.type, length: this.state.unit.length, _id: this.state.unit._id, _content: ''};
      this.setState({
        modal: false,
        unit: curr,
      })

      // CONTENT INPUT
    } else {
      curr = {type: this.state.unit.type, length: this.state.unit.length, _id: Number(e.target.id), _content: ''};
      this.setState({
        modal: true,
        unit: curr,
      })
    }
  }

  // animal functions
  animalCalc(animal, age){
    var cnt, mass;
    if(animal === 'chicken') {
      mass = age*41;
      cnt = (mass/2).toFixed(2);
    }
    if(animal === 'pig') {
      mass = age*60;
      cnt = (mass/144).toFixed(2);;
    }
    if(animal === 'cow') {
      mass = age*59;
      cnt = (mass/1400).toFixed(4);
    }
    return [mass, cnt];
  }
// RENDERS ALL UNITS AND THEIR STATUS
  eachSQR() {
    var sqr = [];
    var age = this.state.age
    var animal = this.state.animal;
    var numofChickens  = this.animalCalc('chicken', age);
    var numofPigs = this.animalCalc('pig', age);
    var numofCows = this.animalCalc('cow', age);
    var unfilled = this.state.unit.type;
    var text = "If you live in the U.S., you've probably eaten " + numofChickens[0] + " lbs of chicken, " + numofPigs[0] + " lbs of pork, and " + numofCows[0] + "lbs of beef. To put this in perspective, you've eaten " + numofChickens[1] + " chickens, " + numofPigs[1] + " pigs, and " + numofCows[1] + " cows! Holy " + animal.toUpperCase() +"!";

    sqr.push(<TextBox display={this.state.age > 0 ? 'contextOn':'contextOff'} age={this.state.age} data={this.state.unit} text={text}/>)
    sqr.push(<select ref="animaloption" className={this.state.age > 0 ? 'contextOn':'contextOff'} onChange={this.getUnit.bind(this)}><option value="chicken">chicken</option><option value="pig">pig</option><option value="cow">cow</option></select> )

    var numOfAnimals = this.animalCalc(animal, age);

    for(var i = 0; i < Math.floor(numOfAnimals[1]); i++) {
      if(i < Math.floor(numOfAnimals[1])){
        sqr.push(<Square key={i} id={i} lived={unfilled} image={animal} modal={this.updateModal.bind(this)}/>)
      } else {
         // sqr.push(<Square key={i} id={i} lived={unfilled} modal={this.updateModal.bind(this)}/>)
      }
    }
    return sqr
  }

  eachBday() {
    var sqr = [];
    var obj = this.unitTypeHandler(this.state.unit.type);
    var unfilled = this.state.unit.type;
    sqr.push(<TextBox display={this.state.age > 0 ? 'contextOn':'contextOff'} age={this.state.age} data={this.state.unit} plural={this.pluralize}/>)
    for(var i = 0; i < this.state.avglife*this.state.unit.length; i++) {
      if(i < this.state.age*this.state.unit.length){
        sqr.push(obj)
      } else {
        // sqr.push(<Square key={i} id={i} lived={unfilled} modal={this.updateModal.bind(this)}/>)
      }
    }
    return sqr
  }
  
  eachPerson() {
    var sqr = [];
    var pplMetYear = 3*365;

    var strText = "You have probably met and impacted " + Math.floor(pplMetYear/this.state.unit.length) + " people every " + this.state.unit.type + " you've lived. That comes to " + pplMetYear*this.state.age + " people so far in your life without realizing it. Each icon represents 10 people";
    var filled = this.state.unit.type + 'Fill';
    var unfilled = this.state.unit.type;
    sqr.push(<TextBox text={strText} display={this.state.age > 0 ? 'contextOn':'contextOff'} age={Math.floor(this.state.age)} data={this.state.unit} plural={this.pluralize}/>)

     
     if(this.state.age > 0){
    for(var i = 0; i < Math.round(pplMetYear/this.state.unit.length)/10; i++) {
        sqr.push(<Person key={i.toString()} id={i} lived={unfilled} modal={this.updateModal.bind(this)} />)
      } 
      // else {
        // sqr.push(<Square key={i} id={i} lived={unfilled} modal={this.updateModal.bind(this)}/>)
      // }
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
        </select>
        <h1>A Picture of Your Life: One Accomplishment at a Time</h1>
       
       
         <div className={this.state.modal?'modalOn':'modalOff'} onClick={this.updateModal.bind(this)}>
          <ModalContent data={this.state.animal} onHandleEnter={this._handleKeyPress.bind(this)} onContent={this.onChangeValue.bind(this)} unitType={this.state.unit} />c
         </div>
           
        
        <div id="outerPortrait">
          <div id="innerPortrait">
            <div className="inner">
              <div className="chart">
                <div className="inner">
                  {this.eachBday()}
                </div>
              </div>
            
 
              <br />
    
              <div  className="chart">
              {this.eachPerson()}
              </div>
          
              <br />

              <div  className="chart">
              {this.eachSQR()}
              </div>
              
              <br />
              <div  className={this.state.age > 0 ? 'contextOff':'contextOn'}>
                <p>Ever feel like you're stuck in a box? You're just moving from one frame to another and not sure where you're heading.</p>
                <img className="" src={require('./jack.png')} alt="jack" />
                <p>Time to get some perspective. Enter your age above.</p>
                <img className="" src={require('./jackinthebox.png')} alt="jackinthebox" />
                
         
              </div>
              <div  className={this.state.age > 0 ? 'contextOn':'contextOff'}>
                <p>Want to see more? Don't agree with these numbers? Tell us more about yourself and we'll visualize your life, one accomplishment at a time.</p>
                <a href="#"><button>Click Here</button></a>
              </div>
              <br />
            
          </div>
          </div>
        </div>
    
      </div>
    )
  }
} 


export default App;
