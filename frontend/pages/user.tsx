import type { NextPage } from "next";
import User from "../containers/User";

import Template from "../containers/Template";

const UserPage: NextPage = () => {
  return (
    <div className="dashboard-container">
      <Template clasActive="user" content={<User />} title="User Lists" />
    </div>
  );
};

export default UserPage;
