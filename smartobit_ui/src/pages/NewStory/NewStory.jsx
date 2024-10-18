import React, { useState, useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import avatar from "./Assets/blue avatar.png"
import PhotoEditor from './PhotoEditor.jsx'
import AssignStoryModal from './AssignStoryModal.jsx';
import { API_BASE_URL } from '../../configs/config.jsx';
import { toast } from 'react-toastify'
import DuplicateModal from './DuplicatedStoryModal.jsx';
import Loader from './Loader.jsx';


const NewStory = (props) => {
  const [formValues, setFormValues] = useState({});
  const [ageValidationMessage, setAgeValidationMessage] = useState('');
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [showPhotoModal, setshowPhotoModal] = useState(false);
  const showPhotoModalRef = useRef();
  const [isAssignStoryModalOpen, setAssignStoryModalOpen] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(avatar);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [duplicatedData, setDuplicatedData] = useState([{}]);
  const [assignment, setAssignment] = useState();
  const [currentStory, setCurrentStory] = useState({});

  const handleOpenAssignStoryModal = () => {
    setAssignStoryModalOpen(true);
  };

  const handleCloseAssignStoryModal = () => {
    setAssignStoryModalOpen(false);

  };

  const handleAgeChange = (e) => {
    const age = e.target.value;
    if (!/^\d+$/.test(age)) {
      setAgeValidationMessage('Please enter a valid age (numbers only).');
    } else {
      setAgeValidationMessage('');
    }
    setFormValues({ ...formValues, age });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailValidationMessage('Please enter a valid email address.');
    } else {
      setEmailValidationMessage('');
    }
    setFormValues({ ...formValues, email });
  };

  const handleClearDropdown = () => {
    const dropdown = document.getElementById('gender');
    dropdown.selectedIndex = 0;
    axios.post(API_BASE_URL + '/api/clear_photo',{photo_id: localStorage.getItem("story_id"),username: localStorage.getItem("user")})
    .then(response=>
    {
      if (response.data != null)
        {
          toast.success("Data Cleared. You can Enter New Story!");
        }

    })
  };
  const handleCloseLoading = () => {
    setLoading(false);
    setShowDuplicateModal(false);
  };
  const handleClear = () => {
    handleClearDropdown();
    setFormValues({
      name: '', age: '', email: '', agentid: '', deathplace: '',
      housename: '', contactnumber: '', gender: '', story: ''
    });
    setUploadedImage(avatar);
  };




  const handleSubmit = () => {
    console.log('',formValues);
    if (!formValues.name) {
      toast.error("Please fill name field");
    }
    else if (!formValues.age) {
      toast.error("Please fill age field");
    }
    else if (!formValues.gender) {
      toast.error("Please fill gender field");
    }
    else if (!formValues.place) {
      toast.error("Please fill place field");
    }
    else if (!formValues.housename) {
      toast.error("Please fill address field");
    }
    else if (!formValues.contactnumber) {
      toast.error("Please fill contactnumber field");
    }
    else if (!formValues.story) {
      toast.error("Please fill story field");
    }
    else if (uploadedImage != avatar) {
      handleDuplicationChecker();
    }
    else {
      const isConfirmed = window.confirm("Are you sure! You want to submit the story without photo?");

      if (isConfirmed) {
        handleDuplicationChecker();
      }
    }
  }
  const handleDuplicationChecker = () => {
    if (formValues != null) {
      setLoading(true);
      const story_id = localStorage.getItem('story_id');
      const story = formValues.story;
      axios.post(`${API_BASE_URL}/api/story_duplicate_checker`, {
        story_id: story_id,
        story: story
      })
        .then(response => {
          if (response.data.fdata) {
            setDuplicatedData(response.data.fdata);
            setCurrentStory({storyID:localStorage.getItem('story_id'),
            ObitImage:uploadedImage,
            headline:formValues.name,
            place:formValues.place,
            story:formValues.story
            })
            setLoading(true);
            toast("Duplication found", response.data.fdata.length);
            setShowDuplicateModal(true);

          }
          if (response.data.message == "No duplicates found") {
            uploadStory();
          }

        })
    }
    else {
      toast.error("Please fill all the required fields");
    }

  }


  const uploadStory = () => {
    let email;
    let agentid;
    let contactnumber;

    if (!formValues.contact) {
      contactnumber = "None";
    }
    else {
      contactnumber = formValues.contact;
    }
    if (!formValues.email) {
      email = "None";
    }
    else {
      email = formValues.email;
    }
    if (!formValues.agentid) {
      agentid = "None";
    }
    else {
      agentid = formValues.agentid;
    }
    const storyData = {
      storyID: localStorage.getItem('story_id'),
      name: formValues.name,
      age: formValues.age,
      gender: formValues.gender,
      place: formValues.place,
      familyName: formValues.housename,
      contactNo: contactnumber,
      email: email,
      Agent_ID: agentid,
      story: formValues.story,
      assignment: assignment,
      photo_id: localStorage.getItem('story_id'),
      created_by: localStorage.getItem("user")
    }
    axios.post(API_BASE_URL + "/api/create_stories", storyData)
      .then(response => {
        if (response.data.message) {
          setLoading(false);
          toast(response.data.message)
          setTimeout(() => {
            window.location.reload()

          }, 1500);
          localStorage.removeItem("story_id");
        }
      })
  }
  const handleImageCropped = (image) => {
    setUploadedImage(image)
  }
  return (
    <form className="container" style={{ marginTop: '20px' }}>
      <div style={{ position: 'absolute' }}> {/* This div will ensure the loader is centered */}
        <Loader isLoading={loading} />
      </div>
      <div className="form-heading" style={{ marginLeft: '70%' }}>
        <div className="d-flex align-items-center">
          <h4 className="mr-2">Story ID :</h4>
          <h5> {props.storyId} </h5>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
        <div style={{ marginRight: '20px' }}>
          {/* Image box */}
          <div style={{
            border: '1px solid #ccc',
            height: '189px',
            width: '241px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',
          }}>
            <img src={uploadedImage} id="upload-image" alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
          <PhotoEditor show={showPhotoModal}
            onHide={() => setshowPhotoModal(false)} activity={handleImageCropped} ref={showPhotoModalRef}
          />
        </div>

        <div className="section bg-light custom-gray p-3 rounded" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <h4>Deceased Person Details</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <TextField
                id="name"
                label="മരിച്ചയാളുടെ പേര്* "
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                fullWidth
              />
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                id="age"
                label="പ്രായം*"
                type="number"
                value={formValues.age}
                onChange={handleAgeChange}
                fullWidth
              />
              {ageValidationMessage && (
                <div style={{ color: 'red' }}>{ageValidationMessage}</div>
              )}
            </div>
            <div className="col-md-4 mb-3">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ലിംഗഭേദം*</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={formValues.gender}
                  label="ലിംഗഭേദം"
                  onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
                >
                  <MenuItem value={"0"}>---Select An Option---</MenuItem>
                  <MenuItem value={"male"}>പുരുഷൻ</MenuItem>
                  <MenuItem value={"female"}>സ്ത്രീ</MenuItem>
                  <MenuItem value={"others"}>മറ്റ്</MenuItem>
                </Select>
              </FormControl>

            </div>
            <div className="col-md-4 mb-3">
              <TextField
                id="deathplace"
                label="സ്ഥലം*"
                value={formValues.deathplace}
                onChange={(e) => setFormValues({ ...formValues, place: e.target.value })}
                fullWidth
              />
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                id="housename"
                label="വീട്ടുപേര്"
                value={formValues.housename}
                onChange={(e) => setFormValues({ ...formValues, housename: e.target.value })}
                fullWidth
              />
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                id="contactnumber"
                label="കോണ്ടാക്ട് നമ്പർ*"
                value={formValues.contactnumber}
                onChange={(e) => setFormValues({ ...formValues, contactnumber: e.target.value })}
                fullWidth
              />
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                id="email"
                label="ഇ-മെയിൽ"
                value={formValues.email}
                onChange={handleEmailChange}
                fullWidth
              />
              {emailValidationMessage && (
                <div style={{ color: 'red' }}>{emailValidationMessage}</div>
              )}
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                id="agentid"
                label="ഏജന്റ്‌ ID"
                value={formValues.agentid}
                onChange={(e) => setFormValues({ ...formValues, agentid: e.target.value })}
                fullWidth
              />
            </div>

          </div>
        </div>
      </div>
      <div className="section bg-light custom-gray p-3 rounded" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', marginTop: '10px', marginBottom: "10px", width: '100%' }}>
        <div className="section">
          <h4>Enter Story</h4>
          <div className="row">
            <textarea
              id="story"
              style={{
                height: "300px",
                width: "98%",
                margin: "1% 1% 1% 1%",
                overflowX: "hidden",
                overflowY: "scroll",
                border: "1px solid blue",
                borderRadius: "2px",
                resize: "none"
              }}
              onChange={(e) => setFormValues({ ...formValues, story: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button
              type="button"
              style={{ marginRight: '10px', backgroundColor: 'green', borderRadius: "10px", fontSize: '1.2em', color: 'white', padding: '10px' }}
              onClick={handleOpenAssignStoryModal}
            >
              Assign Story
            </button>
            <button type="button" style={{ marginRight: '10px', backgroundColor: 'purple', fontSize: '1.2em' }}
              className="btn btn-primary" onClick={handleClear} >
              Clear
            </button>
            <button type="button" style={{ backgroundColor: 'blue', fontSize: '1.2em' }} disabled={isSubmitDisabled} className="btn btn-primary" onClick={handleSubmit} >
              Submit
            </button>

          </div>
        </div>
      </div>
      <AssignStoryModal
        open={isAssignStoryModalOpen}
        onClose={handleCloseAssignStoryModal}
        onAssignStory={setAssignment}
        EnableSubmit ={setIsSubmitDisabled}
      />
      {/* <DuplicateModal open={isDuplicateModalOpen} onClose={handleCloseDuplicateModal} /> */}
      <DuplicateModal
        show={showDuplicateModal}
        onHide={() => {  handleCloseLoading();}}
        onConfirm={() => {setLoading(true); uploadStory();}}
        duplicatedData = {duplicatedData}
        currentStory = {currentStory}
      />

    </form>
  );
};

export default NewStory;



