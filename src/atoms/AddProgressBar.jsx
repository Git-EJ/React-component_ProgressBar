import PropTypes from 'prop-types'
import { useState } from "react"

const AddProgressBar = ({onAdd=()=>{}}) => {

  const [addProgressBarTitle, setAddProgressBarTitle] = useState('')
  const [addProgressBarProgress, setAddProgressBarProgress] = useState('')

  /**
     * 
     * @description This function is called when the input "Titre de la barre de progression" is added or modified,
     * 
     */
  const addProgressBarTitleChange = (event) => {

    const userInput = event.target.value
    const trimmed = userInput.trim()

    if (!/^[a-zA-Z0-9-_#* ]*$/.test(trimmed)) return alert('Caractères non autorisés')

    if (trimmed.length > 50) return alert('Le titre de la barre de progression ne doit pas dépasser 50 caractères')
    
    setAddProgressBarTitle(trimmed)
  }

  /**
   * 
   * @description This function is called when the input "Pourcentage de progression (nombre)" is added or modified,
   * 
   */
  const addProgressBarProgressChange = (event) => {

    const userInput = event.target.value.trim()

    if (!/^[0-9]*$/.test(userInput)) return alert('Caractères non autorisés')

    if (event.target.value > 100) return alert('Le pourcentage de progression ne doit pas dépasser 100%')

    setAddProgressBarProgress(userInput)
  }

  /**
   * 
   * @description  This function is called when the button "Ajouter une barre de progression" is clicked,
   * 
   */
  const addProgressBar = () => {

    onAdd({
      progressBarTitle: addProgressBarTitle,
      progress: addProgressBarProgress ? +addProgressBarProgress : 0,
      isChecked: false
    })
    setAddProgressBarTitle('')
    setAddProgressBarProgress('')
  }



  return (
  <>
    <button className="main_add_progress_bar_button" onClick={addProgressBar}>+</button>
    <input  className="main_add_progress_bar_input_title" 
            type="text" 
            placeholder="Titre de la barre de progression" 
            value={addProgressBarTitle}
            onChange={addProgressBarTitleChange}
    />
    <input  className="main_add_progress_bar_input_progress" 
            type="number" 
            min={0}
            max={100}
            placeholder="Pourcentage de progression (nombre)" 
            value={addProgressBarProgress} 
            onChange={addProgressBarProgressChange}
    />
  </>
  )
}

AddProgressBar.propTypes = {
  onAdd: PropTypes.func
}


export default AddProgressBar