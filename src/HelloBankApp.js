var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;


var HelloBankApp = React.createClass({
  getInitialState: function() {
    return {filter: {
              minPrice: 300000,
              maxPrice: 350000
              }
    };
  },  
  render: function(){
    return(
      <div className="container app"> 
          { React.cloneElement(this.props.children, {
            filter: this.state.filter
          })}
      </div>
    );
  }
});

module.exports = HelloBankApp;