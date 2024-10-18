import React, { forwardRef, useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { css } from '@emotion/css';
import { Hyphenated } from './Assets/js/Typography.jsx';
import "./Assets/css/font.css"



const DuplicateModal = forwardRef(({ show, onHide, onConfirm, duplicatedData,currentStory }, ref) => {
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    document.body.style.zoom = "100%";
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
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


  const modalStyle = css({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '53%',
    height: '750px',
    position: 'fixed',
  });

  const storyBoard1 = css({
    width: '230px',
    height: '600px',
    backgroundColor: 'gray',
    borderColor: 'rgba(79, 7, 143)',
    borderRadius: '8px',
    borderWidth: '2px',
    borderStyle: 'solid',
    display: 'flex',
    margin: "5px",
    position: 'fixed'
  })
  const storyBoard2 = css({
    width: '700px',
    height: '600px',
    backgroundColor: 'gray',
    borderRadius: '8px',
    borderColor: 'rgba(79, 7, 143)',
    borderWidth: '2px',
    borderStyle: 'solid',
    display: 'flex',
    margin: "5px",
    marginLeft: "27%",
    position: 'fixed'
  })

  const contentheading = css({
    width: '100%',
    height: '50px',
    backgroundColor: 'rgba(79, 7, 143)',
    borderRadius: '6px 6px 0 0 ',
    borderColor: 'rgba(79, 7, 143)',
    borderWidth: '2px',
    borderStyle: 'solid',
    color: 'white',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  })


  const pasteBoard1 = css({
    width: '220px',
    height: '540px',
    display: 'flex',
    backgroundColor: "gray",
    margin: "55px 5px 5px 5px",
    position: 'fixed',
    flexDirection: 'column',
    overflowY: "scroll"

  })


  const pasteBoard2 = css({
    width: '685px',
    height: '535px',
    backgroundColor: 'gray',
    display: 'flex',
    margin: "55px 5px 5px 5px",
    position: 'fixed',
    overflowY: "scroll",
    overflowX: "scroll",
    flexDirection: 'row',
    gap: "5px"

  })

  const carddiv = css({
    width: '217px',
    height: 'fit-content',
    border: 'none',
    backgroundColor: 'white'
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
  const story = css({
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
  const storyID = css({
    width: "217px",
    height: "50px",
    border: 'none',
    backgroundColor: 'rgba(79, 7, 143)',
    borderColor: 'rgba(79, 7, 143)',
    borderRadius: '5px 5px 0 0 ',
    marginBottom: "2px",
    color: "wheat",
    alignContent: "center",
    textAlign: "center",
  })

  return (
    <Modal
      open={show}
      onClose={onHide}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={modalStyle}>
        <h4 style={{ marginBottom: '20px', color: 'rgba(79, 7, 143)' }}>Duplication Detected</h4>
        <div style={{ display: 'flex' }}>
          <div className={storyBoard1}>
            <div className={contentheading}>Story</div>
            <div className={pasteBoard1}>
            <div className={storyID}>Story-ID: <span style={{ color: "goldenrod" }}> {currentStory.storyID}</span></div>
              <div className={carddiv}>
                <img className={image} src={currentStory.ObitImage} alt="Story" />
                <div contentEditable className={heading}>{currentStory.headline}</div>
                <div contentEditable className={story}>
                  <span className={place}> {currentStory.place}</span>
                  <Hyphenated>{currentStory.story}</Hyphenated>
                </div>
              </div>
            </div>
          </div>

          <div className={storyBoard2}>
            <div className={contentheading}>Duplicated Stories Detected</div>
            <div className={pasteBoard2}>
              {duplicatedData.map((data, index) => (
                <div>
                <div className={storyID}>Story-ID: <span style={{ color: "goldenrod" }}>{data.story_id}</span></div>
                <div className={carddiv} key={index}>
                  <img className={image} src={data.photo_id} alt="Story_image" />
                  <div contentEditable className={heading}>{data.name}</div>
                  <div contentEditable className={story}>
                    <span className={place}>{data.place}</span>{" "}
                    <Hyphenated>{data.story}</Hyphenated>
                  </div>
                </div>
                </div>
              ))}

            </div>
          </div>
        </div>
        <div style={{ marginTop: '65%', display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onHide}
            style={{ marginRight: "10px" }}

          >
            close
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>

            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default DuplicateModal;
