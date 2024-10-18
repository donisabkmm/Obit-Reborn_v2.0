import React, { useEffect, useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';
import { toast } from "react-toastify";
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../styles/Style2.css';
import Typography from '@mui/joy/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {css} from '@emotion/css'
import ViewStoryModal from './ViewStoryModal';




const RecentStories = () => {
 const recent_stories_viewer = css({
  marginLeft: '60px',
 })

  const [isModalOpen,setIsModalOpen] = useState(false);
  const [story_data, setStory_data] = useState({})
  const [auditlog, setAudit_log] = useState([])
  const [page, setPage] = useState(1)
  const [stories, setStories] = useState([])
  const itemsPerPage = 12

  const fetchData= () => {
    axios.post(API_BASE_URL + '/api/fetch_recent_stories',{username:localStorage.getItem('user')})
    .then(response=> {
      if(response.data.fdata)
      {
        setStories(response.data.fdata)
      }
      if(response.data.message)
      {
        toast(response.data.message)
      }
    })
  };
  useEffect(() => {
    fetchData();
  }, []);

const handleView =(value)=>{
  axios.post(API_BASE_URL + '/api/view_story', { story_id: value })
            .then(response => {
                if (response.data.fdata) {
                    setStory_data(response.data.fdata)
                    setAudit_log(response.data.fdata.audit_log)
                }
                if (response.data.message) {
                    toast(response.data.message)
                }
            })
  setIsModalOpen(true);
}


  const handleChange = (value) => {
    setPage(value)
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = stories.slice(startIndex, endIndex)
  return (
    <div className={recent_stories_viewer}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 20 }}>
        {currentItems.map((data, index) => (
          <Grid item xs={2} sm={4} md={4} key={index + startIndex}>
            <div className="float-card-container" id={index + startIndex + 1}>
                      <div className="float-card">
                        <img src={data.photo_id} alt="Sample Image" />
                        <div className="float-card-content">

                          <Typography className='typo' variant="body2" color="textSecondary" style={{ fontWeight: 'normal', width: '100%', fontSize: '0.8em' }} noWrap>
                            <strong>{data.name}</strong>
                          </Typography>

                          <Typography className='typo' variant="body2" color="textSecondary" style={{ width: '100%', fontSize: '0.7em' }} noWrap>
                            <FontAwesomeIcon style={{ color: '#1964bf' }} icon={faMapPin} />
                            &nbsp; {data.place}
                          </Typography>

                          <Typography className='typo' variant="body2" color="textSecondary" style={{ width: '100%', fontSize: '0.8em', overflowWrap: 'anywhere' }} noWrap>
                            {data.unit}
                          </Typography>

                          <div className="card-icons" style={{ display: 'flex', justifyContent: 'center' }} >
                            <VisibilityIcon
                              style={{ color: '#0946b0', marginRight: '0.4em', cursor: 'pointer', scale: '70%' }}
                              onClick={() => handleView(data.story_id)}
                            
                            />
                            {/* <Divider orientation="vertical" flexItem sx={{ margin: '0 0.3em', backgroundColor: 'black' }}></Divider> */}
                            <EditIcon
                              style={{ color: '#0946b0', marginLeft: '0.4em', marginRight: '0.2em', cursor: 'pointer', scale: '70%' }}
                              onClick={() => handleEditClick(data)}
                            />
                            <DeleteIcon
                              style={{ color: '#0946b0', marginLeft: '0.4em', cursor: 'pointer', scale: '70%' }}
                              onClick={() => confirmDeleteCard(data)}
                            />
                          </div>

                        </div>
                      </div>
                    </div>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(stories.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      />
      <ViewStoryModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} story_data={story_data} audit_log={auditlog} />

    </div>
  )
}
export default RecentStories
