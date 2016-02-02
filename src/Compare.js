var React = require('react');

var Compare = React.createClass({
render: function(){
    return(
       <div className="container compare"> 
       <form className="form-horizontal" >
       		 <div className="form-group">
			    < input type = 'text' ref = 'autocomplete'  placeholder="Enter location"/ >
			    <p>Compare To</p>
			    < input type = 'text' ref = 'autocomplete'  placeholder="Compare location"/ >
			 </div>

 			<div className="form-group">
	       		<div className="dropdown">
				  <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Currencies
				  <span className="caret"></span></button>
				  <ul className="dropdown-menu">
				    <li><a href="#">EUR</a></li>
				    <li><a href="#">USD</a></li>
				    <li><a href="#">GBP</a></li>
				  </ul>
				</div>
			</div>
			<div className="form-group">
	       <div className="table-responsive">   
	          <table className="table table-hover">
			    <thead>
			      <tr>
			        <th>Monthly Rent</th>
			        <th>Price</th>
			        <th>Range</th>
			      </tr>
			    </thead>
			    <tbody>
			     <tr className="info">
			         <td></td>
			        <td>Brussels</td>
			        <td>Liege</td>
			
			      </tr>
			      <tr className="info">
			       <td>Centre</td>
			        <td>800</td>
			        <td>800-900</td>
			
			      </tr>
			      <tr  className="info">
			       <td>O Centre</td>
			        <td>600</td>
			        <td>600 - 800</td>

			      </tr>
			      <tr  className="danger">
			        <td>Centre</td>
			        <td>1400</td>
			        <td>1200 - 1500</td>
			   
			      </tr>
			       <tr  className="danger">
			         <td>O Centre</td>
			         <td>1100</td>
			        <td>1100 - 1300</td>
		
			      </tr>
			    </tbody>
			  </table>
			  <p><em>Blue</em> indicates: Appartment; <em>Pink</em> indicates: House; </p>
			  </div>
			  </div>
			</form>
        </div>
    );
  }
});

module.exports = Compare;