// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Layout } from 'antd';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';

const { Header, Footer, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout className="layout">
        <HeaderComponent />
        <FooterComponent />
      </Layout>
    );
  }
}

export default App;
