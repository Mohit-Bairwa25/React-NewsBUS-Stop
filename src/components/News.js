import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults: 0
        }
    }

    async componentDidMount(){
        this.setState({loading:true});
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=241c3b2483cd44128fa887a3d56505e2&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({articles: parseData.articles, totalResults: parseData.totalResults, page:1, loading:false })
    }

    handlePrevClick = async () =>{
        this.setState({loading:true});
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=241c3b2483cd44128fa887a3d56505e2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({
            page: this.setState.page - 1,
            articles: parseData.articles,
            loading:false
        })
    }

    handleNextClick = async () =>{
        console.log("Next");
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {  
                this.setState({loading:true});
                let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=241c3b2483cd44128fa887a3d56505e2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
                let data = await fetch(url);
                let parseData = await data.json()
                this.setState({
                    page: this.setState.page + 1,
                    articles: parseData.articles,
                    loading:false
                })
        }
    }

  render() {
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return  <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} 
                            description={element.description?element.description:""} 
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}/>
                        </div>
            })}
        </div>
        <div className="cotainer d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-light border border-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark mx-2" onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
