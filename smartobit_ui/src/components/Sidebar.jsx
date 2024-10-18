// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import {API_BASE_URL} from '../configs/config.jsx'
import axios from 'axios';
function Sidebar() {
    const navigate = useNavigate();
    const username = localStorage.getItem('user')
    const [fdata, setFdata] = useState([]);
    useEffect(()=>{
        try {
            axios.post(API_BASE_URL + "/api/fetch_userpermission",{
                user: username})
                .then(response => {
                    setFdata(response.data.fdata);

                })

        }
        catch (error) {
            toast("An Error occurred!" + error)
        }
    },[])
    localStorage.setItem("permissions",JSON.stringify(fdata))
    const manageUserPermission = fdata.some(item =>item === 1)
    const manageUnitPermission = fdata.some(item =>item === 2)
    const manageBureauPermission = fdata.some(item =>item === 3)
    const RoleNpermissionsPermission = fdata.some(item =>item === 4)
    const PageSettingPermission = fdata.some(item =>item === 5)
    const housekeepingPermission = fdata.some(item =>item === 6)
    const AppSettingsPermission = fdata.some(item =>item === 7)
    const NewStoryPermission = fdata.some(item =>item === 8)
    const RecentStoriesPermission = fdata.some(item =>item === 9)
    const AllStoriesPermission = fdata.some(item =>item === 10)
    const ArchivedStoriesPermission = fdata.some(item =>item === 11)
    const AnniversaryStoriesPermission = fdata.some(item =>item === 12)
    const PagebuilderPermission = fdata.some(item =>item === 13)

    function handlePageclick(dakPage) {
        if (dakPage === "allstories") {
            navigate("/dashboard/all-stories")
        }
        else if (dakPage === "manageuser") {
            navigate("/dashboard/manage-user")

        }
        else if (dakPage === "manageunit") {
            navigate("/dashboard/manage-units")

        }
        else if (dakPage === "managebureau") {
            navigate("/dashboard/manage-bureaus")

        }
        else if (dakPage === "roles") {
            navigate("/dashboard/roles-permission")

        }
        else if (dakPage === "pagesettings") {
            navigate("/dashboard/page-settings")

        }

        else if (dakPage === "managemast") {
            navigate("/dashboard/manage-masthead")

        }
        else if (dakPage === "housekeeping") {
            navigate("/dashboard/housekeeping")

        }
        else if (dakPage === "multipage") {
            navigate("/dashboard/multipage-publishing")

        }
        else if (dakPage === "appsettings") {
            navigate("/dashboard/app-settings")

        }
        else if (dakPage === "newstory") {
            navigate("/dashboard/new-story")

        }
        else if (dakPage === "recentstories") {
            navigate("/dashboard/recent-stories")

        }
        else if (dakPage === "archivedStories") {
            navigate("/dashboard/archived-stories")

        }
        else if (dakPage === "anniversary") {
            navigate("/dashboard/anniversary-stories")

        }

        else if (dakPage === "pageBuilder") {
            navigate("/dashboard/page-builder")

        }
    }

    return (
        <div>
            <div id="admin">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        {manageUserPermission ? (
                            <li className="nav-item">

                                <a href="#" className="nav-link" onClick={() => handlePageclick('manageuser')}>
                                    <i className="fa fa-user-plus nav-icon" aria-hidden="true" />
                                    Manage Users
                                </a>
                            </li>):(<li></li>)}
                        {manageUnitPermission ?(<li className="nav-item">
                            <a href="#" className="nav-link" onClick={() => handlePageclick('manageunit')}>
                                <i className="fa  fa-plus-square nav-icon" aria-hidden="true" />
                                <p>Manage Units</p>
                            </a>
                        </li>):(<li></li>)}
                        {manageBureauPermission ? (<li className="nav-item">
                            <a href="#" className="nav-link" onClick={() => handlePageclick('managebureau')}>
                                <i className="fa fa-location-arrow nav-icon" aria-hidden="true" />
                                <p>Manage Bureaus</p>
                            </a>
                        </li>):(<li></li>)}
                        {RoleNpermissionsPermission ? (
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => handlePageclick('roles')}>
                                    <i className="fa fa-id-card nav-icon" aria-hidden="true" />
                                    <p>Roles & Permissisons</p>
                                </a>
                            </li>):(<li></li>)}
                        {PageSettingPermission?(
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => handlePageclick('pagesettings')}>
                                    <i className="fa fa-newspaper nav-icon" aria-hidden="true" />
                                    <p>Page Settings</p>
                                </a>
                            </li>):(<li></li>)}
                        {housekeepingPermission?(
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => handlePageclick('housekeeping')}>
                                    <i className="fa fa-home nav-icon" aria-hidden="true" />
                                    <p>House Keeping</p>
                                </a>
                            </li>):(<li></li>)}
                        {AppSettingsPermission?(
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => handlePageclick('appsettings')}>
                                    <i className="fa fa-cogs nav-icon" aria-hidden="true" />
                                    <p>App Settings</p>
                                </a>
                            </li>):(<li></li>)}
                    </ul>
                </nav>
            </div>
            <div id="bureau_unit">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        {NewStoryPermission?(
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => handlePageclick('newstory')}>
                                    <i className="fa fa-file-word nav-icon" aria-hidden="true" />
                                    <p>New Story</p>
                                </a>
                            </li>):(<li></li>)}
                        {RecentStoriesPermission?(
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => handlePageclick('recentstories')}>
                                    <i className="fa fa-th-list nav-icon" aria-hidden="true" />
                                    <p>Recent Stories</p>
                                </a>
                            </li>):(<li></li>)}
                        {AllStoriesPermission?(
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => handlePageclick('allstories')}>
                                    <i className="fa fa-table nav-icon" aria-hidden="true" />
                                    <p>All Stories</p>
                                </a>
                            </li>):(<li></li>)}
                        {ArchivedStoriesPermission?(
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => handlePageclick('archivedStories')}>
                                    <i className="fa fa-file-archive nav-icon" aria-hidden="true" />
                                    <p>Archived Stories</p>
                                </a>
                            </li>):(<li></li>)}
                        {AnniversaryStoriesPermission?(
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => handlePageclick('anniversary')}>
                                    <i className="fa fa-address-card nav-icon" aria-hidden="true" />
                                    <p>Anniversary Stories</p>
                                </a>
                            </li>):(<li></li>)}
                        {PagebuilderPermission?(
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => handlePageclick('pageBuilder')}>
                                    <i className="fa fa-paperclip nav-icon" aria-hidden="true" />
                                    <p>Pages Builder</p>
                                </a>
                            </li>):(<li></li>)}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar