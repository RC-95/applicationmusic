const { Assertion } = require("chai");

const MusicOwnerships = artifacts.require('MusicOwnerships');

contract('MusicOwnerships', accounts => {
    let musicOwnerships = null;
    before (async () => { 
        musicOwnerships = await MusicOwnerships.deployed(); 
    });

const account_one = accounts[0];
const account_two = accounts[1];

it('Should mint the first token.', async () => {
    await musicOwnerships.mint(account_one,"Rhys",9987);
    const result = await musicOwnerships.tokenURI(9987);
    assert(result === "https://ipfs.io/ipfs/Rhys");

    });
    
    it('Should mint the second token.', async () => {
        await musicOwnerships.mint(account_one,"Rhys2",8890);
        const result = await musicOwnerships.tokenURI(8890);
        assert(result === "https://ipfs.io/ipfs/Rhys2");
    
        });

    
    it('Should transfer a token from one account to another.', async () => {
        await musicOwnerships.safeTransferFrom(account_one,account_two,9987);
        const tokenOwner = await musicOwnerships.ownerOf(9987);
        assert(tokenOwner === account_two);
    });

    it('Should transfer a token back from one account to another.', async () => {
        await musicOwnerships.safeTrasferFrom(account_two,account_one,9987);
        const tokenOwner = await musicOwnerships.ownerOf(9987);
        assert(tokenOwner === account_one);
    });
});