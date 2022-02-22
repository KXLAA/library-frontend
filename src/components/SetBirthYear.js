import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_AUTHORS } from "./Authors";
import Select from "react-select";

const EDIT_AUTHOR = gql`
  mutation Mutation($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      bookCount
      born
    }
  }
`;

const SetBirthYear = ({ authors }) => {
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const updatedAuthor = {
    name: selectedOption?.value,
    setBornTo: Number(born),
  };

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { ...updatedAuthor } });
    console.log("add book...");
    setBorn("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
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
