
import {
    addDays,
    addMonths,
    differenceInDays,
    format,
    getDaysInMonth, 
    getWeeksInMonth, 
    isAfter,
    startOfMonth 
    } from 'date-fns'

const headerDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const createMonthMatrix = (month, year) => {
    
    const monthMatrix = []
    const date = `${month}-1-${year}`
    const maxDays = getDaysInMonth(new Date(date)) 
    const numWeeks = getWeeksInMonth(new Date(date))
    
    //.getDay() API: Monday Start at index 0
    const firstDay = startOfMonth(new Date(date))
    const firstDayIndx = firstDay.getDay()
    
    let startDay = 1
    for(let week = 0; week < numWeeks; week++){
        
        monthMatrix.push(createWeek(firstDayIndx, startDay, maxDays))

        const weekLen = monthMatrix[week].length - 1
        const lastWkIndex = monthMatrix[week][weekLen]
        startDay = lastWkIndex +1
    }
    return monthMatrix
}

const createWeek = (offset, start, max) => {
    const week = []
    let day = start;
    
    if(day === 1) {
        for(let i = 1; i <= offset; i++) {
            week.push(0)
        }
    }

    for(let i = week.length; i < 7 && day <= max; i++) {
        week.push(day++)
    }

    return week
}

const calendarRange= (next) => {
    const monthRange = []
    
    for(let i = -1; i < next; i++) {
            let date = addMonths(new Date(), i)
            let month = format(date, 'MMMM')
            let year = format(date, 'yyyy')

            let newObj = {month, year} 
            monthRange.push(newObj)
        }
        
    return monthRange
}

const setColor =(id, action) => {
    const element = document.getElementById(id)
    if(!element) return

    if(action === "set") {
        element.style.backgroundColor = 'rgb(245, 105, 159)'
        element.style.color = 'rgb(255,255,255)'
    }
    else if (action ==="highlight") {
        element.style.backgroundColor = 'rgb(255, 240, 210)'
        element.style.color = 'rgb(158, 158, 157)'
    }

    else {
        element.style.backgroundColor = 'rgb(255, 255, 255)'
        element.style.color = 'rgb(0, 0, 0)'
    }
    
}

const dateAfter = (endDate, startDate) => {
    const end = new Date(endDate)
    const start = new Date(startDate)
    return isAfter(end, start) 
}

const numOfDays = (startDate, endDate) => {
    const end = new Date(endDate)
    const start = new Date(startDate)
    return differenceInDays(end, start)-1
}

const highlightDays = (startDate, endDate) => {
    const end = new Date(endDate)
    const start = new Date(startDate)
    const daysToHighlight = differenceInDays(end, start)-1
    let day = startDate

    for(let i = 0; i < daysToHighlight; i++) {
        let nextDay = addDays(new Date(day), 1)
        nextDay = format(nextDay, 'MMMM/d/yyyy')
        setColor(nextDay, "highlight")
        day = nextDay
    }
}

const resetHighlight = (startDate, endDate) => {
    const end = new Date(endDate)
    const start = new Date(startDate)
    const daysToHighlight = differenceInDays(end, start)-1
    let day = startDate

    for(let i = 0; i < daysToHighlight; i++) {
        let nextDay = addDays(new Date(day), 1)
        nextDay = format(nextDay, 'MMMM/d/yyyy')
        setColor(nextDay)
        day = nextDay
    }

    setColor(startDate)
    setColor(endDate)
}

const formatDate = (date) => {
    if(!date) return
    const day = new Date(date)
    return format(day, 'MMM-dd')
}

export default {
    createMonthMatrix,
    calendarRange,
    setColor,
    dateAfter,
    formatDate,
    headerDays,
    highlightDays,
    numOfDays,
    resetHighlight,
}