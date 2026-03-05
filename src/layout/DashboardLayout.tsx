import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content-col flex flex-col">
        <Header />
        <div className="dashboard-content-wrap">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
