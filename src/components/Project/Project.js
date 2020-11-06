import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "./utils";
import MainContainer from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Divider } from "@material-ui/core";

const columnNames = ["TO DO", "DOING", "DONE"];

const cardColors = [
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "burlywood",
  "cornsilk",
  "gainsboro",
  "ghostwhite",
  "ivory",
  "khaki"
];
const pickColor = () => {
  let rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

class Project extends Component {
  constructor() {
    super();

    this.onColumnDrop = this.onColumnDrop.bind(this);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      scene: {
        type: "container",
        props: {
          orientation: "horizontal"
        },
        children: generateItems(3, i => ({
          id: `column${i}`,
          type: "container",
          name: columnNames[i],
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          children: generateItems(+(Math.random() * 10).toFixed(), j => ({
            type: "draggable",
            id: `${i}${j}`,
            props: {
              className: "card",
              varient: "outlined",
              style: {
                  width: '90%', height: '10vh',
                  marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vh',
                  backgroundColor: pickColor()
                },
            },
            data: j
          }))
        }))
      }
    };
  }

  render() {
    return (
      <MainContainer style={{width: '100%', marginTop: '5vh', textAlign: 'center'}}>
        <Container
          orientation="horizontal"
          onDrop={this.onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
            
          }}
          style={{width: '100%'}}
        >
          {this.state.scene.children.map(column => {
            return (
              <Paper varient="outlined" style={{display: 'inline-flex', justifyContent: 'center', width: '30%', marginLeft: '2vw'}}>
                <div style={{width: "100%"}}>
                    {column.name}
                    <Divider />
                  <Container
                    {...column.props}
                    groupName="col"
                    onDragStart={e => console.log("drag started", e)}
                    onDragEnd={e => console.log("drag end", e)}
                    onDrop={e => this.onCardDrop(column.id, e)}
                    getChildPayload={index =>
                      this.getCardPayload(column.id, index)
                    }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    onDragEnter={() => {
                      console.log("drag enter:", column.id);
                    }}
                    onDragLeave={() => {
                      console.log("drag leave:", column.id);
                    }}
                    onDropReady={p => console.log('Drop ready: ', p)}
                    dropPlaceholder={{                      
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >
                    {column.children.map(card => {
                      return (
                        <Draggable key={card.id}>
                          <Paper square {...card.props}>
                            <p>{card.data}</p>
                          </Paper>
                        </Draggable>
                      );
                    })}
                  </Container>
                </div>
              </Paper>
            );
          })}
        </Container>
      </MainContainer>
    );
  }

  getCardPayload(columnId, index) {
    return this.state.scene.children.filter(p => p.id === columnId)[0].children[
      index
    ];
  }

  onColumnDrop(dropResult) {
    const scene = Object.assign({}, this.state.scene);
    scene.children = applyDrag(scene.children, dropResult);
    this.setState({
      scene
    });
  }

  onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.state.scene);
      const column = scene.children.filter(p => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.children = applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);

      this.setState({
        scene
      });
    }
  }
}

export default Project;
