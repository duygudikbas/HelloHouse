var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link


var AResult = React.createClass({
render: function(){
    var price = this.props.estate.price;
    if (price) {price += " €"};
    return(
      <Link to="/PropertyDetail" estate={this.props.estate}>
        <li className="liResultList">
          <p className="location"> {this.props.estate.location} </p>
          <p className="price">&nbsp;{price}</p>
          <img className="imgResultList" src={this.props.estate.image}/>
        </li>
      </Link>
    );
  }
});

var ResultList = React.createClass({
  getInitialState: function() {
    return {estates: [
    ]};
  },

  componentDidMount: function() {
    var url = "http://estates-api.herokuapp.com/estates";
    $.get(url, function(data) {
      this.setState({estates: data});
    }.bind(this), 'json');
  },

  render: function(){
    console.log(this.state.estates);
       var resultElems = this.state.estates.map(function(estate) {
      return (
        <AResult key={estate.id} estate={estate} />
       );
    }); 
    return(
      <div className="container">        
         <h1>Propositions</h1>
         <ul className="ulResultList">
         {resultElems }
         </ul> 
      </div>
    );
  }
});

module.exports = ResultList;