
import React from 'react'
const NewsItem=(props)=>
  
  {let {title,description,imageUrl,newsUrl,date,author,source}=props
    return (
      <div className='my-3 mx-3' >
         
        <div className="card" style={{minHeight:'30em'}}>
        <span style={{left:'50%',zIndex:1}}className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
        {source}
    
    </span>
    <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="Image_not_available" style={{maxHeight:'12em'}}/>     
       <div className="card-body">
          <h5 className="card-title"style={{fontSize:"medium"}}>{title}</h5>
          <p className="card-text"style={{fontSize:"normal"}}>{description}...</p>
          <p className="card-text"><small className="text-muted">Posted on {new Date(date).toGMTString()} by {author?author:"unknown"}</small></p>
          <a href={newsUrl} style={{fontSize:"medium",position:"absolute",bottom:10}} rel="noreferrer" target="_blank" className="btn btn-dark btn-sm">Read more</a>
        </div>
      </div>
      </div>
      
    )
  }


export default NewsItem