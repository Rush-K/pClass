var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pclass');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});

var CloudSchema = mongoose.Schema({
    filename : String,
    time : String,
    path : String,
    size : Number,
    p_id : String,
})

CloudSchema.methods.up = function(){
    console.log(filename + "업로드 완료");
}

CloudSchema.methods.down = function(){
    console.log(filename + "다운로드 완료");
}

var Cloud = mongoose.model("Cloud", CloudSchema);

var obj1 = new Cloud({filename : "제출양식", time : "11/11", path : "C:\USER", size : "1234", p_id : "CSE00001_01"});

obj1.save(function(err, obj1){
    if(err) return console.err(err);
    obj1.up();
});

Cloud.find(function(err, models){
    if(err) return console.error(err);
    console.log("find() - "+models);
})