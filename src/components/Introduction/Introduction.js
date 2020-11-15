import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Title from '../../img/title.png';


class Introduction extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
              <div className={classes.paperRoot}>
                <Box 
                style={{display: "block", justifyContent:"center", alignItems:"center", height:"50vh"}}
                >
                <Box style={{marginTop:"20vh", justifyContent:"center", alignItems:"center", textAlign:"center"}}>
                  <h1>좌측 상단 메뉴 버튼을 누르세요!</h1>
                  <h2>과목별 프로젝트를 선택하실 수 있습니다.</h2>
                </Box>
                <Box style={{justifyContent:"center", alignItems:"center", textAlign:"center"}}>
                  <img src={Title} />
                </Box>
                </Box>
              </div>
          </div>
        );
    }
}

export default Introduction;