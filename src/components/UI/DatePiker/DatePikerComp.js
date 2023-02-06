import DatePiker from 'react-datepicker'
import React, { forwardRef, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarCheck, BsTable } from "react-icons/bs";
import "./DatePickerCss.css"
const DatePikerComp = ({ date, setDate }) => {
  const [startDate, setStartDate] = useState(null);
  useEffect(() => { if (date !== null) setStartDate(date); if (startDate !== null) setDate(startDate) }, [startDate])
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button onClick={onClick} ref={ref} className={"imgContainer"}>
      <BsCalendarCheck className='imgClass' />
    </Button>
  ));
  return (
    <DatePiker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};

export default DatePikerComp;