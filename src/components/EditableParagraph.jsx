import React, {useEffect, useRef, useState} from 'react';
import {FormControl} from 'react-bootstrap';
import {MdEdit, MdCheck} from 'react-icons/md';

export default function EditableParagraph({
  value,
  headingClass,
  onEditSuccess = () => {},
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState();

  useEffect(() => {
    setText(value);
  }, [value]);

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onEditClick = () => {
    setIsEditing(true);
  };
  const onCheckClick = () => {
    setIsEditing(false);

    onEditSuccess(text);
  };

  return (
    <>
      {isEditing ? (
        <div className="d-flex p-4 ">
          <MdCheck
            className="editIcon"
            onClick={onCheckClick}
            color="#0e7bf1"
            size="2em"
          />{' '}
          <FormControl type="text" onChange={onChange} value={text} />
        </div>
      ) : (
        <p className={`d-flex p-4 ${headingClass}`}>
          <MdEdit
            className="editIcon"
            size="1.3em"
            onClick={onEditClick}
            color="#0e7bf1"
          />{' '}
          {value}
        </p>
      )}
    </>
  );
}
