import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "./utils";
import MainContainer from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Divider, Dialog } from "@material-ui/core";
import PlusButton from "@material-ui/icons/AddBox";
import Addfeedform from "./Addfeedform";
import Feed from "./Feed";
import Comment from "./Comment";
import SettingIcon from '@material-ui/icons/FindInPage';
import CommentIcon from '@material-ui/icons/Comment';

class Project extends Component {
  constructor(props) {
    super(props);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      openfeed: false,
      openfeedform: false,
      openfeedcomment: false,
      scene: {
        type: "container",
        props: {
          orientation: "horizontal"
        },
        numoffeed: 0,
        children: [
          {
          id: `column0`,
          type: "container",
          name: "TO DO",
          style: {
            width: '90%', height: '20vh',
            marginTop: '1vh', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vh',
            backgroundColor:   "azure"
          },
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          feedList: this.props.feed[0].feedList
          },
          {
          id: `column1`,
          type: "container",
          name: "DOING",
          style: {
            width: '90%', height: '20vh',
            marginTop: '1vh', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vh',
            backgroundColor: "beige"
          },
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          feedList: this.props.feed[1].feedList
          },
          {
          id: `column2`,
          type: "container",
          name: "DONE",
          style: {
            width: '90%', height: '20vh',
            marginTop: '1vh', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vh',
            backgroundColor: "bisque"
          },
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          feedList: this.props.feed[2].feedList
          }
        ]
      }
    };
  }

  addChildren = (prev) => {
    const feedList = this.state.scene;
    const feedindex = prev;

    feedList.numoffeed = feedList.numoffeed + 1;
    feedindex.id = feedList.numoffeed;

    feedList.children[0].feedList = feedList.children[0].feedList.concat(feedindex);
    this.setState({
      scene: feedList
    });
  }

  modifyCard = (prev) => {
    const feedinfo = this.state.scene;
    const complete = false;

    for (let column in feedinfo.children) {
      for (let feed in column.feedList) {
        if (prev.id === feed.id) {
          feedinfo.children[feedinfo.children.indexOf(column)].
          feedList[column.feedList.indexOf(feed)] = prev;
          complete = !complete;
          break;
        }
      }
      if (complete === true) break;
    }
    console.log(feedinfo);

    this.setState({
      scene: feedinfo
    });
    
  }

  handleFeedFormClose = () => this.setState({openfeedform: !this.state.openfeedform})
  handleFeedClose = () => this.setState({openfeed: !this.state.openfeed})
  handleFeedCommentClose = () => this.setState({openfeedcomment: !this.state.openfeedcomment})

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
                          <div style={{position: "absolute"}}>
                            <SettingIcon onClick={this.handleFeedClose}/>
                            <Dialog open={this.state.openfeed} onClose={this.handleFeedClose} aria-labelledby="form-dialog-title">
                              <Feed card={card} modifyCard={this.modifyCard}/> 
                            </Dialog>
                          </div>
                          <div style={{display: "flex", height: "60%", alignItems: "middle",justifyContent: "center"}}>
                            <h3>{card.feedname}</h3>
                          </div>
                          <Divider />
                          <text>담당자 : ({card.feedmanager})</text>
                          <Divider />
                          <div onClick={this.handleFeedCommentClose} style={{marginTop: "1vh"}}>
                          <CommentIcon /> 댓글 보기
                          </div>
                          <Dialog open={this.state.openfeedcomment} onClose={this.handleFeedCommentClose} aria-labelledby="form-dialog-title">
                              <Comment card={card} modifyCard={this.modifyCard}/> 
                          </Dialog>
                          </Paper>
                        </Draggable>
                      );
                    })}
                  </Container>
                  {column.id === "column0" && <PlusButton onClick={this.handleFeedFormClose} style={{marginTop: "1vh", marginBottom: "1vh"}} />}
                  <Dialog open={this.state.openfeedform} onClose={this.handleFeedFormClose} aria-labelledby="form-dialog-title">
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
