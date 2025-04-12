import React from 'react';
import { Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';

function TaskItem({ task, onEdit, onDelete, isDark }) {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'No date' : format(date, 'MMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className={`rounded-lg shadow-md p-6 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {task.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className={`hover:text-blue-800 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
            aria-label="Edit task"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className={`hover:text-red-800 ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}
            aria-label="Delete task"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      <p className={`mb-4 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {task.description}
      </p>
      <div className={`flex items-center gap-4 text-sm ${
        isDark ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag size={16} />
          <span>{task.category || 'Uncategorized'}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskItem; 