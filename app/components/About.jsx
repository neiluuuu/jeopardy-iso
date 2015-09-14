/** @jsx React.DOM */

var React = require("react/addons");
var Link = require('react-router').Link;

var About = React.createClass({
    render: function () {
        return (
            <div>
                <p>
                    <div>Github:</div>
                    <a href="https://github.com/kenfehling/isomorphic-react-example">
                        kenfehling/isomorphic-react-example
                    </a>
                </p>
                <p>
                    <div>forked from:</div>
                    <a href="https://github.com/DavidWells/isomorphic-react-example">
                        DavidWells/isomorphic-react-example
                    </a>
                </p>
            </div>
        )
    }
});

module.exports = About;