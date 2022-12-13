import type { NextPage } from "next";

import Template from "../containers/Template";
import DashBoard from "../containers/Dashboard";

const DashboardPage: NextPage = () => {
  return (
    <div className="dashboard-container">
      <Template
        clasActive="dashboard"
        content={<DashBoard />}
        title="Dashboard"
      />
    </div>
  );
};

export default DashboardPage;
