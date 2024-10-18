// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import '../assets/plugins/fontawesome-free/css/all.min.css'
import '../styles/adminlte.min.css'
import '../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import '../assets/plugins/jquery/jquery.min.js'
import '../assets/plugins/jquery-ui/jquery-ui.min.js'
import '../assets/plugins/bootstrap/js/bootstrap.bundle.min.js'
import '../assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'
import '../assets/dist/js/adminlte.min.js'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import '../styles/style.css'
import {css} from '@emotion/css'


const Topnav = (props) => {
    const storyIDStyle = css({
        color: 'blue',
        fontSize: '20px',
        fontWeight: 'bold'
    })

    const navigate = useNavigate();

    const handleFullScreenToggle = () => {
        if (document.documentElement.requestFullscreen) {
            if (document.fullscreenElement) {
                document.exitFullscreen();

            } else {
                document.documentElement.requestFullscreen();

            }
        } else {
            toast('Fullscreen is not supported in this browser.');
        }
    };
    function logout() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        toast("Logging Out! Please come back soon...")
        setTimeout(() => {
            localStorage.removeItem('dakToken');
            localStorage.removeItem('AdminLTE:IFrame:Options')
            localStorage.removeItem('firstname')
            localStorage.removeItem('secondname')
            localStorage.removeItem('user')
            localStorage.removeItem('permissions')
            localStorage.removeItem('unit')
            localStorage.removeItem('bureau')
            localStorage.removeItem('story_id')
            navigate("/")
        }, 2000);
    }


    // SEARCH


    return (
        <div>
            <ToastContainer />

            <nav className="main-header navbar navbar-expand navbar-white navbar-light">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                            className="fas fa-bars" style={{color:"blue"}}/></a>
                    </li>
                    <li className="nav-item">
                    </li>
                </ul>
                <h5 className='head'>{props.pageHead}<span className={storyIDStyle}> {props.storyID}</span></h5>

                <ul className="navbar-nav ml-auto">

                    <li className="nav-item">
                        <a className="nav-link btn-sm btn-info bg-cyan hover:bg-cyan-800 " onClick={handleFullScreenToggle} role="button">
                            <i className="fas fa-expand-arrows-alt" style={{color: "white" }} />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link btn-sm btn-danger logout-button" style={{ backgroundColor:"blue", color: "white" }} onClick={logout} role="button">Log Out
                        </a>
                    </li>
                </ul>

            </nav>

        </div>
    )
}

export default Topnav