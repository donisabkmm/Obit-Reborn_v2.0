import React from 'react';
import { css } from '@emotion/css';

function SmallBoxGrid() {
  // Define the number of rows and columns
  const numRows = 10;
  const numCols = 11;

  // Define the size of each box and gutter space
  const boxSize = 50; // Adjust as per your requirement
  const gutterSize = 5; // Adjust as per your requirement

  // Define CSS styles
  const containerStyle = css({
    display: 'grid',
    gridTemplateRows: `repeat(${numRows}, ${boxSize}px)`,
    gridTemplateColumns: `repeat(${numCols}, ${boxSize}px)`,
    gap: `${gutterSize}px`,
  });

  const boxStyle = css({
    width: `${boxSize}px`,
    height: `${boxSize}px`,
    backgroundColor: 'lightblue', // Adjust color as per your requirement
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  // Create an array of boxes
  const boxes = [];
  for (let i = 1; i <= numRows * numCols; i++) {
    boxes.push(
      <div className={boxStyle} key={i}>
        {i}
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      {boxes}
    </div>
  );
}

export default SmallBoxGrid;
