import Web3 from 'web3';
const DynamicERC721 = require('../abi_contract/DynamicERC721.json');
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

var web3 = new Web3("https://rpc-mainnet.maticvigil.com");
var account = web3.eth.accounts.privateKeyToAccount(publicRuntimeConfig.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const dynamicNFT = new web3.eth.Contract(
    DynamicERC721,
    publicRuntimeConfig.CONTRACT_ADDRESS
);

export const getCollection = async() => {
    let counter = await dynamicNFT.methods.getTokenIdsCount().call({ from: account.address});
    let collection:string[] = []
    for(let i=0; i<counter; i++){
        let result:string = await dynamicNFT.methods.tokenURI(i).call();
        collection.push(result);
    }
    return collection;
}

export const mintNewToken = async(address: string, uri: string) => {
    try {
        let status = await dynamicNFT.methods.safeMint(address, uri).send({from: account.address, gas: 500000})
        return status;
    } catch(err) {
        console.log(err)
        return false;
    }
}

export type Data = {
    id: string;
    uri: string;
}

export const getTokenOfOwnerData = async(address:string) => {
    let counter = await dynamicNFT.methods.getTokenIdsCount().call({ from: account.address});
    let tokens:number = await dynamicNFT.methods.balanceOf(address).call();
    let data: Data[] = [];
    for(let i=1; i<counter || data.length==tokens; i++){
        let owner:string = await dynamicNFT.methods.ownerOf(i).call()
        if(owner.toLocaleLowerCase() == address){
            let tmp = await dynamicNFT.methods.tokenURI(i).call();
            let objTmp = {
                id: i.toString(),
                uri: tmp
            }
            data.push(objTmp);
        }
    }
    return data;
}

export const getNumberOfTokenOwned = async(address:string) => {
    return await dynamicNFT.methods.balanceOf(address).call();
}

export const getDynamicTokenData = async(id:string) => {
    return await dynamicNFT.methods.getDynamiData(id).call({from: account.address});
}