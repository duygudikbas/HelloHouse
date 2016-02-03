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
    return {estates: [], favorite : false};
  },

  componentDidMount: function() {
    console.log("called by : ");
    console.log(this.props.location.pathname);
    var index = this.props.location.pathname.indexOf("Favorites");
    console.log("indexOf: "+ index);

    if (index >= 0){
      console.log("favorites : true");
      this.setState({favorite : true});
    }else {
      console.log("favorites : false");
      this.setState({favorite : false});
    }
    console.log("this.state");
    console.log(this.state);

    if (index == 0){
      //favorites
      $.get("http://localhost:3000/favorites", function(favorites) {
        var urlFavorites = "http://estates-api.herokuapp.com/estates?id=";
        var favList = favorites.join('&id=');
        console.log("favList : "+favList);
        urlFavorites += favList;
        $.get(urlFavorites, function(data) {
          this.setState({estates: data});
        }.bind(this), 'json');
      }.bind(this), 'json');
    }else {
      var url = "http://estates-api.herokuapp.com/estates";
      $.get(url, function(data) {
      this.setState({estates: data});
    }.bind(this), 'json');
    }
  },

  filter : function(estate){
    if (this.props.filter.minPrice > 0 && this.props.filter.minPrice > estate.price){ return false; };
    if (this.props.filter.maxPrice > 0 &&this.props.filter.maxPrice < estate.price){ return false; };

    if ((this.props.filter.location !== null && this.props.filter.location.length > 0) && (estate.location.indexOf(this.props.filter.location) === -1)){ return false; };

        // var filter = { 

        //         minRoom :minRoom,
        //         maxRoom : maxRoom,
        //         minSurface : minSurface,
        //         maxSurface : maxSurface,
        //         garden : garden,
        //         garage : garage,
        //         pool : pool, 
        //         location : location,
        //         house : house,
        //         appartment : appartment
        //     };


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