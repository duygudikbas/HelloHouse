var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

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
	      this.setState({primary: data});
	    }.bind(this), 'json');
  },
  render: function(){

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
		       location.locationPrimary = ui.item.value;
		     	 this.setState({location:location});
			   }.bind(this));

        $(this.refs.locationSecondary).autocomplete({
            source: doubles
        });
        $('#searchForSecondary').on('autocompleteselect', function (e, ui) {
	    		var location = $.extend({}, this.state.location);
	        location.locationSecondary = ui.item.value;
	     		this.setState({location:location, showColumnSecondary: true});
		    }.bind(this));	
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