import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import cookie from "js-cookie";
import moment from "moment";
import axiosClient from "../../apis/axiosClient";
import { deviceType } from "../../utils/checkDeviceUser";

import { subpathsBnef } from "../../utils/subpaths";
import Text from "../../component/Text";
import Button from "../../component/Button";
import Dropdown from "../../component/dropdown";
import Tab from "../../component/Tab";
import BreadCrumbs from "../../component/BreadCrumbs";
import MenuIcon from "../../public/icons/hamburger-menu.svg";
import CloseIcon from "../../public/icons/close.svg";
import AdminIcon from "../../public/icons/account/admin.svg";
import JoshIcon from "../../public/icons/account/josh.svg";
import AdminIconHover from "../../public/icons/account/adminHover.svg";
import ViewerIcon from "../../public/icons/account/viewer.svg";
import ViewerIconHover from "../../public/icons/account/viewerHover.svg";
import BoothIcon from "../../public/icons/account/booth.svg";
import BoothIconHover from "../../public/icons/account/boothHover.svg";
import CheckinIcon from "../../public/icons/account/checkin.svg";
import CheckinIconHover from "../../public/icons/account/checkinHover.svg";
import RegLeaderIcon from "../../public/icons/account/regLeader.svg";
import RegLeaderIconHover from "../../public/icons/account/regLeaderHover.svg";
import RegStaffIcon from "../../public/icons/account/regStaff.svg";
import RegStaffIconHover from "../../public/icons/account/regStaffHover.svg";
import Area1Icon from "../../public/icons/account/area1.svg";
import Area1IconHover from "../../public/icons/account/area1Hover.svg";
import Area2Icon from "../../public/icons/account/area2.svg";
import Area2IconHover from "../../public/icons/account/area2Hover.svg";
import styles from "./header.module.scss";

interface HeaderProps {
  title?: string;
  subTitle?: string;
  classStyles?: string;
  showBreadcrumb?: boolean;
  showHamburger?: boolean;
  noTab?: boolean;
  setDay?: Function;
  option?: string;
}

const Header: React.FC<HeaderProps> = ({
  setDay,
  title,
  subTitle,
  classStyles,
  showBreadcrumb,
  showHamburger,
  noTab,
  option,
}) => {
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(false);
  const dispatch = useDispatch();

  let subpaths: any[] = [];

  const router = useRouter();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<any>();
  const [iconHover, setIconHover] = useState<any>();
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [defaultDay, setDefaultDay] = useState<string>("");
  const logoutRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (deviceType() !== "desktop" || router.asPath === "/qr-code") {
      setIsDarkBackground(true);
    }
  }, []);

  const logout = (e: any) => {
    e.preventDefault();
    axiosClient.post<any, any>("/logout").then((data) => {
      if (data.success === true) {
        cookie.remove("token_rgs_pt");
        localStorage.removeItem("username");
        localStorage.removeItem("role_id");
        router.push("/login");
      }
    });
  };

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username") || "{}");
    const roleId = JSON.parse(localStorage.getItem("role_id") || "{}");
    if (JSON.stringify(username) !== JSON.stringify({})) {
      setName(username);
      if (JSON.stringify(roleId) !== JSON.stringify({})) {
        setIcon(getIcon(roleId, username).icon);
        setIconHover(getIcon(roleId, username).iconHover);
      }
    }
    if (deviceType() !== "desktop") {
      setIsMobile(true);
    }
  }, []);

  const toggleLogoutButton = () => {
    setShowLogoutButton((showLogoutButton) => !showLogoutButton);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    if (e.target.href === window.location.href) {
      setShowMenu(false);
    } else {
      router.push(e.target.href);
    }
  };

  const setDayData = (value: string | number) => {
    if (setDay) {
      setDay(value);
    }
  };

  const handleChangeTab = (tab: any) => {
    setDefaultDay(tab.label);
    setDayData(tab.value);
  };

  useEffect(() => {
    if (showMenu) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.removeProperty("overflow");
    }
  }, [showMenu]);

  const getIcon = (role: number, username: string) => {
    return { icon: <JoshIcon />, iconHover: <AdminIconHover /> };
  };

  return (
    <div
      className={`${styles.container} ${isMobile && styles.mobileUI} ${
        classStyles && styles[`${classStyles}`]
      }`}
    >
      <div className={styles.account}>
        <BreadCrumbs />
        {isMobile && showHamburger && (
          <button
            className={styles.hamburger}
            onClick={() => setShowMenu(true)}
          >
            <MenuIcon />
          </button>
        )}
        <div className={styles.user} onClick={toggleLogoutButton}>
          <Text
            content={name}
            size={name.length > 2 ? "title-7" : "heading-6"}
            color={isDarkBackground ? "violet" : "blue"}
          />
          <div className={styles["user-icon"]}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.iconHover}>{iconHover}</div>
          </div>
          {showLogoutButton && (
            <div className={styles.logout} ref={logoutRef}>
              <Button
                text="Logout"
                handleClick={logout}
                color="red"
                size="72"
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.title}>
        <div className={styles["text"]}>
          <Text
            content={title}
            size="title-9"
            color="mobile-dark-red"
            classStyles={option}
          />
        </div>
        <div className={styles.subTitle}>
          <Text color="blue-white" content={subTitle} size="title-9" />
        </div>
        <div className={styles.line} />
      </div>
      <div className={`${styles.menu} ${showMenu && styles.show}`}>
        <div className={styles.wrapper} ref={menuRef}>
          <button className={styles.close} onClick={() => setShowMenu(false)}>
            <CloseIcon />
          </button>
          <div className={styles.content}>
            <div className={styles.heading}>
              <a
                href="/attendees"
                onClick={handleClick}
                className={`${styles.item} ${
                  router.asPath == "/attendees" ? styles.active : ""
                }`}
              >
                Statistics Overview
              </a>
            </div>
            {subpaths.length > 0 && (
              <ul className={styles.listItem}>
                {subpaths.map(({ slug, label }) => (
                  <li>
                    <a
                      href={`/attendees/${slug}`}
                      onClick={handleClick}
                      className={`${styles.item} ${
                        router.asPath == `/attendees/${slug}`
                          ? styles.active
                          : ""
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {isMobile && (
        <div className={`${styles.dim} ${showMenu && styles.show}`} />
      )}
    </div>
  );
};

Header.defaultProps = {
  showBreadcrumb: true,
  showHamburger: true,
};

export default Header;
