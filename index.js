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
function getTag(key,value){
	var tagArr = key.split("_");
	var tag="<"+tagArr[0];
	if (tagArr.indexOf("id")!== -1) {
		index=tagArr.indexOf("id") + 1;
		tag=" id='"+tagArr[index]+"'";
	}
	if (tagArr.indexOf("class")!== -1) {
		index=tagArr.indexOf("class") + 1;
		tag=" class='"+tagArr[index]+"'";
	}

	if (tagArr.indexOf("src")!== -1) {
		index=tagArr.indexOf("src") + 1;
		tag=" src='"+tagArr[index]+"'";
	}
	if (tagArr.indexOf("href")!== -1) {
		index=tagArr.indexOf("href") + 1;
		tag=" href='"+tagArr[index]+"'";
	}
	if (tagArr.indexOf("value")!== -1) {
		index=tagArr.indexOf("value") + 1;
		tag=" value='"+tagArr[index]+"'";
	}
	if (tagArr.indexOf("name")!== -1) {
		index=tagArr.indexOf("name") + 1;
		tag=" name='"+tagArr[index]+"'";
	}
	if (tagArr.indexOf("onClick")!== -1) {
		index=tagArr.indexOf("onClick") + 1;
		tag=" onClick='"+tagArr[index]+"'";
	}
	if (tagArr.indexOf("onHover")!== -1) {
		index=tagArr.indexOf("onHover") + 1;
		tag=" onHover='"+tagArr[index]+"'";
	}



	tag+=">";

	var valueType=getValueType(value);
	if (valueType=="[object String]" || valueType=="[object Number]")
		{
			tag+=value+"</"+tagArr[0]+">"
			return tag;
		}
	else if(valueType == "[object Object]")
	{
		for (var key in value) {
			tag+=getTag(key,value[key])
		}
	}
	else if(valueType == "[object Array]")
	{
		for (var i = 0; i < value.length; i++) {
			if (getValueType(value[i]) !="[object Object]")
				return "error please check your object";
				for (var key in value[i]) {
					tag+=getTag(key,value[i][key])
				}		
		}
	}

			tag+="</"+tagArr[0]+">"
			return tag;
}
function jsonToHTML (obj,name) {
		var page="<!-- create by jsonToHTML coverter-->";
		page+=getTag("html",obj["html"]);
		fs.writeFile(name+".html", page, function(err) {
	    if(err) {
	        console.log(err);
	    }
	    else
	     console.log(name+".html has been created" );
	});

}
module.exports = jsonToHTML;