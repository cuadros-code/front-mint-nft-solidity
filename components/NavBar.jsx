import Link from 'next/link'
import styles from '../styles/NavBar.module.css'

const NavBar = ({ total, account }) => {
  return (
    <nav className={styles.nav}>
      <p className={styles.total}>
        Total supply: <span>{total}/50</span>
      </p>
      <Link 
        href={`https://testnets.opensea.io/${account}`}
      > 
        <a target="_blank" className={`cta-button connect-wallet-button ${styles.button}`}>
          See OpenSea
        </a>
      </Link>
    </nav>
  )
}

export default NavBar