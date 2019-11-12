import React from 'react'
import Calendar from './components/Calendar'

import './App.css'

const App = () => {
    
    const calendarStyle = {
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.28) 0px 8px 28px',
        height: '400px',
        width: '400px',
    }
    
    return(
        <div className="App">
            <div className="calendar" style={calendarStyle}>
                <Calendar /> 
            </div>
        </div>
    )
}

export default App