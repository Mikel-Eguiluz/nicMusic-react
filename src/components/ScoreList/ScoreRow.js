import React from "react";
//stateless component to display a row
import { Link } from "react-router-dom";
export default function ScoreRow({ score }) {
  // console.log(score);
  return (
    <tr>
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
      <td></td>
    </tr>
  );
}
