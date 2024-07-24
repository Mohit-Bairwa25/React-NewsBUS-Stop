import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=241c3b2483cd44128fa887a3d56505e2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    
    // Filter out duplicate articles
    const newArticles = parseData.articles.filter(newArticle => 
      !this.state.articles.some(existingArticle => existingArticle.url === newArticle.url)
    );
  
    this.setState({
      articles: [...this.state.articles, ...newArticles],
      totalResults: parseData.totalResults,
      loading: false,
    });
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
    return (
      <>
        <h2 className="text-center" style={{ margin: '35px 0px' }}>
          Top Headlines - Home
        </h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default Home;