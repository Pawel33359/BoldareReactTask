function ServantItem({ servant }) {
  return (
    <tr>
      <td>{servant.firstName}</td>
      <td>{servant.lastName}</td>
      <td>{servant.dateOfBirth}</td>
      <td>{servant.function}</td>
      <td>{servant.experience}</td>
    </tr>
  );
}

export default ServantItem;
