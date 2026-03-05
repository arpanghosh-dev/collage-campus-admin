import dashboardicon from '../../assets/images/icon-dashboard.svg';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      <aside className="sidebar">
        <div className="sidebarmenu">
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) => `rounded-[10px] flex ${isActive ? 'active' : ''}`}
              >
                <span>
                  <img src={dashboardicon} alt="icon" />
                </span>{' '}
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
