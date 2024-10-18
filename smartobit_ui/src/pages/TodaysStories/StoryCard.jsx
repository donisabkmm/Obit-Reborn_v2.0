import React, { useState } from 'react'
import { css } from '@emotion/css';
import { StoryData,PlaceData,HeadLine } from './assets/demo';
import obitimage from './assets/img/3.jpg'
import { Hyphenated } from './assets/js/Typography';
import "./assets/css/font.css"
import {Draggable} from 'react-beautiful-dnd'



function StoryCard({ id, index }) {
    const [headFont,setHeadFont] = useState("AarchaUN")
    const [placeFont,setPlaceFont] = useState("AarchaUN")
    const [storyFont,setStoryFont] = useState("PanchariUN")
    const [headAlign,setHeadAlign] = useState("left")
    const [placeAlign,setplaceAlign] = useState("left")
    const [StoryAlign,setStoryAlign] = useState("left")
    const [headFontSize,setHeadFontSize] = useState("10.6px")
    const [placeFontSize,setPlaceFontSize] = useState("10.6px")
    const [storyFontSize,setStoryFontSize] = useState("12.8px")
    const [headLineheight,setheadLineheight] = useState(1.2)
    const [StoryLineheight,setStoryLineheight] = useState(1)
    const [LineSpacing,setLineSpacing] = useState("-0.6pt")
    const [WordSpacing,setWordSpacing] = useState("0.45pt")

    const carddiv = css({
        width: '78.597pt',
        height: 'fit-content',
        border:'none',
        backgroundColor:'white'
    });
    const image = css({
        width: '78.597pt',
        height: '68.032pt',
        border:'none', 
    });
    const heading = css({
        width: '78.597pt',
        height: 'fit-content',
        whiteSpace: 'pre-wrap',
        lineHeight:headLineheight,
        border:'none',
        fontSize:headFontSize,
        textAlign:headAlign,
        color:"black",
        fontWeight:"normal",
        fontFamily:headFont
    });
    const place = css({
        textAlign:placeAlign,
        fontSize:placeFontSize,
        fontWeight:"normal",
        color:"#ED0A4E",
        fontFamily:placeFont
     });
    const story = css({
        position:"relative",
        width: '78.597pt',
        height: 'fit-content',
        lineHeight:StoryLineheight,
        border:'none',
        resize: "none", 
        textAlign: StoryAlign,
        fontSize:storyFontSize,
        color:"black",
        hyphens:"auto",
        fontFamily:storyFont,
        wordSpacing:WordSpacing,
        letterSpacing:LineSpacing
    });

    return (
        
            <div className={carddiv}>
                <img className={image} src={obitimage} alt="Story" />
                <div contentEditable className={heading}>{HeadLine}</div>
                <div contentEditable className={story}>
                    <span className={place}>{PlaceData}</span>
                    <Hyphenated>{StoryData}</Hyphenated>
                </div>
            </div>
        )
    }
export default StoryCard