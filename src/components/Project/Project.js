import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "./utils";
import MainContainer from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Divider, Dialog } from "@material-ui/core";
import PlusButton from "@material-ui/icons/AddBox";
import Addfeedform from "./Addfeedform";


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
const pickColor = (i) => {
  return cardColors[i];
};




class Project extends Component {
  constructor() {
    super();
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      open: false,
      scene: {
        type: "container",
        props: {
          orientation: "horizontal"
        },
        children: generateItems(3, i => ({
          id: `column${i}`,
          type: "container",
          name: columnNames[i],
          style: {
            width: '90%', height: '20vh',
            marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vh',
            backgroundColor: pickColor(i)
          },
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          feedList: []
        }))
      }
    };
  }

  addChildren = (prev) => {
    const feedList = this.state.scene;
    feedList.children[0].feedList = feedList.children[0].feedList.concat(prev);
    this.setState({
      scene: feedList
    });
  }

  handleDrawerClose = () => this.setState({open: !this.state.open})

  render() {
    return (
      <MainContainer style={{width: '100%', marginTop: '5vh', textAlign: 'center'}}>
        <Container style={{position: "relative"}}>
        </Container>
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
                    {column.feedList.map(card => {
                      return (
                        <Draggable key={card.id}>
                          <Paper square style={column.style} {...card.props}>
                          <h6>{card.feedname}</h6>
                          <Divider />
                          <text>담당자 : ({card.feedmanager})</text>
                          <Divider />
                          <text>상세 내용 : {card.feedarticle}</text>
                          </Paper>
                        </Draggable>
                      );
                    })}
                  </Container>
                  {column.id === "column0" && <PlusButton onClick={this.handleDrawerClose} style={{marginTop: "1vh", marginBottom: "1vh"}} />}
                  <Dialog open={this.state.open} onClose={this.handleDrawerClose} aria-labelledby="form-dialog-title">
                   <Addfeedform addChildren={this.addChildren}/> 
                  </Dialog>
                </div>
              </Paper>
            );
          })}
        </Container>
      </MainContainer>
    );
  }

  getCardPayload(columnId, index) {
    return this.state.scene.children.filter(p => p.id === columnId)[0].feedList[
      index
    ];
  }

  onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.state.scene);
      const column = scene.children.filter(p => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);
      
      const newColumn = Object.assign({}, column);
      newColumn.feedList = applyDrag(newColumn.feedList, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);
      this.setState({
        scene
      });
    }
  }
}

export default Project;
