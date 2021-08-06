import React from "react";
import Styles from '../styles/Carddetails.module.css';


export default class QuoteItem extends React.PureComponent {
  render() {
    const { quote, isDragging, isGroupedOver, provided } = this.props;

    return (
      <div className={Styles.card}
        href={quote.author.url}
        isDragging={isDragging}
        isGroupedOver={isGroupedOver}
        colors={quote.author.colors}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
       <div className={Styles.card1} key={quote.id}>
      <div className={Styles.row1}>#{quote.num} <button  className={Styles.resp}>Response due</button></div>
      <div className={Styles.order}>Order No: #{quote.orderno}</div>
      <div className={Styles.dishes}>{quote.order}</div>
      <div className={Styles.last}>
      <div className={Styles.date}>Due:  {quote.data}</div>
      <div className={Styles.date}>Assigned to<span className={Styles.dot}></span></div>
      <div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}
