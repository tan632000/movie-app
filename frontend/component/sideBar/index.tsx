import Link from "next/link";
import { useEffect, useState } from "react";
import Rectangle from "../Rectangle";
import IconDashboard from "../../public/icons/icon_dashboard.svg";
import IconStatsPage from "../../public/icons/icon_stats_page.svg";
import IconAdmin from "../../public/icons/admin-icon.svg";
import ArrowUp from "../../public/icons/sidebar/arrowUp.svg";
import ArrowDown from "../../public/icons/sidebar/arrowDown.svg";
import styles from "./sideBar.module.scss";

interface SideBarProps {
  classActive?: string;
}

const SideBar: React.FC<SideBarProps> = ({ classActive }) => {
  const [isShowDropDown, setShowDropdown] = useState(false);
  let subpaths: any[] = [];

  const areaActive = subpaths.length > 0 && subpaths.map(({ slug }) => slug);

  const showDropdownCondition =
    (classActive && areaActive && areaActive.includes(classActive)) ||
    classActive === "attendees";

  useEffect(() => {
    if (showDropdownCondition) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [classActive]);

  const spanDropdown = () => {
    setShowDropdown(!isShowDropDown);
  };

  return (
    <div className={`${styles.content} row w-100`}>
      <div className={`${styles[`side-bar`]} ${styles[`p-3`]}`}>
        <div className={`${styles.logo} ${styles.jsea}`}>
          <h3 className={styles.title}>Movie Admin Management</h3>
        </div>
        <ul className={`${styles.inner} nav nav-pills flex-column`}>
          <li
            className={`${styles.nav} ${
              classActive === "dashboard" ? styles.active : ""
            } nav-item`}
          >
            <div className={styles.line} />
            <div className={styles.icon}>
              <IconDashboard />
            </div>
            <Link href="/dashboard" className={`nav-link dashboard`}>
              Dashboard
            </Link>
            <div className={styles.rectangle}>
              <Rectangle />
            </div>
          </li>
          <li
            className={`${styles.nav} ${
              classActive === "user" ? styles.active : ""
            } nav-item`}
          >
            <div className={styles.line} />
            <div className={styles.icon}>
              <IconStatsPage />
            </div>
            <Link href="/user" className={`nav-link attendees`}>
              Users
            </Link>
            {subpaths.length > 0 && (
              <div className={styles.arrowDown} onClick={spanDropdown}>
                {isShowDropDown ? <ArrowUp /> : <ArrowDown />}
              </div>
            )}
            <div className={styles.rectangle}>
              <Rectangle colorBottom={subpaths.length > 0 ? "dark-blue" : ""} />
            </div>
          </li>
          <li
            className={`${styles.nav} ${
              classActive === "movie" ? styles.active : ""
            } nav-item`}
          >
            <div className={styles.line} />
            <div className={styles.icon}>
              <IconAdmin />
            </div>
            <Link href="/movie" className={`nav-link admin`}>
              Movie
            </Link>
            <div className={styles.rectangle}>
              <Rectangle />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
