import PropTypes from 'prop-types'
import React, { useEffect,useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';


var imageUrl = 'https://ichef.bbci.co.uk/news/1024/branded_news/14F1F/production/_130219758_sofiatastingcrickettagliatelle.jpg';

const News = (props)=>{

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // constructor(props){
    //     super()
    //     this.state = {
    //         articles:[],
    //         loading:false,
    //         page:1
    //     }
    //     // document.title = `${props.category} - News Monkey`;
    // }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async ()=> {
        props.setProgress(10);
        let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
        // setState({loading:true});
        props.setProgress(20);
        let data = await fetch(url)
        let parsedData = await data.json()
        props.setProgress(40);

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // this.setState({articles:parseData.articles, totalResults: parseData.totalResults, loading: false})
        props.setProgress(100);
    }
    
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])

    const handlePrevClick = async ()=>{
        // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c9d107a892144d668fa5021c3fd17fea&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url)
        // let parseData = await data.json()
        // console.log(parseData);
        
        // this.setState({articles:parseData.articles})

        // this.setState({
        //     page: this.state.page + 1,
        //     loading: false
        // })
        setPage(page - 1);
        updateNews();
    }

    const handleNextClick = async ()=>{
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
        //     let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c9d107a892144d668fa5021c3fd17fea&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
        //     this.setState({loading:true});
        //     let data = await fetch(url)
        //     let parseData = await data.json()
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parseData.articles,
        //         loading:false
        //     })
        // }
        setPage(page + 1);
        updateNews();
    }

    return (
        <div className='container my-3'>
            <h1>NewsMonkey - Top Handling on {capitalizeFirstLetter(props.category)} </h1>
            {loading && <Spinner/>}
            <div className="row">
                {!loading && articles.map((element)  => {
                    return <div className="col-md-4" key={element.url}>
                    <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage?element.urlToImage:imageUrl} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source}/>
                </div> 
                })}
            </div>
            <div className='container d-flex justify-content-between'>
                <button disabled={page<=1} type='button' className='btn btn-dark' onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)}  type='button' className='btn btn-dark' onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News