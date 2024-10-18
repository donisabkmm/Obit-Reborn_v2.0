// eslint-disable-next-line

import React from 'react'
import '../../Assets/plugins/fontawesome-free/css/all.min.css'
import '../../Assets/dist/css/dashboard/adminlte.min.css'
import '../../Assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import '../../Assets/plugins/jquery/jquery.min.js'
import '../../Assets/plugins/jquery-ui/jquery-ui.min.js'
import '../../Assets/plugins/bootstrap/js/bootstrap.bundle.min.js'
import '../../Assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'
import '../../Assets/dist/js/adminlte.min.js'
import '../../Assets/dist/css/dashboard/style.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Topnav from '../Components/Topnav'
import logo from '../../Assets/img/logo.png'
import Sidebar from '../Components/Sidebar.js'
import { useEffect, useState } from 'react'
import {toast} from  'react-toastify'
import { useNavigate } from 'react-router-dom'
import {setStoriesID} from '../../Services/Authentication.js'
import axios from 'axios'
import { API_BASE_URL } from '../../Config/config.js'
import UpdateStory from './UpdateStory.jsx'



function UpdateStoryIndex() {
    const navigate = useNavigate();
    const dak = localStorage.getItem('user')
    const firstname = localStorage.getItem('firstname');
    const secondname = localStorage.getItem('secondname');
    const schar = secondname.charAt(0);
    const fchar = firstname.charAt(0);
    const nameHead = fchar + schar;
    const [permission,setPermission] = useState(false);
    const permissions=JSON.parse(localStorage.getItem("permissions"))
    const [story_id,setStoryID ] = useState();


    const createUniqueID = async () => {
   
          const unit_name = localStorage.getItem('unit');
          const username = localStorage.getItem('user');
          const bureau_name = localStorage.getItem('bureau');

          axios.post(API_BASE_URL + '/api/create_story_id',{unit:unit_name,username:username,bureau:bureau_name})
            .then(response=> {
              if(response.data.fdata)
              {
                setStoriesID(response.data.fdata)
                setStoryID( response.data.fdata)
              }
              if(response.data.message)
              {
                toast(response.data.message)
              }
    })
         
      };
  

      useEffect(() => {
        const handleNavigation = () => {
            const timeoutId = setTimeout(() => {
                navigate("/permission-denied");
            }, 2000);
            return () => clearTimeout(timeoutId);
        };
    
        try {
            if (permissions.some(item => item === 11)) {
                setPermission(true);
                const check_localstorage = localStorage.getItem('story_id');
                if (check_localstorage === null) {
                    const uniqueID = createUniqueID(); 
                    localStorage.setItem('story_id', uniqueID); // Store the new ID
                    setStoryID(uniqueID); // Set the state
                } else {
                    setStoryID(check_localstorage);
                }
            } else {
                toast("Access Denied...");
                handleNavigation();
            }
        } catch (error) {
            toast("An Error occurred!" + error.message); // Ensuring error.message is used for clarity
        }
    }, []);
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
                <Topnav pageHead={"Update Story"} storyID = {story_id} />):(<Topnav pageHead={"Update Story"} storyID = {story_id} />)}


                <div className="content-wrapper iframe-mode" id="iframe" data-widget="iframe" data-loading-screen={750}>

                    <div className="tab-content">
                        <div className="dakpager">
                            {permission?(
                            <UpdateStory storyId={story_id}/>):(<div></div>)}
                        </div>
                    </div>
                </div>
                <aside className="control-sidebar control-sidebar-dark">
                </aside>
            </div>
        )
    }
}


export default UpdateStoryIndex;
