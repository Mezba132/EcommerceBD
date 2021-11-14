import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {Spin} from "antd";
import {
      createCategory,
      getCategories,
      removeCategory,
      updateCategory,
      getCategory
} from '../../../Functions/Categoy'
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
      EditOutlined,
      DeleteOutlined
} from '@ant-design/icons';
import Modal from "../../../Components/Shared/Modal";
import LocalSearch from "../../../Components/Shared/LocalSearch";
import CreateCategoryForm from "../../../Components/Shared/Form/CreateCategory";

const Category = () => {
      const [name, setName] = useState('')
      const [loading, setLoading] = useState(false)
      const [categories, setCategories] = useState([]);
      const [slug, setSlug] = useState('')
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [showUpdateModal, setShowUpdateModal] = useState(false);
      const [updateName, setUpdateName] = useState('')
      const [keyword, setKeyword] = useState('') // step-1

      const { user }  = useSelector(user => user);

      useEffect(() => {
            loadCategories()
      }, [])

      const onOpenDeleteHandler = (slug) => {
            setShowDeleteModal(true);
            setSlug(slug);
      };

      const onCancelDeleteHandler = () => {
            setShowDeleteModal(false);
            setSlug('');
      };

      const onOpenUpdateHandler = (slug) => {
            setShowUpdateModal(true);
            setSlug(slug);
            getCategory(slug)
                  .then(res => {
                        setUpdateName(res.data.name)
                  })
      };

      const onCancelUpdateHandler = () => {
            setShowUpdateModal(false);
            setSlug('');
      };

      const loadCategories = () => {
            setLoading(true);
            getCategories()
                  .then((res) => {
                        setLoading(false);
                        setCategories(res.data);
                  })
      };

      const onConfirmDeleteHandler = () => {
            removeCategory(slug, user.idToken)
                  .then(res => {
                        setShowDeleteModal(false);
                        toast.success(`${res.data.name} deleted Successfully`)
                        loadCategories();
                  })
                  .catch(err => {
                        toast.error( "deleted Failed")
                  })
      }

      const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            createCategory({ name } , user.idToken)
                  .then(() => {
                        setLoading(false);
                        setName('')
                        toast.success(`${name} inserted Successfully`);
                        loadCategories();
                  })
                  .catch(err => {
                        console.log(err)
                        setLoading(false);
                        setName('')
                        toast.error(`${name} insert Failed`);
                  })
      }

      const updateSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            updateCategory(slug,{ updateName } , user.idToken)
                  .then(() => {
                        setLoading(false);
                        setUpdateName('')
                        toast.success(`${updateName} Update Successfully`);
                        setShowUpdateModal(false);
                        setSlug('');
                        loadCategories()
                  })
                  .catch(err => {
                        setLoading(false);
                        setUpdateName('')
                        toast.error(`${updateName} Updated Failed`);
                        setShowUpdateModal(false);
                        setSlug('');
                  })
      }

      // step-4
      const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

      return (
                <React.Fragment>
                    <Modal
                          show={showDeleteModal}
                          onCancel={onCancelDeleteHandler}
                          header="Are You Sure ?"
                          footerClass="place-item__modal-actions"
                          footer={
                            <React.Fragment>
                              <button className="btn btn-danger float-right mb-2 ml-2" onClick={onConfirmDeleteHandler}>Delete</button>
                              <button className="btn btn-primary float-right mb-2 ml-2" onClick={onCancelDeleteHandler}>Cancel</button>
                            </React.Fragment>
                          }>
                          <div>
                            <p>Would You want to Delete ?</p>
                          </div>
                    </Modal>

                    <Modal
                          show={showUpdateModal}
                          onCancel={onCancelUpdateHandler}
                          header="Update Category"
                          children={
                            <div>
                                <p className="font-weight-bold">Update Category</p>
                                <div className="form-group">
                                <input
                                  name=""
                                  placeholder="Add New Category"
                                  className="form-control"
                                  type="text"
                                  onChange={e => setUpdateName(e.target.value)}
                                  autoFocus
                                  value={updateName}
                                  disabled={loading}
                                />
                              </div>
                            </div>
                          }
                          footer={
                            <React.Fragment>
                              <button
                                type="submit"
                                className="btn btn-primary float-right ant-btn-lg"
                                disabled={!updateName || updateName.length < 2 || loading}> Update
                              </button>
                              <span
                                className="btn btn-warning float-right ant-btn-lg mr-3"
                                onClick={onCancelUpdateHandler}> Cancel
                              </span>
                            </React.Fragment>
                          }
                          onSubmit={updateSubmit}
                          footerClass="mb-5"
                    >
                    </Modal>

                    <div className="container-fluid">
                      <div className="row">
                          <div className="col-md-2">
                              <div className="col-md-6 bg-dark h-100" id="sticky-sidebar">
                                  <AdminNav/>
                              </div>
                          </div>
                        <div className="col-md-10 content">
                          {loading ? <div className="text-center"> <Spin tip="Loading..." /> </div> :  <CreateCategoryForm handleSubmit={handleSubmit} name={name} setName={setName} loading={loading} />}
                          <LocalSearch keyword={keyword} setKeyword={setKeyword}/> {/* step-2 && step-3 */}
                          {categories.length > 0 ?
                            <div className="mt-3">
                              <table className="table table-striped table-dark">
                                <thead className="text-center">
                                      <tr>
                                            <th>Category Name</th>
                                            <th>Action</th>
                                      </tr>
                                </thead>
                                  {/* Step-5 "filter(searched(keyword))" */}
                                  {categories.filter(searched(keyword)).map( c =>
                                    <tbody key={c._id}>
                                      <tr>
                                        <td className='text-center'>{c.name}</td>
                                        <td className='text-center'>
                                          <span
                                                onClick={() => onOpenUpdateHandler(c.slug)}
                                                className="btn btn-md">
                                                <EditOutlined/>
                                          </span>
                                          <span
                                                onClick={() => onOpenDeleteHandler(c.slug)}
                                                className="btn btn-md">
                                                      <DeleteOutlined/>
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  )}
                              </table>
                            </div> :
                            <div className="text-center mt-5">
                                  <h1>No Category Found</h1>
                            </div>

                          }
                        </div>
                      </div>
                  </div>
                </React.Fragment>
            )
}

export default Category;