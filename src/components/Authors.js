import { gql, useQuery } from "@apollo/client";
import SetBirthYear from "./SetBirthYear";

export const GET_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      id
      name
      bookCount
      born
    }
  }
`;

const Authors = (props) => {
  const { loading, _, data } = useQuery(GET_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
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
          {data?.allAuthors?.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birth Year</h2>
      <SetBirthYear authors={data?.allAuthors} />
    </div>
  );
};

export default Authors;
