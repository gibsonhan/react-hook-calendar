import React, { useState, useEffect } from 'react'
import helper from '../utils/calendar_helper'
import Day from '../components/Day'

const Calendar = () => {
    const headerDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    
    const [calendarArr, setCalendarArr] = useState([])
    const [calendar, setCalendar] = useState([])
    const [index, setIndex] = useState(1)
    const [range, setRange] = useState([])

    const showDaysHeader = () => {
        const headers = headerDays.map(day => <Day key={day} val={day}/>)
        return <tr>{headers}</tr>
    }

    const generateMonth = (i) => {
        
        const { month, year } = calendar[i]
        const matrix = helper.createMonthMatrix(month, year)
        
        return matrix.map(row => {
            var dayIdnx = 0
            
            const week = row.map(col => {
                if(col === 0) {
                    return <Day key={month+headerDays[dayIdnx++]+col} val =""/>
                } 
                else {
                    return <Day 
                                key={month+headerDays[dayIdnx++]+col} 
                                month={month}
                                val={col}
                                year={year} 
                                getDate={getDate}
                               /> 
                }
            })
            return (<tr key={month+year+row}>{week}</tr>)
        })
    }

    const getDate = (element) => {
        setRange(prevState => {
            if(prevState.length === 2) return prevState
            //if endDate is not after first date do not save
            if(prevState.length === 1 && !(helper.dateAfter(element, prevState[0]))) {
                return prevState
            }
            helper.setColor(element, "set")
            return [...prevState, element]
        })
    }
    
    const generateCalendar = () => {
        if(calendar.length === 0) return
        const array = []

        for(let i = 0; i < calendar.length; i++) {
            array.push(generateMonth(i))
        }
        setCalendarArr(array)
    }

    const displayCalendar = () => {
        return calendarArr[index]
    }
    
    const displayMMYYYY = () => {
        if(calendar.length !== 0) {
            const string = calendar[index].month + " " + calendar[index].year
            return string
        }
    }

    const handleMonth = (direction) => {
        if(direction === "next") {
            setIndex((index+1)%calendar.length)
        }
        else {
            (index === 0) ? setIndex(calendar.length-1) : setIndex(index-1)
        }
    }
  
    const handleClear = () => {
        helper.resetHighlight(range[0], range[1])
        setRange(prevState => [])
        setCalendarArr(prevState => [...prevState])
    }

    useEffect(() => {
        if(range.length === 1) {
            helper.setColor(range[0], "set")
        }
        if(range.length === 2) {
            helper.setColor(range[0], "set")
            helper.setColor(range[1], "set")
            helper.highlightDays(range[0], range[1])
        }
    })

    useEffect(() => {
        let months = helper.calendarRange(12)
        setCalendar(months)
    }, [])

    return (
        <div className={"calendar__container"}>
            <div className="navigation">
                <span onClick={()=>{handleMonth("back")}}> Back </span>
                {displayMMYYYY()}
                <span onClick={()=>{handleMonth("next")}}> Next </span>
            </div>
            <table>
                <thead>
                    {showDaysHeader()}
                </thead>
                <tbody>
                    {displayCalendar()}
                </tbody>
            </table>
            <div className="action">
                <button onClick={()=>{handleClear()}}>clear</button>
                <button onClick={()=>{generateCalendar()}}>generate</button>
            </div>
        </div>
    )
}

export default Calendar