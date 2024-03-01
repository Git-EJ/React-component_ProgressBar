import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const ProgressBar = ({  
                        progressKey,
                        progressBarTitle, 
                        progress, 
                        handleCheckboxChange,
                        isChecked,
                        deleteProgressBar,
                      }) => {

  const [color, setColor] = useState('') //for the progress bar filler and percentage color
  const [animate, setAnimate] = useState(false) //for the displayed percentage
  const [timer, setTimer] = useState(0)
  const [prevProgress, setPrevProgress] = useState(-1)

  useEffect(() => {
    
    if (progress === prevProgress) return
    setPrevProgress(progress)

    if (timer) {
      clearTimeout(timer)
    }

    setTimer(setTimeout(() => {
      setAnimate(false)
      setTimer(0)
    }, 500)) //timer for the animation of the displayed percentage

    setAnimate(true)

    if (progress>= 75) {
      setColor('#30DB63')
    } else if (progress >= 50) {
      setColor('#60E8B6')
    } else if (progress >= 25) {
      setColor('#60ADE8')
    } else {
      setColor('#7160E8')
    }

  }, [progress, prevProgress, timer])


  return (
    <div className="progress_bar_title_and_bar_container">

      <div className="progress_bar_title"> {progressBarTitle} </div>
      <div className="progress_bar_container">

        <div className={`progress_bar_percentage${animate ? ' animate' : ''}`} style={animate ? { color: `${color}` } : {}}>
          {progress}%
        </div>

        <div className="progress_bar_bg_container">
          <div className="progress_bar_filler" style={{ width: `${progress}%`, backgroundColor:`${color}` }}></div>
        </div>
        
        <input className="progress_bar_checkbox" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> 
        <div className='progress_bar_delete_icon_container'>
          <img className='progress_bar_delete_icon' src="/src/assets/icons/remove_icon.png" alt="delete icon" onClick={()=>deleteProgressBar(progressKey)} />
        </div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  progressKey: PropTypes.string.isRequired,
  progressBarTitle: PropTypes.string,
  progress: PropTypes.number,
  handleCheckboxChange: PropTypes.func,
  isChecked: PropTypes.bool,
  deleteProgressBar: PropTypes.func,
}

export default ProgressBar