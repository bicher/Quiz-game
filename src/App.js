import React, { Component } from 'react';
import './App.css';
import Question from './Components/Question';
import jsonFile from './Questions.js';

class App extends Component {
  state = {
    allQuestions: [],
    counter: 1,
    answers: [],
    score: []
  }
  componentDidMount() {
    this.setState({ allQuestions: jsonFile });
    if (this.state.allQuestions.length > 0) {
      document.getElementById("prev").disabled = true;
    }
  }

  render() {
    if (this.state.allQuestions.length > 0) {
      return (
        <div className="App">
          <Question questions={this.state.allQuestions[this.state.counter - 1]} getAnswer={this.getAswerFromQuestion.bind(this)}/>
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-lg-offset-1 mx-auto">
                <button className="btn btn-secondary float-left" id="prev" onClick={this.prev.bind(this)}>Prev</button>
                <button className="btn btn-secondary float-right" id="next" onClick={this.next.bind(this)}>Next</button>
                {this.state.score.map(s => <div className="text-center">Your Score is: {s.score}</div>)}
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="App">
        </div>
      )
    }

  }
  next() {
    if (this.state.counter < this.state.allQuestions.length) {
      this.setState({ counter: this.state.counter + 1 });
      document.getElementById("prev").disabled = false;
      if (this.state.counter === this.state.allQuestions.length - 1) {
        document.getElementById("next").innerHTML = "Done";
      }
    }
    else {
      let allQuestions = this.state.allQuestions;
      let allAnswers = this.state.answers;
      let sumOfCorrect = allAnswers.filter((answer, i) => answer.id == allQuestions[i].id && answer.answer == allQuestions[i].correct);
      let score = (100 / allQuestions.length) * sumOfCorrect.length;
      let newScore = [{ score: score }];
      this.setState({ score: newScore });

    }
  }

  prev() {
    if (this.state.counter > 1) {
      this.setState({ counter: this.state.counter - 1 });
      document.getElementById("next").innerHTML = "Next";
    }
    if (this.state.counter === 2) {
      document.getElementById("prev").disabled = true;
    }
  }
  
  getAswerFromQuestion(answer, i) {
    let newAnswers = this.state.answers.slice();
    let ifAnswerExist = newAnswers.find(a => a.id == i);
    if (ifAnswerExist) {
      let index = newAnswers.indexOf(ifAnswerExist);
      newAnswers[index].answer = answer;
    }
    else {
      newAnswers.push({ id: i, answer: answer });
    }
    this.setState({ answers: newAnswers });
  }
}

export default App;
