import React, { useContext, useState } from 'react';
import { data } from '../data/data';

const MemberContext = React.createContext();

const ContextApi = () => {
  const [members, setMembers] = useState(data);

  const removeMember = (id) => {
    const membersFilter = members.filter((member) => member.id !== id);
    setMembers(membersFilter);
  };

  return (
    <MemberContext.Provider value={{ members, removeMember }}>
      <MemberList />
    </MemberContext.Provider>
  );
};

const MemberList = () => {
  const { members } = useContext(MemberContext);

  return (
    <>
      {members.map((data) => {
        return <Member key={data.id} {...data} />;
      })}
    </>
  );
};

const Member = ({ id, name }) => {
  const { removeMember } = useContext(MemberContext);

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
      <h3>{name}</h3>
      <button onClick={() => removeMember(id)}>Xóa</button>
    </div>
  );
};

export default ContextApi;
