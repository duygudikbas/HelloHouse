var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var PriceTableRows = React.createClass({
  getInitialState: function() {
  	console.log("locationPrimaryZip");
  	console.log(this.props.locationPrimaryZip);
    return {
        estates:[]
    };
  },
  componentDidMount: function() {
      var url = "http://localhost:3000/cities?id="+1;
      console.log("url");
      console.log(url);
      $.get(url, function(data) {
	      this.setState({estates: data});
	    }.bind(this), 'json');
  },
  render: function(){
  	console.log(this.state.estates);

  	var estatesPriceAptCenter = this.state.estates.map(function(estate){
  		 		return  (<td key={estate.id}>{estate.priceDetail.priceAptCenter}</td>);
  	});
  	var estatesPriceHouseCenter = this.state.estates.map(function(estate){
  		 		return  (<td key={estate.id}>{estate.priceDetail.priceAptCenter}</td>);
  	});
  	var estatesPriceAptOutOFCenter = this.state.estates.map(function(estate){
  		 		return  (<td key={estate.id}>{estate.priceDetail.price_apt_out_of_center}</td>);
  	});
  	var estatesPriceHouseOutOFCenter = this.state.estates.map(function(estate){
  		 		return  (<td key={estate.id}>{estate.priceDetail.price_house_out_of_center}</td>);
  	});
  	return(
      <div>
  	    <tbody>

  		  		<tr  className="info">
  			     <td>Apt Centre</td>
  			      {estatesPriceAptCenter}
  			    </tr>
  			    <tr  className="danger">
  			      <td>House Centre</td>
  			   		{estatesPriceHouseCenter}
  			    </tr>
  			    <tr  className="info">
  			      <td>Apt Out Centre</td>
  			      {estatesPriceAptOutOFCenter}
  			    </tr>
  			    <tr  className="danger">
  			      <td>House Out Centre</td>
  			      {estatesPriceHouseOutOFCenter}
  			    </tr>
  		  </tbody>
      </div>
  	);
  }
});
var PriceTable = React.createClass({
	render: function(){
		return(        
			<div className="table-responsive" id="priceTable"> 
        <table className="table table-hover">
          <thead>
	         <tr>
	           <th></th>
	           <th>{this.props.location.locationPrimary} - Rent Price</th>
	           </tr>
	        </thead>
          <PriceTableRows  locationPrimaryZip={this.props.locationPrimaryZip} location={this.props.location}/>
        </table>
      </div>
    );
	}
});

var Compare = React.createClass({
	getInitialState: function() {
    return {location:{locationPrimary:"", locationSecondary:""},locationPrimaryZip:"",showTable:false, showColumnSecondary:true};
  },
  handleLocationPrimary: function(locationPrimary){
  	var location = $.extend({}, this.state.location);
  	this.state.showTable = true;
    $('#searchForPrimary').on('autocompleteselect', function (e, ui) {
        location.locationPrimary = ui.item.value;
     		this.setState({location:location});
    }.bind(this));	
  },
  handleLocationSecondary: function(locationSecondary){
  	var location = $.extend({}, this.state.location);
  		this.state.showColumnSecondary = true;
    $('#searchForSecondary').on('autocompleteselect', function (e, ui) {

        location.locationSecondary = ui.item.value;
     		this.setState({location:location});
    }.bind(this));	
  },
 componentDidMount: function() {
    var url = "http://localhost:3000/cities";
    $.get(url, function(data) {
        var doubles = data.map(function(num) {
            return num.zip + " " + num.name;
        }.bind(this));
        $(this.refs.locationPrimary).autocomplete({
            source: doubles
        });
        $(this.refs.locationSecondary).autocomplete({
            source: doubles
        });
    }.bind(this), 'json');
},
render: function(){
    return(
      <div className="container compare"> 
        <Link to="/" className="homeLink" ><i className="fa fa-home"></i>&nbsp; Home</Link>
				<div className="row">
         <div className="col-xs-offset-1 col-xs-3">
              <label> Location: < /label>  
         </div>
          <div className="col-xs-6">
              <input type='text' id="searchForPrimary" onClick={this.handleLocationPrimary} placeholder="Enter location" ref="locationPrimary" / >
           </div>
        </div>

        <div className="row">
         <div className="col-xs-offset-1 col-xs-3">
              <label> Compare: < /label>  
         </div>
          <div className="col-xs-6">
              <input type='text' id="searchForSecondary" onClick={this.handleLocationSecondary}  placeholder="City For Comparison" ref="locationSecondary" / >
           </div>
        </div>
        {this.state.showTable ? <PriceTable locationPrimaryZip={this.state.locationPrimaryZip} location = {this.state.location} showColumnSecondary = {this.state.showColumnSecondary}/> : null}
        
      </div>
    );
  }
});

module.exports = Compare;