import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostSection = () => {


  const { pageId } = useParams();
  const [cardsPerRow,setCardsPerRow] = useState(4);

  useEffect(() => {
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
    fetchData();
}, [pageId]);


  return (
    <div className={`row row-cols-1 row-cols-md-2 row-cols-lg-${cardsPerRow} justify-content-start g-3 mb-2`}>
        <Card/>
    </div>
  )
}

export default PostSection