import React from "react";
import "./aqi-level-icon.styles.scss";
import { ReactComponent as Level1 } from "../../images/level1.svg";
import { ReactComponent as Level2 } from "../../images/level2.svg";
import { ReactComponent as Level3 } from "../../images/level3.svg";
import { ReactComponent as Level4 } from "../../images/level4.svg";
import { ReactComponent as Level5 } from "../../images/level5.svg";
import { ReactComponent as Level6 } from "../../images/level6.svg";

const AqiLevelIcon = ({ aqi }) => {
  switch (true) {
    case aqi < 51:
      return (
        <div className="icon-wrapper">
          <Level1 />
          <h3 className="icon-wrapper--lv1">Good</h3>
        </div>
      );
    case aqi < 101:
      return (
        <div className="icon-wrapper">
          <Level2 />
          <h3 className="icon-wrapper--lv2">Moderate</h3>
        </div>
      );
    case aqi < 151:
      return (
        <div className="icon-wrapper">
          <Level3 />
          <h3 className="icon-wrapper--lv3">Unhealthy for sensitive groups</h3>
        </div>
      );
    case aqi < 201:
      return (
        <div className="icon-wrapper">
          <Level4 />
          <h3 className="icon-wrapper--lv4">Unhealthy</h3>
        </div>
      );
    case aqi < 301:
      return (
        <div className="icon-wrapper">
          <Level5 />
          <h3 className="icon-wrapper--lv5">Very Unhealthy</h3>
        </div>
      );
    case aqi < 501:
      return (
        <div className="icon-wrapper">
          <Level6 />
          <h3 className="icon-wrapper--lv6">Hazardous</h3>
        </div>
      );
    default:
      return null;
  }
};

export default AqiLevelIcon;
