import React, { useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import ScoreRow from "./ScoreRow";

import { ScoresContext } from "./../../context/ScoreContext";

export default function ScoreList() {
  const {
    scores,
    loading,
    error,
    fetchScores,
    // addScore,
    // updateScore,
    // deleteScore,
  } = useContext(ScoresContext);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  return (
    <>
      {error && <h2>{error}</h2>}
      {loading && <h2>Loading..</h2>}
      <Table striped hover bordered size="sm">
        <thead>
          <tr className="table-primary">
            <th scope="col">Title</th>
            <th scope="col">Composer</th>
            <th scope="col">Style</th>
            <th scope="col">Instrumentation</th>
            <th scope="col">Owner</th>
            <th scope="col">Stock</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="score-table-body">
          {scores.length ? (
            scores.map((score) => <ScoreRow key={score.id} score={score} />)
          ) : (
            <tr>
              <td colSpan="7">No Scores</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
// const SCORES_ENDPOINT = "http://localhost:8000/scores";
// const [scores, setScores] = useState([]);
// const [loading, setLoading] = useState(false);
// const [loaded, setLoaded] = useState(false);

// useEffect(() => {
//   async function getScores() {
//     setLoading(true);
//     const response = await fetch(SCORES_ENDPOINT);
//     const data = await response.json();
//     setScores(data);
//     setLoading(false);
//     setLoaded(true);
//   }
//   if (!loaded && !loading) {
//     getScores();
//   }
// }, [scores, setScores, setLoaded, setLoading]);

// const scoreListPlaceholder = [
//   {
//     key: 156146163135,
//     style: "Jazz",
//     composer: "Gus",
//     instrumentation: ["didjeridu", "Zambomba"],
//     title: "Ahoooga 1",
//     stock: 1,
//     owner: "tailleferre",
//   },
//   {
//     key: 243636453843,
//     style: "Punk",
//     composer: "Evaristo",
//     instrumentation: ["oboe", "guitar"],
//     title: "Txus",
//     stock: 1,
//     owner: "Mikel",
//   },
// ];
