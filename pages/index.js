import Image from 'next/image';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
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
    <>
      <NavBar total={totalSupply} account={currentAccount} />
      
      <div className="App">
        <div className={styles.container}>
          <div className={styles.description}>
            <h1 className={styles.title}>
              Discover, Collect And Sell Creative NFTs
            </h1>

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
          </div>

          <div>
            <div className={styles.card}>
              <Image 
                src={'/home.jpg'}
                alt='home'
                width={'300px'}
                height={'300px'}
                />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
