var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pclass');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});


const commentSchema = new mongoose.Schema({
    writer : String,
    time : String,
    message : String
});

var FeedSchema = mongoose.Schema({
    feedname : String,
    manager : String,
    period : String,
    state : String,
    content : String,
    comment : commentSchema
})

FeedSchema.methods.notice = function(){
    console.log("Feed 생성 완료");
}

var Feed = mongoose.model("Feed", FeedSchema);

var obj1 = new Feed({feedname : "projectstart", manager : "박해웅", period : "11/10~11/14", state: "to-do", content: "프로젝트 시작", 
comment : {"writer" : "박해웅", "time" : "11/24", "message" : "빨리빨리"}});

obj1.save(function(err, obj1){
    if(err) return console.err(err);
    obj1.notice();
});

Feed.find(function(err, models){
    if(err) return console.error(err);
    console.log("find() - "+models);
})

//Feed.find({feedname:/^projectstart/});