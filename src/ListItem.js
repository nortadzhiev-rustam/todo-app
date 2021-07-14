import React from 'react';
import './ListItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import 'animate.css/animate.css';

const ListItem = (props) => {
  const [isDone, setIsDone] = React.useState(props.item.completed);
  const [isDeleted, setIsDeleted] = React.useState(false);

  return (
    <div
      className={
        isDeleted
          ? 'list-wrapper animate__animated animate__backOutRight'
          : 'list-wrapper animate__animated animate__backInLeft'
      }
    >
      <div className='list'>
        <span className='checkbox animate__animated animate__rubberBand'>
          {' '}
          <FontAwesomeIcon
            className=''
            color='#2e294e'
            onClick={() => {
              setIsDone(!isDone);
              props.setCompleted(!isDone, props.item.key);
            }}
            icon={isDone ? faCheckSquare : faSquare}
          />
        </span>
        {!isDone ? (
          <input
            style={{
              backgroundColor: 'transparent',
              border: 0,
              color: '#2e294e',
              outline: 'none',
              width: '100%',
              fontSize: 18,
            }}
            type='text'
            value={props.item.text}
            onChange={(e) => {
              props.updateItem(e.target.value, props.item.key);
            }}
          />
        ) : (
          <span
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.5,
              textDecoration: 'line-through',
              color: '#2e294e',
            }}
          >
            {props.item.text}
          </span>
        )}
        {/* {item.text} */}
      </div>
      <span>
        <FontAwesomeIcon
          color='white'
          icon={faMinusCircle}
          onClick={() => {
            setIsDeleted(!isDeleted);
            setTimeout(() => {
              props.deleteItm(props.item.key);
            }, 500);
          }}
        />
      </span>
    </div>
  );
};

export default ListItem;
