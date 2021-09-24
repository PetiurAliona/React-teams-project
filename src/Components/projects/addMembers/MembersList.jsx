const MembersList = ({ members }) => {
  return (
    <ul>
      {members?.map((member) => (
        <li key={member}>
          <p className="infoText">{member}</p>
        </li>
      ))}
    </ul>
  );
};

export default MembersList;
