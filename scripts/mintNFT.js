require ('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3") ;
const web3 = createAlchemyWeb3 (API_URL);
const contract = require("../artifacts/contracts/MyNFT.sol/MyToken.json");

const contractAddress = "0xf9C650f3cbe3987e9c71635E1323748E2bB78B3A";
const nftConntract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI){
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY,"latest");

    const tx ={
        from : PUBLIC_KEY,
        to: contractAddress,
        nonce : nonce,
        gas : 500000,
        data : nftConntract.methods.safeMint
        (PUBLIC_KEY, tokenURI).encodeABI(),
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              );
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              );
            }
          }
        );
      })
      .catch((err) => {
        console.log(" Promise failed:", err);
      });
  }
  mintNFT(
    "https://gateway.pinata.cloud/ipfs/QmQxfWEA1Dr2zxNPRFn8Knk77RfWcXdzYNnG4yxntrtrtH"
  );

 