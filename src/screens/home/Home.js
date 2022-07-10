import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { ToastContext } from "../../components/Toast";

import { ReactComponent as SpySvg } from "./assets/user-secret-solid.svg";
import { ReactComponent as UserSvg } from "./assets/user-solid.svg";
import { ReactComponent as AstronautSvg } from "./assets/user-astronaut-solid.svg";
import { ReactComponent as DoctorSvg } from "./assets/user-doctor-solid.svg";
import { ReactComponent as GraduateSvg } from "./assets/user-graduate-solid.svg";
import { ReactComponent as NinjaSvg } from "./assets/user-ninja-solid.svg";
import { ReactComponent as UserTieSvg } from "./assets/user-tie-solid.svg";

import Button from "../../components/Button";

import "./style.css";

const Home = () => {
  const navigate = useNavigate();

  const { setToast } = useContext(ToastContext);
  useEffect(() => {
    // setToast({
    //   message: "Hello!!!",
    //   autoClose: 10000,
    //   type: 'success',
    // });
    // setToast({
    //   message: "Hello!!!",
    //   autoClose: 10000,
    //   type: 'danger',
    // });
    setToast({
      message: "Hello!!!",
      autoClose: 10000,
      type: 'info',
    });
    // setToast({
    //   message: "Hello!!!",
    //   autoClose: 10000,
    // });
  }, [setToast]);

  const handleClickNewGame = () => {
    navigate("/settings");
  };
  const handleClickJoinGame = () => {
    navigate("/join");
  };

  return (
    <section className="home">
      <h2 className="main-title">SPYFALL</h2>
      <Button
        text="HOST GAME"
        color="#ca3e47"
        onClick={handleClickNewGame}
      />
      <Button
        text="JOIN GAME"
        color="#ca3e47"
        onClick={handleClickJoinGame}
      />
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}} />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg  style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg  style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg/>
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg  style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg  style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg style={{"--svgclr":"#ca3e47"}}/>
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
      <div className="row">
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
        <div>
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
          <AstronautSvg />
          <UserSvg />
          <DoctorSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <GraduateSvg />
          <UserSvg />
          <UserSvg />
          <NinjaSvg />
          <UserSvg />
          <UserTieSvg />
          <UserSvg />
          <UserSvg />
          <SpySvg />
          <UserSvg />
          <UserSvg />
        </div>
      </div>
    </section>
  );
};

export default Home;
