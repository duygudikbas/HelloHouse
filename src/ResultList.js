var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link

var RemoveFromFavoritesButton = React.createClass({
  removeFromFavorites : function(event){
    event.preventDefault();
    var urlRemove = "http://localhost:3000/favorites/" + this.props.id;
    $.ajax({
        url: urlRemove,
        type: 'DELETE',
        success: function(result) {
            // Do something with the result
        }
    });
  },

  render: function(){
    return(
       <button type="button" className="btn btn_default" onClick={this.removeFromFavorites}>Remove from Favourites</button>
      )
  }
});

var AResult = React.createClass({
render: function(){
    var index = this.props.favFlag;
    var urlTo = "/PropertyDetail/"+ this.props.estate.id;
    var price = this.props.estate.price;
    if (price) {price += " €"};
    return(
      <Link to={urlTo} >
        <li className="liResultList">
          <p className="location"> {this.props.estate.location} </p>
          <p className="price">&nbsp;{price}</p>
          <img className="imgResultList" src={this.props.estate.image[0]}/>
          {index >= 0 ? <span className="removeFromFavorites"><RemoveFromFavoritesButton id={this.props.estate.id}/></span> : null}
        </li>
      </Link>
    );
  }
});

var Warning = React.createClass({
  render: function(){
    return (
        <p>The list contains too many results. <Link to="/Search" id="refineCriteriaAction">Please refine your criteria</Link></p>
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
    var index = this.props.location.pathname.indexOf("Favorites");

    if (index >= 0){
      this.setState({favorite : true});
    }else {
      this.setState({favorite : false});
    }

    if (index >= 0){
      //favorites
      $.get("http://localhost:3000/favorites", function(favorites) {
        var urlFavorites = "http://estates-api.herokuapp.com/estates?id=";
        var favList = favorites.map(function(favory){
          return favory.id;
        }).join('&id=');
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
    var index = this.props.location.pathname.indexOf("Favorites");
    var filteredEstates = this.state.estates.filter(this.filter);
    var numberWarning = filteredEstates.length;
    var resultElems = filteredEstates.map(function(estate) {
      return (
        <AResult key={estate.id} estate={estate} favFlag={index}/>
       );
    }); 
    return(
      <div className="container">        
         <h1>Propositions</h1>
         <NumberWarning numberWarning = {numberWarning}/>
         <ul className="ulResultList">
          {resultElems}
         </ul> 
      </div>
    );
  }
});

module.exports = ResultList;