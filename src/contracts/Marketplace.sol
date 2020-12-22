pragma solidity ^0.5.16;

contract Marketplace {
    string public name;
    uint public countProducts = 0;

    mapping(uint => Product) public products;

    struct Product {
      uint id;
      string name;
      uint price;
      address payable owner;
      bool purchased;
    }

    event ProductAdded(
      uint id,
      string name,
      uint price,
      address payable owner,
      bool purchased
    );

    event ProductBought(
      uint id,
      string name,
      uint price,
      address payable owner,
      bool purchased
    );

    function addProduct(string memory _name, uint _price) public{
      // check the length to the name
      require(bytes(_name).length > 2);
      // prevent from price being zero
      require(_price > 0);

      //increment the counter
      countProducts ++;
      //create product
      products[countProducts] = Product(countProducts, _name, _price, msg.sender, false);
      //execute an event
      emit ProductAdded(countProducts, _name, _price, msg.sender, false);
    }
    function buyProduct(uint _id) public payable{
      //get the product
      Product memory _pr = products[_id];
      //get the seller
      address payable _seller = _pr.owner;
      //validate the inserted id
      require(_pr.id > 0 && _pr.id <= countProducts);
      //check buyer's balance
      require(msg.value >= _pr.price);
      //check if the product still exists
      require(!_pr.purchased);
      //check if the seller is not buying it's own product
      require(_seller != msg.sender);
      //transfer ownership of the product
      _pr.owner = msg.sender;
      //mark as sold
      _pr.purchased = true;
      //update data in the mapping container
      products[_id] = _pr;
      //pay the seller
      address(_seller).transfer(msg.value);
      //execute an event
      emit ProductBought(countProducts, _pr.name, _pr.price, msg.sender, true);
    }
}
