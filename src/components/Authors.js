import { gql, useQuery } from "@apollo/client";

const GET_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;

const Authors = (props) => {
  const {
    loading,
    error,
    data: { allAuthors },
  } = useQuery(GET_AUTHORS);

  console.log(allAuthors);
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
