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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewBus-Stop - Home`;
  }

  async updateNews() {
    this.setState({ loading: true });
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=241c3b2483cd44128fa887a3d56505e2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(40);
    try {
      let data = await fetch(url);
      let parseData = await data.json();
      
      // Filter out duplicate articles
      const newArticles = parseData.articles.filter(newArticle => 
        !this.state.articles.some(existingArticle => existingArticle.url === newArticle.url)
      );
    
      this.setState(prevState => ({
        articles: [...prevState.articles, ...newArticles],
        totalResults: parseData.totalResults,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.setState({ page: 1 }, () => {
      this.updateNews();
    });
  }

  fetchMoreData = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }), () => {
      this.updateNews();
    });
  };

  render() {
    const uniqueArticles = Array.from(new Set(this.state.articles.map(a => a.url)))
      .map(url => this.state.articles.find(a => a.url === url));
  
    return (
      <>
        <h2 className="text-center" style={{ margin: '35px 0px' }}>
          Top Headlines - Home
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={uniqueArticles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
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
                    source={element.source.name}
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