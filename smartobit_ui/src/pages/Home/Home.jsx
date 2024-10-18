// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import '../../assets/plugins/fontawesome-free/css/all.min.css'
import '../../styles/adminlte.min.css'
import '../../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import '../../assets/plugins/jquery/jquery.min.js'
import '../../assets/plugins/jquery-ui/jquery-ui.min.js'
import '../../assets/plugins/bootstrap/js/bootstrap.bundle.min.js'
import '../../assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'
import '../../assets/dist/js/adminlte.min.js'
import '../../styles/style.css'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Topnav from '@/components/TopNav.jsx'
import logo from '../../assets/dist/img/logo.png'
import Sidebar from '@/components/Sidebar.jsx'
import {useLocalStorage} from "@/hooks/useLocalStorage.jsx";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import bureau from "../../assets/dist/img/buildings.png"
import unit from "../../assets/dist/img/bureaus.png"
import roles from "../../assets/dist/img/roles.png"
import users from "../../assets/dist/img/users.png"
import stories from "../../assets/dist/img/stories.png"
import allstories from "../../assets/dist/img/all_stories.png"
import my_role from "../../assets/dist/img/myRole.png"
import {Button} from "@mui/material";


function Home() {
    const dak = localStorage.getItem('user')
    const firstname = localStorage.getItem('firstname');
    const secondname = localStorage.getItem('secondname');
    const fullname = firstname + " " + secondname
    const handleWheel = (e) => {
        if (e.ctrlKey) {
            e.preventDefault(); // Prevent default zoom behavior
        }
    };
    const {fetchRole} = useLocalStorage()
    if (dak) {
        return (

            <div className="wrapper" onWheel={handleWheel}>
                <ToastContainer/>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <div className='scrollable-sidenav' style={{height: '100vh'}}>

                        <div className="brand-link">
                            <img src={logo} alt="Malayala Manorama Logo" className="brand-image img-circle elevation-3"
                                 style={{opacity: '1'}}/>
                            <span className="brand-text font-weight-bold">MM Smart Obit</span>
                        </div>
                        <div className="sidebar">
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="info">
                                    <div className="block"
                                         style={{color: "skyblue"}}>
                                        <span><div className='circle'>{secondname.charAt(0) + firstname.charAt(0)}</div></span>
                                        &nbsp; Welcome &nbsp;&nbsp;&nbsp;{dak}</div>
                                </div>
                            </div>
                            <Sidebar/>
                        </div>
                    </div>
                </aside>
                <Topnav/>
                <div className="content-wrapper iframe-mode" id="iframe" data-widget="iframe" data-loading-screen={750}>
                    <div className="tab-content">
                        <div className="dakpager">

                            {fetchRole() === "Admin" ? (
                                <div className="p-4">
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '10px',
                                        background: "transparent"
                                    }}>
                                        <Card sx={{display: 'flex', width: "25%", flexDirection: 'row'}}>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <CardContent sx={{flex: '1 0 auto'}}>
                                                    <Typography component="div" variant="h5">
                                                        Total Users
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="div"
                                                                sx={{color: 'text.secondary', fontWeight: "bold"}}>
                                                        300
                                                    </Typography>
                                                    <Button variant="outlined" href="/manageuser">View</Button>
                                                </CardContent>
                                            </Box>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 151}}
                                                image={users}
                                                alt="Live from space album cover"
                                            />
                                        </Card>
                                        <Card sx={{display: 'flex', width: "25%", flexDirection: 'row'}}>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <CardContent sx={{flex: '1 0 auto'}}>
                                                    <Typography component="div" variant="h5">
                                                        Total Units
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="div"
                                                                sx={{color: 'text.secondary', fontWeight: "bold"}}>
                                                        Mac Miller
                                                    </Typography>
                                                    <Button variant="outlined" href="#text-buttons">View</Button>
                                                </CardContent>
                                            </Box>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 151}}
                                                image={unit}
                                                alt="Live from space album cover"
                                            />
                                        </Card>
                                        <Card sx={{display: 'flex', width: "25%", flexDirection: 'row'}}>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <CardContent sx={{flex: '1 0 auto'}}>
                                                    <Typography component="div" variant="h5">
                                                        Total Bureaus
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="div"
                                                                sx={{color: 'text.secondary', fontWeight: "bold"}}>
                                                        Mac Miller
                                                    </Typography>
                                                    <Button variant="outlined" href="#text-buttons">View</Button>
                                                </CardContent>
                                            </Box>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 151}}
                                                image={bureau}
                                                alt="Live from space album cover"
                                            />
                                        </Card>
                                        <Card sx={{display: 'flex', width: "25%", flexDirection: 'row'}}>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <CardContent sx={{flex: '1 0 auto'}}>
                                                    <Typography component="div" variant="h5">
                                                        Total Roles
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="div"
                                                                sx={{color: 'text.secondary', fontWeight: "bold"}}>
                                                        Mac Miller
                                                    </Typography>
                                                    <Button variant="outlined" href="#text-buttons">View</Button>
                                                </CardContent>
                                            </Box>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 151}}
                                                image={roles}
                                                alt="Live from space album cover"
                                            />
                                        </Card>
                                    </div>

                                </div>
                            ) : (
                                <div className="p-4">
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '10px',
                                        background: "transparent"
                                    }}>
                                        <Card sx={{display: 'flex', width: "55%", flexDirection: 'row'}}>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <CardContent sx={{flex: '1 0 auto'}}>
                                                    <Typography component="div" variant="h5">
                                                        Total Stories
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="div"
                                                                sx={{color: 'text.secondary', fontWeight: "bold"}}>
                                                        300
                                                    </Typography>
                                                    <Button variant="outlined" href="/recent-stories#">View</Button>
                                                </CardContent>
                                            </Box>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 170}}
                                                image={stories}
                                                alt="Live from space album cover"
                                            />
                                        </Card>
                                        <Card sx={{display: 'flex', width: "55%", flexDirection: 'row'}}>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <CardContent sx={{flex: '1 0 auto'}}>
                                                    <Typography component="div" variant="h5">
                                                        All Stories
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="div"
                                                                sx={{color: 'text.secondary', fontWeight: "bold"}}>
                                                        Mac Miller
                                                    </Typography>
                                                    <Button variant="outlined" href="/all-stories">View</Button>
                                                </CardContent>
                                            </Box>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 170}}
                                                image={allstories}
                                                alt="Live from space album cover"
                                            />
                                        </Card>
                                        <Card sx={{display: 'flex', width: "55%", flexDirection: 'row'}}>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <CardContent sx={{flex: '1 0 auto'}}>
                                                    <Typography component="div" variant="h5">
                                                        My Profile
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="div"
                                                                sx={{color: 'text.secondary', fontWeight: "bold"}}>
                                                        {fullname}
                                                    </Typography>
                                                    <Button variant="outlined" href="#text-buttons">View</Button>
                                                </CardContent>
                                            </Box>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 170}}
                                                image={my_role}
                                                alt="Live from space album cover"
                                            />
                                        </Card>
                                    </div>
                                </div>

                            )}

                        </div>
                    </div>
                </div>
                <aside className="control-sidebar control-sidebar-dark">
                </aside>
            </div>
        )
    }
}


export default Home;
