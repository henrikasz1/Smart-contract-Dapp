import React, { Component } from 'react';

class List extends Component {

  render() {
    return (
    <div id='content'>
      <div style={{marginTop: 3 + "%", marginBottom: 2 + "%"}}>
        <h4 className="text-center"> Buy a product </h4>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Seller</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH</td>
                  <td>{product.owner}</td>
                  <td>
                    { !product.purchased ?
                      <button name={product.id} value={product.price} className="btn btn-success"
                        onClick={(e) =>
                          {
                            // const name = {product.id}
                            // const price = {product.price}
                            this.props.buyProduct(e.target.name, e.target.value)
                          }
                        }
                        >Buy</button>
                        : <h5> Owned </h5>
                    }
                  </td>
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

export default List;
