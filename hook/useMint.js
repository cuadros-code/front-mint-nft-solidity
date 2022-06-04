import { useState } from 'react'
import { ethers } from "ethers";
import abiContract from '../utils/ImperialToken.json'
import confetti from 'canvas-confetti';

const CONTRACT_ADDRESS = '0xE85eC2CF23feF25d890733C4Af9Ce7A9bE237106';

const useMint = () => {

  const [totalSupply, setTotalSupply] = useState(0)
  const [currentAccount, setCurrentAccount] = useState('')
  const [loading, setLoading] = useState(false)

  const checkIfWalletExists = async () => {
    const { ethereum } = window
    if (!ethereum) {
      return  
    }
    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        if(accounts.length > 0) {
          setCurrentAccount(accounts[0])
          setupEventListener()
        } else {
          console.log('no authorized accounts found')
        }
    } catch (error) {
      
    } finally {
      await getTotalSupply()
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
      await getTotalSupply()
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

        confetti({
          particleCount: 200,
          gravity: 0.1,
          spread: 150,
          angle: -100,
          origin: { y: 0, x: 1 },
        });
        
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
  
  return {
    loading,
    currentAccount,
    totalSupply,
    checkIfWalletExists,
    connectWallet,
    askContractToMintNft,
    getTotalSupply
  }
}

export default useMint