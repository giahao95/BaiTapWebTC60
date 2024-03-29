import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    // Sử dụng props từ component cha
    super(props);

    // Khai báo giá trị khởi tạo cảu state
    this.state = {
      counter: 1,
    };
  }

  increase = () => {
    const counter = this.state.counter;
    this.setState({ counter: counter + 1 });
  };

  decrease = () => {
    const counter = this.state.counter;
    this.setState({ counter: counter - 1 });
  };

  render() {
    return (
      <div>
        <p>Giá trị {this.state.counter}</p>
        <button onClick={() => this.increase()}>Tăng</button>
        <button onClick={() => this.decrease()}>Giảm</button>
      </div>
    );
  }
}

export default App;
