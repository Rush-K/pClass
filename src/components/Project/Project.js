import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import MainContainer from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Typography, Divider, Dialog, DialogContentText,
         Accordion, AccordionSummary, AccordionDetails, 
         DialogContent, DialogTitle, DialogActions, Button} from "@material-ui/core";
import PlusButton from "@material-ui/icons/AddBox";
import Addfeedform from "./Addfeedform";
import Feed from "./Feed";
import Comment from "./Comment";
import SettingIcon from '@material-ui/icons/FindInPage';
import CommentIcon from '@material-ui/icons/Comment';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

class Project extends Component {
  constructor(props) {
    super(props);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      feedloading: false,
      projectloading: false,
      checking: false,

      error: false,
      openfeeddelete: false,

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
                                //console.log(response);
                                return response.data;
                          }).catch(function (error) {
                                //console.log(error);
                          });
    this.loadFeed();
    this.setState({projectInfo: temp, projectloading: true});
  }

  loadFeed = async () => {
    let todotemp = await axios.get(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.projectInfo.subjectid}/${this.props.projectInfo.projectid}/ToDo`)
    .then(function (response) {
          //console.log(response);
          return response.data;
    }).catch(function (error) {
          //console.log(error);
    });

let doingtemp = await axios.get(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.projectInfo.subjectid}/${this.props.projectInfo.projectid}/Doing`)
    .then(function (response) {
          //console.log(response);
          return response.data;
    }).catch(function (error) {
          //console.log(error);
    });

