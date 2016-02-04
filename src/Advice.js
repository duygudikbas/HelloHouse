var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var UserInformation = React.createClass({
	render : function(){
		return (
			<div className = "successFeedback">
				&nbsp; &nbsp; &nbsp; We have received your mail ! We will contact you soon.&nbsp; 
				Please do not hesitate to contact us via number : 00200313213 &nbsp; 
				
			</div>
		);
	}
});
var Advice = React.createClass({
	  getInitialState: function() {
	     return ({showInfoDiv:false});
	  },	   
	  HandleOnQustionSubmit: function(){
	  	 this.setState({showInfoDiv: true});
	  	 $('html, body').animate({ scrollTop: 0 }, 0);
	  },
	  render: function(){
	  	console.log("render");
	    return(
	       <div className="container advice">   
	       	<Link to="/" className="homeLink" ><i className="fa fa-home"></i>&nbsp; Home</Link>       
			  <div className="panel panel-default">
			    <div className="panel-heading">Please send us your questions !</div>
			    <div className="panel-body">
			    	{this.state.showInfoDiv ? <UserInformation /> : null}
			    	 <form className="form">
			            <div className="form-group">
			            	<h3>Please , I need an advice in</h3>
			            	<div className="radio">
							  <label><input type="radio" name="optradio"/>a day</label>
							</div>
							<div className="radio">
							  <label><input type="radio" name="optradio"/>a week</label>
							</div>
							<div className="radio disabled">
							  <label><input type="radio" name="optradio" disabled/>a month</label>
							</div>
							<h3>I need to know; </h3>
			             	<div className="checkbox">
							  <label><input type="checkbox" value=""/>What is the interest rate on this mortgage?</label>
							</div>
							<div className="checkbox">
							  <label><input type="checkbox" value=""/>How many discount and origination points will I pay?</label>
							</div>
							<div className="checkbox">
							  <label><input type="checkbox" value=""/>What are the closing costs?</label>
							</div>
							<div className="checkbox">
							  <label><input type="checkbox" value=""/>When can I lock the interest rate, and what will it cost me to do so?</label>
							</div>
							<div className="checkbox">
							  <label><input type="checkbox" value=""/>Is there a prepayment penalty on this loan?</label>
							</div>
							<div className="checkbox">
							  <label><input type="checkbox" value=""/>What is the minimum down payment required for this loan?</label>
							</div>
							<div className="checkbox">
							  <label><input type="checkbox" value=""/>What are the qualifying guidelines for this loan?</label>
							</div>
							<div className="checkbox">
							  <label><input type="checkbox" value=""/>What documents will I have to provide?</label>
							</div>
							<div className="checkbox">
							  <label><input type="checkbox" value=""/>How long will it take to process my loan application?</label>
							</div>
							<div className="checkbox">
							  <label><input type="checkbox" value=""/>What might delay approval of my loan?</label>
							</div>
							 <label for="comment">Additionally, I also need to know :</label>
	  						 <textarea className="form-control" rows="5" id="comment"></textarea><br/>
	  						 <button type="button" className="btn btn_default pull-right" onClick={this.HandleOnQustionSubmit}>Send</button>
			            </div>
	       			 </form>
			    </div>
			  </div>
	       </div>
	    );
	  }
});

module.exports = Advice;