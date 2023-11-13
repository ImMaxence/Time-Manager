import React from "react";
import User from "../components/HomeComponents/User";
import WorkingTime from "../components/HomeComponents/WorkingTime";
import ClockManager from "../components/HomeComponents/ClockManager";
import ChartManager from "../components/HomeComponents/ChartManager";
import Working from "../components/HomeComponents/Working";

const HomePage = ({ role }) => {

  return (
    <>
      {
        role === "employee" ? (
          <>
            <div className="container_all_main_component">
              <div className="grid_component">
                <Working role="employee" />
              </div>
              <div className="grid_component">
                <WorkingTime />
                <div className="grid_componentv2">
                  <ClockManager />
                  <ChartManager />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container_all_main_component">
              <div className="grid_component">
                <User />
                <Working />
              </div>
              <div className="grid_component">
                <WorkingTime />
                <div className="grid_componentv2">
                  <ClockManager />
                  <ChartManager />
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default HomePage;
