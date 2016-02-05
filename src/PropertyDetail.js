var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var PropertyDetail = React.createClass({
  getInitialState: function() {
    return {estate: {
      image: [], 
      properties:[], 
      location: "", 
      surface : "",
      garage : false,
      garden : false,
      pool : false,
      bedrooms : 0,
      price: ""
    }};

  },
  componentWillMount: function() {
    var estateId = this.props.params.id;
    var url = "https://estates-api-custom.herokuapp.com/estates"+"/"+estateId;
    $.get(url, function(data) { 
         this.setState({estate: data});
      }.bind(this));
  },

  createURLWithCoordinates: function(){
    return(
        "http://www.google.com/maps/place/"+this.state.estate.coordinates
    );
  },

  addToFavorites: function(id){
    var newFav = {
      id : this.props.params.id
    }
    var urlFav = "https://estates-api-custom.herokuapp.com/favorites";

    $.ajax({
      type: "POST",
      dataType: "json",
      url: urlFav,
      data: newFav,
     success: function( response ) 
          { 
            console.log("add done");
            $("#addFav").addClass("disabled");

          }   
    });

  },

  getLocation: function(){
      if(this.state.estate.location.indexOf('Undisclosed address in ') !== -1) {
        return this.state.estate.location.replace('Undisclosed address in ', '' );
      }

      if(this.state.estate.location.indexOf('Address not disclosed') !== -1) {
        return this.state.estate.location.replace('Address not disclosed', '' );
      } 

      if(this.state.estate.location.indexOf('Undisclosed number in ') !== -1) {
        return this.state.estate.location.replace('Undisclosed number in ', '' );
      } 

      return this.state.estate.location;      
  },

  render: function(){
    var price = this.state.estate.price;
    if (price.length > 0){price += " €"}
      else {price = "Unknown price"}
    var attributes = "";
    if (this.state.estate.garage) attributes += "Garage ";
    if (this.state.estate.garden) attributes += "Garden ";
    if (this.state.estate.pool) attributes += "Pool ";

    return(
      <div className="container propertyDetail">
        <Link to="/" className="homeLink" ><i className="fa fa-home"></i>&nbsp; Home</Link> 
        <h2>{ this.getLocation() }</h2>
          <div className="row">
            <div className="col-xs-12">
              <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="item active">
                    <img src={this.state.estate.image[0]} alt="SanFranciscoGoldenGate"/>
                  </div>
                  <div className="item">
                    <img src={this.state.estate.image[1]} alt="City Center"/>
                  </div>
                </div>
                <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div>
              <ul id="insidePropertyDetail">
                <li id="price">{price}</li>
                <li id="surface">Surface : {this.state.estate.surface}</li>
                <li id="bedrooms">Bedrooms : {this.state.estate.bedrooms}</li>
                <li id="attributes">{attributes}</li>
              </ul>
            </div>

          </div>
          <div className="row">
            <a href={this.createURLWithCoordinates()} id="mapLink">Locate on Map</a>
          </div>
          <div className="row">
            <div className="col-xs-12">
                <p>{this.state.estate.description}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <Link to="Appointment/AppointmentWhere" className="btn btn_default" >Make Appointment</Link>
            </div>
            <div className="col-xs-6">
              <button type="button" className="btn btn_default" id="addFav" onClick={this.addToFavorites}>Add to Favourites</button>
            </div>
          </div>
      </div>
    );
  }
});

module.exports = PropertyDetail;