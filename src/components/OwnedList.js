import React, { Component } from 'react';

class OwnedList extends Component {

  render() {
    return (
    <div id='content'>
      <div style={{marginTop: 3 + "%", marginBottom: 2 + "%"}}>
        <h4 className="text-center"> Purchased products </h4>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            { this.props.ownedProducts.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>
    );
  }
}

export default OwnedList;
