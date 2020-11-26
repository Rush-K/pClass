import * as types from '../actions/actionTypes'; //액션 코드로 가져온다.
 
 
const root_reducer = { // state 초기값
    commentlist : [
        {
            index: {
                subjectid: 0,
                projectid: 1,
                feedid: 1
            },
            commentid: 1,
            writer: "김민수",
            content: "이런 일을 하시겠다고요? 너무 비효율적인데요~"
        }
    ],
} 
 
function CommentReducer (state = root_reducer, action){ 
    //state는 reducer가 갖고 있는 state고 만약 없을시 초기값을 가져온다.
    //action은 dispatch함수로 connect를 통해서 들어 오게 된다.
 
    const {userInfo, loginUserInfo} = state;
    switch (action.type){//리듀서를 통해서 들어온 action 
        default: return state; //action을 이용하지 않을때 기본 this.props.setting을 사용할 때 사용
    }
} 
 
 
export default CommentReducer;