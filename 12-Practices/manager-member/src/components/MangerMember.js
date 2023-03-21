import React, { useState } from 'react';
import { data } from '../people';
import { Avatar, Button, Col, List, message, Popconfirm, Row } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const MangerMember = () => {
  const [people, setPeople] = useState(data);

  const removePeople = (peopleId) => {
    const filterpeople = people.filter((item) => {
      return item.id !== peopleId;
    });

    setPeople(filterpeople);
  };

  const confirm = (e) => {
    console.log(e);
    message.success('Dữ liệu đã xóa');
    setPeople([]);
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Dữ liệu chưa xóa');
  };

  console.log(people);
  return (
    <>
      <Row style={{ marginTop: '15px' }}>
        <Col span={16}>
          <h2>Tổng số thành viên: {people.length}</h2>
        </Col>
        <Col span={8}>
          <Popconfirm
            title="Bạn chắc muốn xóa toàn bộ không?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary">Xóa toàn bộ</Button>
          </Popconfirm>
        </Col>
      </Row>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={people}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                style={{ textAlign: 'left' }}
                avatar={<Avatar src={item.avatar} />}
                title={
                  <a href="https://ant.design">{`${item.first_name} ${item.last_name}`}</a>
                }
                description={
                  <div>
                    <Row>
                      <Col>Email: </Col>
                      <Col>{item.email}</Col>
                    </Row>
                    <Row>
                      <Col>Gender: </Col>
                      <Col>{item.gender}</Col>
                    </Row>
                    <Row>
                      <Col>Address: </Col>
                      <Col>{item.address}</Col>
                    </Row>
                  </div>
                }
              />
              <DeleteOutlined
                style={{ cursor: 'pointer', marginRight: '15px' }}
                onClick={() => removePeople(item.id)}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default MangerMember;
