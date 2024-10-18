import { React, useState,useEffect } from 'react'
import { css } from '@emotion/css';
import DisableCtrlWheel from '../../Assets/dist/js/disablectrl';
import StoryCard from './StoryCard'

function TodaysStories() {
  const [pagerHeight, setpagerHeight] = useState("1433.622pt")
  const [pagerWidth, setpagerWidth] = useState("935.433pt")
  const [zoomFactor, setZoomFactor] = useState(1);
  const [colWidth, setcolWidth] = useState("78.597pt")
  const [gutter, setGutter] = useState("7.086pt")
  const [numCol, setnumCol] = useState(11)

  const gutterspace = css({
    height: pagerHeight,
    width: gutter,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',

  })
  const colElementStyle = css({
    width: colWidth,
    height: pagerHeight,
    backgroundColor: "whitesmoke",
  });
  const verticaldot = css({
    width: pagerWidth,
    display: 'grid',
    justifyContent: "center",
    gap: "2pt",
    x: "0"
  })
  const dot = css({
    height: "0.75pt",
    width: "0.75pt",
    borderRadius: "50%",
    backgroundColor: 'black',
    gap: "1pt"
  })
  const containerLeft = css({
    width: "940pt",
    height: "640pt",
    backgroundColor: "gray",
    display: 'flex',
    justifyItems: 'center',
    overflowX: 'auto', 
    overflowY: 'auto',
    border: "2px solid red",
    position:'absolute',
  })
  const containerRight = css({
    position: 'absolute',
    width: "286pt",
    height: "640pt",
    right: "0",
    top: "0",
    display: 'flex',
    flexDirection:'column',
    justifyItems: 'center',
    overflowY: 'scroll',
    marginRight: '5px',
    borderRadius: '5px',
  })
  const nonFlownStoryHolder = css({
    marginTop:'5px',
    width:"275pt",
    height:"440pt",
    marginLeft:"2px",
    backgroundColor:'white',
    border:"2px solid red"
  })
  const toolkit = css({
    width:"275pt",
    height:"200pt",
    marginLeft:"2px",
    backgroundColor:'white',
    border:"2px solid red"
  })

  const pageBuilder = css({
    marginTop: "3px",
    marginBottom: "3px",
    marginLeft: "3px",
    width: `${parseFloat(pagerWidth) * zoomFactor}pt`, 
    height: `${parseFloat(pagerHeight) * zoomFactor}pt`, 
    position:'sticky',
    display: 'flex',
    flexDirection: "row", 
    transform: `scale(${zoomFactor})`, 
    transformOrigin: 'top left'
  })
  const handleZoom = (e) => {
    if (e.ctrlKey) {
      if (e.deltaY < 0) {
        setZoomFactor(zoomFactor + 0.1);
      } if (e.deltaY > 0) {
        setZoomFactor(Math.max(0.1, zoomFactor - 0.1));
      }
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey>0) {
        e.preventDefault();
      }
    };
    document.body.style.zoom = "100%";
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel); 
    };
  }, []);
  const dots = new Array(520).fill(null).map((_, i) => (<div className={dot} key={i}></div>))

  



  const colElement = new Array(numCol).fill(null).map((_, i) => (
    <>
      <div className={colElementStyle} key={`col-${i}`}><StoryCard /></div>
      {i < numCol - 1 && <div className={gutterspace} key={`gutter-${i}`}><div className={verticaldot}>{dots}</div></div>}
    </>
  ));

  return (
    <div>
      <div className={containerLeft} onWheel={handleZoom}>
        <div className={pageBuilder}>
           {colElement}   
        </div>
      </div>
      <div className={containerRight}>
        <div className={toolkit}>

        </div>
        <div className={nonFlownStoryHolder}>
        </div>
      </div>
    </div>
  )
}

export default TodaysStories