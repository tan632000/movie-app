import { useEffect, useState } from "react";
import axiosClient from "../../apis/axiosClient";
import styles from "./user.module.scss";
const User = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const page = 1;
    const limit = 10;
    axiosClient
      .get(`/users/list?limit=${limit}&page=${page}`)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log());
  }, []);
  return (
    <div className={styles.main}>
      {data.map((item) => {
          return (
            <>
            <div className={styles.list}>
              <div className={styles.card}>
                <div className={styles.avatar}>
                  <img src={item.avatar} alt="Picture" />
                </div>
                <h6>{item.name}</h6>
              </div>
            </div>
            </>
          );
        })}
      
    </div>
  );
};
export default User;
