import React, { useContext } from "react";
//stateless component to display a row
import { ScoresContext } from "./../../context/ScoreContext";
import { Link } from "react-router-dom";
export default function ScoreRow({ score }) {
  const { deleteScore } = useContext(ScoresContext);

  return (
    <tr key={score.id}>
      <td>{score.title}</td>
      <td>{score.composer}</td>
      <td>{score.style}</td>
      <td>
        <ul
          style={{
            listStyle: "none",
            paddingLeft: "0",
            margin: "0",
          }}
        >
          {score.instrumentation.map((instrument, index) => (
            <li
              style={{ display: "inline-block", marginRight: "0.5rem" }}
              key={index}
            >
              {instrument}
            </li> //it wants keys...
          ))}
        </ul>
      </td>
      <td>{score.owner}</td>
      <td>{score.stock}</td>
      <td>
        <Link to={`/scores/update/${score.id}`} className="update-link">
          Update
        </Link>
        <button onClick={() => deleteScore(score.id)} className="delete-btn">
          Delete
        </button>
      </td>
    </tr>
  );
}
