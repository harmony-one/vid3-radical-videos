import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi'
import { config, truncateAddressString } from '../../util/web3/config';

import './domain-record.scss'
import Web3 from 'web3';
import apis from '../../util/web3/web3';

type RecordType = {
  renter: any,
  lastPrice: any,
  timeUpdated: any,
  url: any,
  prev: any,
  next: any,
}
const DomainRecord = () => {
  const [record, setRecord] = useState({});
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('')
  const { address } = useAccount()

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
        setOwner(r.renter);
        setRecord(r);
      }).catch(e => console.log('ERRORRRRRR', { e }));
    }
  }, [name, address])

  // useEffect(() => {
  //   if (name) {
  //     const res = refetch()
  //     console.log(res)
  //   }
  // },[name, refetch])
  console.log('RECORD', name, { record });
  return (
    <div className='domain-record'>
      <div className='record-title'>{`${name}${tld}`}</div>
      <div className='record-owner'>Owner {truncateAddressString(owner,10)}</div>
    </div>
  )
}

export default DomainRecord;