# Smart-contract-Dapp

:hash: It is a simple decentralized e-shop application :hash:

**Aspects to be included in program:**
* Make a smart contract using Solidity programming language
* Test smart contract using local and Ethereum test networks
* Check execution logs in Etherscan
* Make a front-end for application (website, app, etc.)

**How the program was made:**

At first, I had to make a smart contract using Solidity programming language. Then I initialized a new truffle project, put a smart contract inside of it and wrote some tests in order to check if the contract works as it should (tests were realized using Mocha JavaScript test framework). After that, I made a front-end for the application. I used JavaScript(Web3 library and React framework) to make website interactive and I also used Bootstrap to style the app. The project is connected to MetaMask wallet and it was tested using local (Ganache) and Ethereum (Kovan, smart contact was deployed using Remix IDE) test net. The program has a selling and buying functions (seller has to pay gas fees in order to publish a product for sale and a buyer has to pay for a product + gas fees, all these functions can be executed using only Ethereum). 
