import React, {useEffect, useRef, useState} from 'react';
import {FormControl} from 'react-bootstrap';
import {MdEdit, MdCheck} from 'react-icons/md';
import {toDateTimeString} from '../Util/TimeUtil';
import DateTimePicker from './DateTimePicker';
export default function EditableTimeDate({
  value,
  headingClass,
  onEditSuccess = () => {},
  extraText,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState();
  const [deadline, setDeadline] = useState(value);

  useEffect(() => {
    setDeadline(value);
  }, [value]);

  const onEditClick = () => {
    setIsEditing(true);
  };
  const onCheckClick = () => {
    setIsEditing(false);
    onEditSuccess(deadline);
  };
  const handleDateChange = (date) => {
    try {
      setDeadline(date.toISOString());
    } catch (error) {}
  };
  return (
    <>
      {isEditing ? (
        <div className="d-flex pb-4 ">
          <MdCheck
            className="editIcon"
            onClick={onCheckClick}
            color="#0e7bf1"
            size="25px"
          />{' '}
          <DateTimePicker
            onChange={handleDateChange}
            value={new Date(deadline)}
          />
        </div>
      ) : (
        <>
          <MdEdit
            className="editIcon"
            size="25px"
            onClick={onEditClick}
            color="#0e7bf1"
          />{' '}
          <p className={`d-flex pb-4 ${headingClass}`}>
            {extraText}

            {toDateTimeString(deadline)}
          </p>
        </>
      )}
    </>
  );
}
