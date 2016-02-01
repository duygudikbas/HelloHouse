var React = require('react');

var PropertyDetail = React.createClass({
  // getInitialState: function() {
  //   return {
  //     url: "https://www.realo.be/en/laroussesquare-6-1190-forest/5467664?cl=2053559774%2C655577061%2C522693116%2C630891910%2C1779274120\n",
  //     location: "Laroussesquare 6, 1190 Forest",
  //     price: "200000€",
  //     description: "Idéalement situé à proximité de la place Saint-Job et du Lycée Français, dans un cadre calme et verdoyant, magnifique appartement d'une superficie de +/-100m² comprenant: hall d'entrée, lumineux séjour avec feu ouvert, salle à manger, 3 chambres (14, 10, 10m²), salle de bains, wc séparé. Cave. Terrasse.  Parking commun. PEB: C. A VISITER! Plus d'infos: www.bonnivers.be",
  //     properties: ["4 bedrooms"],
  //     image: ["http://lorempixel.com/image_output/city-q-c-400-200-4.jpg",
  //         "http://lorempixel.com/image_output/city-q-c-400-200-9.jpg"],
  //     coordinates: [
  //       50.8205965,
  //       4.3508388
  //     ]
  //   }
  // },
  createURLWithCoordinates: function(){
    return(
        "http://www.google.com/maps/place/"+this.props.estate.coordinates
    );
  },
  render: function(){
    console.log("this.props.estate");
    console.log(this.props.estate);
    return(
       <div className="container propertyDetail">
        <h2>{this.props.estate.location}</h2>
          <div className="row">
            <div className="col-xs-12">
        
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
              </ol>
              <div className="carousel-inner" role="listbox">
                <div className="item active">
                  <img src={this.props.estate.image[0]} alt="SanFranciscoGoldenGate"/>
                </div>
                <div className="item">
                  <img src={this.props.estate.image[1]} alt="City Center"/>
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
                <li id="price">{this.props.estate.price}</li>
              </ul>
            </div>
             <div className="col-xs-6">
              <ul id="outsidePropertyDetail">
                <li>{this.props.estate.properties[0]}</li>
                <li>{this.props.estate.properties[1]}</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <a href={this.createURLWithCoordinates()} id="mapLink">Locate on Map</a>
          </div>
          <div className="row">
            <div className="col-xs-12">
                <p>{this.props.estate.description}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6">
                <button type="button" className="btn btn-primary buttonMA">Make Appointment</button>
            </div>
            <div className="col-xs-6">
                 <button type="button" className="btn btn-primary buttonLA">Loan Advice</button>
            </div>
          </div>

      </div>
    );
  }
});

module.exports = PropertyDetail;