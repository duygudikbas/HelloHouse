var React = require('react');
var $ = require('jquery');
require('jquery-ui');
var Link = require('react-router').Link;
var BasicSearch = React.createClass({
    handle: function() {
        console.log("wake up!!")
        this.setState({
            open: !this.state.open
        });
    },
    getInitialState: function() {
        return {
            open: false
        };
    },

    setFilter : function(event){
        var minPrice = this.refs.minPrice.value;
        var maxPrice = this.refs.maxPrice.value;

        var location = this.refs.location.value;
        var house = this.refs.house.checked;
        var appartment = this.refs.appartment.checked;

        if (this.state.open){
            var minRoom = this.refs.minRoom.value;
            var maxRoom = this.refs.maxRoom.value; 
            var minSurface = this.refs.minSurface.value;
            var maxSurface = this.refs.maxSurface.value;  
            var garden = this.refs.garden.checked;
            var garage = this.refs.garage.checked;
            var pool = this.refs.pool.checked;
        }

        var filter = { 
                minPrice : minPrice,
                maxPrice : maxPrice,
                minRoom :minRoom,
                maxRoom : maxRoom,
                minSurface : minSurface,
                maxSurface : maxSurface,
                garden : garden,
                garage : garage,
                pool : pool, 
                location : location,
                house : house,
                appartment : appartment
            };

        console.log("filter:");
        console.log(filter);
        this.props.initiateFilter(filter);
    },

    render: function() {
        var advancedSearch;
        if (this.state.open) {
            advancedSearch = < div >
            < div className = "form-group" >
            < div className = "form-group row" >
                < label htmlFor = "usr"  className="col-xs-4"> Room: < /label> 
                < input type = "number" id = "minRoom" placeholder = "min"  className="col-xs-3" ref="minRoom"/ >
                < label htmlFor = "usr"  className="col-xs-2"> To: < /label> 
                < input type = "number" id = "maxRoom" className="col-xs-3" placeholder = "max"  ref="maxRoom"/ >
            < /div> 
            < /div> 
            < div className = "form-group row" >
                < label htmlFor = "usr" className="col-xs-4" > Surface: < /label> 
                < input type = "number" id = "minSurface" className="col-xs-3" placeholder = "min"  ref="minSurface"/ >
                < label htmlFor = "usr" className="col-xs-2"> To: < /label> 
                < input type = "number" id = "maxSurface" placeholder = "max"  className="col-xs-3" ref="maxSurface"/ >
            < /div> 
            < div className = "form-group row" >
                < input className="col-xs-1" type = "checkbox" name = "garden" value = "garden"  ref="garden"/ >
                < label className="col-xs-3" > Garden < /label> 
                < input type = "checkbox" name = "garage" r value = "garage" className="col-xs-1"  ref="garage"/ >
                < label className="col-xs-3" > Garage < /label> 
                < input type = "checkbox" name = "pool"  value = "pool"  className="col-xs-1" ref="pool"/ >
                < label  className="col-xs-3"> pool  < /label> 
            < /div>
            </div > ;
        } else {
            advancedSearch = "";
        }
        return ( 
            <div className="masterSearch">

            < div className = "search" >
        
            < div className = "row form-group topSearch" >
              < label htmlFor = "usr" className="col-xs-4"  > Type: < /label> 
              < input type = "checkbox" name = "Appartment" value = "Appartment"  className="col-xs-1 appartment" ref="appartment"/ >
              < label   className="col-xs-4" > Appartment < /label> 
              < input type = "checkbox"   name = "House" value = "House"  className="col-xs-1" ref="house"/ >
              < label  className="col-xs-1 marginright" > House < /label> 

            < /div> 
            < div className = "row form-group" >
              < label htmlFor = "usr" className="col-xs-4"  > Location: < /label> 
              < input type = 'text' placeholder = "Enter location" className="col-xs-8" ref="location" / >
            < /div>

            < div className = " row form-group" >
            < label htmlFor = "usr" className="col-xs-4"  > Price: < /label> 
            < input type = "number" id = "minPrice" placeholder = "min" className="col-xs-3" ref="minPrice"/ >

            < label htmlFor = "usr" className="col-xs-2"> To: < /label> 
            < input type = "number" id = "max" className="col-xs-3" placeholder =  "max"  ref="maxPrice"/ >
            < /div> < div className = "form-group" >
            < button onClick = {
                this.handle
        } > Advanced Search < /button> {
                advancedSearch
            } 
            < Link to = "/ResultList" onClick={this.setFilter}> Search < /Link> < /div> < /div>
            </div>
        );
    },
    componentDidMount: function() {
        var url = "http://localhost:3000/cities";

        $.get(url, function(data) {
            console.log(data);
            var doubles = data.map(function(num) {
                return num.zip + "-" + num.name;
            });
            $(this.refs.location).autocomplete({
                source: doubles
            });
        }.bind(this), 'json');

        console.log(this.refs.location);
    },

});

module.exports = BasicSearch;
