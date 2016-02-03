var React = require('react');
var $ = require('jquery');

var PriceTableRows = React.createClass({
  getInitialState: function() {
    return {
        primary:[{id:"", zip: "",
		      	name: "",
		      	priceDetail: {
		        priceAptCenter: "",
		        price_apt_out_of_center: "",
		        priceHouseCenter: "",
		        price_house_out_of_center: ""
		      }
 			 }], secondary:[{id:"", zip: "",
			      	name: "",
			      	priceDetail: {
			        priceAptCenter: "",
			        price_apt_out_of_center: "",
			        priceHouseCenter: "",
			        price_house_out_of_center: ""
			      }
			 }]
    };
  },
  getPrimaryName: function() {
  	var name_zip = this.props.location.locationPrimary;
  	var name = name_zip.substr(name_zip.indexOf("-") + 1);
  	return name;
  },
  getSecondaryName: function() {
  	var name_zip = this.props.location.locationSecondary;
  	var name = name_zip.substr(name_zip.indexOf("-") + 1);
  	return name;
  },
  componentDidUpdate: function(prevProps) {
      if (prevProps.location.locationPrimary != this.props.location.locationPrimary) {

	      console.log("getPrimaryURL");
	      var url = "http://localhost:3000/cities?name="+ this.getPrimaryName();
	      console.log(url);
		      $.get(url, function(data) {
		      	// data.priceDetail = {
		      	// 	priceAptCenter: MAth.random
		      	// }
			      this.setState({primary: data});
			    }.bind(this), 'json');
			} if (prevProps.location.locationSecondary != this.props.location.locationSecondary) {
	      console.log("getSecondaryURL");
	      var tempSLocation = $.extend({}, this.state.location);
	      var url = "http://localhost:3000/cities?name="+ this.getSecondaryName();
	      console.log(url);
		      $.get(url, function(data) {
		      	// data.priceDetail = {
		      	// 	priceAptCenter: MAth.random
		      	// }
			      this.setState({secondary: data});
			    }.bind(this), 'json');
			}
  },
  componentDidMount: function() {
  	  console.log("componentDidMount");
      var url = "http://localhost:3000/cities?name="+ this.getPrimaryName();
      console.log(url);
      console.log(this.getPrimaryName());
      $.get(url, function(data) {
      	// data.priceDetail = {
      	// 	priceAptCenter: 
      	// }
	      this.setState({primary: data});
	    }.bind(this), 'json');
  },
  render: function(){
  	console.log("primary");
  	console.log(this.state.primary);
  	console.log("secondary");
  	console.log(this.state.secondary);
  	console.log(this.state.primary[0].priceDetail.priceAptCenter);
  	// 	console.log(this.state.estates);
  	// var estatesPriceAptCenter = this.state.estates.map(function(estate){
  	// 	 		return  (<td key={estate.id}>{estate.priceDetail.priceAptCenter}</td>);
  	// });
  	// var estatesPriceHouseCenter = this.state.estates.map(function(estate){
  	// 	 		return  (<td key={estate.id}>{estate.priceDetail.priceAptCenter}</td>);
  	// });
  	// var estatesPriceAptOutOFCenter = this.state.estates.map(function(estate){
  	// 	 		return  (<td key={estate.id}>{estate.priceDetail.price_apt_out_of_center}</td>);
  	// });
  	// var estatesPriceHouseOutOFCenter = this.state.estates.map(function(estate){
  	// 	 		return  (<td key={estate.id}>{estate.priceDetail.price_house_out_of_center}</td>);
  	// });
  	return(
	    <tbody>

		  		<tr  className="info">
			     <td>Apt Centre</td>
				     <td >{this.state.primary[0].priceDetail.priceAptCenter}</td>
				     <td >{this.state.secondary[0].priceDetail.priceAptCenter}</td>
			    </tr>
   				<tr  className="danger">
            <td>House Centre</td>
            <td >{this.state.primary[0].priceDetail.priceHouseCenter}</td>
				    <td >{this.state.secondary[0].priceDetail.priceHouseCenter}</td>
          </tr>
          <tr  className="info">
            <td>Apt Out Centre</td>
            <td >{this.state.primary[0].priceDetail.price_apt_out_of_center}</td>
				    <td >{this.state.secondary[0].priceDetail.price_apt_out_of_center}</td>
          </tr>
          <tr  className="danger">
            <td>House Out Centre</td>
            <td >{this.state.primary[0].priceDetail.price_house_out_of_center}</td>
				    <td >{this.state.secondary[0].priceDetail.price_house_out_of_center}</td>
          </tr>
		   </tbody>

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
	          {this.props.showColumnSecondary ? <th>{this.props.location.locationSecondary} - Rent Price</th> : null}
	          
	        </tr>
	     </thead>
            <PriceTableRows  location={this.props.location}/>
        </table>
      </div>
    );
	}
});

var Compare = React.createClass({
	getInitialState: function() {
    return {location:{locationPrimary:"", locationSecondary:""}, showTable:false, showColumnSecondary:false	};
  },
  handleLocationPrimary: function(locationPrimary){
  	

  },
  handleLocationSecondary: function(locationSecondary){
  	

  },
 componentDidMount: function() {
    var url = "http://localhost:3000/cities";
    $.get(url, function(data) {
        var doubles = data.map(function(num) {
            return num.zip + "-" + num.name;
        }.bind(this));
        $(this.refs.locationPrimary).autocomplete({
            source: doubles
        });
        $(this.refs.locationPrimary).on('autocompleteselect', function (e, ui) {
	  			var location = $.extend({}, this.state.location);
			  	this.state.showTable = true;
			    	console.log("ui.item.value");
			    	console.log(ui.item.value);
		       location.locationPrimary = ui.item.value;
		     	 this.setState({location:location});
			   }.bind(this));

        $(this.refs.locationSecondary).autocomplete({
            source: doubles
        });
        $('#searchForSecondary').on('autocompleteselect', function (e, ui) {
	    		var location = $.extend({}, this.state.location);
	    		console.log("ui.item.value");
			    console.log(ui.item.value);
	        location.locationSecondary = ui.item.value;
	     		this.setState({location:location, showColumnSecondary: true});
		    }.bind(this));	
    }.bind(this), 'json');
},
render: function(){
    return(
      <div className="container compare"> 
				<div className="row">
         <div className="col-xs-offset-1 col-xs-3">
              <label> Location: < /label>  
         </div>
          <div className="col-xs-6">
              <input type='text' id="searchForPrimary" placeholder="Enter location" ref="locationPrimary" / >
           </div>
        </div>

        <div className="row">
         <div className="col-xs-offset-1 col-xs-3">
              <label> Compare: < /label>  
         </div>
          <div className="col-xs-6">
              <input type='text' id="searchForSecondary" placeholder="City For Comparison" ref="locationSecondary" / >
           </div>
        </div>
        {this.state.showTable ? <PriceTable location = {this.state.location} showColumnSecondary = {this.state.showColumnSecondary}/> : null}
        
      </div>
    );
  }
});

module.exports = Compare;