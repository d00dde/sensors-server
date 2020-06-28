import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './sensors-list.scss';

const UP_ARROW = 8743;
const DOWN_ARROW = 8744;

export default ({ userId }) => {
  const { sensor, language } = useSelector((state) => {
    return {
      sensor: state.sensor,
      language: state.language.eventsList,
    };
  });
  const [ codeSort, setCodeSort ] = useState(DOWN_ARROW);
  const [ dateSort, setDateSort ] = useState(DOWN_ARROW);
  const [ sorted, setSorted ] = useState(null);
  useEffect(() => {
    setSorted(sensor && sensor.events);
  }, [sensor]);
  if(!sensor)
    return null;
  if(!sensor.events || !sensor.events.length)
    return <h2>{language.noEvents}</h2>

  const sortCode = () => {
    setCodeSort(codeSort === DOWN_ARROW ? UP_ARROW : DOWN_ARROW);
    setSorted(sensor.events.sort((a, b) => codeSort === DOWN_ARROW ? b.code - a.code : a.code - b.code));
  }
  const sortDate = () => {
    setDateSort(dateSort === DOWN_ARROW ? UP_ARROW : DOWN_ARROW);
    setSorted(sensor.events.sort((a, b) => dateSort === DOWN_ARROW ? b.date - a.date : a.date - b.date));
  }

  const eventsList = sorted && sorted.map(({ code, message, date }) => {
    return (
      <tr key={date}>
        <td>{code}</td>
        <td>{message}</td>
        <td>{formatDate(date)}</td>
      </tr>
    );
  });
  return (
    <table className="events-list">
      <caption>{language.events} {sensor.description}</caption>
      <thead>
        <tr>
          <th>{language.code}<span onClick={sortCode}>{String.fromCharCode(codeSort)}</span></th>
          <th>{language.message}</th>
          <th>{language.date}<span onClick={sortDate}>{String.fromCharCode(dateSort)}</span></th>
        </tr>
      </thead>
      <tbody>
        {eventsList}
      </tbody>
    </table>
  );
};

function formatDate (milis) {
  const date = new Date(milis);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return date.toLocaleString("ru", options);
}
