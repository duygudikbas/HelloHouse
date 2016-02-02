var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link

var AResult = React.createClass({
render: function(){
    var urlTo = "/PropertyDetail/"+ this.props.estate.id;
    var price = this.props.estate.price;
    if (price) {price += " €"};
    return(
      <Link to={urlTo} >
        <li className="liResultList">
          <p className="location"> {this.props.estate.location} </p>
          <p className="price">&nbsp;{price}</p>
          <img className="imgResultList" src={this.props.estate.image[0]}/>
        </li>
      </Link>
    );
  }
});


var Warning = React.createClass({
  render: function(){
    return (
        <p>May be could you adapt your <Link to="/Search" >Search</Link></p>
      );}
  });

var NumberWarning = React.createClass({
  render: function(){
    var number = this.props.numberWarning;
    var warning = "";

    return(
      <div>
        <p>Number of results : {number}</p>
        {this.props.numberWarning > 50 ? <Warning/> : null}
      </div>
    );
  }
});

var ResultList = React.createClass({
  getInitialState: function() {
    return {estates: []};
  },

  componentDidMount: function() {
    var url = "http://estates-api.herokuapp.com/estates";
    $.get(url, function(data) {
      this.setState({estates: data});
    }.bind(this), 'json');
  },

  filter : function(estate){
    if (this.props.filter.minPrice > estate.price){ return false; };
    if (this.props.filter.maxPrice < estate.price){ return false; };
    return true;
  },

  render: function(){
    console.log(this.state.estates);
    var filteredEstates = this.state.estates.filter(this.filter);
    var numberWarning = filteredEstates.length;
    var resultElems = filteredEstates.map(function(estate) {
      return (
        <AResult key={estate.id} estate={estate} />
       );
    }); 
    return(
      <div className="container">        
         <h1>Propositions</h1>
         <NumberWarning numberWarning = {numberWarning}/>
         <ul className="ulResultList">
         {resultElems }
         </ul> 
      </div>
    );
  }
});

module.exports = ResultList;