import * as types from '../actions/actionTypes'; //액션 코드로 가져온다.
 
 
const root_reducer = { // state 초기값
    userInfo : [
        {
            email : "k_rush@naver.com",
            password : "1234",
        }
    ],
    loginUserInfo : {
        email : null,
        password : null,
    }

} 
 
function LoginReducer (state = root_reducer, action){ 
    //state는 reducer가 갖고 있는 state고 만약 없을시 초기값을 가져온다.
    //action은 dispatch함수로 connect를 통해서 들어 오게 된다.
 
    const {userInfo, loginUserInfo} = state;
    switch (action.type){//리듀서를 통해서 들어온 action 
        case types._CREATEACCOUNT: //acionTypes에서 구분
            return { 
                userInfo : userInfo.concat(action.info)//setting : 한 이유는 초기 setting을 했기에 변경 후에도 setting key를 유지하기 위함 
                
            }   
        case types._LOGGEDIN:
            for (let user of userInfo) {
                    console.log(userInfo);
                    console.log(action.info);
                    console.log(user);
                    if (user.email == action.info.email && user.password == action.info.password) {
                        loginUserInfo.email = action.info.email;
                        loginUserInfo.password = action.info.password;
                        alert("로그인 성공");                        
                    } else {
                        alert("로그인 실패");
                    }
            }
            return {
                userInfo : userInfo,
                loginUserInfo : loginUserInfo
            }
        default: return state; //action을 이용하지 않을때 기본 this.props.setting을 사용할 때 사용
    }
} 
 
 
export default LoginReducer;