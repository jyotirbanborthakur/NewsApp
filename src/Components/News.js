import React, { useEffect,useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


const News=(props)=> {
 const [articles, setarticles] = useState([])
 const [page, setpage] = useState(0)
 const [loading, setloading] = useState(true)
 const [totalResults, settotalResults] = useState(0)
 
  const updateNews=async()=> {
    props.setProgress(7);
    const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
   setloading(true)
    
    let data = await fetch(api);
    props.setProgress(55);
    let parseData = await data.json();
    props.setProgress(70);
    setarticles(parseData.articles)
        settotalResults(parseData.totalResults)
        setloading(false)
        props.setProgress(100);
   
  }

  useEffect(() => {
    document.title = `${(props.category)} - Hindustan Khabar`;
    updateNews(); 
    // eslint-disable-next-line
}, [])
 
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    
  };


  return (
    <>
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>Top {props.category} headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
        > 
            <div className="container">
                 
            <div className="row">
                {articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title ? element.title : "n/a"} description={element.description ? element.description : "n/a"} imageUrl={element.urlToImage?element.urlToImage:"N/A"} newsUrl={element.url?element.url:"n/a"} author={element.author?element.author:"n/a"} date={element.publishedAt?element.publishedAt:"n/a"} source={element.source.name?element.source.name:"n.a"} />
                    </div>
                })}
            </div>
            </div> 
        </InfiniteScroll>
    </>
)

}

News.defaultProps =
{
  country: 'in',
  catagory: 'general', 
  pageSize: 8,
  
}
News.propTypes =
{
  country: PropTypes.string,
  catagory: PropTypes.string,
  pageSize: PropTypes.number,
 
}
export default News