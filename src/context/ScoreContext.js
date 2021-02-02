import React, { createContext, useState } from "react";
import { useToasts } from "react-toast-notifications";

export const ScoresContext = createContext({
  fetchScores: () => [],
  addScore: () => {},
  // updateScore: () => {},
  // deleteScore: () => {},
  loaded: false,
  loading: false,
  error: null,
  scores: [],
});

export const ScoresProvider = (props) => {
  const [scores, setScores] = useState(() => {
    return JSON.parse(localStorage.getItem("scores")) || []; // json.parse returns Falsy if there is nothing there
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToasts();
  const SCORES_ENDPOINT = "http://localhost:8000/scores";

  const fetchScores = async () => {
    // console.log('loading', loading);
    // console.log('error', error);
    if (loading || loaded || error) {
      return;
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch(SCORES_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem("scores", JSON.stringify(data));
      setScores(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  const addScore = async (formData) => {
    console.log("about to add", formData);
    //probably will need to make the shapes match
    try {
      //Remote
      const response = await fetch(SCORES_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.status !== 201) {
        // 201 means POST was ok
        throw response;
      }
      //Local
      const savedScore = await response.json();
      console.log("got data", savedScore);
      const newScore = [...scores, savedScore]; // push
      localStorage.setItem("scores", JSON.stringify(newScore));
      setScores(newScore);
      addToast(`Saved ${savedScore.title}`, {
        appearance: "success",
      });
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message || err.statusText}`, {
        appearance: "error",
      });
    }
  };
  return (
    <ScoresContext.Provider
      value={{
        scores,
        loading,
        error,
        fetchScores,
        addScore,
        // updateScore,
        // deleteScore,
      }}
    >
      {props.children}
    </ScoresContext.Provider>
  );
};
