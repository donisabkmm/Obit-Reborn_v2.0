import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SavePresetModal from './SavePresetModal';
import LoadPresetModal from './LoadPresetModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import '../../styles/pagesettings.css';
import {
  initialValues,
  scaleByField,
  dropdownFields,
  fontOptions,
  customLabels,
  presets
} from './Manage';

const validationSchema = Yup.object().shape({
  // Add your validation rules here, for example:
  // pageWidth: Yup.number().required('Page width is required'),
});

const App = () => {
  const defaultPreset = Object.values(presets).find((preset) => preset.status === 1);
  const [preset, setPreset] = useState(defaultPreset || {});
  const [presetName, setPresetName] = useState(Object.keys(presets).find((key) => presets[key].status === 1));
  const [presetKeys, setPresetKeys] = useState([]);

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleSavePresetButtonClick = () => {
    setShowSaveModal(true);
  };

  const handleLoadPresetButtonClick = () => {
    setPresetKeys(Object.keys(presets));
    setShowLoadModal(true);
  };

  const handleModalClose = () => {
    setShowSaveModal(false);
    setShowLoadModal(false);
  };

  const handleSavePreset = (presetName) => {
    console.log('Save preset:', presetName);
    setShowSaveModal(false);
  };

  const handleLoadPreset = (presetName) => {
    console.log('Load preset:', presetName);
    setShowLoadModal(false);
  };

  return (
    <div className="app-container">
      <div className="preset-header" onClick={handleLoadPresetButtonClick}>
        <FontAwesomeIcon icon={faFileContract} /> : {presetName}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form-container">
          <div className="section-container">
            <div className="d-flex flex-wrap">
              <div className="flex-grow-1 form-section">
                <div className="row">
                  {['pageWidth', 'pageHeight', 'columnWidth', 'gutterSpace', 'paragraphSpacing', 'advertisingColumnWidth', 'advertGutterSpace'].map((key) => (
                    <div key={key} className="col-md-4 mb-3">
                      <label htmlFor={key} className="form-label">
                        {customLabels[key] || key}
                      </label>
                      <div className="input-group">
                        <Field type="text" id={key} name={key} className="form-control" value={preset[key]} />
                        <span className="input-group-text">{scaleByField[key] || 'cm'}</span>
                      </div>
                      <ErrorMessage name={key} component="div" className="text-danger" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-grow-1 form-section">
                <div className="mb-3">
                  <label htmlFor="photoResolution" className="form-label">
                    Photo Resolution
                  </label>
                  <div className="input-group">
                    <Field type="text" name="photoResolutionWidth" className="form-control" value={preset.photoResolutionWidth} />
                    <span className="input-group-text">×</span>
                    <Field type="text" name="photoResolutionHeight" className="form-control" value={preset.photoResolutionHeight} />
                    <span className="input-group-text">px</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="photoSize" className="form-label">Photo Size</label>
                  <div className="input-group">
                    <Field type="text" name="photoSize" className="form-control" value={preset.photoSize} />
                    <span className="input-group-text">cm</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="photoBgColor" className="form-label">Photo Background Color</label>
                  <div className="input-group">
                    <Field type="text" name="photoBgColor" className="form-control" value={preset.photoBgColor} />
                  </div>
                </div>
              </div>
            </div>

            <div className="typography-section">
  <div className="row">
    {['headlineFont', 'headlineFontSize', 'placeFont', 'placeFontSize', 'placeFontLeading', 'basicStoryFont', 'basicStoryFontSize', 'basicStoryFontLeading'].map((key) => (
      <div key={key} className="col-md-4 mb-3">
        <label htmlFor={key} className="form-label">{customLabels[key] || key}</label>
        <div className="input-group">
          <Field type="text" id={key} name={key} className="form-control" value={preset[key]} />
          <span className="input-group-text">pt</span>
        </div>
        <ErrorMessage name={key} component="div" className="text-danger" />
      </div>
    ))}
  </div>
</div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={handleLoadPresetButtonClick}>
                Load Preset
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleSavePresetButtonClick}>
                Save As
              </button>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </div>
        </Form>
      </Formik>
      <SavePresetModal showModal={showSaveModal} onClose={handleModalClose} onSavePreset={handleSavePreset} />
      <LoadPresetModal showModal={showLoadModal} onClose={handleModalClose} onLoadPreset={handleLoadPreset} presetKeys={presetKeys} presetName={presetName} setPresetName={setPresetName} />
    </div>
  );
};

export default App;
