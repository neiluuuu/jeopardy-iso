/** @jsx React.DOM */

var React = require('react/addons');
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var axios = require("axios");

var lastPressed = (new Date).getTime();
var waitTime = 250;
var defaultBoard = {"1":{"Category":"","Column":1,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}},"2":{"Category":"","Column":2,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}},"3":{"Category":"","Column":3,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}},"4":{"Category":"","Column":4,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}},"5":{"Category":"","Column":5,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}},"6":{"Category":"","Column":6,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}}};

var Question = React.createClass({
  getInitialState: function() {
    return {question: true};
  },
  keyDown: function(e) {
    if (e.keyCode == 39 || e.type == 'click') {
      if (((new Date).getTime() - lastPressed) > waitTime) {
        lastPressed = (new Date).getTime();
        if (this.state.question) {
          this.setState({question: false});
        }
        else if (!this.state.question) {
          this.setState({question: true})
          this.props.handle();
        }
      }
    }
  },
  componentDidMount: function() {
    window.addEventListener('keydown', this.keyDown);
  },
  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.keyDown);
  },
  render: function() {
    if (this.state.question) {
      return (<div style={{maxWidth: '80%'}}><div className='question'><p>{this.props.question.Question}</p></div><button className='btn btn-primary btn-lg next-btn' onClick={this.keyDown}>Next</button></div>);
    }
    else if (!this.state.question) {
      return <div style={{maxWidth: '80%'}}><div className='question'><p>{this.props.question.Answer}</p></div><button className='btn btn-primary btn-lg next-btn' onClick={this.keyDown}>Next</button></div>;
    }
  }
});


var Box = React.createClass({
  getInitialState: function() {
    return {
      chosen: false
    };
  },
  handleClick: function() {
    lastPressed = (new Date).getTime();
    this.setState({chosen: true});
    this.props.handleQuestion(this.props.question);
  },
  render: function() {
    var name='box';
    var value = '$'+this.props.question.Value;
    if (this.state.chosen) {
      return <li className={name}></li>
    }
    return (<li className={name}><a href='javascript:' className='value' onClick={this.handleClick}>{value}</a></li>)
  }
});


var Category = React.createClass({
  render: function() {
    return (<li className='box category'>{this.props.title}</li>);
  }
});


var Column = React.createClass({
  render: function() {
    var handleQuestion = this.props.handle;
    var name = 'column';
    if (this.props.first) {
      name+=' column-first'
    }
    return (
      <li style={{display: 'inline-block', width: '16.66666666%', height: '100%', float: 'left'}}>
        <ul className={name} style={{listStyleType: 'none'}}>
          <Category title={this.props.questions.Category}/>
          <Box question={this.props.questions['200']} handleQuestion={handleQuestion}/>
          <Box question={this.props.questions['400']} handleQuestion={handleQuestion}/>
          <Box question={this.props.questions['600']} handleQuestion={handleQuestion}/>
          <Box question={this.props.questions['800']} handleQuestion={handleQuestion}/>
          <Box question={this.props.questions['1000']} handleQuestion={handleQuestion}/>
        </ul>
      </li>
    );
  }
});


var Board = React.createClass({
  getInitialState: function() {
    return {show: true, lastQuestion: '', board: defaultBoard};
  },
  handleQuestion: function (question) {
    this.setState({show: false, lastQuestion: question});
  },
  handleExitQuestion: function() {
    this.setState({show: true});
  },
  componentDidMount: function() {
    id = window.location.pathname.split('/');
    axios.get('/board/'+id[2]).then(function (res) {
      this.setState({board: res.data.board});
    }.bind(this));
  },
  render: function() {
    var boardClass;
    var questionClass;
    if (this.state.show) {
      boardClass = 'container board';
      questionClass = 'container question-wrapper hidden';
    }
    else {
      boardClass = 'container board hidden';
      questionClass = 'container question-wrapper';
    }
    var inside;
    if (this.state.board == defaultBoard) {
      inside = <div className='loading-state-board'></div>
    }
    else if (this.state.board == null) {
      inside = <div>Cannot find game</div>;
    }
    else {
      inside = (<ul className='inlineColumns' style={{listStyleType: 'none', height: '100%'}}>
        <Column questions={this.state.board['1']} handle={this.handleQuestion} first={true}/>
        <Column questions={this.state.board['2']} handle={this.handleQuestion}/>
        <Column questions={this.state.board['3']} handle={this.handleQuestion}/>
        <Column questions={this.state.board['4']} handle={this.handleQuestion}/>
        <Column questions={this.state.board['5']} handle={this.handleQuestion}/>
        <Column questions={this.state.board['6']} handle={this.handleQuestion}/>
      </ul>);
    }
    return (
      <div>
        <div className={boardClass}>
          {inside}
        </div>
        <div className={questionClass} style={{maxWidth: '100%', height: '98vh', padding: '2vh 0'}}>
          <Question question={this.state.lastQuestion} handle={this.handleExitQuestion}/>
        </div>
      </div>
    );
    }
  });

module.exports = Board;