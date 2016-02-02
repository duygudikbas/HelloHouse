var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var PropertyDetail = React.createClass({
  getInitialState: function() {
    return {estate: {image: [], properties:[]}};
  },
  componentWillMount: function() {
    var estateId = this.props.params.id;
    var url = "http://estates-api.herokuapp.com/estates"+"/"+estateId;
    $.get(url, function(data) { 
         this.setState({estate: data});
      }.bind(this));
  },

  createURLWithCoordinates: function(){
    return(
        "http://www.google.com/maps/place/"+this.state.estate.coordinates
    );
  },
  render: function(){
    return(
       <div className="container propertyDetail">
        <h2>{this.state.estate.location}</h2>
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
            <div className="col-xs-6">
              <ul id="insidePropertyDetail">
                <li id="price">{this.state.estate.price}</li>
              </ul>
            </div>
             <div className="col-xs-6">
              <ul id="outsidePropertyDetail">
                <li>{this.state.estate.properties[0]}</li>
                <li>{this.state.estate.properties[0]}</li>
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
                 <button type="button" className="btn btn_default">Add to Favourites</button>
            </div>
          </div>

      </div>
    );
  }
});

module.exports = PropertyDetail;