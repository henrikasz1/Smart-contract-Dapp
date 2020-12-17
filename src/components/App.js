import React, { Component } from 'react';
import Web3 from 'web3';
//import logo from '../logo.png';
import './App.css';
import Shop from '../abis/Marketplace.json';
import Sell from './Sell';
import List from './List';

class App extends Component {
  //live cycle method
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadData()
  }
  //LOADING WEB3
  //references -> https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  async loadWeb3() {
      if (window.ethereum)
      {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3)
      {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else
      {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
  }

  //FETCH DATA FROM WEB3
  async loadData() {
    const web3 = window.web3

    const acc = await web3.eth.getAccounts()

    this.setState({acc: acc[0]})

    //dinamically find the address of network
    // const netId = await web3.eth.net.getId()
    // const address = Shop.networks[netId]
    const address = Shop.networks[5777].address
    //fetching abi
    const abi = Shop.abi
    const shop = new web3.eth.Contract(abi, address)
    this.setState({shop})

    const counter = await shop.methods.countProducts().call()

    this.setState({counter})
    //load products
    for (var i = 1; i <= counter; i++)
    {
      const pr = await shop.methods.products(i).call()
      this.setState({products: [...this.state.products, pr]})
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      acc: '',
      products: [],
      counter: 0
    }
    //Lets the JSX use the function
    this.sellProduct = this.sellProduct.bind(this)
    this.buyProduct = this.buyProduct.bind(this)
  }

  //sell a product
  sellProduct(name, price) {
    this.state.shop.methods.addProduct(name, price).send({ from: this.state.acc })
  }
  //buy a product
  buyProduct(id, price) {
    this.state.shop.methods.buyProduct(id).send({ from: this.state.acc, value: price })
  }


  //JSX
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-dark ">
            <h3 className="text-light"> Decentralized shop </h3>
        </nav>

        <div className="bg-info">
            <p className="text-center text-dark"> Logged in as user {this.state.acc} </p>
        </div>

        <Sell sellProduct={this.sellProduct} />
        <List products={this.state.products} buyProduct={this.buyProduct} shop={this.state.shop}/>
      </div>
    );
  }
}

export default App;
