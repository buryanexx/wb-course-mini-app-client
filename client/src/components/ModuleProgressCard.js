<div className="module-progress-info">
  <h3 className="module-title">{module.title}</h3>
  <div className="module-meta">
    <span className="module-lessons-count">{module.lessonsCount} уроков</span>
    <span className="module-duration">{module.duration}</span>
  </div>
</div>

<div className="module-progress-bar-container">
  <div 
    className="module-progress-bar" 
    style={{ width: `${progress}%` }}
  >
    {progress > 0 && (
      <span className="progress-percentage">{progress}%</span>
    )}
  </div>
</div> 