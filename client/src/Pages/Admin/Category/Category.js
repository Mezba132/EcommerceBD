import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {Spin} from "antd";
import {
      createCategory,
      removeCategory,
      updateCategory,
} from '../../../Functions/Categoy'
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from 'react-paginate'
import {toast} from "react-toastify";
import LocalSearch from "../../../Components/Shared/LocalSearch";
import CreateCategoryForm from "../../../Components/Shared/Form/Admin/CreateCategory";
import Delete from "../../../Components/Shared/Modal/Delete";
import CategoryUpdate from "../../../Components/Shared/Modal/Admin/CategoryUpdate";
import CategoryList from "../../../Components/Shared/ListPages/Admin/ListCategory";
import { FetchCategories, FetchCategory } from '../../../Redux/Actions'
import {CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} from "../../../Redux/Constants";

const Category = () => {
      const [name, setName] = useState('')
      const [loading, setLoading] = useState(false)
      const [slug, setSlug] = useState('')
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [showUpdateModal, setShowUpdateModal] = useState(false);
      const [updateName, setUpdateName] = useState('')
      const [keyword, setKeyword] = useState('') // step-1
      const [pageNumber, setPageNumber] = useState(0)

      const dispatch = useDispatch()
      const { user, category }  = useSelector(state => state);

      const categories = category.getCategories
      const singleCategory = category.getCategory

      useEffect(() => {
          dispatch(FetchCategories())
          setUpdateName(singleCategory.name)
      },
      [dispatch, singleCategory])

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
            dispatch(FetchCategory(slug))
      };

      const onCancelUpdateHandler = () => {
            setShowUpdateModal(false);
            setSlug('');
      };

      const onConfirmDeleteHandler = () => {
            removeCategory(user , slug, user.token)
                  .then(res => {
                        setShowDeleteModal(false);
                        dispatch({
                          type: DELETE_CATEGORY,
                          payload : res.data
                        })
                        toast.success(`${res.data.name} deleted Successfully`)
                        dispatch(FetchCategories())
                  })
                  .catch(err => {
                        toast.error( "deleted Failed")
                  })
      }

      const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            createCategory(user,{ name } , user.token)
                  .then((res) => {
                        setLoading(false);
                        setName('')
                        toast.success(`${res.data.name} inserted Successfully`);
                        dispatch({
                            type: CREATE_CATEGORY,
                            payload : res.data
                        })
                        dispatch(FetchCategories())
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
            updateCategory(slug, user,{ updateName }, user.token )
                  .then((res) => {
                        setLoading(false);
                        setUpdateName('')
                        toast.success(`${updateName} Update Successfully`);
                        setShowUpdateModal(false);
                        setSlug('');
                        dispatch({
                            type: UPDATE_CATEGORY,
                            payload: res.data
                        })
                        dispatch(FetchCategories())
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

      const categoriesPerPages = 5;
      const pagesVisited = pageNumber * categoriesPerPages;
      const pageCount = Math.ceil(categories.length / categoriesPerPages)
      const handlePageClick = ({selected}) => {
        setPageNumber(selected)
      }

      return (
                <React.Fragment>

                    <Delete
                            showDeleteModal={showDeleteModal}
                            onCancelDeleteHandler={onCancelDeleteHandler}
                            onConfirmDeleteHandler={onConfirmDeleteHandler}
                    />

                    <CategoryUpdate
                            showUpdateModal={showUpdateModal}
                            onCancelUpdateHandler={onCancelUpdateHandler}
                            updateName={updateName}
                            setUpdateName={setUpdateName}
                            loading={loading}
                            updateSubmit={updateSubmit}
                    />

                    <div className="container-fluid">
                      <div className="row">
                          <div className="sticky-sidebar">
                              <AdminNav/>
                          </div>
                          <div className="adjustment">
                          {loading ?
                                  <div className="text-center"> <Spin tip="Loading..." /> </div> :
                                  <CreateCategoryForm
                                          handleSubmit={handleSubmit}
                                          name={name} setName={setName}
                                          loading={loading}
                                  />
                          }
                          <LocalSearch keyword={keyword} setKeyword={setKeyword}/> {/* step-2 && step-3 */}
                          {categories.length > 0 ?
                            <div className="mt-3">
                                <CategoryList
                                        categories={categories}
                                        searched={searched}
                                        keyword={keyword}
                                        onOpenUpdateHandler={onOpenUpdateHandler}
                                        onOpenDeleteHandler={onOpenDeleteHandler}
                                        pagesVisited={pagesVisited}
                                        categoriesPerPages={categoriesPerPages}
                                />
                            </div> :
                            <div className="text-center mt-5">
                                  <h1>No Category Found</h1>
                            </div>
                          }
                            <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={"paginationBtns"}
                                    previousLinkClassName={"previousBtn"}
                                    nextLinkClassName={"nextBtn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                            />
                        </div>
                      </div>
                  </div>
                </React.Fragment>
            )
}

export default Category;