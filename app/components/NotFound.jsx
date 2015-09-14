/** @jsx React.DOM */

var React = require('react/addons');

var NotFound = React.createClass({
    render: function () {
        return (
            <div>
                404: Page not found
            </div>
        )
    }
});

module.exports = NotFound;