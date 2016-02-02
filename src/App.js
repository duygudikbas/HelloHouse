var React = require('react');
var ReactDOM = require('react-dom');
var Message = require('react-message');
var Login = require('./Login.js');
var Welcome = require('./Welcome.js');
var Link = require('react-router').Link;
var $= require('jquery');

var NavBar = React.createClass({
  
  render: function() {
    return (
    <nav className="navbar navbar-inverse" role="navigation" id="navigation">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="index.html">Home</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  <li className="active"><Link to="/Main">Home</Link></li>
                  <li><Link to="/Accounts">Account List</Link></li>
                  <li><Link to="/CreateAccount">Create Account</Link></li>
                  <li><Link to="/transferList">Transfer List</Link></li>
                  <li><Link to="/newTransfer">New Transfer</Link></li>&nbsp;&nbsp; 
                </ul>
            </div>
        </div>
    </nav>
    );
  }
});


var App = React.createClass({
  getInitialState: function() {
    return {accounts:[]};
  },
  componentDidMount: function(){
    $.get({
      url: "http://localhost:3000/accounts",
       contentType: "application/json",
       success: function(data) {
            this.setState({accounts: data});
       }.bind(this)
    });
  },
  render: function() {
    return (
     <div className="container-fluid">
          <NavBar />
          { React.cloneElement(this.props.children, {
             accounts: this.state.accounts
          })}
      </div>  
    );
  }
});

module.exports = App;