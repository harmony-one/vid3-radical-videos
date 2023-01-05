import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";

import { checkIsOwner } from "../../util/web3/web3";
import { useAppSelector } from "../../hooks/redux";
import { selectIsOwner, selectOwner } from "../../store/recordSlice";
import { useAppDispatch } from '../../hooks/redux';
import { setIsOwner } from '../../store/recordSlice';

import "./navbar.scss";
const Navbar = () => {
  const { address, isConnected } = useAccount();
  const [ walletClassName, setWalletClassName ] = useState("wallet-button")
  const { open } = useWeb3Modal();
  const owner = useAppSelector(selectOwner); 
  const isOwner = useAppSelector(selectIsOwner);
  const { disconnect } = useDisconnect();
  const dispatch = useAppDispatch();
  
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
      owner && dispatch(setIsOwner(checkIsOwner(address,owner)))
    } else {
      setWalletClassName('nav-wallet-button')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address])

  console.log('NAVBAR', owner);

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
