import React, { useState,useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Wrapper from "../Helpers/Wrapper";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";
const AddUser = (props) => {
  const [users, setUsers] = useState({
    username: "",
    age: "",
  });

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (users.username.trim().length === 0 || users.age.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (nom-empty values).",
      });
      return;
    }
    if (parseInt(users.age) < 1) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid  age (age>0).",
      });
      return;
    }

    props.onAddUser(users.username, users.age);

    setUsers({
      username: "",
      age: "",
    });
  };

  const handleChange = (event) => {
    setUsers((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={users.username}
            name="username"
            type="test"
            onChange={handleChange}
          />
          <label htmlFor="age">Age (Year)</label>
          <input
            id="age"
            value={users.age}
            name="age"
            type="test"
            onChange={handleChange}
          />
          <Button type="submit" handleClick={addUserHandler}>
            Add New User
          </Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
