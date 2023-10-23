import React, { useEffect, useState } from 'react'
import EndUserCard from './EndUserCard'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const EndUserPostSection = () => {

  const {pageName} = useParams();
  const [pageId,setPageId] = useState();
  const [cardsPerRow,setCardsPerRow] = useState(4);

  useEffect(()=>{
    const fetchPageId = async ()=>{
      const res = await axios.get(`http://localhost:8080/api/getPageId/${pageName}`)
      setPageId(res.data.pid)
    }
  
    const fetchData = async () => {
      try {
          const res = await axios.get(`http://localhost:8080/api/getPageSettings/${pageId}`);
          if (res.data) {
            setCardsPerRow(parseInt(res.data.cards_per_row))
          }
      } catch (error) {
          console.log(error);
      }
    }
    fetchPageId();
    fetchData();

  },[pageId,pageName])

 




  return (
    <div className={`row row-cols-1 row-cols-md-2 row-cols-lg-${cardsPerRow} justify-content-start g-3 mb-2`}>
    <EndUserCard/>
    </div>
  )
}

export default EndUserPostSection