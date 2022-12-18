import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import axiosClient from "../../apis/axiosClient";
import FileInput from "../../component/FileInput";
import styles from "./user.module.scss";
import cookie from "js-cookie";

const User = () => {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState({
		name: "",
		avatar: "",
		favorite: [],
	});

  const handleChange = ({ currentTarget: input }) => {
    console.log(input.name, input.value);
		setData({ ...data, [input.name]: input.value });
	};

	const handleInputState = (name, value) => {
    console.log(name, value);
		setData((prev) => ({ ...prev, [name]: value }));
	};

  const updateUser = (e) => {
    e.preventDefault()
    const result = {};
    Object.keys(data).forEach(function(key, index) {
      if (data[key].length > 0) {
        result[key] = data[key]
      }
    });
    axiosClient.put(`/users/${id}`, result)
    .then((res) => {
        data.name = "";
        data.avatar = "";
        data.favorite = []
        setReload(!reload)
        setIsOpenEdit(false)
      console.log(res);
    }).catch(err => console.log(err))
  }

  const getListUser = () => {
    const page = 1;
    const limit = 10;
    axiosClient
      .get(`/users/list?limit=${limit}&page=${page}`)
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => console.log());
  }

  useEffect(() => {
    getListUser();
  }, [reload]);

  return (
    <>
      <div className={styles.main}>
        {users.map((item, index) => {
          return (
            <>
              <div className={styles.list} id={item.document_id} key={index}>
                <div className={styles.card}>
                  <div className={styles.avatar}>
                    <img src={item.avatar} alt="Picture" />
                  </div>
                  <h6>{item.name}</h6>
                </div>
                <div className={styles.copy}>
                  <Popup onOpen={() => {setIsOpenEdit(true); setId(item.document_id)}} modal trigger={<button className={styles.edit}>Edit</button>}>
                    {
                      isOpenEdit && <form className={styles.modal} onSubmit={updateUser}>
                        <h2>Edit Movie</h2>
                        <div className={styles.content}>
                          <div className={styles.wrapper}>
                            <div className={styles.card}>
                              <div className={styles.title}>
                                <input
                                  name="name"
                                  type="text"
                                  placeholder="Name"
                                  onChange={handleChange}
                                  defaultValue={item.name}
                                />
                              </div>
                              <FileInput
                                name="avatar"
                                label="Choose Image"
                                handleInputState={handleInputState}
                                type="image"
                                value={data.avatar}
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
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default User;
