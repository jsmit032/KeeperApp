import React, { useState } from "react";

function CreateArea(props) {
  const [inputObject, setInputObject] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setInputObject(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={props.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={props.content}
        />
        <button
          onClick={(event) => {
            props.onAdd(inputObject);
            event.preventDefault();
            setInputObject("");
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
