import React, { useState } from 'react';

const FormReact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [members, setMembers] = useState([]);

  const handleSubmitMember = (e) => {
    e.preventDefault();

    if (name && email && age) {
      const newMember = {
        name: name,
        email: email,
        age: age,
      };
      setMembers([...members, newMember]);
    }
  };

  return (
    <article>
      <form onSubmit={handleSubmitMember}>
        <div className="name">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>{' '}
        <div className="email">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>{' '}
        <div className="age">
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Add new member</button>
      </form>
      <div>
        {members?.map((member, index) => {
          return (
            <div key={index}>
              <p>{member.name}</p>
              <p>{member.email}</p>
              <p>{member.age}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default FormReact;
