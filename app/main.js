/** @jsx React.DOM */

var React = require('react/addons');
var Router = require("react-router");
var routes = require("./routes/routes.jsx");

var mountNode = document.getElementById("app");

//React.render(new ReactApp({}), mountNode);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, mountNode);
});
