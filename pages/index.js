import { useEffect } from 'react';
import useMint from '../hook/useMint';
import styles from '../styles/Home.module.css'

export default function Home() {

  const {
    loading,
    currentAccount,
    totalSupply,
    checkIfWalletExists,
    connectWallet,
    askContractToMintNft,
  } = useMint()

  useEffect(() => {
    checkIfWalletExists()
  }, [])
  
  
  return (
    <div className="App">
      <div className={styles.container}>
        <h1 className={styles.title}>Bringing the world to Ethereum</h1>
        <h1 className={styles.title}>With</h1>
        <h1 className={styles.polygon}>Polygon</h1>

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
          {
            currentAccount && <p className='footer-text'>{totalSupply}/50</p>
          }
          {
            currentAccount && 
            <a 
              className='footer-text' 
              href={`https://testnets.opensea.io/${currentAccount}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              See your NFT
            </a>
          }
      </div>
    </div>
  );
};
