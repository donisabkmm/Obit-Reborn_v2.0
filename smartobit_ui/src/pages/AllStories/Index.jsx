// eslint-disable-next-line

import React from 'react'
import '../../assets/plugins/fontawesome-free/css/all.min.css'
import '../../styles/adminlte.min.css'
import '../../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import '../../assets/plugins/jquery/jquery.min.js'
import '../../assets/plugins/jquery-ui/jquery-ui.min.js'
import '../../assets/plugins/bootstrap/js/bootstrap.bundle.min.js'
import '../../assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'
import '../../assets/dist/js/adminlte.min.js'
import '../../styles/style.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AllStories from './AllStories.jsx'
import Topnav from '../../components/Topnav.jsx'
import logo from '../../assets/dist/img/logo.png'
import Sidebar from '../../components/Sidebar.jsx'
import { useEffect, useState } from 'react'
import {toast} from  'react-toastify'
import { useNavigate } from 'react-router-dom'



function AllStoriesIndex() {
    const navigate = useNavigate();
    const dak = localStorage.getItem('user')
    const firstname = localStorage.getItem('firstname');
    const secondname = localStorage.getItem('secondname');
    const schar = secondname.charAt(0);
    const fchar = firstname.charAt(0);
    const nameHead = fchar + schar;
    const [permission,setPermission] = useState(false);
    const permissions=JSON.parse(localStorage.getItem("permissions"))
    useEffect(()=>{
        try {
            if (permissions.some(item =>item ===13))
            {
                setPermission(true);
            }
            else
            {
                toast("Access Denied....")
                    setTimeout(() => {
                        navigate("/permission-denied")
                    }, 2000);
                }
          }
          catch (error) {
            toast("An Error occurred!" + error)
          }
    },[])
    if (dak) {
        return (

            <div className="wrapper" >
                <ToastContainer />
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <div className='scrollable-sidenav' style={{ height: '100vh' }}>

                        <div href="" className="brand-link">

                            <img src={logo} alt="Malayala Manorama Logo" className="brand-image img-circle elevation-3"
                                style={{ opacity: '1' }} />
                            <span className="brand-text font-weight-bold">MM Smart Obit</span>
                        </div>
                        <div className="sidebar">
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="info">
                                    <div href="#" className="block"
                                        style={{ color: "skyblue" }}>
                                        <span><div className='circle' >{nameHead}</div></span>
                                        &nbsp; Welcome &nbsp;&nbsp;&nbsp;{dak}</div>
                                </div>
                            </div>
                            <Sidebar />

                        </div>
                    </div>
                </aside>

                {permission?(
<Topnav pageHead={"All Stories"} />):(<Topnav pageHead={"All Stories"} />)}


                <div className="content-wrapper iframe-mode" id="iframe" data-widget="iframe" data-loading-screen={750}>

                    <div className="tab-content">
                        <div className="dakpager">
                            {permission?(
<AllStories/>):(<div></div>)}

                        </div>

                    </div>
                </div>
                <aside className="control-sidebar control-sidebar-dark">
                </aside>
            </div>
        )
    }
}


export default AllStoriesIndex;
