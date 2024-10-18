import React, { useRef, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  presetName: Yup.string().required('Preset name is required'),
});

const LoadPresetModal = ({ showModal, onClose, onSavePreset, presetKeys, presetName, setPresetName }) => {
  const modalRef = useRef();

  const [tempPreset, setTempPreset] = useState(presetName)


  const handleLoadPreset = (e) => {
    // onSavePreset(values.presetName);
    setPresetName(tempPreset);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    onClose();

  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const onChange = (e) => {
    setTempPreset(e.target.value)
    console.log("change pr", tempPreset)
  }

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal]);

  return (
    <div>
      {showModal && <div className="overlay"></div>}
      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document" ref={modalRef}>
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">LOAD PRESET</h6>
              <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{ presetName: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLoadPreset}
              >
                <Form>
                  <div className="mb-3">
                    <label className="form-label">
                      Select Preset
                    </label>
                    {/* <Field as="select" className="form-select" value={tempPreset} onChange={onChange}>
                      {presetKeys.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field> */}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Load
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadPresetModal;
