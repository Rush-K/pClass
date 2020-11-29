import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "./utils";
import MainContainer from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Divider, Dialog, Button } from "@material-ui/core";
import PlusButton from "@material-ui/icons/AddBox";
import Addfeedform from "./Addfeedform";
import Feed from "./Feed";
import Comment from "./Comment";
import SettingIcon from '@material-ui/icons/FindInPage';
import CommentIcon from '@material-ui/icons/Comment';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';

class Project extends Component {
  constructor(props) {
    super(props);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      loading: false,
      openfeed: false,
      openfeedform: false,
      openfeedcomment: false,

      projectInfo: null,

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
          style: {backgroundColor: "azure"},
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          feedList: []
          },
          {
          id: `column1`,
          type: "container",
          name: "DOING",
          style: {backgroundColor: "beige"},
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          feedList: []
          },
          {
          id: `column2`,
          type: "container",
          name: "DONE",
          style: {backgroundColor: "bisque"},
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          feedList: []
          }
        ]
      }
    };
  }

  loadProject = async () => {
    let temp = await axios.post('http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/project/main', {                        
                             projectId: this.props.projectInfo.projectid
                          })
                          .then(function (response) {
                                console.log(response);
                                return response.data;
                          }).catch(function (error) {
                                console.log(error);
                          });
    this.setState({projectInfo: temp, loading: true});
  }

  loadFeed = () => {
    this.setState({loading: true});
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
    if (this.state.loading === false) {
      return ( <div onClick={this.loadProject()}></div>);
    }
    console.log(this.state);
    return (
      <MainContainer>
      {/* 프로젝트 정보 창 */}
      <Paper style={{display: "flex", flexDirection: "column", overflow: "scroll", marginTop: "2vh", width: "100%", height: "500px"}} varient="outlined" elevation={4}>
        <Container style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <h1>[ {this.state.projectInfo.projectname} ]</h1>
        </Container>
        <Divider style={{width: '100%'}}/>
        <Container style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
          <body>Leader : {this.state.projectInfo.leader}</body>
        </Container>
        <Container style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
          {this.state.projectInfo.contributor.map(member => {
            return (
              <body>( {member} )</body>
            );
          })}
        </Container>
        <Divider style={{width: '100%'}}/>
        <Container style={{width: "95%", display: "flex", marginTop: "2vh", marginLeft: "1vh"}}>
          <body>{this.state.projectInfo.projectreadme}</body>
        </Container>
      </Paper>
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
                          <Paper square style={{width: '90%', height: '20vh', marginTop: '1vh',
                                                marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vh',
                                                display: 'flex', flexDirection: 'column', ...column.style}} {...card.props}>
                          <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                            <SettingIcon onClick={this.handleFeedClose}/>
                            <Dialog open={this.state.openfeed} onClose={this.handleFeedClose} aria-labelledby="form-dialog-title">
                              <Feed card={card} modifyCard={this.modifyCard}/> 
                            </Dialog>
                            <CancelIcon/>
                          </div>
                          <Divider />
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
        <Container style={{marginTop: '3vh'}}>
          <Button style={{width: '90%'}}variant="outlined" color="secondary">프로젝트 저장하기</Button>
        </Container>
      </MainContainer>
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
