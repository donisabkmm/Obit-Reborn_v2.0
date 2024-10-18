import React, { useState, useEffect } from 'react';
import Modal from "@mui/material/Modal";
import axios from 'axios';
import { API_BASE_URL } from "../../configs/config";
import { toast } from 'react-toastify';
import { css } from '@emotion/css';
import { Button, colors } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import '../../styles/style.css';
import { Hyphenated } from './Assets/js/Typography.jsx';
import avatar from './Assets/image/blue avatar.png'
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Download } from '@mui/icons-material';
import { green } from '@mui/material/colors';




const ViewStoryModal = ({ isOpen, onRequestClose, story_data,auditlog }) => {
    const [headFont, setHeadFont] = useState("AarchaUN")
    const [placeFont, setPlaceFont] = useState("AarchaUN")
    const [storyFont, setStoryFont] = useState("PanchariUN")
    const [headAlign, setHeadAlign] = useState("left")
    const [placeAlign, setplaceAlign] = useState("left")
    const [StoryAlign, setStoryAlign] = useState("left")
    const [headFontSize, setHeadFontSize] = useState("20px")
    const [placeFontSize, setPlaceFontSize] = useState("20px")
    const [storyFontSize, setStoryFontSize] = useState("20px")
    const [headLineheight, setheadLineheight] = useState(1.2)
    const [StoryLineheight, setStoryLineheight] = useState(1)
    const [LineSpacing, setLineSpacing] = useState("-0.6pt")
    const [WordSpacing, setWordSpacing] = useState("0.45pt")

    const NavBar = css({
        width: '1200px',
        height: '60px',
        backgroundColor: '#3F96FD',
        borderRadius: ('8px 8px 0 0 '),
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        padding: '10px',
    })
    const photo = css({
        width: "217px",
        height: "189px",
        backgroundColor: "Buttonface",
        margin: "10px",

    })
    const modalStyle = css({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '1200px',
        height: '750px',
        position: 'fixed',
    });
    const carddiv = css({
        width: '217px',
        height: 'fit-content',
        border: 'none',
        backgroundColor: 'white',
        margin: '18px',
    });
    const image = css({
        width: '217px',
        height: '189px',
        border: 'none',
    });
    const heading = css({
        width: '217px',
        height: 'fit-content',
        whiteSpace: 'pre-wrap',
        lineHeight: headLineheight,
        border: 'none',
        fontSize: headFontSize,
        textAlign: headAlign,
        color: "black",
        fontWeight: "normal",
        fontFamily: headFont
    });
    const place = css({
        textAlign: placeAlign,
        fontSize: placeFontSize,
        fontWeight: "normal",
        color: "#ED0A4E",
        fontFamily: placeFont
    });
    const storyStyle = css({
        position: "relative",
        width: '217px',
        height: 'fit-content',
        lineHeight: StoryLineheight,
        border: 'none',
        resize: "none",
        textAlign: StoryAlign,
        fontSize: storyFontSize,
        color: "black",
        hyphens: "auto",
        fontFamily: storyFont,
        wordSpacing: WordSpacing,
        letterSpacing: LineSpacing
    });

    const styles = {
        editorList: {
            width: "930px",
            height: "300px",
            border: "solid 1px",
            borderColor: "rgb(163, 124, 16)",
            position: "absolute",
            margin: "10px",
            bottom: "0",
            borderRadius:"8px 8px 8px 8px "
        },
        Interface:
        {
            width: "929px",
            height: "249px",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            marginTop:"51px"
        },
        userBoxRight: {
            height: "210px",
            width: "420px",
            display: "flex",
            marginBottom: "10px",
            alignSelf: "flex-end",
            padding: "15px",
            gap: "5px",
        },
        userBoxLeft: {
            height: "210px",
            width: "440px",
            display: "flex",
            marginBottom: "10px",
            alignSelf: "flex-start",
            padding: "15px",
            gap: "5px",
        },
        logo2: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#FE4275",
            color: "snow",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "25px",
            fontWeight: "bold"
        },
        logo1: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#3F96FD",
            color: "snow",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "25px",
            fontWeight: "bold"
        },
        userInfo1: {
            width: "380px",
            height: "170px",
            backgroundColor: "#3F96FD",
            borderRadius: "25px 0 25px 25px",
            padding: "10px",
            color:"snow",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
        },
        userInfo2: {
            width: "380px",
            height: "170px",
            backgroundColor: "#FE4275",
            borderRadius: "0 25px 25px 25px",
            padding: "10px",
            color:"snow",
            display: "flex",
            flexDirection: "column",
            gap: "5px",

        },
        EditorHeader:{
            width: "929px",
            height: "50px",
            backgroundColor: "#3F96FD",
            borderRadius: ("8px 8px 0 0 "),
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            fontSize: "20px",
            padding: "10px",
            position:"fixed"
        }
    };
    const handleClose =()=>{
        onRequestClose();
    }

    return (
        <Modal open={isOpen} onClose={onRequestClose}
        >
            <div className={modalStyle}>
                <div className={NavBar}>
                    <Button  style={{ backgroundColor: "snow", width: "30px" }} onClick={handleClose}>Close</Button>
                </div>
                <div style={{ width: "200px", height: "40px", margin: "10px", color: "rgb(8, 91, 163)", fontSize: "20px" }}>
                    Story ID: <span style={{ fontSize: "20px", color: "darkgoldenrod" }}>{story_data ? story_data.story_id : 'Loading...'}</span>

                </div>
                <img src={story_data.photo_id?story_data.photo_id:avatar} className={photo} />


                <div id="Profile_Name" style={{
                    width: "217px", height: "50px",
                    position: "absolute", margin: "10px", marginTop: "-5px", alignContent: "center",
                    fontSize: "auto", fontWeight: "bold", padding: "5px",
                    textOverflow: "ellipsis", color: "black", overflow: "hidden", whiteSpace: "nowrap",
                }}>
                    Name: <span style={{color:"green"}}>{story_data ? story_data.name : 'Loading...'}</span></div>

                <div id="Story_Area" style={{
                    width: "700px", height: "300px", backgroundColor: "Buttonface",
                    position: "absolute", marginLeft: "20%", marginTop: "-21.3%", border: "solid 1px", borderColor: "blue", borderRadius: "8px", padding: "10px"
                }}>
                    {story_data ? story_data.story : 'Loading...'}
                </div>


                <div id="Navigator" style={{
                    width: "930px", height: "55px", display: "flex", flexDirection: "row", position: "absolute", margin: "10px", marginTop: "50px", borderRadius: "8px", alignItems: "center", justifyContent: "space-between"

                }}>
                    <Button variant='contained' style={{ width: "80px", height: "40px" }}><EditIcon />Edit</Button>
                    <Button variant='contained' style={{ width: "100px", height: "40px" }}><DeleteIcon />Delete</Button>
                    <Button variant='contained' style={{ width: "195px", height: "40px" }}><VisibilityIcon />View Assignment</Button>
                </div>
                <div id="Editor_List" style={styles.editorList}>
                    <div style={styles.EditorHeader}>
                        <h5>Story Audit Log</h5>
                        <Button  style={{ width: "80px", height: "40px",color:"white" }}><Download/>Print</Button>

                    </div>
                    <div style={styles.Interface}>
                    <div key="dak" style={styles.userBoxRight}>
                        <div style={styles.userInfo1}>
                            <span style={{fontSize:"large"}}>Personal ID: 10216</span>
                            <span style={{fontSize:"large"}}>Name: Donis Abraham</span>
                            <span style={{fontSize:"large"}}>Unit: KTM</span>
                            <span style={{fontSize:"large"}}>Work: Creator </span>
                            <span style={{fontSize:"large"}}>Date: 27-05-2024 </span>
                            <div style={{fontSize:"15px",
                            marginTop:"-25px", marginLeft:"240px", justifyContent:"flex-end"}}>10.00 PM</div>


                        </div>
                        <div style={styles.logo1}>AD</div>

                    </div>
                    <div key="dak" style={styles.userBoxLeft}>
                        <div style={styles.logo2}>JK</div>
                        <div style={styles.userInfo2}>
                        <span style={{fontSize:"large"}}>Personal ID: 10216</span>
                            <span style={{fontSize:"large"}}>Name: Donis Abraham</span>
                            <span style={{fontSize:"large"}}>Unit: KTM</span>
                            <span style={{fontSize:"large"}}>Work: Updated </span>
                            <span style={{fontSize:"large"}}>Date: 27-05-2024 </span>
                            <div style={{fontSize:"15px", 
                             marginTop:"-25px",marginLeft:"240px", justifyContent:"flex-end"}}>10.00 PM</div>
                        </div>

                    </div>
                    </div>
                    

                </div>


                <div id="Preview" style={{
                    width: "250px", height: "90%", marginLeft: "79%", marginTop: "-21.3%",
                    position: "absolute", backgroundColor: "gray", borderRadius: "5px", border: "solid 1px", borderColor: "#3F96FD",
                }}>


                    <div style={{
                        width: "100%", height: "40px", backgroundColor: "#3F96FD",
                        borderRadius: "5px 5px 0 0", display: "flex", justifyContent: "center", color: "white", fontSize: "20px"
                    }}>Preview</div>
                    <div style={{ width: "100%", height: "100%", overflowY: "scroll" }}>
                        <div className={carddiv}>
                            <img className={image} src={story_data.photo_id?story_data.photo_id:avatar} alt="image" />
                            <div contentEditable className={heading}>{story_data ? story_data.name : 'Loading...'}</div>
                            <div contentEditable className={storyStyle}>
                                <span className={place}> {story_data ? story_data.place : 'Loading...'}: </span>
                                {story_data ? story_data.story : 'Loading...'}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    );
};

export default ViewStoryModal;
