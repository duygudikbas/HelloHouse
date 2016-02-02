var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;


var HelloBankApp = React.createClass({
  getInitialState: function() {
    return {filter: {
              minPrice: null,
              maxPrice: null,
              minRoom :null,
              maxRoom : null,
              minSurface : null,
              maxSurface : null,
              garden : true,
              garage : true,
              pool : true, 
              location : null,
              house : true,
              appartment : true
          }
    };
  },  
  initiateFilter : function (filter){
    this.setState({filter:filter});
  },

  render: function(){
    return(
      <div className="container app"> 
          { React.cloneElement(this.props.children, {
            filter: this.state.filter, initiateFilter: this.initiateFilter
          })}
      </div>
    );
  }
});

module.exports = HelloBankApp;