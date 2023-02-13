import Nav from "./Nav";
import MenuPopupState from "./MenuPopup";
import Fire from "../components/Fire";
import { getUserData, getIssData } from "../components/Fire";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Viewer, Entity } from "resium";
import { Cartesian3, ModelGraphics } from "cesium";

export default function Dashboard({ setUser, setAuthState, user }) {
  useEffect(() => {
    console.log(user);
    getUserData(user);
  }, []);

  //Cesium Token
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjgxOGMxNi1kYTEyLTQyNjktYTE4My1hMjQ1MjFkYzc3YzMiLCJpZCI6MTI0MTAwLCJpYXQiOjE2NzYwNzY1MjF9.9vl7qDlP0KYS-5DJI01QH4xLfcVZiAbLAwk6qauAjzk";

  //Default position state
  const [position, setPosition] = useState(
    Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100)
  );

  const [issData, setIssData] = useState();
  const [issClicked, setIssClicked] = useState(false);

  //Storing updating API coordinates
  useEffect(() => {
    getIssData().then((data) => {
      setIssData(data);
    });
  }, [issData]);

  let viewerRef = useRef(null);

  const issGrazeButtonHandler = () => {
    //"Graze the earth" button
    if (viewerRef.current) {
      setIssClicked(!issClicked);
    }
  };

  const modelGraphics = new ModelGraphics({
    // ISS 3D model
    uri: "/img/ISS_stationary.glb",
    scale: 0,
    minimumPixelSize: 50,
    maximumPixelSize: 50,
    altitude: 420000,
  });

  useEffect(() => {
    if (issData) {
      let altitude = 420000;

      if (issClicked) {
        altitude = 12000;
      } else {
        altitude = 420000;
      }

      setPosition(
        Cartesian3.fromDegrees(
          Number(issData.iss_position.longitude),
          Number(issData.iss_position.latitude),
          altitude
        )
      );

      const info = document.querySelector(".cesium-infoBox-title");
      info.innerHTML = "International Space Station";
    }
  }, [issData, issClicked]);

  return (
    <div className="dashboard">
      <Nav />
      <div className="main">
        <MenuPopupState
          setUser={setUser}
          setAuthState={setAuthState}
          user={user}
        />
      </div>
      <Fire user={user} />
      <div>
        {issData ? (
          <div className="issHeader">
            <div>
              <h1>Current Position of ISS</h1>
              <p>Latitude: {issData.iss_position.latitude}</p>
              <p>Longitude: {issData.iss_position.longitude}</p>
              <button onClick={issGrazeButtonHandler}>Graze The Earth</button>
            </div>
            <div>
              <p>
                Each time the coordinates update is equivalent to 1 nautical
                mile <br /> That's over 5 miles a second! <br />
                <span className="spanclass">
                  {" "}
                  Click "Graze the Earth" to simulate traveling the speed of the
                  ISS at the same altitude as a Boeing 757 (17,500mph at
                  32,000ft) <br /> (For best experience, use flying over land){" "}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <Viewer ref={viewerRef}>
          <Entity position={position} model={modelGraphics}></Entity>
        </Viewer>
      </div>
    </div>
  );
}
