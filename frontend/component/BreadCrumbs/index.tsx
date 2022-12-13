import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deviceType } from "../../utils/checkDeviceUser";
import styles from "./breadcrumbs.module.scss";

const BreadCrumbs = () => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const breadcrumbMapping = (path: string) => {
    let breadcrumb = "";
    switch (path) {
      case "dashboard":
        breadcrumb = "Home";
        break;
      case "user":
        breadcrumb = "User";
        break;
      case "movie":
        breadcrumb = "Movie";
        break;
      default:
        break;
    }
    return breadcrumb;
  };

  const splitPath = (path: string) => {
    let pathArr: string[] = [];
    let splitArr = path.split("/");
    splitArr.forEach((path) => {
      pathArr.push(breadcrumbMapping(path));
    });
    pathArr.shift();
    setCurrentPath(pathArr);
  };

  useEffect(() => {
    if (router) {
      splitPath(router.asPath);
    }
  }, []);

  useEffect(() => {
    if (deviceType() !== "desktop") {
      setIsMobile(true);
    }
  });

  return (
    <div className={`${styles.container} ${isMobile && styles.mobileUI}`}>
      {currentPath.map((item, i) => (
        <p className={styles.item} key={i}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default BreadCrumbs;
