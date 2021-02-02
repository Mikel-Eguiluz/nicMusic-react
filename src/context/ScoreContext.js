import React, { createContext, useState } from "react";
import { useToasts } from "react-toast-notifications";

export const ScoresContext = createContext({
  fetchScores: () => [],
  addScore: () => {},
  updateScore: () => {},
  deleteScore: () => {},
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
  const SCORES_ENDPOINT = "http://localhost:8000/scores/";

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
        autoDismiss: true,
      });
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message || err.statusText}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  const updateScore = async (id, updates) => {
    console.log("updating", id, updates);
    let updatedScore = null;
    try {
      const response = await fetch(`${SCORES_ENDPOINT}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (response.status !== 200) {
        throw response;
      }
      // Get index
      const index = scores.findIndex((score) => score.id === id);
      console.log(index);

      const oldScore = scores[index];
      console.log("oldScore", oldScore);

      // Merge with updates
      updatedScore = {
        // legit use of 'var', so can be seen in catch block
        ...oldScore,
        ...updates, // order here is important for the override!!
      };
      console.log("updatedScore", updatedScore);
      // recreate the scores array
      const updatedScores = [
        ...scores.slice(0, index),
        updatedScore,
        ...scores.slice(index + 1),
      ];
      localStorage.setItem("scores", JSON.stringify(updatedScores));
      addToast(`Updated ${updatedScore.title}`, {
        appearance: "success",
        autoDismiss: true,
      });
      setScores(updatedScores);
    } catch (err) {
      console.log(err);
      addToast(`Error: Failed to update ${updatedScore.title}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const deleteScore = async (id) => {
    let deletedScore = null;
    console.log(id);
    try {
      const response = await fetch(`${SCORES_ENDPOINT}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw response;
      }
      // Local
      const index = scores.findIndex((score) => score.id === id);
      console.log("dasdas", index);
      deletedScore = scores[index];

      const updatedScores = [
        ...scores.slice(0, index),
        ...scores.slice(index + 1),
      ];
      localStorage.setItem("scores", JSON.stringify(updatedScores));
      setScores(updatedScores);
      addToast(`Deleted ${deletedScore.title}`, {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (err) {
      console.log("dasdas", err);
      addToast(`Error: Failed to delete ${deletedScore.title}`, {
        appearance: "error",
        autoDismiss: true,
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
        updateScore,
        deleteScore,
      }}
    >
      {props.children}
    </ScoresContext.Provider>
  );
};
