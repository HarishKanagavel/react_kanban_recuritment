import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import 'semantic-ui-css/semantic.min.css';
import { Icon, Input } from 'semantic-ui-react';
import { Global, css } from "@emotion/core";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { authorQuoteMap } from "./data";
import Styles from './styles/Editor.module.css';

const ParentContainer = styled.div`
  /* height: ${({ height }) => height}; */
  /* overflow-x: hidden;
  overflow-y: auto; */
`;

const Container = styled.div`
  background-color: white;
  /* min-height: 100vh; */
  /* like display:flex but will allow bleeding over the window width */
  min-width: 97vw;
  display: inline-flex;
  padding-left: 20px;
  padding-right: 20px;
`;

class Board extends Component {

  static defaultProps = {
    isCombineEnabled: false
  };

  state = {
    columns: this.props.initial,
    ordered: Object.keys(this.props.initial),
    name: 'ALL'
  };

  boardRef;

  changeBgColour = (data) => {
    this.setState({
        name: data
    })  
  }

  onDragEnd = result => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }

      const column = this.state.columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const columns = {
        ...this.state.columns,
        [result.source.droppableId]: withQuoteRemoved
      };
      this.setState({ columns });
      return;
    }

    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === "COLUMN") {
      const ordered = reorder(
        this.state.ordered,
        source.index,
        destination.index
      );

      this.setState({
        ordered
      });

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: this.state.columns,
      source,
      destination
    });

    this.setState({
      columns: data.quoteMap
    });
  };

  render() {
    const columns = this.state.columns;
    const ordered = this.state.ordered;
    const { containerHeight } = this.props;

    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={Boolean(containerHeight)}
        isCombineEnabled={this.props.isCombineEnabled}
      >
        {provided => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key, index) => (
              <Column
                key={key}
                index={index}
                title={key}
                quotes={columns[key]}
                isScrollable={this.props.withScrollableColumns}
                isCombineEnabled={this.props.isCombineEnabled}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );

    return (
      <React.Fragment>
         <div className={Styles.header}>
                <div className={Styles.left}>
                <div className={Styles.label} >Tickets</div>
                <button className={this.state.name==='ALL'? `${Styles.button_active}` : `${Styles.button}` }  onClick={() => this.changeBgColour('ALL')} >ALL</button>
                <button className={this.state.name==='Tickets'? `${Styles.button_active}` : `${Styles.button}` } onClick={() => this.changeBgColour('Tickets')} id='Tickets'>ONLY MY TICKETS</button>
                <button className={this.state.name==='updated'? `${Styles.button_active}` : `${Styles.button}` } onClick={() => this.changeBgColour('updated')}>RECENTLY UPDATED</button>
                <button className={this.state.name==='filter'? `${Styles.button_active}` : `${Styles.button}` } onClick={() => this.changeBgColour('filter')}><Icon name='filter'/></button>
                <button className={this.state.name==='refresh'? `${Styles.button_active}` : `${Styles.button}` } onClick={() => this.changeBgColour('refresh')}><Icon name='refresh'/></button>
                </div>
                <div className={Styles.right}>
                  <div className={Styles.search}><Input icon='search' placeholder='Search...' /></div>  
                <button className={this.state.name==='setting'? `${Styles.button_active}` : `${Styles.button}` } onClick={() => this.changeBgColour('setting')}><Icon name='setting'/>Configuration</button>
                <div className={Styles.label}>(0-30)</div>
                <button className={Styles.button} ><Icon name='angle left'/></button>
                <button className={Styles.button} ><Icon name='angle right'/></button>
                </div>
          </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {containerHeight ? (
            <ParentContainer height={containerHeight}>{board}</ParentContainer>
          ) : (
            board
          )}
        </DragDropContext>
        <Global
          styles={css`
            body {
              background: white;
              display: flex;
            }
          `}
        />
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Board initial={authorQuoteMap} />, rootElement);
