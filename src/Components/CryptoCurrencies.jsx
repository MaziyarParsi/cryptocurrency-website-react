import React ,{useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {Card,Row,Col,Input} from 'antd'
import { useGetCryptosQuery } from '../services/CryptoApi'

const CryptoCurrencies = ({simpilified}) => {
 
 const cryptoCount = simpilified ? 12:100
 const { data:cryptoList,isFetching}= useGetCryptosQuery(cryptoCount)
 const [cryptos, setCryptos] = useState([])
 const [searchTerm,setSearchTem]= useState('')

 useEffect(()=>{
    const filteredData= cryptoList?.data?.coins.filter((coin)=>coin.name.includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
 },[cryptoList,searchTerm])

  if(isFetching) return 'loading..'

 return (
  <>
     {!simpilified && (
      <div className="search-crypto">
       <Input placeholder="search crypto" onChange={(e)=>setSearchTem(e.target.value)} />

     </div>
     )}
     
     <Row gutter={[32,32]} className="crypto-card-container"> 
          {cryptos?.map((currency)=>{
           return (
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
             <Link to={`/crypto/${currency.id}`}></Link>
                   <Card title={`${currency.rank}. ${currency.name}`} 
                         extra={<img className="crypto-image" 
                         src={currency.iconUrl}/>} 
                         hoverable >
                          <p> Price = {millify(currency.price)}$</p>
                          <p> Market Cap = {millify(currency.marketCap)}</p>
                          <p> Daily change = {millify(currency.change)}%</p>

                   </Card>
            </Col>
           )
          })}

     </Row>
  </>
 )
}

export default CryptoCurrencies
