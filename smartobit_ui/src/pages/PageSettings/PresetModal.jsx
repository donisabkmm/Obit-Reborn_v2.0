import React, { useState } from 'react';
import Modal from 'react-modal';

const PresetModal = ({ isOpen, closeModal, options, onApply }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleApply = () => {
    onApply(selectedOption);
    closeModal();
  };

  const customStyles = {
    content: {
      width: '300px',
      height: '500px',
      margin: 'auto',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      marginTop: '50px',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Preset Selection Modal"
      style={customStyles}
    >
      <h5 style={{ textAlign: 'center' }}>Select Preset ...</h5>
      <div style={{ padding: '20px' }}>
        {options.map((option) => (
          <div
            key={option}
            onClick={() => handleOptionChange(option)}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              backgroundColor: selectedOption === option ? '#e0f7fa' : 'white',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid #26c6da',
                marginRight: '8px',
                backgroundColor: selectedOption === option ? '#26c6da' : 'white',
              }}
            />
            <span>{option}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleApply}
          style={{
            padding: '10px',
            backgroundColor: '#26c6da',
            color: 'white',
            borderRadius: '4px',
            border: 'none',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          Apply
        </button>
        <button
          onClick={closeModal}
          style={{
            padding: '10px',
            backgroundColor: 'transparent',
            color: '#555',
            borderRadius: '4px',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default PresetModal;
