/*
  "name": "jsonToHTML"
  "version": "0.0.0"
  "description": "convert json object to html page "
  "author": "beshoy semsem"
  "created in":"17-9-2014 5:51 am"
  "license": "BSD-2-Clause"
*/
var fs = require('fs');
var getValueType = Function.prototype.call.bind( Object.prototype.toString );


var jth = {
	 jsonToHTML : function(obj,name) {
		var page="<!-- create by jsonToHTML coverter-->";
		page+=this.getTag("html",obj["html"]);
		fs.writeFile(name+".html", page, function(err) {
	    if(err) {
	        console.log(err);
	    }
	    else
	     console.log(name+".html has been created" );
	});
	},
	getTag:function(key,value){
	var tagArr = key.split("_");

	var tag="<"+tagArr[0];
	if (tagArr.indexOf("id")!== -1) {
		index=tagArr.indexOf("id") + 1;
		tag+=" id='"+tagArr[index]+"'";
	}
	if (tagArr.indexOf("class")!== -1) {
		index=tagArr.indexOf("class") + 1;
		tag+=" class='"+tagArr[index]+"'";
	}

	if (tagArr.indexOf("src")!== -1) {
		index=tagArr.indexOf("src") + 1;
		tag+=" src='"+value+"'";
	}
	if (tagArr.indexOf("href")!== -1 && tagArr[0]=="a") {
		index=tagArr.indexOf("href") + 1;
		tag+=" src='"+value[0]+"'";
	}
	if (tagArr.indexOf("href")!== -1 && tagArr[0]!="a") {
		index=tagArr.indexOf("href") + 1;
		tag+=" src='"+value+"'";
	}
	if (tagArr.indexOf("value")!== -1) {
		index=tagArr.indexOf("value") + 1;
		tag+=" value='"+tagArr[index]+"'";
	}
	if (tagArr.indexOf("name")!== -1) {
		index=tagArr.indexOf("name") + 1;
		tag+=" name='"+tagArr[index]+"'";
	}
	if (tagArr.indexOf("onClick")!== -1) {
		index=tagArr.indexOf("onClick") + 1;
		tag+=" onClick='"+tagArr[index]+"'";
	}
	if (tagArr.indexOf("onHover")!== -1) {
		index=tagArr.indexOf("onHover") + 1;
		tag+=" onHover='"+tagArr[index]+"'";
	}
	


	tag+=">";
	if (tagArr[0]=="img"||tagArr[0]=="p") {
			tag+="/>";
			return tag;
	}
	if (tagArr[0]=="a") {
			value=value[1];
	}

	if (tagArr[0]=="link"||tagArr[0]=="script")
	{
			tag+="</"+tagArr[0]+">";
			return tag;	
	}
	var valueType=getValueType(value);
	if (valueType=="[object String]" || valueType=="[object Number]")
		{
			tag+=value+"</"+tagArr[0]+">"
			return tag;
		}
	else if(valueType == "[object Object]")
	{
		for (var key in value) {
			tag+=this.getTag(key,value[key])
		}
	}
	else if(valueType == "[object Array]")
	{
		for (var i = 0; i < value.length; i++) {
			if (getValueType(value[i]) !="[object Object]")
				return "error please check your object";
				for (var key in value[i]) {
					tag+=this.getTag(key,value[i][key])
				}		
		}
	}

			tag+="</"+tagArr[0]+">";
			return tag;
}	

}	

module.exports = jth;
