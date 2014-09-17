jsontoHTML
==========
node js package to covert json object to html page 

Now you can convert a json object to html 

<h1>example</h1>

<pre>
var test = {
	html: {
		head: {
			title: 'test',
		},
		body: {
			h1_id_header: 'Hello World',
			img_id_logo_src:"logo.jpg",
			h_href:["home.html",home],
			ul_class_menu: [{
					li: 'link1'
				},
				{
					li: 'link2 '
				},
				{
					li: ' link3'
				}]
		}
	}
}

</pre>
<pre>
var jth = require('jsontohtml');
=> jth.jsonToHTML(test,"name");
</pre>

result ="name.html"
<html>
	<head>
		<title>test</title>
	</head>
	<body>
	<h1 id="header">
		Hello world
	</h1>
	<img id='logo' src="logo.jpg">
	<a href="home.html">home</a>
	<ul class="menu">
		<li>link1</li>
		<li>link2</li>
		<li>link3</li>
	</ul>
	<body>
</html>
