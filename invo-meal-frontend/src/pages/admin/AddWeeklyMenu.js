import {Link} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from 'yup';
import React, {useEffect} from "react";
import {addWeeklyMenu, addWeeklyMenuReset} from "../../redux/action";
import {useDispatch, useSelector} from "react-redux";

const WeeklyMenu = () => {
    const dispatch = useDispatch();

    const FILE_SIZE = 3 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/png"
    ];

    const {
        addMenuLoading,
        addMenuData,
        addMenuError,
    } = useSelector((state) => state.adminRedux);

    useEffect(() => {
        if (addMenuData?.status === true) {

        }
    }, [addMenuData])

    return (
        <div className="right_col" role="main">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Add Weekly Menu</h3>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                        <div className="x_panel">
                            <div className="x_content">
                                {addMenuData?.status && (
                                    <div className="alert alert-success" role="alert" style={{textShadow: 'none'}}>
                                        {addMenuData?.msg}
                                    </div>
                                )}
                                <Formik
                                    initialValues={{menuTitle: '', startDate: '', endDate: '', menuImage: null}}
                                    validationSchema={Yup.object({
                                        menuTitle: Yup.string().required('Menu title is required.'),
                                        startDate: Yup.string().required('Start date is required.'),
                                        endDate: Yup.string().required('End date is required.'),
                                        menuImage: Yup.mixed().required("Menu image is required.")
                                            .test(
                                                "fileSize",
                                                "File too large, Max Size 3MB.",
                                                value => value && value.size <= FILE_SIZE
                                            )
                                            .test(
                                                "fileFormat",
                                                "Unsupported Format, Accepted only .JPG, .JPEG, .PNG",
                                                value => value && SUPPORTED_FORMATS.includes(value.type)
                                            )
                                    })}
                                    onSubmit={(values) => {
                                        const formData = new FormData();
                                        formData.append("title", values.menuTitle);
                                        formData.append("startDate", values.startDate);
                                        formData.append("endDate", values.endDate);
                                        formData.append("menuImage", values.menuImage);
                                        dispatch(addWeeklyMenu(formData));
                                    }}
                                >
                                    {({
                                          handleSubmit,
                                          setFieldValue,
                                          touched,
                                          errors,
                                          handleBlur,
                                          handleChange,
                                      }) => (
                                        <form className="form-horizontal form-label-left" onSubmit={handleSubmit}>
                                            <div className="item form-group">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align"
                                                       htmlFor="menu-title">Menu Title <span
                                                    className="required">*</span>
                                                </label>
                                                <div className="col-md-6 col-sm-6 ">
                                                    <input type="text" id="menu-title"
                                                           name="menuTitle"
                                                           placeholder="Menu Title"
                                                           className="form-control"
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                           disabled={addMenuLoading}
                                                    />
                                                    {touched.menuTitle && errors.menuTitle ? (
                                                        <div className="text-danger ml-1 mt-1">{errors.menuTitle}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="item form-group">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align"
                                                       htmlFor="start-date">Start Date <span
                                                    className="required">*</span>
                                                </label>
                                                <div className="col-md-6 col-sm-6 ">
                                                    <input type="date" id="start-date"
                                                           name="startDate"
                                                           placeholder="Start Date"
                                                           className="form-control"
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                           disabled={addMenuLoading}
                                                    />
                                                    {touched.startDate && errors.startDate ? (
                                                        <div className="text-danger ml-1 mt-1">{errors.startDate}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="item form-group">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align"
                                                       htmlFor="end-date">End Date <span className="required">*</span>
                                                </label>
                                                <div className="col-md-6 col-sm-6 ">
                                                    <input type="date" id="end-date"
                                                           name="endDate"
                                                           placeholder="End Date"
                                                           className="form-control"
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                           disabled={addMenuLoading}
                                                    />
                                                    {touched.endDate && errors.endDate ? (
                                                        <div className="text-danger ml-1 mt-1">{errors.endDate}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="item form-group">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align"
                                                       htmlFor="menu-image">Image <span className="required">*</span>
                                                </label>
                                                <div className="col-md-6 col-sm-6 ">
                                                    <input type="file" id="menu-image"
                                                           name="menuImage"
                                                           className="btn btn-light btn-block"
                                                           onChange={(e) => setFieldValue('menuImage', e.target.files[0])}
                                                           onBlur={handleBlur}
                                                           disabled={addMenuLoading}
                                                    />
                                                    {touched.menuImage && errors.menuImage ? (
                                                        <div className="text-danger ml-1 mt-1">{errors.menuImage}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="ln_solid"></div>
                                            <div className="item form-group">
                                                <div className="col-md-12 col-sm-12 text-center">
                                                    <Link to="/admin/weekly-menus"
                                                          className="btn btn-primary">
                                                        <i className="fa fa-close"></i> Cancel
                                                    </Link>
                                                    <button type="submit" className="btn btn-success" disabled={addMenuLoading}
                                                            onClick={() => dispatch(addWeeklyMenuReset())}>
                                                        {addMenuLoading ? (
                                                            <span><i className="fa fa-spinner fa-spin"></i> Submit</span>) : (
                                                            <span><i className="fa fa-save"></i> Submit</span>)}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default WeeklyMenu;