import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { GET_BOOKS } from "../components/Books";

export const useFilter = (genre) => {
  const [allBooks, { loading, data }] = useLazyQuery(GET_BOOKS, {
    variables: { genre: genre },
  });

  allBooks();

  return [data, loading];
};
