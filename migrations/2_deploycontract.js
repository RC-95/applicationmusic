const MusicOwnership = artifacts.require("MusicOwnership");

module.exports = function (deployer) {
  deployer.deploy(MusicOwnership,'Music', 'MUS');
};
