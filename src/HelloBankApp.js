var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;


var HelloBankApp = React.createClass({
  render: function(){
    return(
       <div className="container app"> 
        {this.props.children}   
      </div>
    );
  }
});

module.exports = HelloBankApp;