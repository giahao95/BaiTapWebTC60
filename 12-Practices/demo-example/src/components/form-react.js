import React, { useState, useRef } from 'react';
import {
  Button,
  message,
  Form,
  Input,
  InputNumber,
  Table,
  Popconfirm,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const FormReact = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [age, setAge] = useState('');
  // const [user, setUser] = useState({ name: '', email: '', age: '' });
  const [members, setMembers] = useState([]);
  const formRef = useRef(null);

  // const handleSubmitMember = (e) => {
  //   e.preventDefault();

  //   if (user.name && user.email && user.age) {
  //     const newMember = {
  //       name: user.name,
  //       email: user.email,
  //       age: user.age,
  //     };
  //     setMembers([...members, newMember]);
  //   }
  // };

  // const handleChangeValue = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  // return (
  //   <article>
  //     <form onSubmit={handleSubmitMember}>
  //       <div className="name">
  //         <label htmlFor="name">Name:</label>
  //         <input
  //           id="name"
  //           name="name"
  //           type="text"
  //           value={user.name}
  //           onChange={handleChangeValue}
  //         />
  //       </div>{' '}
  //       <div className="email">
  //         <label htmlFor="email">Email:</label>
  //         <input
  //           id="email"
  //           name="email"
  //           type="text"
  //           value={user.email}
  //           onChange={handleChangeValue}
  //         />
  //       </div>{' '}
  //       <div className="age">
  //         <label htmlFor="age">Age:</label>
  //         <input
  //           id="age"
  //           name="age"
  //           type="text"
  //           value={user.age}
  //           onChange={handleChangeValue}
  //         />
  //       </div>
  //       <button type="submit">Add new member</button>
  //     </form>
  //     <div>
  //       {members?.map((member, index) => {
  //         return (
  //           <div key={index}>
  //             <p>{member.name}</p>
  //             <p>{member.email}</p>
  //             <p>{member.age}</p>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </article>
  // );

  const onFinish = (values) => {
    const checkEmail = members.find((member) => member.email === values.email);
    if (checkEmail) {
      message.error('Email đã tồn tại');
      return;
    }

    setMembers([...members, values]);
    message.success('Thêm thành công');
    formRef.current.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Thêm thất bại');
  };

  const confirm = (value) => {
    const filterMember = members?.filter((item) => item.email !== value.email);
    setMembers(filterMember);
    message.success('Xóa thành công');
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Xóa',
      key: 'action',
      render: (value) => (
        <Popconfirm
          title="Bạn có muốn xóa không?"
          onConfirm={() => confirm(value)}
          okText="Có"
          cancelText="Không"
        >
          <DeleteOutlined style={{ cursor: 'pointer', fontSize: '16px' }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Form
        name="basic"
        ref={formRef}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
          offset: 1,
        }}
        style={{
          maxWidth: 600,
          margin: '50px auto',
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email',
            },
            {
              type: 'email',
              message: 'Email sai định dạng',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tuổi"
          name="age"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tuổi',
            },
          ]}
        >
          <InputNumber controls={false} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 9,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table
        style={{ padding: '20px' }}
        columns={columns}
        dataSource={members}
      />
    </>
  );
};

export default FormReact;
