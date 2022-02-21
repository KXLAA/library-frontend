import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_AUTHORS } from "./Authors";

const EDIT_AUTHOR = gql`
  mutation Mutation($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      bookCount
      born
    }
  }
`;

const SetBirthYear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const updatedAuthor = {
    name,
    setBornTo: Number(born),
  };

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { ...updatedAuthor } });
    console.log("add book...");
    setName("");
    setBorn("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default SetBirthYear;
