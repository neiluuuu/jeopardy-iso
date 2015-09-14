/** @jsx React.DOM */

var React = require("react/addons");
var Link = require('react-router').Link;
var axios = require('axios');
var _ = require('lodash');

var Home = React.createClass({
    getInitialState: function() {
        return {games: []};
    },
    componentDidMount: function() {
        axios.get('/getboards').then(function (res) {
          this.setState({games: res.data});
        }.bind(this));
    },
    render: function () {
        var games;
        games = _.map(this.state.games, function (obj, key){
            return <tr key={key}><td><a href={"/game/"+obj}>{obj}</a></td></tr>
        });
        console.log(games);
        return (
            <div className='container'>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr><th>GameID</th></tr>
                        </thead>
                        <tbody>
                            {games}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
});

module.exports = Home;