import { AnyAction } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../hooks/redux';
import { useAccount } from 'wagmi'
import Web3 from 'web3';

import { setRecord } from '../../store/recordSlice';
import { RecordType } from '../../types';
import { config, truncateAddressString } from '../../util/web3/config';
import apis from '../../util/web3/web3';

import './domain-record.scss'

const DomainRecord = () => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const { address } = useAccount();
  const dispatch = useAppDispatch();
  
  const tld = process.env.REACT_APP_TLD;
  
  useEffect(() => {
    const getSubdomain = () => {
      if (!window) {
        return null
      }
      console.log('getSubDomain()', window.location.host)
      const host = window.location.host
      const parts = host.split('.')
      console.log(host, parts, parts.length)
      if (parts.length <= 2) {
        return ''
      }
      if (parts.length <= 4) { // 3 CHANGE FOR PRODUCTION
        return parts[0]
      }
      return parts.slice(0, parts.length - 2).join('.')
    }
    
    const name = getSubdomain(); 
    setName(name ? name : '');      
      // setIsOwner(address && record?.renter && record.renter.toLowerCase() === address.toLowerCase())
    // })
    // setClient(api)
    // // init()
  }, [])

  useEffect(() => {
    if (name) {
      const web3 = new Web3(config.defaultRPC)
      const api = apis({ web3, address })
      console.log(api);
      api?.getRecord({ name }).then((r) => {
        // dispatch(setRecord(r))
        dispatch(setRecord(r))
        console.log('RRRRRR',r);
        setOwner(r.renter);
      }).catch(e => console.log('ERRORRRRRR', { e }));
    }
  }, [name, address])

  // useEffect(() => {
  //   if (name) {
  //     const res = refetch()
  //     console.log(res)
  //   }
  // },[name, refetch])
  return (
    <div className='domain-record'>
      <div className='record-title'>{`${name}${tld}`}</div>
      <div className='record-owner'>Owner {truncateAddressString(owner,10)}</div>
    </div>
  )
}

export default DomainRecord;