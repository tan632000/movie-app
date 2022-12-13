import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { deviceType } from "../../utils/checkDeviceUser";

import Text from "../../component/Text";
import Button from "../../component/Button";
import BreadCrumbs from "../../component/BreadCrumbs";
import MenuIcon from "../../public/icons/hamburger-menu.svg";
import CloseIcon from "../../public/icons/close.svg";
import JoshIcon from "../../public/icons/account/josh.svg";
import AdminIconHover from "../../public/icons/account/adminHover.svg";
import styles from "./header.module.scss";
import Close from "../../component/Modal/Create";
import Popup from "reactjs-popup"

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
    cookie.remove("token_rgs_pt");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    router.push("/login");
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
        <div className={styles.text}>
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
    </div>
  );
};

Header.defaultProps = {
  showBreadcrumb: true,
  showHamburger: true,
};

export default Header;
