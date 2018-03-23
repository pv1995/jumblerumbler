import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody,CardTitle, CardText, Row, Col, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './App.css';

class App extends Component {
 constructor(){
   super();
   this.QuestionRender = this.QuestionRender.bind(this);
   this.JumbledGrid = this.JumbledGrid.bind(this);
   this.toggle = this.toggle.bind(this);
   this.state = {
     ArrayOfQuestions:[
       "Winter is coming","Holocaust is near","World is a mysterious place","i love lemonade","Chennai is hot and humid", "Bangalore is pleasant",
       "Vladmir Putin is the richest politician","Can virat overtake sachin ?", "Survival of the fittest","Hitler lost world war 2", "Hire me"
     ],
     popoverOpen: false,
     AnswerGrid:[],
     QuestionGrid:[],
     currentQuestion:0
   }
 }
 toggle() {
  this.setState({
    popoverOpen: !this.state.popoverOpen
  });
}
 HandleJumbledGridClicks(ClickedWord){
   console.log(ClickedWord,'$$$')
   var AnswerGrid = this.state.AnswerGrid;
   var QuestionGrid = this.state.QuestionGrid;
   AnswerGrid.push(ClickedWord)
   this.setState({AnswerGrid});
   var found = QuestionGrid.indexOf(ClickedWord);
   while (found !== -1) {
   QuestionGrid.splice(found, 1);
   found = QuestionGrid.indexOf(ClickedWord);
   if(QuestionGrid.length === 0){
     ;
   }
}
}
nextQuestion(){
    console.log(this.state)

  if(this.state.currentQuestion < this.state.ArrayOfQuestions.length-1){
    var currentQuestion = this.state.currentQuestion + 1;
    this.setState({AnswerGrid:[]})
    this.setState({currentQuestion})
  }else{
    this.toggle()
  }
  
}
refreshPage(){
  //location.reload();
  this.setState({AnswerGrid:[]})
}
JumbledGrid(){
  var words = [];
  if(this.state.QuestionGrid.length){
    ;
  }
  else if(this.state.AnswerGrid.length === this.state.ArrayOfQuestions[this.state.currentQuestion].split(' ').length){
    var AnswerGrid = this.state.AnswerGrid.toString();
    var CheckingString = this.state.ArrayOfQuestions[this.state.currentQuestion].split(' ').toString();
    if(AnswerGrid === CheckingString){
      return <div>
        <Button id="Popover1" style={{background:'green !important', width:'100%'}} className='success-button' onClick={()=>this.nextQuestion()}>Correct</Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
          <PopoverHeader>Game Over</PopoverHeader>
          <PopoverBody>Congrats!I hope you enjoyed
          </PopoverBody>
    </Popover></div>
    }else{
      return <Button style={{background:'red !important', width:'100%'}} className='danger-button' onClick={()=>this.refreshPage()}>Incorrect</Button>
    }
  }
  else{
    words = this.state.ArrayOfQuestions[this.state.currentQuestion].split(' ');
    this.setState({QuestionGrid:words})
  }
   
   var QuestionGrid = this.state.QuestionGrid.map((i,index)=>{
     return <Button  onClick={()=>this.HandleJumbledGridClicks(i)}>{i}</Button>
   })
   return this.Shuffle(QuestionGrid)
  }
 AnswerRender(){
   var AnswerGrid = this.state.AnswerGrid.map((i)=>{
     return <Button>{i}</Button>
   })
   return AnswerGrid
IY }
 QuestionRender(){
   return this.state.ArrayOfQuestions[this.state.currentQuestion]
 }
 Shuffle(QuestionGrid) {
  let ctr = QuestionGrid.length;
  let temp;
  let index;
  while (ctr > 0) {
  index = Math.floor(Math.random() * ctr);
  ctr--;
  temp = QuestionGrid[ctr];
  QuestionGrid[ctr] = QuestionGrid[index];
  QuestionGrid[index] = temp;
  }
  return QuestionGrid;
}
 render() {
  return (
    <div className="App">
      <Row>
        <Col className='col-md-6 offset-3 col-sm-12'>
          <Card className='game-area' body inverse color="warning">
            <CardHeader className='game-header'>Pick the words in order</CardHeader>
              <CardBody>
                <CardTitle className='create-height'>{this.QuestionRender()}</CardTitle>
                <hr/>
                <CardText className='create-height'>
                  {this.AnswerRender()}
                </CardText>
                
              </CardBody>
            <CardFooter className='create-height'>
              {this.JumbledGrid()}
            </CardFooter>
          </Card>
        </Col>
      </Row>
      
    </div>
    );
  }
}

export default App;
