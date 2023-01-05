import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";

import "./navbar.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const [ isOwner, setIsOnwer ] = useState(false);
  const [ walletClassName, setWalletClassName ] = useState("wallet-button")
  const { open } = useWeb3Modal();
  
  const record = useAppSelector((state) => state.record.currentRecord) 
  
  const { disconnect } = useDisconnect();

  const buttonHandler = () => {
    console.log('click', isConnected);
    if (isConnected) {
      disconnect();
    } else {
      open();
    }
  };

  useEffect(() => {
    if (isConnected) {
      setWalletClassName('nav-wallet-button active')
    } else {
      setWalletClassName('nav-wallet-button')
    }
  }, [isConnected])

  return (
    <div className="navbar">
      <div className='nav-home'>
        <AiFillHome />
      </div>
      <div className='nav-action'>
        {!isConnected && (<span style={{ fontSize: '0.9rem'}}>Connect Wallet</span>)}
        {isConnected && isOwner && (<AiOutlinePlus />) }
        {isConnected && !isOwner && (<button className='nav-subscribe-button'>Subscribe</button>) }
      </div>
      <div className={walletClassName} onClick={buttonHandler}>
        <FaWallet />
      </div>
    </div>
  );
};

export default Navbar;
