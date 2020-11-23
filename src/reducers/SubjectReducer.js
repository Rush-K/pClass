import * as types from '../actions/actionTypes'; //액션 코드로 가져온다.
 
 
const root_reducer = { // state 초기값
    subjectlist: [
        {
        subjectname: "소프트웨어공학"
        }
    ]
} 
 
function SubjectReducer (state = root_reducer, action){ 
    //state는 reducer가 갖고 있는 state고 만약 없을시 초기값을 가져온다.
    //action은 dispatch함수로 connect를 통해서 들어 오게 된다.
    const { subjectlist } = state;
    switch (action.type){//리듀서를 통해서 들어온 action 
        
        default: return state; //action을 이용하지 않을때 기본 this.props.setting을 사용할 때 사용
    }
} 
 
 
export default SubjectReducer;