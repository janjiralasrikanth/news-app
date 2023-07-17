import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';


var imageUrl = 'https://ichef.bbci.co.uk/news/1024/branded_news/14F1F/production/_130219758_sofiatastingcrickettagliatelle.jpg';
export class News extends Component {
    static defaultProps = {
        country:"in",
        pageSize:8,
        category: 'general',
    }

    // static propTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string
    // }
    
    constructor(props){
        super()
        this.state = {
            articles:[],
            loading:false,
            page:1
        }
        // document.title = `${this.props.category} - News Monkey`;
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews(pageNo ){
        this.props.setProgress(10);
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        this.props.setProgress(20);
        let data = await fetch(url)
        let parseData = await data.json()
        this.props.setProgress(40);
        console.log(parseData);
        this.setState({articles:parseData.articles, totalResults: parseData.totalResults, loading: false})
        this.props.setProgress(100);
    }
    
    async componentDidMount(){
        //  let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9d107a892144d668fa5021c3fd17fea&pageSize=${this.props.pageSize}`;
        //  this.setState({loading:true});
        //  let data = await fetch(url)
        //  let parseData = await data.json()
        //  console.log(parseData);
        //  this.setState({articles:parseData.articles, totalResults: parseData.totalResults, loading: false})
        this.updateNews();

    }

    handlePrevClick = async ()=>{
        // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9d107a892144d668fa5021c3fd17fea&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url)
        // let parseData = await data.json()
        // console.log(parseData);
        
        // this.setState({articles:parseData.articles})

        // this.setState({
        //     page: this.state.page + 1,
        //     loading: false
        // })
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }

    handleNextClick = async ()=>{
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9d107a892144d668fa5021c3fd17fea&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data = await fetch(url)
        //     let parseData = await data.json()
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parseData.articles,
        //         loading:false
        //     })
        // }
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    render() {
        return (
            <div className='container my-3'>
                <h1>NewsMonkey - Top Handling on {this.capitalizeFirstLetter(this.props.category)} </h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)  => {
                        return <div className="col-md-4" key={element.url}>
                        <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage?element.urlToImage:imageUrl} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source}/>
                    </div> 
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}  type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News