import React from 'react';

const TaskGenerator = ({ task }) => {
  return (
    <div className="task-generator">
      <h2>Your Horrible Task:</h2>
      <p>{task || "Click the button to get your first task!"}</p>
    </div>
  );
};

export default TaskGenerator;
