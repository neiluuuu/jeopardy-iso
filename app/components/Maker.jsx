/** @jsx React.DOM */

var React = require('react/addons');
var Router = require("react-router");
var Reflux = require("reflux");
var RouteHandler = Router.RouteHandler;
var axios = require("axios");

var defaultBoard = {"1":{"Category":"","Column":1,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}},"2":{"Category":"","Column":2,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}},"3":{"Category":"","Column":3,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}},"4":{"Category":"","Column":4,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}},"5":{"Category":"","Column":5,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}},"6":{"Category":"","Column":6,"200":{"Value":200,"Question":"","Answer":""},"400":{"Value":400,"Question":"","Answer":""},"600":{"Value":600,"Question":"","Answer":""},"800":{"Value":800,"Question":"","Answer":""},"1000":{"Value":1000,"Question":"","Answer":""}}};

var Question = React.createClass({
  getInitialState: function() {
    return {question: this.props.question.Question, answer: this.props.question.Answer};
  },
  handleChangeQuestion: function(event) {
    this.setState({question: event.target.value});
  },
  handleChangeAnswer: function(event) {
    this.setState({answer: event.target.value});
  },
  componentDidMount: function() {
    /**
     * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
     */
    var tag = this.props.tag;
    var self = this;
    $(function() {
        function reposition() {
            var modal = $(this),
                dialog = modal.find('.modal-dialog');
            modal.css('display', 'block');
            
            // Dividing by two centers the modal exactly, but dividing by three 
            // or four works better for larger screens.
            dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
        }
        // Reposition when a modal is shown
        $('.modal').on('show.bs.modal', reposition);
        $('#'+tag).on('shown.bs.modal', function (e) {
          this.addEventListener('keyup', self.handleEnter);
        });
        // Reposition when the window is resized
        $(window).on('resize', function() {
            $('.modal:visible').each(reposition);
        });
        $('#'+tag).on('hide.bs.modal', function (e) {
          self.handleClickAway();
          this.removeEventListener('keyup', self.handleEnter);
        });
    });
  },
  handleSubmit: function() {
    this.handleClickAway();
    $('#'+this.props.tag).modal('hide');
  },
  handleClickAway: function() {
    this.props.question.Question = document.getElementById('question'+this.props.tag).value;
    this.props.question.Answer = document.getElementById('answer'+this.props.tag).value;
  },
  render: function() {
    return (
      <div className="modal fade question-modal" id={this.props.tag} tabIndex="-1" role="dialog" aria-labelledby={this.props.tag+"Label"}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor={'question'+this.props.tag}>Question</label>
                  <textarea type="text" className="form-control" id={'question'+this.props.tag} placeholder="Question in form of Answer" value={this.state.question} onChange={this.handleChangeQuestion}></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor={'answer'+this.props.tag}>Answer</label>
                  <textarea type="text" className="form-control" id={'answer'+this.props.tag} placeholder="Answer in form of Question" value={this.state.answer} onChange={this.handleChangeAnswer}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      );
  }
});

