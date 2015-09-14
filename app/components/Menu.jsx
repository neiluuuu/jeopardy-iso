/** @jsx React.DOM */

var React = require('react/addons');
var Link = require('react-router').Link;

var Menu = React.createClass({

    render: function () {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <Link className="navbar-brand" to='/'>Jeopardy!</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                        <li><Link to="/maker">Make Your Own Game</Link></li>
                      </ul>
                      <p className='nav navbar-right navbar-text'>Neil Argade</p>
                    </div>
                </div>
            </nav>
        )
    }
});

module.exports = Menu;