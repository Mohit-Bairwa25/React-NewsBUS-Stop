import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import About from './components/About';

export default class App extends Component {
  pageSize = 9;
//  apiKey = '241c3b2483cd44128fa887a3d56505e2'
    apiKey = 'ae45bdab18a54154a7f61a25a53028ae'

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            height={4}
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<Home setProgress={this.setProgress} apiKey={this.apiKey} key="home" pageSize={this.pageSize} country="in" category="general"/>} />
            <Route path="/home" element={<Home setProgress={this.setProgress} apiKey={this.apiKey} key="home" pageSize={this.pageSize} country="in" category="general"/>} />
            <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business"/>} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>} />
            <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health"/>} />
            <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science"/>} />
            <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports"/>} />
            <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology"/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}