import React, { useState, useEffect } from "react";
import helper from "../utils/calendar_helper";
import Day from "../components/Day";

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [index, setIndex] = useState(1);
  const [range, setRange] = useState([]);

  const showDaysHeader = () => {
    if (calendar.length === 0) return;
    const headers = helper.headerDays.map(day => <Day key={day} val={day} />);
    return <tr>{headers}</tr>;
  };

  const getDate = element => {
    setRange(prevState => {
      if (prevState.length === 2) return prevState;
      //if endDate is not after first date do not save
      if (prevState.length === 1 && !helper.dateAfter(element, prevState[0])) {
        return prevState;
      }
      helper.setColor(element, "set");
      return [...prevState, element];
    });
  };

  const displayCalendar = () => {
    if (calendar.length === 0) return;
    return calendar[index].matrix;
  };

  const displayMMYYYY = () => {
    if (calendar.length !== 0) {
      const string = calendar[index].month + " " + calendar[index].year;
      return string;
    }
  };

  const handleMonth = direction => {
    direction === "next"
      ? setIndex((index + 1) % calendar.length)
      : index === 0
      ? setIndex(calendar.length - 1)
      : setIndex(index - 1);
  };

  const handleClear = () => {
    helper.resetHighlight(range[0], range[1]);
    setRange([]);
  };

  const handleSave = () => {
    if (range.length === 0) window.alert(`Please Select Your Dates`);
    if (range.length === 1) window.alert(`Please Select one more date`);
    if (range.length === 2)
      window.alert(`Your dates are ${range[0]} ${range[1]}`);
  };

  useEffect(() => {
    if (range.length === 1) {
      helper.setColor(range[0], "set");
    }
    if (range.length === 2) {
      helper.setColor(range[0], "set");
      helper.setColor(range[1], "set");
      helper.highlightDays(range[0], range[1]);
    }
  });

  useEffect(() => {
    const generateCalendar = num => {
      const array = [];
      const months = helper.calendarRange(num);

      for (let i = 0; i < months.length; i++) {
        array.push(generateMonth(months[i]));
      }
      return array;
    };

    const generateMonth = calendarMonth => {
      const { year, month } = calendarMonth;
      const monthMatrix = helper.createMonthMatrix(month, year);

      const createdMonth = monthMatrix.map(row => {
        var dayIdnx = 0;
        const week = row.map(col => {
          return col === 0 ? (
            <Day key={month + helper.headerDays[dayIdnx++] + col} val="" />
          ) : (
            <Day
              key={month + helper.headerDays[dayIdnx++] + col}
              month={month}
              val={col}
              year={year}
              getDate={getDate}
            />
          );
        });
        return <tr key={month + year + row}>{week}</tr>;
      });

      return {
        month: month,
        year: year,
        matrix: createdMonth
      };
    };
    const intalCalendar = generateCalendar(12);
    setCalendar(intalCalendar);
  }, []);

  return (
    <div className={"calendar__container"}>
      <div className="navigation">
        <span
          onClick={() => {
            handleMonth("back");
          }}
        >
          {" "}
          Back{" "}
        </span>
        {displayMMYYYY()}
        <span
          onClick={() => {
            handleMonth("next");
          }}
        >
          {" "}
          Next{" "}
        </span>
      </div>
      <div className="display">
        {helper.formatDate(range[0])} {helper.formatDate(range[1])}
      </div>
      <table>
        <thead>{showDaysHeader()}</thead>
        <tbody>{displayCalendar()}</tbody>
      </table>
      <div className="action">
        <button
          onClick={() => {
            handleClear();
          }}
        >
          clear
        </button>
        <button
          onClick={() => {
            handleSave();
          }}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default Calendar;
