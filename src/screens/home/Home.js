import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

// import { ToastContext } from "../../components/Toast";
import Button from "../../components/Button";

import "./style.css";

const HomeBG = lazy(() => import("./components/HomeBG"));

const Home = () => {
  const navigate = useNavigate();

  // const { setToast } = React.useContext(ToastContext);
  // React.useEffect(() => {
  //   // setToast({
  //   //   message: "Hello!!!",
  //   //   autoClose: 10000,
  //   //   type: 'success',
  //   // });
  //   // setToast({
  //   //   message: "Hello!!!",
  //   //   autoClose: 10000,
  //   //   type: 'danger',
  //   // });
  //   setToast({
  //     message: "Hello!!!",
  //     autoClose: 10000,
  //     type: 'info',
  //   });
  //   // setToast({
  //   //   message: "Hello!!!",
  //   //   autoClose: 10000,
  //   // });
  // }, [setToast]);

  const handleClickNewGame = () => {
    navigate("/settings");
  };
  const handleClickJoinGame = () => {
    navigate("/join");
  };

  return (
    <section className="home">
      <h2 className="main-title">SPYFALL</h2>
      <Button text="HOST GAME" color="#ca3e47" onClick={handleClickNewGame} />
      <Button text="JOIN GAME" color="#ca3e47" onClick={handleClickJoinGame} />
      {window.innerWidth > 767 && (
        <Suspense>
          <HomeBG />
        </Suspense>
      )}
    </section>
  );
};

export default Home;
