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
		        price_house_out_of_center: "",
		        rangeAptCenter: "",
		        range_apt_out_of_center: "",
		        rangeHouseCenter: "",
		        range_house_out_of_center: "",
		      }
 			 }], secondary:[{id:"", zip: "",
			      	name: "",
			      	priceDetail: {
			        priceAptCenter: "",
			        price_apt_out_of_center: "",
			        priceHouseCenter: "",
			        price_house_out_of_center: "",
			        rangeAptCenter: "",
		        	range_apt_out_of_center: "",
		        	rangeHouseCenter: "",
		        	range_house_out_of_center: "",
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
  	console.log("this.props.showTable");
  	console.log(this.props.showColumnSecondary);
  	return(
	    <tbody>
		  		<tr>
			     <td>Apt Centre</td>
				     <td >{this.state.primary[0].priceDetail.priceAptCenter}</td>
				     {!this.props.showColumnSecondary ? <td>{this.state.primary[0].priceDetail.rangeAptCenter}</td>	 : null}
				      {this.props.showColumnSecondary ? <td>{this.state.secondary[0].priceDetail.priceAptCenter}</td> : null}
				    
			    </tr>
   				<tr >
            <td>House Centre</td>
            <td >{this.state.primary[0].priceDetail.priceHouseCenter}</td>
            {!this.props.showColumnSecondary ? <td>{this.state.primary[0].priceDetail.rangeHouseCenter}</td>	 : null}
            {this.props.showColumnSecondary ? <td>{this.state.secondary[0].priceDetail.priceHouseCenter}</td> : null}
				    
          </tr>
          <tr>
            <td>Apt Out Centre</td>
            <td>{this.state.primary[0].priceDetail.price_apt_out_of_center}</td>
            {!this.props.showColumnSecondary ? <td>{this.state.primary[0].priceDetail.range_apt_out_of_center}</td>	 : null}
            {this.props.showColumnSecondary ? <td>{this.state.secondary[0].priceDetail.price_apt_out_of_center}</td> : null}
				    
          </tr>
          <tr>
            <td>House Out Centre</td>
            <td>{this.state.primary[0].priceDetail.price_house_out_of_center}</td>        
            {!this.props.showColumnSecondary ? <td>{this.state.primary[0].priceDetail.range_house_out_of_center}</td>	 : null}
            {this.props.showColumnSecondary ? <td>{this.state.secondary[0].priceDetail.price_house_out_of_center}</td>	 : null}
				    
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
	          {!this.props.showColumnSecondary ? <th>{this.props.location.locationPrimary} - Range</th> : null}
	          {this.props.showColumnSecondary ? <th>{this.props.location.locationSecondary} - Rent Price</th> : null}
	          
	        </tr>
	     </thead>
            <PriceTableRows  location={this.props.location} showColumnSecondary = {this.props.showColumnSecondary}/>
        </table>
      </div>
    );
	}
});

var Compare = React.createClass({
	getInitialState: function() {
    return {location:{locationPrimary:"", locationSecondary:""}, showTable:false, showColumnSecondary:false, showComparisonInput:false};
  },
  handleOnchangeSecondary : function(){
			console.log("autocompletechange");
			this.setState({ showColumnSecondary: false});		
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
			  	this.state.showComparisonInput = true;
		      location.locationPrimary = ui.item.value;
		     	this.setState({location:location, showTable:true,showComparisonInput:true });
			     	$(this.refs.locationSecondary).autocomplete({
	            source: doubles
	       		});
		        $(this.refs.locationSecondary).on('autocompleteselect', function (e, ui) {
			    		var location = $.extend({}, this.state.location);
			        location.locationSecondary = ui.item.value;
			     		this.setState({location:location, showColumnSecondary: true});
				    }.bind(this));	
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
              <input type='text' id="searchForPrimary" placeholder="Enter location" ref="locationPrimary"/>
           </div>
        </div>
				{this.state.showComparisonInput ?
	        <div className="row">
	         <div className="col-xs-offset-1 col-xs-3">
	              <label> Compare: < /label>  
	         </div>
	          <div className="col-xs-6">
	              <input type='text' id="searchForSecondary" onChange ={this.handleOnchangeSecondary} placeholder="City For Comparison" ref="locationSecondary"/>
	           </div>
	        </div>
        : null }
        {this.state.showTable ? <PriceTable location = {this.state.location} showColumnSecondary = {this.state.showColumnSecondary}/> : null}
        
      </div>
    );
  }
});

module.exports = Compare;