var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pclass');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});

var ChatSchema = mongoose.Schema({
    name : String,
    time : String,
    p_id : String,
    content : String,
})

ChatSchema.methods.notice = function(){
    console.log(name + "전송 완료");
}

var Chatting = mongoose.model("Chatting", ChatSchema);

var obj1 = new Chatting({name : "관리자", time : "11/24", p_id : "CSE00001_01", content: "채팅창이 열렸습니다."});

obj1.save(function(err, obj1){
    if(err) return console.err(err);
    obj1.notice();
});

Chatting.find(function(err, models){
    if(err) return console.error(err);
    console.log("find() - "+models);
})