var CategoryTitle = React.createClass({
  getInitialState: function() {
    return {value: this.props.title.Category};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  componentDidMount: function() {
    /**
     * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
     */
     var tag = this.props.tag;
     var self = this;
    $(function() {
        function reposition() {
            var modal = $(this),
                dialog = modal.find('.modal-dialog');
            modal.css('display', 'block');
            
            // Dividing by two centers the modal exactly, but dividing by three 
            // or four works better for larger screens.
            dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
        }
        // Reposition when a modal is shown
        $('#'+tag).on('show.bs.modal', reposition);
        $('#'+tag).on('shown.bs.modal', function (e) {
          this.addEventListener('keyup', self.handleEnter);
        });
        // Reposition when the window is resized
        $(window).on('resize', function() {
            $('.modal:visible').each(reposition);
        });
        $('#'+tag).on('hide.bs.modal', function (e) {
          self.handleClickAway();
          this.removeEventListener('keyup', self.handleEnter);
        });
    });
  },
  handleSubmit: function() {
    this.props.title.Category = document.getElementById('category'+this.props.tag).value;
    this.props.func(this.state.value);
    $('#'+this.props.tag).modal('hide');
  },
  handleClickAway: function() {
    this.props.title.Category = document.getElementById('category'+this.props.tag).value;
    this.props.func(this.state.value);
  },
  handleEnter: function(e) {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  },
  render: function() {
    return (
      <div className="modal fade question-modal" id={this.props.tag} tabIndex="-1" role="dialog" aria-labelledby={this.props.tag+"Label"}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor={'question'+this.props.tag}>Category</label>
                <input maxLength="25" type="text" className="form-control" id={'category'+this.props.tag} placeholder="Category Name" value={this.state.value} onChange={this.handleChange}></input>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" id={this.props.tag+'-btn'} onKeyPress={this.handleEnter} onClick={this.handleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      );
  }
});


var Box = React.createClass({
  render: function() {
    var name='box';
    var value = '$'+this.props.question.Value;
    var modalTag = this.props.question.Value.toString() + "-" + this.props.column.toString();
    var board = this.props.board;
    return (
      <li className={name}>
        <a href='javascript:' className='value' data-toggle="modal" data-target={'#'+modalTag}>{value}</a>
        <Question tag={modalTag} question={this.props.question} board={board}/>
      </li>)
  }
});


var Category = React.createClass({
  getInitialState: function() {
    return {
      title: this.props.title.Category
    };
  },
  handleChange: function(newTitle) {
    this.setState({title: newTitle});
  },
  render: function() {
    var modalTag = 'category' + "-" + this.props.column.toString();
    var board = this.props.board;
    return (
      <li className='box category'>
        <a href='javascript:' className='value' data-toggle="modal" data-target={'#'+modalTag}>{this.state.title}</a>
        <CategoryTitle tag={modalTag} title={this.props.title} func={this.handleChange} board={board}/>
      </li>);
  }
});


var Column = React.createClass({
  render: function() {
    var handleQuestion = this.props.handle;
    var name = 'column';
    if (this.props.first) {
      name+=' column-first'
    }
    var board = this.props.board;
    return (
      <li style={{display: 'inline-block', width: '16.66666666%', height: '100%', float: 'left'}}>
        <ul className={name} style={{listStyleType: 'none'}}>
          <Category title={this.props.questions} column={this.props.questions.Column} board={board}/>
          <Box question={this.props.questions['200']} column={this.props.questions.Column} board={board}/>
          <Box question={this.props.questions['400']} column={this.props.questions.Column} board={board}/>
          <Box question={this.props.questions['600']} column={this.props.questions.Column} board={board}/>
          <Box question={this.props.questions['800']} column={this.props.questions.Column} board={board}/>
          <Box question={this.props.questions['1000']} column={this.props.questions.Column} board={board}/>
        </ul>
      </li>
    );
  }
});

var Submission = React.createClass({
  render: function() {
    return (
    <div className="modal fade question-modal" id='game-submit' tabIndex="-1" role="dialog" aria-labelledby="GameSubmitLabel">
      <div className="modal-dialog" style={{color: 'black'}}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Game Submitted!</h4>
          </div>
          <div className="modal-body">
            <p>Your game is available at <a href={'./game/'+this.props.id}>here</a></p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default">OK</button>
          </div>
        </div>
      </div>
    </div>);
  }
});


var Board = React.createClass({
  getInitialState: function() {
    return {board: defaultBoard, submitted: false, id: null};
  },
  handleSubmit: function() {
    var self = this;
    axios.post('/maker', this.state.board)
      .then(function (res) {
        self.setState({submitted: true, id: res.data.count});
        $('#game-submit').modal('show');
      });
  },
  render: function() {
    var board = this.state.board;
    var boardClass = 'container board';
    var inside;
    if (!(this.state.submitted)) {
      inside = (<ul className='inlineColumns' style={{listStyleType: 'none', height: '100%'}}>
            <Column questions={board['1']} first={true} board={board}/>
            <Column questions={board['2']} board={board}/>
            <Column questions={board['3']} board={board}/>
            <Column questions={board['4']} board={board}/>
            <Column questions={board['5']} board={board}/>
            <Column questions={board['6']} board={board}/>
          </ul>);
    }
    return (
      <div>
        <div className={boardClass} style={{height: 'calc(100vh - 50px)'}}>
          {inside}
        </div>
        <button className='btn btn-lg btn-primary' onClick={this.handleSubmit}>Submit</button>
        <Submission id={this.state.id}/>
      </div>
    );
  }

});

module.exports = Board;