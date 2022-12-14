import { useEffect, useState } from "react";
import axiosClient from "../../apis/axiosClient";
import styles from "./movie.module.scss";
import Popup from "reactjs-popup"
import FileInput from "../../component/FileInput";

const Movie = () => {
  const [movie, setMovie] = useState([]);
  const [reload, setReload] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
		name: "",
		type: "",
		img: "",
		video: "",
	});

	const handleChange = ({ currentTarget: input }) => {
    console.log(input.name, input.value);
		setData({ ...data, [input.name]: input.value });
	};

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

  const handleSubmit = async (e) => {
		e.preventDefault()
		try {
      axiosClient.post('/movie/add', data)
      .then((response) => {
        data.name = "";
        data.type = "";
        data.img = "";
        data.video = "";
        setReload(!reload)
        setIsOpen(false);
      }).catch((err) => console.log(err))
		} catch (error) {
			console.log(error)
		}
	};

  const getListMovie = () => {
    const page = 1;
    const limit = 20;
    axiosClient
      .get(`/movie/list?limit=${limit}&page=${page}`)
      .then((res) => {
        setMovie(res);
      })
      .catch((err) => console.log());
  }
  useEffect(() => {
    getListMovie();
  }, [reload]);

  return (
    <>
      <div className={styles.button}>
        <Popup onOpen={() => setIsOpen(true)} modal trigger={<button>Add Movie</button>}>
          {isOpen && <form className={styles.modal} onSubmit={handleSubmit}>
            <h2>Add New Movie</h2>
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <div className={styles.card}>
                  <div className={styles.title}>
                    <input
                      name="name"
                      type="text"
                      placeholder="Title"
                      onChange={handleChange}
                      defaultValue={data.name}
                    />
                  </div>
                  <div className={styles.dropdown}>
                    <select onChange={handleChange} value={data.type} name="type">
                      <option value=""></option>
                      <option value="Exciting Movies">Exciting Movies</option>
                      <option value="Anime Series">Anime Series</option>
                      <option value="Action Movies">Action Movies</option>
                      <option value="TV Drama">TV Drama</option>
                      <option value="Southeast Asian Movies">Southeast Asian Movies</option>
                    </select>
                  </div>
                  <FileInput
                    name="img"
                    label="Choose Image"
                    handleInputState={handleInputState}
                    type="image"
                    value={data.img}
                  />
                  <FileInput
                    name="video"
                    label="Choose Video"
                    handleInputState={handleInputState}
                    type="audio"
                    value={data.video}
                  />
                  <div className={styles.submit}>
                    <button>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>}
        </Popup>
      </div>
      <div className={styles.main}>
        {movie.map((item) => {
          return (
            <>
            <div className={styles.list}>
              <div className={styles.card}>
                <div className={styles.avatar}>
                  <img src={item.img} alt="Picture" />
                </div>
                <h6>{item.name}</h6>
                <div className={styles.type}>
                  <p>{item.type}</p>
                </div>
              </div>
            </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default Movie;
