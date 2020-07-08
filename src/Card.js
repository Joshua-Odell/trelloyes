import React from 'react';
import './card.css'

function Card(props) {
    return(
            <div className="Card">
                <button type="button" onClick={() => props.onDeleteItem(props.id)}>delete</button>
                <h3>{props.title}</h3> 
                <p>{props.content}</p>
            </div>
        )    
}

Card.prototypes = {
    onDeleteItem: () => {} // I don't know what prototypes are
}

export default Card;