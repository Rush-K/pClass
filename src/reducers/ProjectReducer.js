import * as types from '../actions/actionTypes'; //액션 코드로 가져온다.
 
 
const root_reducer = { // state 초기값
    projectlist: [
        {
            subjectid: 0,
            projectid: 1,
            projectname: "소프트웨어공학의 프로젝트",
            projectleader: "김민수",
            projectreadme: "코딩을 너무 잘하고 싶어요...",
        },
        {
            subjectid: 0,
            projectid: 2,
            projectname: "소프트웨어공학의 또 다른 프로젝트",
            projectleader: "김민수",
            projectreadme: "코딩을 너무 잘하고 싶어요...",
        }
    ]

} 
 
function ProjectReducer (state = root_reducer, action){ 
    //state는 reducer가 갖고 있는 state고 만약 없을시 초기값을 가져온다.
    //action은 dispatch함수로 connect를 통해서 들어 오게 된다.
 
    const {projectlist} = state;
    switch (action.type){//리듀서를 통해서 들어온 action 
        case types._CREATEPROJECT: //acionTypes에서 구분
            return { 
                projectlist : projectlist.concat(action.info)//setting : 한 이유는 초기 setting을 했기에 변경 후에도 setting key를 유지하기 위함 
            }
        case types._DELETEPROJECT:
            projectlist.splice(projectlist.indexOf(action.info), 1);
            return {
                projectlist : projectlist
            }
        default: return state; //action을 이용하지 않을때 기본 this.props.setting을 사용할 때 사용
    }
} 
 
 
export default ProjectReducer;