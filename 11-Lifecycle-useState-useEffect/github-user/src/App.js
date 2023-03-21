import { Col, Row, Typography } from 'antd';
import UserList from './components/UserList';

const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Row>
        <Col xs={24}>
          <Title level={2} style={{ textAlign: 'center', margin: '32px 0' }}>
            Github Users
          </Title>
        </Col>

        <Row>
          <UserList />
        </Row>
      </Row>
    </div>
  );
}

export default App;
