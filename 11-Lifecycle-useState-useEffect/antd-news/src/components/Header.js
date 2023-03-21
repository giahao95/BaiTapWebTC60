import React from 'react';
import { Col, Layout, Row, Input, Image } from 'antd';
import logo from '../logo.svg';

const { Header } = Layout;
const { Search } = Input;

const HeaderComponent = (props) => {
  return (
    <Header>
      <Row>
        <Col span={16}>
          <Image width={80} src={logo} />
        </Col>
        <Col span={8}>
          <Search
            placeholder="input search text"
            enterButton="Search"
            style={{
              width: 300,
            }}
          />
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
