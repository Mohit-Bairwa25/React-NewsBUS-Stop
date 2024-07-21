import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1,
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=241c3b2483cd44128fa887a3d56505e2&page=1&pageSize=20";
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({articles: parseData.articles, totalResults: parseData.totalResults, page:1 })
    }

    handlePrevClick = async () =>{
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=241c3b2483cd44128fa887a3d56505e2&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({
            page: this.setState.page - 1,
            articles: parseData.articles
        })
    }

    handleNextClick = async () =>{
        console.log("Next");
        if(this.state.page+1 > Math.ceil(this.state.totalResults/20)) {

        } else{
                let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=241c3b2483cd44128fa887a3d56505e2&page=${this.state.page + 1}&pageSize=20`;
                let data = await fetch(url);
                let parseData = await data.json()
                console.log(parseData);
                this.setState({
                    page: this.setState.page + 1,
                    articles: parseData.articles
                })
            }
    }

  render() {
    return (
      <div className='container my-3'>
        <h2>NewsBUS - STOP Top Headlines</h2>
        <div className="row">
            {this.state.articles.map((element)=>{
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
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark mx-2" onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
