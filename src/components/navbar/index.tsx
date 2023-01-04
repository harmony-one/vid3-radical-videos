import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";

import "./navbar.scss";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const [ walletClassName, setWalletClassName ] = useState("wallet-button")
  const { open } = useWeb3Modal();

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
      setWalletClassName('wallet-button active')
    } else {
      setWalletClassName('wallet-button')
    }
  }, [isConnected])
  
  return (
    <div className="navbar">
      <div className="home">
        <AiFillHome />
      </div>
      <div>
        <AiOutlinePlus />
      </div>
      <div className={walletClassName} onClick={buttonHandler}>
        <FaWallet />
      </div>
    </div>
  );
};

export default Navbar;
