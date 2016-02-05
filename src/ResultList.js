var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link

var RemoveFromFavoritesButton = React.createClass({
  removeFromFavorites : function(event){
    event.preventDefault();
    var urlRemove = "https://estates-api-custom.herokuapp.com/favorites/" + this.props.id;
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
       <button type="button" className="btn btn_default" onClick={this.removeFromFavorites}>Remove</button>
      )
  }
});

var AResult = React.createClass({
  getLocation: function(){
    if(this.props.estate.location.indexOf('Undisclosed address in ') !== -1) {
      return this.props.estate.location.replace('Undisclosed address in ', '' );
    }

    if(this.props.estate.location.indexOf('Address not disclosed') !== -1) {
      return this.props.estate.location.replace('Address not disclosed', '' );
    } 

    if(this.props.estate.location.indexOf('Undisclosed number in ') !== -1) {
      return this.props.estate.location.replace('Undisclosed number in ', '' );
    } 

    return this.props.estate.location;      
},
render: function(){
    var index = this.props.favFlag;
    var urlTo = "/PropertyDetail/"+ this.props.estate.id;
    var price = this.props.estate.price;
    var elemId = "estate"+this.props.estate.id;
    // var location=this.props.estate.location;
    if (price) {price += " €"};

    var divStyle = {
 
  backgroundImage: "url("+this.props.estate.image[0] +")",
  backgroundSize: "cover"
 
};
var nameofclass="liResultList  ";
var publishDate = this.props.estate.firstPublicationDate;
var adaptDate = this.props.estate.lastModificationDate;
var newAdaptText = "";
if (publishDate){
    if (Number(publishDate) > 20160202){
      nameofclass+="info ";
      newAdaptText = "New";
    }else if (adaptDate){
      if (Number(adaptDate) > 20160202){
        nameofclass+="info ";
        newAdaptText = "Modified";
      }
    }
}

    var label;
    if (price.length > 0)
      label = <span >{price}<br />{this.getLocation()}</span>;
    else
      label = <span className="spanRibbon1Line">{this.getLocation()}</span>;
    return(
      <Link to={urlTo} >

        <li key={this.props.estate.id}  title={newAdaptText}  style={divStyle} description={location} id={elemId} className={nameofclass}>
         <div className="ribbonnew">{label}
         
         </div>
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
        <p id="warningSearch">Sorry, there is no result for this criteria</p>
        <Link to="/Search" id="refineCriteriaActionEmptyResult">Go Back To   Search</Link>
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
      $.get("https://estates-api-custom.herokuapp.com/favorites", function(favorites) {
        var urlFavorites = "https://estates-api-custom.herokuapp.com/estates?id=";
        var favList = favorites.map(function(favory){
          return favory.id;
        }).join('&id=');
        urlFavorites += favList;
        $.get(urlFavorites, function(data) {
          this.setState({estates: data});
        }.bind(this), 'json');
      }.bind(this), 'json');
    }else {
      var url = "https://estates-api-custom.herokuapp.com/estates";
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

    if (!this.props.filter.appartment && estate.type === "Flat for sale" ){ return false; };
    if (!this.props.filter.house && estate.type === "House for sale" ){ return false; };

    if (this.props.filter.garage && !estate.garage){ return false; };
    if (this.props.filter.garden && !estate.garden){ return false; };
    if (this.props.filter.pool && !estate.pool){ return false; };


    return true;
  },


  render: function(){
    var index = this.props.location.pathname.indexOf("Favorites");
    var filteredEstates = this.state.estates.filter(this.filter);
    if (index > -1) filteredEstates = this.state.estates;
    var numberWarning = filteredEstates.length;
    var resultElems = filteredEstates.map(function(estate) {
      return (
        <AResult key={estate.id} onRemoveFavorite={this.handleRemoveFavorite} estate={estate} favFlag={index} />
       );
    }.bind(this)); 

    return(
      <div className="container">   
          <Link to="/" className="homeLink" ><i className="fa fa-home"></i>&nbsp; Home</Link>     
         { index > -1 ? <h1>Favorites</h1> : null}
         { numberWarning > 0 ? <div><NumberWarning numberWarning = {numberWarning}/><ul className="ulResultList">{resultElems}</ul></div> : <EmptyResults/> }
      </div>
    );
  }
});

module.exports = ResultList;