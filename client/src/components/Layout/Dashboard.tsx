import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <div className="min-h-[calc(100vh-130px)] max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
