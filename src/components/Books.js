import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";

const GET_USER = gql`
  query Query {
    me {
      id
      username
      favoriteGenre
    }
  }
`;
export const GET_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
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
  // const { loading, error, data } = useQuery(GET_BOOKS);
  const [getBooks, { loading, error, data }] = useLazyQuery(GET_BOOKS);
  const user = useQuery(GET_USER);

  const filter = (genre) => {
    getBooks({ variables: { genre: genre } });
  };

  useEffect(() => {
    if (!user) {
      getBooks();
    } else getBooks({ variables: { genre: user?.data?.me.favoriteGenre } });
  }, []);

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
      <button onClick={() => filter("refactoring")}>refactoring</button>
      <button onClick={() => filter("agile")}>agile</button>
      <button onClick={() => filter("patterns")}>patterns</button>
      <button onClick={() => filter("design")}>design</button>
      <button onClick={() => filter("crime")}>crime</button>
      <button onClick={() => filter("classic")}>classic</button>
      <button onClick={getBooks}>all genres</button>
    </div>
  );
};

export default Books;
