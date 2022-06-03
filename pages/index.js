import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import abiContract from '../utils/ImperialToken.json'

const CONTRACT_ADDRESS = "0xD857CEb828c4F360a4c72da857d179bCbB67bFdF";

export default function Home() {

  const [currentAccount, setCurrentAccount] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalSupply, setTotalSupply] = useState(0)

  const checkIfWalletExists = async () => {

    const { ethereum } = window
    if (!ethereum) {
      return  
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    getTotalSupply()
    if(accounts.length > 0) {
      setCurrentAccount(accounts[0])
      setupEventListener()
    } else {
      console.log('no authorized accounts found')
    }

  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return;
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length === 0) return;
      setCurrentAccount(accounts[0]); 
      setupEventListener()
    } catch (error) {
      console.log(error);
    }
  }

  const askContractToMintNft = async () => {
    setLoading(true)
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abiContract.abi, signer);
  
        let nftTxn = await connectedContract.makeAnNFT();
        await nftTxn.wait();
        getTotalSupply()
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abiContract.abi, signer);

        connectedContract.on("NewTokenEvent", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there!`)
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTotalSupply = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abiContract.abi, signer);

        let totalSupply = await connectedContract.getTotalSupply();
        setTotalSupply(totalSupply.toNumber())
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletExists()
  }, [])
  
  
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {
            !currentAccount 
            ?
              <button 
                className="cta-button connect-wallet-button"
                onClick={connectWallet}
              >
                Connect to Wallet
              </button>
            :
              <button 
                disabled={loading}
                onClick={askContractToMintNft} 
                className="cta-button connect-wallet-button"
              >
                {
                  loading
                  ? 'Loading...'
                  : 'Mint NFT'
                }
              </button>
          }
          <p className='footer-text'>{totalSupply}/50</p>
        </div>
      </div>
    </div>
  );
};