import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
import "./styles/home.css";

const Home = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()));
    e.target.name.value = "";
    navigate("/pokedex");
  };

  return (
    <div className="home-container">
      <img className="home-img" src="/Home/Pokedex.png" alt="" />
      <h1 className="home-title">Hi Trainer!</h1>
      <p className="home-p">Give me your name to start</p>
      <form className="home-form" onSubmit={handleSubmit}>
        <input className="home-input" id="name" type="text" />
        <button className="home-btn">Start</button>
      </form>
    </div>
  );
};

export default Home;
