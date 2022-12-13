import { useEffect, useState } from "react";
import { deviceType } from "../../utils/checkDeviceUser";
import SideBar from "../../component/sideBar";
import Header from "../header";
import styles from "./template.module.scss";

interface TemplateProps {
  content: JSX.Element;
  clasActive: string;
  title: string;
  subTitle?: string;
  noTab?: boolean;
  option?: string;
  setDay?: Function;
}

const Template: React.FC<TemplateProps> = ({
  noTab,
  content,
  clasActive,
  title,
  subTitle,
  option,
  setDay,
}) => {
  const [isShowSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (deviceType() === "desktop") {
      setShowSidebar(true);
    }
    if (deviceType() !== "desktop") {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      {isShowSidebar && (
        <div className={`${styles.navbar} navbar`}>
          <SideBar classActive={clasActive} />
        </div>
      )}
      <div
        className={`${styles.body} ${!isShowSidebar && styles.fullScreen} ${
          isMobile && styles.mobileUI
        }`}
      >
        <nav className={styles.header}>
          <Header
            title={title}
            subTitle={subTitle}
            noTab={noTab}
            option={option}
            setDay={setDay}
          />
        </nav>
        <div className={styles.main}>{content}</div>
      </div>
    </div>
  );
};

export default Template;
