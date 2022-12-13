import { useEffect, useState } from "react";
import axiosClient from "../../apis/axiosClient";
import styles from "./movie.module.scss";
const Movie = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const page = 1;
    const limit = 10;
    axiosClient
      .get(`/movie/list?limit=${limit}&page=${page}`)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log());
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.bottom}></div>
      <div className={styles.list}>
        {data.map((item) => {
          return (
            <>
              <div className={styles.card}>
                <img src={item.img} alt="Picture" />
                <div className={styles.container}>
                  <div>{item.name}</div>
                  <div>{item.type}</div>
                  {/* <div>{item.video}</div> */}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Movie;
