import React, { useState } from 'react';
import { css } from '@emotion/css';
import { Droppable } from 'react-beautiful-dnd';

function ColGrid(id,cards) {
  const [colWidth, setColWidth] = useState("78.597pt");
  const [colHeight, setColHeight] = useState("1433.622pt");

  const column = css({
    width: colWidth,
    height: colHeight,
    backgroundColor: "whitesmoke",
  });

  return (
    <div className={column}>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* {cards.map((card, index) => (
              <div key={card.id} className="card">
                {card.content}
              </div>
            ))} */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default ColGrid;