let donetemp = await axios.get(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.projectInfo.subjectid}/${this.props.projectInfo.projectid}/Done`)
    .then(function (response) {
          //console.log(response);
          return response.data;
    }).catch(function (error) {
          //console.log(error);
    });

const t = this.state.scene;
t.children[0].feedList = todotemp;
t.children[1].feedList = doingtemp;
t.children[2].feedList = donetemp;
this.setState({scene: t, feedloading: true});
  }

  addChildren = async (prev) => {
    let item = await axios.post(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.projectInfo.subjectid}/${this.props.projectInfo.projectid}/addToDo`, {
      writer: prev.writer,
      feedname: prev.feedname,
      manager: prev.manager,
      start_date: prev.start_date,
      end_date: prev.end_date,
      content: prev.content,
      status: prev.status
    })
    .then(function (response) {
          alert("피드 추가가 완료되었습니다.");
          console.log(response);
          return response.data;
    }).catch(function (error) {
          console.log(error);
    });
    this.handleFeedFormClose();
    this.setState({feedloading: false});
    this.loadFeed();
  }

  modifyChildren = async (prev, columnId) => {
    await axios.put(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.projectInfo.subjectid}/${this.props.projectInfo.projectid}/feedDragDrop`, {
      feedId: prev._id,
      status: columnId
    }).then(function (response) {
      //console.log(response);
    }).catch(function (error) {
      //console.log(error);
    });
    this.setState({feedloading: false});
    this.loadFeed();
  }

  delChildren = async (prev) => {
    let item = await axios.delete(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.projectInfo.subjectid}/${this.props.projectInfo.projectid}/${prev._id}/deletefeed`);
    this.setState({feedloading: false, openfeeddelete: false});
    this.loadFeed();
  }

  modifyFeed = async (prev) => {
    if (prev.writer === this.props.loginUserInfo.email) {
      await axios.put(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.projectInfo.subjectid}/${this.props.projectInfo.projectid}/${prev._id}/modifyfeed`, {
                              feedname: prev.feedname,
                              writer: prev.writer,
                              manager: prev.manager,
                              start_date: prev.start_date,
                              end_date: prev.end_date,
                              status: prev.status,
                              content: prev.content
                             }).then(function (response) {
                               console.log(response)
                               alert("성공적으로 수정되었습니다");
                             }).catch(function (error) { 
                               alert("수정에 실패하였습니다.");
                             });
      this.handleFeedClose();
      this.setState({feedloading: false});
      this.loadFeed();
    } else {
      alert("피드 수정 권한이 없습니다.");
    }
  }

  check = async () => {
    let result = true;
    await axios.post(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.projectInfo.subjectid}/${this.props.projectInfo.projectid}/isContributed`, {
          email: this.props.loginUserInfo.email
      }).then(function (response) {
        if (response.data === true) {
          console.log(response)
          result = true;
        } else {
          console.log(response)
          result = false;
        }
    })
    if (result === true) {
      this.setState({checking: true});
    } else {
      this.setState({checking: true, error: true});
    }
  }

  handlefeeddeleteClose = () => this.setState({openfeeddelete: !this.state.openfeeddelete})
  handleFeedFormClose = () => this.setState({openfeedform: !this.state.openfeedform})
  handleFeedClose = () => this.setState({openfeed: !this.state.openfeed})
  handleFeedCommentClose = () => this.setState({openfeedcomment: !this.state.openfeedcomment})

  render() {
    if (this.state.projectloading === false) {
      return ( <div onClick={this.loadProject()}></div>);
    } else if (this.state.checking === false) {
      return ( <div onClick={this.check()}></div> );
    } else if (this.state.error === true) {
      alert("해당 프로젝트의 인원이 아닙니다.");
      return ( <Dialog open={true}>
          <Button href="/main">이전 페이지로 이동</Button>
      </Dialog>  );
    }
    return (
      <MainContainer style={{marginBottom: '5vh'}}>
      {/* 프로젝트 정보 창 */}
      <Accordion style={{marginTop: '5vh'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>[{this.state.projectInfo.projectname}]'s Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container style={{display: "flex", flexDirection: "column", overflow: "auto", marginTop: "2vh", width: "100%", height: "500px"}} varient="outlined" elevation={4}>
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
          </Container>
        </AccordionDetails>
      </Accordion>

      <MainContainer style={{width: '100%', marginTop: '5vh', textAlign: 'center'}}>
        <Container style={{position: "relative"}}>
        </Container>
        <Container
          orientation="horizontal"
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
              <Paper varient="outlined" style={{marginBottom: "5vh", display: 'inline-flex', justifyContent: 'center', width: '30%', marginLeft: '2vw'}}>
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
                          <Paper square style={{width: '90%', height: '20vh', marginTop: '3vh',
                                                marginLeft: '1vw', marginRight: '1vw', marginBottom: '3vh',
                                                display: 'flex', flexDirection: 'column', ...column.style}} {...card.props}>
                          <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                            <SettingIcon onClick={this.handleFeedClose}/>
                            <Dialog open={this.state.openfeed} onClose={this.handleFeedClose} aria-labelledby="form-dialog-title">
                              <Feed loginUserInfo={this.props.loginUserInfo} projectInfo={this.props.projectInfo} 
                                    card={card} modifyFeed={this.modifyFeed} /> 
                            </Dialog>
                            <CancelIcon onClick={this.handlefeeddeleteClose}/>
                            {this.state.openfeeddelete === true &&
                                           <Dialog
                                           open={this.state.openfeeddelete}
                                           keepMounted
                                           onClose={this.handlefeeddeleteClose}
                                           aria-labelledby="alert-dialog-slide-title"
                                           aria-describedby="alert-dialog-slide-description"
                                         >
                                           <DialogTitle id="alert-dialog-slide-title">{"피드를 삭제하시겠습니까?"}</DialogTitle>
                                           <DialogContent>
                                             <DialogContentText id="alert-dialog-slide-description">
                                               확인을 누르시면 삭제합니다.
                                             </DialogContentText>
                                           </DialogContent>
                                           <DialogActions>
                                             <Button onClick={this.handlefeeddeleteClose} color="primary">
                                               취소
                                             </Button>
                                             <Button onClick={() => this.delChildren(card)} color="primary">
                                               확인
                                             </Button>
                                           </DialogActions>
                                         </Dialog>
                            }
                          </div>
                          <Divider />
                          <div style={{display: "flex", height: "60%", alignItems: "middle",justifyContent: "center"}}>
                            <h3>{card.feedname}</h3>
                          </div>
                          <Divider />
                          <text>담당자 : ({card.manager})</text>
                          <Divider />
                          <div onClick={this.handleFeedCommentClose} style={{marginTop: "1vh"}}>
                          <CommentIcon />
                          </div>
                          <Dialog open={this.state.openfeedcomment} onClose={this.handleFeedCommentClose} aria-labelledby="form-dialog-title">
                              <Comment card={card} projectInfo={this.props.projectInfo} loginUserInfo={this.props.loginUserInfo} /> 
                          </Dialog>
                          </Paper>
                        </Draggable>
                      );
                    })}
                  </Container>
                  {column.id === `column0` && <PlusButton onClick={this.handleFeedFormClose} style={{marginTop: "1vh", marginBottom: "1vh"}} />}
                  <Dialog open={this.state.openfeedform} onClose={this.handleFeedFormClose} aria-labelledby="form-dialog-title">
                   <Addfeedform loginUserInfo={this.props.loginUserInfo} addChildren={this.addChildren}/> 
                  </Dialog>
                </div>
              </Paper>
            );
          })}
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

  onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      console.log(dropResult);
      console.log(columnId);
      this.modifyChildren(dropResult.payload, columnId);
    }
  }
}

export default Project;
