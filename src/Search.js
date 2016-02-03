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
            advancedSearch = 
            <div>
                 <div className="row">
                 <div className="col-xs-12">
                    <label htmlFor = "usr" > Room: < /label> 
                 </div> 
                </div> 
                <div className="row">
                    <div className="col-xs-offset-1 col-xs-3">
                           <input type="number" className="roomNumber" id="minRoom" placeholder="min"  ref="minRoom"/>
                    </div>
                     <div className="col-xs-2">
                          <label> To: < /label> 
                    </div>
                     <div className="col-xs-4">
                          <input type="number" className="roomNumber" id="maxRoom" placeholder="max"  ref="maxRoom"/>
                    </div>
                </div> 



                <div className="row">
                    <div className="col-xs-12">
                        <label> Surface: </label> 
                    </div>
                </div>
                 <div className="row">
                    <div className="col-xs-offset-1 col-xs-3">
                          <input type = "number" className="surface" id = "minSurface" placeholder = "min"  ref="minSurface"/>
                    </div>
                     <div className="col-xs-2">
                          <label> To: < /label> 
                    </div>
                     <div className="col-xs-4">
                          <input type="number" className="surface" id="maxSurface" placeholder="max" ref="maxSurface"/>
                    </div>
                </div> 

                <div className="row">
                <div className="col-xs-5">
                    <input type = "checkbox" name = "garden" value = "garden"  ref="garden"/>
                    <label> Garden < /label> 
                </div>
                <div className="col-xs-4">
                    <input type = "checkbox" name = "garage" value = "garage"  ref="garage"/>
                    <label> Garage < /label> 
                </div>
                <div className="col-xs-3">
                    <input type = "checkbox" name = "pool"  value = "pool" ref="pool"/>
                    <label> pool  < /label> 
                </div>
                </div>
            </div> ;
        } else {
            advancedSearch = "";
        }
        return ( 
            <div className="container search">   

                <div className="row">
                 <div className="col-xs-offset-1 col-xs-6">
                      <input type = "checkbox" name="Appartment" value="Appartment" ref="appartment"/ >
                      <label> Appartment </label>
                    </div>
                    <div className="col-xs-5"> 
                      <input type = "checkbox"   name = "House" value = "House" ref="house"/ >
                      <label> House </label> 
                    </div>
                </div> 

                <div className="row">
                 <div className="col-xs-12">
                      <label> Location: < /label> 
                 </div>
                </div>

                <div className="row">
                  <div className="col-xs-offset-1 col-xs-11">
                      <input type='text' id="searchAutoComplete" placeholder="Enter location" ref="location" / >
                   </div>
                </div>


               <div className="row">
                <div className="col-xs-12">
                    <label>Price:</label> 
                </div>
                </div> 

                 <div className="row">
                     <div className="col-xs-offset-1 col-xs-9">
                        <input type="number" id = "minPrice" placeholder="min" ref="minPrice"/ >
                     </div>
                    <div className="col-xs-4">
                        <label>To:</label> 
                    </div>
                </div> 

                <div className="row">
                    <div className="col-xs-offset-1 col-xs-12">
                        <input type="number" id="max" placeholder= "max"  ref="maxPrice"/ >
                    </div>
                </div>
                <div>
                    <button className="btn btn_default advancedBtn" onClick = {this.handle} > Advanced Search < /button> {advancedSearch} 
                        <Link to = "/ResultList" className="btn btn_default searchBtn" onClick={this.setFilter}> Search < /Link> 
                </div> 
            </div>
        );
    },
    componentDidMount: function() {
        var url = "http://localhost:3000/cities";

        $.get(url, function(data) {
            console.log(data);
            var doubles = data.map(function(num) {
                return num.zip + " " + num.name;
            });
            $(this.refs.location).autocomplete({
                source: doubles
            });
        }.bind(this), 'json');

        console.log(this.refs.location);
    },

});

module.exports = BasicSearch;
