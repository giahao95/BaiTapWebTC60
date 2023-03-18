import React, { useState } from 'react';
import { students } from '../data/students';

const StudentFunctionComponent = () => {
  const [student, setStudent] = useState(students);
  const handleRemove = () => {
    setStudent([]);
  };

  return (
    <>
      <h2>Thông tin học viên</h2>
      {student.length > 0 ? (
        student.map((student, index) => {
          return (
            <div style={{ borderBottom: '1px solid grey' }}>
              <p>Tên: {student.name}</p>
              <p>Tuổi: {student.age}</p>
            </div>
          );
        })
      ) : (
        <p>Đã xóa hết học viên</p>
      )}
      {student.length === 0 ? null : (
        <button onClick={handleRemove}>Xóa hết</button>
      )}
    </>
  );
};

export default StudentFunctionComponent;
