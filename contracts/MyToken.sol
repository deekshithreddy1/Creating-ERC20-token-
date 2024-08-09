//SPDX-License-Identifier:MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{ 

    uint constant _initial_supply = 10000 * (10** 18);

    constructor() ERC20("MyToken" , "Mkt")  {
        _mint(msg.sender, _initial_supply);

    }

}