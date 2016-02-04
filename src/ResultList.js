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
          this.props.onRemoveFavorite(this.props.id);
          //$("li#estate"+this.props.id).remove().animate({rotate: "20"}, 500);
        }.bind(this)
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
    var elemId = "estate"+this.props.estate.id
    if (price) {price += " €"};

    var divStyle = {
 
  backgroundImage: "url("+this.props.estate.image[0] +")"
 
};
var nameofclass="liResultList ";
if(true)
{
  nameofclass+="ribbonnew"
}
    return(
      <Link to={urlTo} >
        <li key={this.props.estate.id}  style={divStyle} id={elemId} className={nameofclass}>
          <p className="location"> {this.props.estate.location  } </p>

          <p className="price">&nbsp;{price}</p>
         
          {index >= 0 ? <span className="removeFromFavorites"><RemoveFromFavoritesButton id={this.props.estate.id} onRemoveFavorite={this.props.onRemoveFavorite}/></span> : null}
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

var EmptyResults = React.createClass({
  render: function(){
    return(
      <div>
        <p>We are sorry, but there are no results for these criterias</p>

      </div>
    );
  }
});

var ResultList = React.createClass({
  getInitialState: function() {
    return {estates: [], favorite : false, numberToSee : 0};
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
        var urlFavorites = "http://localhost:3000/estates?id=";
        var favList = favorites.map(function(favory){
          return favory.id;
        }).join('&id=');
        urlFavorites += favList;
        $.get(urlFavorites, function(data) {
          this.setState({estates: data});
        }.bind(this), 'json');
      }.bind(this), 'json');
    }else {
      var url = "http://localhost:3000/estates";
      $.get(url, function(data) {
      this.setState({estates: data});
    }.bind(this), 'json');
    }
  },

  handleRemoveFavorite: function(id) {
    var favorites = this.state.estates.slice();
    var estate = favorites.filter(function(favorite) {return favorite.id === id});
    if (estate.length > 0) {
      var index = favorites.indexOf(estate[0]);
      favorites.splice(index, 1);
      this.setState({estates: favorites});
    }
  },

  filter : function(estate){
    if (Number(this.props.filter.minPrice) > 0 && Number(this.props.filter.minPrice) > Number(estate.price)){ return false; };
    if (Number(this.props.filter.maxPrice) > 0 && Number(this.props.filter.maxPrice) < Number(estate.price)){ return false; };

    if ((this.props.filter.location !== null && this.props.filter.location.length > 0) && (estate.location.indexOf(this.props.filter.location) === -1)){ return false; };

    if ((this.props.filter.minSurface) && (Number(this.props.filter.minSurface) > Number(estate.surface))){ return false; };
    if ((this.props.filter.maxSurface) && (Number(this.props.filter.maxSurface) < Number(estate.surface))){ return false; };
    
    if ((this.props.filter.minRoom) && (Number(this.props.filter.minRoom) > Number(estate.bedrooms))){ return false; };
    if ((this.props.filter.maxRoom) && (Number(this.props.filter.maxRoom) < Number(estate.bedrooms))){ return false; };
   
    if (estate.type !== "Flat for sale" && estate.type !== "House for sale"){return false};

    if (this.props.filter.appartment === false && estate.type === "Flat for sale" ){ return false; };
    if (this.props.filter.house === false && estate.type === "House for sale" ){ return false; };

    if (this.props.filter.garage !== estate.garage){ return false; };
    if (this.props.filter.garden !== estate.garden){ return false; };
    if (this.props.filter.pool !== estate.pool){ return false; };


        // var filter = { 

        //         garden : garden,
        //         garage : garage,
        //         pool : pool, 
        //         location : location,
        //         house : house,
        //         appartment : appartment
        //     };


    return true;
  },

  // adaptNumber : function(number){
  //   this.setState({numberToSee : number });
  // },

  render: function(){
    var index = this.props.location.pathname.indexOf("Favorites");
    var filteredEstates = this.state.estates.filter(this.filter);
    var numberWarning = filteredEstates.length;
    //this.adaptNumber(numberWarning);
    var resultElems = filteredEstates.map(function(estate) {
      return (
        <AResult key={estate.id} onRemoveFavorite={this.handleRemoveFavorite} estate={estate} favFlag={index} />
       );
    }.bind(this)); 

    return(
      <div className="container">        
         { index > -1 ? <h1>Favorites</h1> : <h1>Propositions</h1>}
         { numberWarning > 0 ? <div><NumberWarning numberWarning = {numberWarning}/><ul className="ulResultList">{resultElems}</ul></div> : <EmptyResults/> }
      </div>
    );
  }
});

module.exports = ResultList;