/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 *
 *
 */
 const HDWalletProvider = require('@truffle/hdwallet-provider');
 const privatekeyMetamask = "f7bf806c95c478dd3d0500f014178b60cb707da01a1809b99a91440705d628d4";

module.exports = {
  contracts_build_directory: './client/src/artifacts/',

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
     GanacheCLI: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     moonbase: {
      provider: () => {
         return new HDWalletProvider(privatekeyMetamask, 'wss://wss-relay.testnet.moonbeam.network') // Insert your private key here
      },
      network_id: 1287,
      gas: 10000000,
      confirmations: 2,
      timeoutBlocks: 1000,
    },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
     ropsten: {
     provider: () => { return new HDWalletProvider(privatekeyMetamask, `wss://ropsten.infura.io/ws/v3/b3b18fff97b6463ca552f9334d7fe15f`)
     },
     network_id: 3,     
     gas: 5500000,       
     confirmations: 2,    
     timeoutBlocks: 200, 
     skipDryRun: false ,
     websockets: true  
     },
    },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9",    // Fetch exact version from solc-bin (default: truffle's version)
  
    }
  },

  api_keys: {
    etherscan: ('B7DJF8NGARCMJ7JJD9V4D65643PFKTWPNB')
  },

  plugins:['truffle-plugin-verify']
};
