var Election = artifacts.require("./Election.sol");

module.exports = function(deployer) {
  deployer.deploy(Election, "Uttam Nagar");
};
