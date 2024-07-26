import React, { Component } from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem';

export class Home extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      error: null,
    };
    document.title = `NewBus-Stop - Home`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async updateNews() {
    this.setState({ loading: true, error: null });
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(40);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let parseData = await response.json();
      
      if (!parseData.articles) {
        console.error("Unexpected API response:", parseData);
        throw new Error("API response does not contain articles");
      }

      // Filter out duplicate articles
      const newArticles = parseData.articles.filter(newArticle => 
        !this.state.articles.some(existingArticle => existingArticle.url === newArticle.url)
      );
    
      this.setState(prevState => ({
        articles: [...prevState.articles, ...newArticles],
        totalResults: parseData.totalResults || 0,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ 
        loading: false,
        error: error.message 
      });
    }
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }), () => {
      this.updateNews();
    });
  };

  render() {
    const { articles, loading, error, totalResults } = this.state;
    const uniqueArticles = Array.from(new Set(articles.map(a => a.url)))
      .map(url => articles.find(a => a.url === url));
  
    return (
      <>
        <h2 className="text-center" style={{ margin: '35px 0px', marginTop:'90px' }}>
          Top Headlines - Home
        </h2>
        {loading && <Spinner />}
        {error && <p className="text-center text-danger">{error}</p>}
        <InfiniteScroll
          dataLength={uniqueArticles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {uniqueArticles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source?.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default Home;