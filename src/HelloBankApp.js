var React = require('react');
var ReactDOM = require('react-dom');
var Message = require('react-message');
var Advice = require('./Advice.js');
var Buy = require('./Buy.js');
var Compare = require('./Compare.js');
var BasicSearch = require('./Search.js');
var Link = require('react-router').Link;
var $= require('jquery');



var Choices =  React.createClass({
  getInitialState: function() {
      return { showPage: this.props.initialChecked };
  },
  handleHidePage: function() {
      this.props.callbackParent(!this.props.initialChecked);
  },
  render: function(){
    return(
        <div className="jumbotron jumbotron_main"> 
       <BasicSearch/>
        <div className="text-center">
            <div>
                <h2>You Dream ! We will make it true !</h2>
                            <div className="signature">By BNP PARIBAS FORTIS</div>
                
            </div>
            <div className="list-group list-group-horizontal">
              <Link to="Advice"  className="list-group-item" onClick={this.handleHidePage}>Get Advice</Link>
              <Link to="Buy" className="list-group-item active" onClick={this.handleHidePage}>Buy Property</Link>
              <Link to="Compare" className="list-group-item" onClick={this.handleHidePage}>Compare Loan / Price</Link>
            </div>
          </div>
        </div> 
    );
  }
});

var HelloBankApp = React.createClass({
  getInitialState: function() {
      return { show: true };
  },
  handleHideShow: function(hideShow){
    console.log(hideShow);
    this.setState({show: hideShow});      
  },
  render: function(){
    console.log(this.state.show);
    return(
       <div className="container">   
        <div>

         </div>
         {this.state.show ? <Choices initialChecked = {this.state.show} callbackParent = {this.handleHideShow}/> : null} 
         { this.props.children } 
      </div>
    );
  }
});

module.exports = HelloBankApp;