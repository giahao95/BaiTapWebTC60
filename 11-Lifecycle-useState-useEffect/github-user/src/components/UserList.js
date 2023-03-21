import { Avatar, Card, Col, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then((res) => res.json())
      .then((users) => setUserList(users));
  }, []);

  const renderUserList = () => {
    return userList?.map((user) => {
      return (
        <Col xs={7} md={6} key={user.id} style={{ padding: '10px 15px' }}>
          <Card size="small">
            <Space size="large">
              <Avatar src={user.avatar_url} size="large" />
              <p style={{ fontSize: '20px' }}>{user.login}</p>
            </Space>
          </Card>
        </Col>
      );
    });
  };

  return <>{renderUserList()}</>;
};

export default UserList;
