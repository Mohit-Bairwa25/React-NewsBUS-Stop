import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `NewBus-Stop - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews(page) {
        try {
            this.setState({ loading: true });
            this.props.setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
            this.props.setProgress(40);
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let parseData = await response.json();
            this.props.setProgress(70);
            this.setState({
                articles: parseData.articles || [],
                totalResults: parseData.totalResults,
                page: page,
                loading: false
            });
            this.props.setProgress(100);
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false, articles: [] });
        }
    }

    componentDidMount() {
        this.updateNews(1);
    }
      
    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this.updateNews(1);
        }
    }

    handlePrevClick = () => {
        if (this.state.page > 1) {
            this.updateNews(this.state.page - 1);
        }
    }
    
    handleNextClick = () => {
        if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
            this.updateNews(this.state.page + 1);
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h2>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles && this.state.articles.length > 0 ? (
                        this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <p>No articles to display</p>
                    )}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-light border border-dark" onClick={this.handlePrevClick}>← Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark mx-2" onClick={this.handleNextClick}>Next →</button>
                </div>
            </div>
        )
    }
}

export default News