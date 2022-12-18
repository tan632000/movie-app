import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import axiosClient from "../../apis/axiosClient";
import styles from "./category.module.scss";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [reload, setReload] = useState(false)
  const [data, setData] = useState({
		type: "",
	});

  const getListCategory = () => {
    axiosClient.get('/category/list')
    .then((res) => {
      setCategories(res)
    }).catch(err => console.log(err))
  }

  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const updateCategory = (document_id) => {
    axiosClient.put(`/category/${document_id}`, data)
      .then((res) => {
        data.type = ''
        setReload(!reload)
      })
      .catch(err => console.log(err))
  }

  const deleteCategory = (document_id) => {
    axiosClient.delete('/category/add', data)
      .then((response) => {
        data.type = "";
        setReload(!reload)
        setIsOpenAdd(false);
      }).catch((err) => console.log(err))
  }

  const handleSubmit = (e) => {
		e.preventDefault()
		try {
      axiosClient.post('/category/add', data)
      .then((response) => {
        data.type = "";
        setReload(!reload)
        setIsOpenAdd(false);
      }).catch((err) => console.log(err))
		} catch (error) {
			console.log(error)
		}
	};

  useEffect(() => {
    getListCategory();
  }, [reload]);

  return (
    <div className={styles.container}>
      <Popup onOpen={() => setIsOpenAdd(true)} modal trigger={<button className={styles.add}>Add Category</button>}>
        {
          isOpenAdd && <form className={styles.modal} onSubmit={handleSubmit}>
            <h2>Add New Movie</h2>
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <div className={styles.card}>
                  <div className={styles.title}>
                    <input
                      name="type"
                      type="text"
                      placeholder="Title"
                      onChange={handleChange}
                      defaultValue={data.type}
                    />
                  </div>
                  <div className={styles.submit}>
                    <button>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        }
      </Popup>
      
      <h1 className={styles.title}>List Category</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ document_id, type }, index) => (
            <tr key={document_id}>
              <td>
                {index + 1}
              </td>
              <td>
                <input
                  name="type"
                  defaultValue={type}
                  type="text"
                  onChange={handleChange}
                />
              </td>
              <td>
                <button className={styles.update} onClick={() => updateCategory(document_id)}>Update</button>
                <button className={styles.delete} onClick={() => deleteCategory(document_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Category;
