import { gql, useQuery } from "@apollo/client";

export const GET_BOOKS = gql`
  query AllBooks {
    allBooks {
      genres
      author {
        name
        bookCount
        born
        id
      }
      published
      title
      id
    }
  }
`;
const Books = (props) => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  console.log(data);

  if (loading) {
    return <div>loading...</div>;
  }
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
