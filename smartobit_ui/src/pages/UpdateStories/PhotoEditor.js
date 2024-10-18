import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../NewStory/CSS/photos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload, faPlus,faFloppyDisk,faScissors,faBrush, faCrop,faUpload,faRotate } from '@fortawesome/free-solid-svg-icons';
import Cropper from 'react-easy-crop';
import { API_BASE_URL } from "../../Config/config"
import axios from "axios";
import { toast } from "react-toastify";

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '100%',
  maxHeight: '100%',
  overflowY: 'auto',
};
const iconStyle = {
  width: '40px',
  height: '40px',
};
const PhotoModal = forwardRef(({ show, onHide,activity }, ref) => {
  const [image, setImage] = useState();
  const [imageBKP,setImageBKP] = useState();
  const [filename,setFilename] = useState();
  const [Croppedimage, setCroppedImage] = useState();
  const storyID = localStorage.getItem("story_id");
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 217, height: 189 });
  const [zoom, setZoom] = useState(1);

  const [X,setX] = useState();
  const [Y,setY] = useState();
  const [width,setWidth] = useState();
  const [height,setHeight] = useState();

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    setX(croppedAreaPixels.x);
    setY(croppedAreaPixels.y);
    setWidth(croppedAreaPixels.width);
    setHeight(croppedAreaPixels.height);
  };
  useImperativeHandle(ref, () => ({
    focus: () => {

    }
  }));
  const addCanvas = async () => {
   
    try {
      const response = await axios.post(API_BASE_URL + '/api/photo_editor',{ base64_image: image });
      setImage(response.data.image_data)

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const manualProcess = async () => {
    if (!image)
      {
        toast.error("Please select an image");
        return;
      }
    if(image)
      {
        try {
          const response = await axios.post(API_BASE_URL + '/api/manual_process',{ base64_image: image,storyId:storyID ,filename: filename});
          handleClose();
          toast.success(response.data.message);
          } catch (error) {
          console.error('Error uploading file:', error);
          
        }
      } 
    
  };
  const reloadPhoto = async () => {
    setImage(imageBKP);
    setCroppedImage(null);
  }


  function imageToBase64(imagePath) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(imagePath);
    });
  }
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      imageToBase64(file)
        .then((base64String) => {
          setImage(base64String);
          setImageBKP(base64String);
          setFilename(file.name);
        })
        .catch((error) => {
          console.error("Error converting image to Base64:", error);
        });
    }
  };

  const handleSubmit = async () => {
    if (!Croppedimage)
      {
        toast.error("Please select an image");
        return;
      }
    if(Croppedimage)
      {
        try {
          const response = await axios.post(API_BASE_URL + '/api/submit_photo',{ base64_image: Croppedimage,storyId:storyID ,filename: filename,username:localStorage.getItem('user')});
          handleClose();
          toast.success(response.data.message);
          activity(Croppedimage);
        } catch (error) {
          console.log('Error uploading file:', error);
        }
      }  
};
const handleCrop = async () =>{
  try {
    const response = await axios.post(API_BASE_URL + '/api/photo_cropper',{ base64_image: image,x:X,y:Y,width:width,height:height});
    setCroppedImage(response.data.image_data);

  } catch (error) {
    console.error('Error uploading file:', error);
  }


}
const handleClose = () => {
  onHide();
};
const isSubmitDisabled = !Croppedimage;
  return (
    <Modal
      open={show}
      onClose={onHide}
      aria-labelledby="Photo-modal"
      aria-describedby="photo-modal-description"
    >
      <div style={modalStyle}>
        <h4>Upload and Edit Images</h4>
        <div className="navigation">
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
            accept="image/*"
          />
          <label htmlFor="fileInput">
            <Button variant="contained" color="primary" component="span">
              <FontAwesomeIcon icon={faCloudUpload} style={{ marginRight: '8px' }} />
              Import
            </Button>
          </label>

          <div className="rtl-nav">
          <Button variant="contained" color="primary" disabled={isSubmitDisabled} onClick={handleSubmit}>
              <FontAwesomeIcon icon={faFloppyDisk} style={{ marginRight: '8px' } } />
              Submit
            </Button>
            <Button variant="contained" color="primary" onClick={manualProcess} >
              <FontAwesomeIcon icon={faUpload} style={{ marginRight: '8px' }}  />
              Manual 
            </Button>
            <Button variant="contained" color="secondary" onClick={reloadPhoto} >
              <FontAwesomeIcon icon={faRotate} style={{ marginRight: '8px' }}  />
            </Button>
          </div>

        </div>
        <div className="image-loader">

          <Cropper
            image={image ? image : null}
            crop={crop}
            zoom={zoom}
            aspect={217 / 189}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            zoomSpeed={0.2} 
            zoomWithScroll={true}
          />

        </div>
        <div className="image-preview">
          <img src={Croppedimage? Croppedimage : null} alt="preview" />
        </div>
        <div className="bottom-nav">
          <Button variant="contained" color="secondary" onClick={handleCrop}>
          <FontAwesomeIcon icon={faCrop} style={{ marginLeft: '8px' }} />
            CROP
          </Button>
          <Button variant="contained" color="secondary" onClick={addCanvas}>
              <FontAwesomeIcon icon={faPlus} style={{ marginLeft: '8px' }} />
              Add Canvas
            </Button>
          <Button variant="contained" color="secondary" >
          <FontAwesomeIcon icon={faBrush} style={{ marginLeft: '8px' }} />
            Enhance
          </Button>
          <Button variant="contained" color="secondary" >
          <FontAwesomeIcon icon={faScissors} style={{ marginLeft: '8px' }} />
            BG Remover
          </Button>
          
        </div>
      </div>
    </Modal>
  );
});

const PhotoEditor = ({activity}) => {
  const [showphotoModal, setShowphotoModal] = useState(false);
  const createUserModalRef = useRef(null);

  const handlePlusButtonClick =  () => {
    try {
      axios.post(API_BASE_URL + '/api/photo_dbentry',{ storyID: localStorage.getItem("story_id") });
      setShowphotoModal(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const handleClose = () => {
    setShowphotoModal(false);
  };


  return (
    <div style={{ display: 'inline-block' }}>
      <Button variant="contained" color="primary" onClick={handlePlusButtonClick}>
        Add Photo
      </Button>
      <PhotoModal
        ref={createUserModalRef}
        show={showphotoModal}
        onHide={handleClose}
        activity={activity}
      />
    </div>
  );
};
export default PhotoEditor;
