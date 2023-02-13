import * as React from "react";
import addBook from "../components/Fire";

export default function Temp() {
  return (
    <div>
      <form className="add">
        <label for="title">Title:</label>
        <input type="text" name="title" required />
        <label for="author">Author:</label>
        <input type="text" name="author" required />
        <button type="submit" onClick={addBook}>
          {" "}
          add a new book{" "}
        </button>
      </form>
    </div>
  );
}
