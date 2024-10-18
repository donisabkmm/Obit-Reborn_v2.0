import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  presetName: Yup.string().required('Preset name is required'),
});

const SavePresetModal = ({ showModal, onClose, onSavePreset }) => {
  const modalRef = useRef();

  const handleSavePreset = (values) => {
    onSavePreset(values.presetName);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

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
              <h5 className="modal-title">Save Preset</h5>
              <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{ presetName: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSavePreset}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="presetName" className="form-label">
                      Preset Name
                    </label>
                    <Field
                      type="text"
                      id="presetName"
                      name="presetName"
                      className="form-control"
                    />
                    <ErrorMessage name="presetName" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
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

export default SavePresetModal;
