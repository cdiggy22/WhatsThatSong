import React from "react";
import Card from "./Card";
import TrackCard from "./TrackCard";
import { v4 as uuid } from 'uuid';

function CardList({ cards = [] }) {
    return cards.length ? (
        <div className="CardList">
          {cards.map((cardData, idx) => (
            <Card
              details={cardData}
              key={uuid()}
            />
          ))}
          </div>
        ) : (
            <p className="lead">Sorry, no results were found!</p>
        );
     
}
export default CardList;