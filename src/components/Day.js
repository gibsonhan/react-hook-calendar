import React from 'react'

const Day = ({ 
    month, 
    val, 
    year,
    getDate, 
}) => {

    if(val ==="") {
        return <td className="day">{val}</td>
    }
    
    const date = `${month}/${val}/${year}`
    return (
        <td 
            className="day"
            onClick={()=>{getDate(date)}}
            id={date}
            >
            {val}
        </td>
    )
}

export default Day