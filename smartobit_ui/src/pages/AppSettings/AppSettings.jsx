// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/style2.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import GridOnIcon from '@mui/icons-material/GridOn';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';
import { toast } from "react-toastify";


export default function AppSettings() {
  const user = localStorage.getItem('user');
  const [isChecked, setIsChecked] = useState(false);
  const [flag, setflag] = useState(true);
  const [emailCursor, setemailCursor] = useState('not-allowed');
  const [SmtpHost,setSmtpHost] = useState();
  const [SmtpPort,setSmtpPort] = useState();
  const [SmtpUsername,setSmtpUsername] = useState();
  const [SmtpPassword,setSmtpPassword] = useState();
  const [SmtpEmail,setSmtpEmail] = useState();
  const [SpellCheckURL,setSpellCheckUrl] = useState();
  const [ppiServerURL,setPPIServerURL] = useState();
  const [EnhancerURL,setEnhancerURL] = useState();
  const [BGRemoverURL,setBGRemoverURL] = useState();

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setemailCursor('auto')
      setflag(false)
      console.log('Checkbox is checked');
    } else {
      setemailCursor('not-allowed')
      setflag(true)
      console.log('Checkbox is unchecked');
    }
  };
  const handleClose = () => {
    setTimeout(() => {
      window.location.reload()
      
  }, 1500);
  };

  useEffect(() => {
    axios.post(API_BASE_URL + '/api/fetch_all_appsettings')
    .then(function(response) {
      if (response.data.fdata) {
        setSmtpHost(response.data.fdata[0].data1.smtp_host);
        setSmtpPort(response.data.fdata[0].data1.smtp_port);
        setSmtpUsername(response.data.fdata[0].data1.smtp_username);
        setSmtpPassword(response.data.fdata[0].data1.smtp_password);
        setSmtpEmail(response.data.fdata[0].data1.default_email_id);
        setSpellCheckUrl(response.data.fdata[1].data2.spellcheck_url);
        setPPIServerURL(response.data.fdata[1].data2.ppiserver_url);
        setEnhancerURL(response.data.fdata[2].data3.enhancer_url);
        setBGRemoverURL(response.data.fdata[2].data3.bgremover_url);
      }
    })
    .catch(function(error) {
      console.error('Error creating user:', error);
    });
  }
   , []);

  const AiConfig = () => {
    const data = {
      enhancer_url: EnhancerURL,
      bgremover_url: BGRemoverURL,
      created_by: user
    }
    axios.post(API_BASE_URL + '/api/ai_config', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      if (response.data) {
        toast(response.data.message);
        handleClose();
      }

    })
    .catch(function(error) {
      console.error('Error creating user:', error);
    });
  }

  


  const serverConfig = () => {
    const data = {
      spellchecker_url: SpellCheckURL,
      ppiserver_url: ppiServerURL,
      created_by: user
    }
    axios.post(API_BASE_URL + '/api/server_config', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      if (response.data.message) {
        toast(response.data.message);
        handleClose();

      } 
    })
    .catch(function(error) {
      console.error('Error creating user:', error);
    });
  }



  const smtpConfig = () =>
  {
    const data = {
      host: SmtpHost,
      port: SmtpPort,
      username: SmtpUsername,
      password: SmtpPassword,
      email_address: SmtpEmail,
      created_by: user
    }
    axios.post(API_BASE_URL + '/api/email_settings', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      if (response.data) {
        toast(response.data.message);
        handleClose();

      } 
    })
    .catch(function(error) {
      console.error('Error creating user:', error);
    });
  }


  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className="card-body d-flex">
        <Formik initialValues={{
          emailSettings: { enableEmail: false, smtpHost: '', smtpPort: '', smtpUsername: '', smtpPassword: '', defaultEmailAddress: '' },
          miscSettings: { numberOfAdBoxes: 1 },
          spellCheck: { spellCheckBaseUrl: '' },
          ppiServer: { ppiServerUrl: '' },
        }}
        >
             <div className="form-box">
              <h5><MailOutlineIcon /><b> E-MAIL</b></h5>

              <div className="form-section mb-3 email-head" style={{ display: 'flex', flexDirection: 'row' }}>
                <b><label className="form-check-label"> {'\u00A0'} Edit</label></b>
                <input type="checkbox" className="switch" style={{ transform: 'scale(0.8)' }} checked={isChecked} onChange={handleCheckboxToggle} />
              </div>

              <div className="row">
                <div className="form-section mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-check-label">SMTP Host</label>
                      <input type="text" name="emailSettings.smtpHost" value={SmtpHost}  onChange={(e) => setSmtpHost(e.target.value)}
                        className="form-control form-control-lg" disabled={flag} style={{ cursor: emailCursor }} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-check-label">SMTP Port</label>
                      <input type="text" name="emailSettings.smtpPort"  value={SmtpPort} onChange={(e) => setSmtpPort(e.target.value)}
                        className="form-control form-control-lg" disabled={flag} style={{ cursor: emailCursor }} />
                    </div>
                  </div>
                </div>

                <div className="form-section mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-check-label">SMTP User Name</label>
                      <input type="text" name="emailSettings.smtpUsername" value={SmtpUsername}  onChange={(e) => setSmtpUsername(e.target.value)}
                        className="form-control form-control-lg" disabled={flag} style={{ cursor: emailCursor }} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-check-label">SMTP Password</label>
                      <input type="text" name="emailSettings.smtpPassword" value={SmtpPassword} onChange={(e) => setSmtpPassword(e.target.value)}
                        className="form-control form-control-lg" disabled={flag} style={{ cursor: emailCursor }} />
                    </div>
                  </div>
                </div>

                <div className="form-section mb-3">
                  <div className="row">
                    <div className="col-md-12">
                      <label className="form-check-label">Default Email Address</label> 
                      <input type="text" name="emailSettings.defaultEmailAddress" value={SmtpEmail}  onChange={(e) => setSmtpEmail(e.target.value)}
                        className="form-control form-control-lg" disabled={flag} style={{ cursor: emailCursor }} />
                    </div>
                  </div>

                </div>
                <div className="mb-3 d-flex">
                <button type="submit" className="btn btn-success ml-3" style={{ width: '6em' }} disabled={flag} onClick={smtpConfig} >
                    SAVE
                  </button>
                </div>
              </div>

              <div className="horizontal-line"></div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <h5><SpellcheckIcon /><b> Spell Check</b></h5>
                  <div className="col-md-12">
                    <label className="form-check-label">Spell Check base URL</label>
                    <input type="text" name="spellCheck.spellCheckBaseUrl" disabled={flag} value={SpellCheckURL} onChange={(e) => setSpellCheckUrl(e.target.value)}  className="form-control form-control-lg" />
                  </div>
                </div>
                <div className="col-md-6">
                  <h5><GridOnIcon /><b> PPI Server</b></h5>
                  <div className="col-md-12">
                    <label className="form-check-label">PPI Server URL</label>
                    <input type="text" name="ppiServer.ppiServerUrl" disabled={flag} value={ppiServerURL} onChange={(e) => setPPIServerURL(e.target.value)}   className="form-control form-control-lg" />
                  </div>
                  
                </div>
                
              </div>
              <div className="mb-3 d-flex">
                <button type="submit" className="btn btn-success ml-3" disabled={flag} style={{ width: '6em' }} onClick={serverConfig}>
                    SAVE
                  </button>
                </div>
              <div className="horizontal-line"></div>
              <h5><EditIcon /><b> ImageEnhancer | Background API Settings</b></h5>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5><AutoFixHighIcon /><b> Image Enhancer Server</b></h5>
                  <div className="col-md-12">
                    <label className="form-check-label">Image Enhancer API URL</label>
                    <input type="text" name="spellCheck.spellCheckBaseUrl" disabled={flag} value={EnhancerURL} onChange={(e) => setEnhancerURL(e.target.value)}  className="form-control form-control-lg" />
                  </div>
                </div>
                <div className="col-md-6">
                  <h5><RemoveCircleOutlineIcon /><b> Image Background Remover Server</b></h5>
                  <div className="col-md-12">
                    <label className="form-check-label">Background Remover API URL</label>
                    <input type="text" name="ppiServer.ppiServerUrl"  disabled={flag} value={BGRemoverURL}  onChange={(e) => setBGRemoverURL(e.target.value)} className="form-control form-control-lg" />
                  </div>
                  
                </div>
              </div>
              <div className="mb-3 d-flex">
                <button type="submit" className="btn btn-success ml-3" disabled={flag} style={{ width: '6em' }} onClick={AiConfig}>

                    SAVE
                  </button>
                </div>
            </div>
          
        </Formik>
      </div>
    </div>

  );
};