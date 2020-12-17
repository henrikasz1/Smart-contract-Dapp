import React, { Component } from 'react';

class Sell extends Component {

  render() {
    return (
    <div id='content'>
      <div>
        <h4 className="text-center"> Sell a product </h4>
      </div>
      <form onSubmit={(e) => {
        // e.preventDefault()
        const name = this.prName.value
        const price = window.web3.utils.toWei(this.prPrice.value.toString(), 'Ether')
        this.props.sellProduct(name, price)
      }}>
        <div className="form-group w-50 mx-auto">
          <label for="input1">Name</label>
          <input ref={(input) => {this.prName = input}} type="text" className="form-control" id="input1" placeholder="Name of the product"/>
        </div>
        <div className="form-group w-50 mx-auto">
          <label for="input2">Price</label>
          <input ref={(input) => {this.prPrice = input}} type="text" className="form-control" id="input2" placeholder="Price"/>
        </div>
        <button type="submit" className="btn btn-primary mx-auto d-block">Submit</button>
      </form>
    </div>
    );
  }
}

export default Sell;
