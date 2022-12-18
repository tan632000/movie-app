import { useEffect, useState } from "react";
import axiosClient from "../../apis/axiosClient";
import styles from "./movie.module.scss";
import Popup from "reactjs-popup"
import FileInput from "../../component/FileInput";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(false)
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState({
		name: "",
		type: "",
		img: "",
		video: "",
	});

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

  const handleSubmit = (e) => {
		e.preventDefault()
		try {
      axiosClient.post('/movie/add', data)
      .then((response) => {
        data.name = "";
        data.type = "";
        data.img = "";
        data.video = "";
        setReload(!reload)
        setIsOpenAdd(false);
      }).catch((err) => console.log(err))
		} catch (error) {
			console.log(error)
		}
	};

  const updateMovie = (e) => {
    e.preventDefault()
    const result = {};
    Object.keys(data).forEach(function(key, index) {
      if (data[key].length > 0) {
        result[key] = data[key]
      }
    });
    
    axiosClient
      .put(`/movie/${id}`, result)  
      .then((res) => {
        data.name = "";
        data.type = "";
        data.img = "";
        data.video = "";
        setReload(!reload)
        setIsOpenEdit(false)
      })
      .catch((err) => console.log());
  }

  const getListMovie = () => {
    const page = 1;
    const limit = 20;
    axiosClient
      .get(`/movie/list?limit=${limit}&page=${page}`)
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => console.log());
  }

  useEffect(() => {
    axiosClient
    .get('/category/list')
    .then((res) => {
      setCategories(res);
    })
    .catch((err) => console.log());
  }, [])
  
  useEffect(() => {
    getListMovie();
  }, [reload]);

  return (
    <>
      <div className={styles.button}>
        <Popup onOpen={() => setIsOpenAdd(true)} modal trigger={<button>Add Movie</button>}>
          {isOpenAdd && <form className={styles.modal} onSubmit={handleSubmit}>
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
                      {
                        categories.map((item, index) => {
                          return (
                            <>
                              <option key={index} value={item.type}>{item.type}</option>
                            </>
                          )
                        })
                      }
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
        {movies.map((item, index) => {
          return (
            <>
              <div className={styles.list} id={item.document_id} key={index}>
                <div className={styles.card}>
                  <div className={styles.avatar}>
                    <img src={item.img} alt="Picture" />
                  </div>
                  <h6>{item.name}</h6>
                  <div className={styles.type}>
                    <p>{item.type}</p>
                  </div>
                </div>
                <div className={styles.copy}>
                  <Popup onOpen={() => {setIsOpenEdit(true); setId(item.document_id)}} modal trigger={<button className={styles.edit}>Edit</button>}>
                    {
                      isOpenEdit && <form className={styles.modal} onSubmit={updateMovie}>
                        <h2>Edit Movie</h2>
                        <div className={styles.content}>
                          <div className={styles.wrapper}>
                            <div className={styles.card}>
                              <div className={styles.title}>
                                <input
                                  name="name"
                                  type="text"
                                  placeholder="Title"
                                  onChange={handleChange}
                                  defaultValue={item.name}
                                />
                              </div>
                              <div className={styles.dropdown}>
                                <select onChange={handleChange} value={data.type} name="type">
                                  <option value=""></option>
                                  {
                                    categories.map((item, index) => {
                                      return (
                                        <>
                                          <option key={index} value={item.type}>{item.type}</option>
                                        </>
                                      )
                                    })
                                  }
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
                      </form>
                    }
                  </Popup>
                  <button className={styles.delete}>Delete</button>
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
