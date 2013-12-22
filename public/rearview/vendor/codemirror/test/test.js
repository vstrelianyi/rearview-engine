function forEach(e,n){for(var a=0,o=e.length;o>a;++a)n(e[a])}function addDoc(e,n,a){for(var o=[],t="",i=0;n>i;++i)t+="x";for(var i=0;a>i;++i)o.push(t);e.setValue(o.join("\n"))}function byClassName(e,n){function a(e){if(3!=e.nodeType){t.test(e.className)&&o.push(e);for(var n=0,i=e.childNodes.length;i>n;++n)a(e.childNodes[n])}}if(e.getElementsByClassName)return e.getElementsByClassName(n);var o=[],t=new RegExp("\\b"+n+"\\b");return a(e),o}var ie_lt8=/MSIE [1-7]\b/.test(navigator.userAgent);test("core_fromTextArea",function(){var e=document.getElementById("code");e.value="CONTENT";var n=CodeMirror.fromTextArea(e);is(!e.offsetHeight),eq(n.getValue(),"CONTENT"),n.setValue("foo\nbar"),eq(n.getValue(),"foo\nbar"),n.save(),is(/^foo\r?\nbar$/.test(e.value)),n.setValue("xxx"),n.toTextArea(),is(e.offsetHeight),eq(e.value,"xxx")}),testCM("getRange",function(e){eq(e.getLine(0),"1234"),eq(e.getLine(1),"5678"),eq(e.getLine(2),null),eq(e.getLine(-1),null),eq(e.getRange({line:0,ch:0},{line:0,ch:3}),"123"),eq(e.getRange({line:0,ch:-1},{line:0,ch:200}),"1234"),eq(e.getRange({line:0,ch:2},{line:1,ch:2}),"34\n56"),eq(e.getRange({line:1,ch:2},{line:100,ch:0}),"78")},{value:"1234\n5678"}),testCM("replaceRange",function(e){eq(e.getValue(),""),e.replaceRange("foo\n",{line:0,ch:0}),eq(e.getValue(),"foo\n"),e.replaceRange("a\nb",{line:0,ch:1}),eq(e.getValue(),"fa\nboo\n"),eq(e.lineCount(),3),e.replaceRange("xyzzy",{line:0,ch:0},{line:1,ch:1}),eq(e.getValue(),"xyzzyoo\n"),e.replaceRange("abc",{line:0,ch:0},{line:10,ch:0}),eq(e.getValue(),"abc"),eq(e.lineCount(),1)}),testCM("selection",function(e){e.setSelection({line:0,ch:4},{line:2,ch:2}),is(e.somethingSelected()),eq(e.getSelection(),"11\n222222\n33"),eqPos(e.getCursor(!1),{line:2,ch:2}),eqPos(e.getCursor(!0),{line:0,ch:4}),e.setSelection({line:1,ch:0}),is(!e.somethingSelected()),eq(e.getSelection(),""),eqPos(e.getCursor(!0),{line:1,ch:0}),e.replaceSelection("abc"),eq(e.getSelection(),"abc"),eq(e.getValue(),"111111\nabc222222\n333333"),e.replaceSelection("def","end"),eq(e.getSelection(),""),eqPos(e.getCursor(!0),{line:1,ch:3}),e.setCursor({line:2,ch:1}),eqPos(e.getCursor(!0),{line:2,ch:1}),e.setCursor(1,2),eqPos(e.getCursor(!0),{line:1,ch:2})},{value:"111111\n222222\n333333"}),testCM("lines",function(e){eq(e.getLine(0),"111111"),eq(e.getLine(1),"222222"),eq(e.getLine(-1),null),e.removeLine(1),e.setLine(1,"abc"),eq(e.getValue(),"111111\nabc")},{value:"111111\n222222\n333333"}),testCM("indent",function(e){e.indentLine(1),eq(e.getLine(1),"   blah();"),e.setOption("indentUnit",8),e.indentLine(1),eq(e.getLine(1),"	blah();"),e.setOption("indentUnit",10),e.setOption("tabSize",4),e.indentLine(1),eq(e.getLine(1),"		  blah();")},{value:"if (x) {\nblah();\n}",indentUnit:3,indentWithTabs:!0,tabSize:8}),test("core_defaults",function(){var e=CodeMirror.defaults,n=CodeMirror.defaults={};for(var a in e)n[a]=e[a];n.indentUnit=5,n.value="uu",n.enterMode="keep",n.tabindex=55;var o=document.getElementById("testground"),t=CodeMirror(o);try{eq(t.getOption("indentUnit"),5),t.setOption("indentUnit",10),eq(n.indentUnit,5),eq(t.getValue(),"uu"),eq(t.getOption("enterMode"),"keep"),eq(t.getInputField().tabIndex,55)}finally{CodeMirror.defaults=e,o.removeChild(t.getWrapperElement())}}),testCM("lineInfo",function(e){eq(e.lineInfo(-1),null);var n=e.setMarker(1,"FOO","bar"),a=e.lineInfo(1);eq(a.text,"222222"),eq(a.markerText,"FOO"),eq(a.markerClass,"bar"),eq(a.line,1),eq(e.lineInfo(2).markerText,null),e.clearMarker(n),eq(e.lineInfo(1).markerText,null)},{value:"111111\n222222\n333333"}),testCM("coords",function(e){e.setSize(null,100),addDoc(e,32,200);var n=e.charCoords({line:0,ch:0}),a=e.charCoords({line:200,ch:30});is(n.x<a.x),is(n.y<a.y),is(n.y<n.yBot),e.scrollTo(null,100);var o=e.charCoords({line:0,ch:0});is(n.y>o.y),eq(n.x,o.x)}),testCM("coordsChar",function(e){addDoc(e,35,70);for(var n=0;35>=n;n+=5)for(var a=0;70>a;a+=5){e.setCursor(a,n);var o=e.charCoords({line:a,ch:n}),t=e.coordsChar({x:o.x,y:o.y+1});eq(t.line,a),eq(t.ch,n)}}),testCM("posFromIndex",function(e){e.setValue("This function should\nconvert a zero based index\nto line and ch.");for(var n=[{index:-1,line:0,ch:0},{index:0,line:0,ch:0},{index:10,line:0,ch:10},{index:39,line:1,ch:18},{index:55,line:2,ch:7},{index:63,line:2,ch:15},{index:64,line:2,ch:15}],a=0;a<n.length;a++){var o=n[a],t=e.posFromIndex(o.index);eq(t.line,o.line),eq(t.ch,o.ch),o.index>=0&&o.index<64&&eq(e.indexFromPos(t),o.index)}}),testCM("undo",function(e){e.setLine(0,"def"),eq(e.historySize().undo,1),e.undo(),eq(e.getValue(),"abc"),eq(e.historySize().undo,0),eq(e.historySize().redo,1),e.redo(),eq(e.getValue(),"def"),eq(e.historySize().undo,1),eq(e.historySize().redo,0),e.setValue("1\n\n\n2"),e.clearHistory(),eq(e.historySize().undo,0);for(var n=0;20>n;++n)e.replaceRange("a",{line:0,ch:0}),e.replaceRange("b",{line:3,ch:0});eq(e.historySize().undo,40);for(var n=0;40>n;++n)e.undo();eq(e.historySize().redo,40),eq(e.getValue(),"1\n\n\n2")},{value:"abc"}),testCM("undoMultiLine",function(e){e.replaceRange("x",{line:0,ch:0}),e.replaceRange("y",{line:1,ch:0}),e.undo(),eq(e.getValue(),"abc\ndef\nghi"),e.replaceRange("y",{line:1,ch:0}),e.replaceRange("x",{line:0,ch:0}),e.undo(),eq(e.getValue(),"abc\ndef\nghi"),e.replaceRange("y",{line:2,ch:0}),e.replaceRange("x",{line:1,ch:0}),e.replaceRange("z",{line:2,ch:0}),e.undo(),eq(e.getValue(),"abc\ndef\nghi")},{value:"abc\ndef\nghi"}),testCM("markTextSingleLine",function(e){forEach([{a:0,b:1,c:"",f:2,t:5},{a:0,b:4,c:"",f:0,t:2},{a:1,b:2,c:"x",f:3,t:6},{a:4,b:5,c:"",f:3,t:5},{a:4,b:5,c:"xx",f:3,t:7},{a:2,b:5,c:"",f:2,t:3},{a:2,b:5,c:"abcd",f:6,t:7},{a:2,b:6,c:"x",f:null,t:null},{a:3,b:6,c:"",f:null,t:null},{a:0,b:9,c:"hallo",f:null,t:null},{a:4,b:6,c:"x",f:3,t:4},{a:4,b:8,c:"",f:3,t:4},{a:6,b:6,c:"a",f:3,t:6},{a:8,b:9,c:"",f:3,t:6}],function(n){e.setValue("1234567890");var a=e.markText({line:0,ch:3},{line:0,ch:6},"foo");e.replaceRange(n.c,{line:0,ch:n.a},{line:0,ch:n.b});var o=a.find();eq(o&&o.from.ch,n.f),eq(o&&o.to.ch,n.t)})}),testCM("markTextMultiLine",function(e){function n(e){return e&&{line:e[0],ch:e[1]}}forEach([{a:[0,0],b:[0,5],c:"",f:[0,0],t:[2,5]},{a:[0,0],b:[0,5],c:"foo\n",f:[1,0],t:[3,5]},{a:[0,1],b:[0,10],c:"",f:[0,1],t:[2,5]},{a:[0,5],b:[0,6],c:"x",f:[0,6],t:[2,5]},{a:[0,0],b:[1,0],c:"",f:[0,0],t:[1,5]},{a:[0,6],b:[2,4],c:"",f:[0,5],t:[0,7]},{a:[0,6],b:[2,4],c:"aa",f:[0,5],t:[0,9]},{a:[1,2],b:[1,8],c:"",f:[0,5],t:[2,5]},{a:[0,5],b:[2,5],c:"xx",f:null,t:null},{a:[0,0],b:[2,10],c:"x",f:null,t:null},{a:[1,5],b:[2,5],c:"",f:[0,5],t:[1,5]},{a:[2,0],b:[2,3],c:"",f:[0,5],t:[2,2]},{a:[2,5],b:[3,0],c:"a\nb",f:[0,5],t:[2,5]},{a:[2,3],b:[3,0],c:"x",f:[0,5],t:[2,3]},{a:[1,1],b:[1,9],c:"1\n2\n3",f:[0,5],t:[4,5]}],function(a){e.setValue("aaaaaaaaaa\nbbbbbbbbbb\ncccccccccc\ndddddddd\n");var o=e.markText({line:0,ch:5},{line:2,ch:5},"CodeMirror-matchingbracket");e.replaceRange(a.c,n(a.a),n(a.b));var t=o.find();eqPos(t&&t.from,n(a.f)),eqPos(t&&t.to,n(a.t))})}),testCM("markTextUndo",function(e){var n=e.markText({line:0,ch:1},{line:0,ch:3},"CodeMirror-matchingbracket"),a=e.markText({line:0,ch:0},{line:2,ch:1},"CodeMirror-matchingbracket"),o=e.setBookmark({line:1,ch:5});e.replaceRange("foo",{line:0,ch:2}),e.replaceRange("bar\baz\bug\n",{line:2,ch:0},{line:3,ch:0}),e.setValue(""),eq(n.find(),null),eq(a.find(),null),eq(o.find(),null),e.undo(),eqPos(o.find(),{line:1,ch:5}),e.undo(),e.undo();var t=n.find(),i=a.find();eqPos(t.from,{line:0,ch:1}),eqPos(t.to,{line:0,ch:3}),eqPos(i.from,{line:0,ch:0}),eqPos(i.to,{line:2,ch:1}),eqPos(o.find(),{line:1,ch:5})},{value:"1234\n56789\n00\n"}),testCM("markClearBetween",function(e){e.setValue("aaa\nbbb\nccc\nddd\n"),e.markText({line:0,ch:0},{line:2},"foo"),e.replaceRange("aaa\nbbb\nccc",{line:0,ch:0},{line:2}),eq(e.findMarksAt({line:1,ch:1}).length,0)}),testCM("bookmark",function(e){function n(e){return e&&{line:e[0],ch:e[1]}}forEach([{a:[1,0],b:[1,1],c:"",d:[1,4]},{a:[1,1],b:[1,1],c:"xx",d:[1,7]},{a:[1,4],b:[1,5],c:"ab",d:[1,6]},{a:[1,4],b:[1,6],c:"",d:null},{a:[1,5],b:[1,6],c:"abc",d:[1,5]},{a:[1,6],b:[1,8],c:"",d:[1,5]},{a:[1,4],b:[1,4],c:"\n\n",d:[3,1]},{bm:[1,9],a:[1,1],b:[1,1],c:"\n",d:[2,8]}],function(a){e.setValue("1234567890\n1234567890\n1234567890");var o=e.setBookmark(n(a.bm)||{line:1,ch:5});e.replaceRange(a.c,n(a.a),n(a.b)),eqPos(o.find(),n(a.d))})}),testCM("bug577",function(e){e.setValue("a\nb"),e.clearHistory(),e.setValue("fooooo"),e.undo()}),testCM("scrollSnap",function(e){e.setSize(100,100),addDoc(e,200,200),e.setCursor({line:100,ch:180});var n=e.getScrollInfo();is(n.x>0&&n.y>0),e.setCursor({line:0,ch:0}),n=e.getScrollInfo(),is(0==n.x&&0==n.y,"scrolled clean to top"),e.setCursor({line:100,ch:180}),e.setCursor({line:199,ch:0}),n=e.getScrollInfo(),is(0==n.x&&n.y>n.height-100,"scrolled clean to bottom")}),testCM("selectionPos",function(e){e.setSize(100,100),addDoc(e,200,100),e.setSelection({line:1,ch:100},{line:98,ch:100});var n=e.charCoords({line:0,ch:200},"local").x,a=e.charCoords({line:1}).y-e.charCoords({line:0}).y;e.scrollTo(0,0);for(var o,t,i,r=byClassName(e.getWrapperElement(),"CodeMirror-selected"),l=e.getWrapperElement().getBoundingClientRect(),c=0,s=r.length;s>c;++c){var d=r[c].getBoundingClientRect(),h=d.left-l.left<30,u=d.right-d.left,g=d.right-l.left>.8*n;h&&g?(o=!0,is(d.bottom-d.top>95*a,"middle high"),is(u>.9*n,"middle wide")):(is(u>.4*n,"top/bot wide enough"),is(.6*n>u,"top/bot slim enough"),h?(i=!0,is(d.top-l.top>96*a,"bot below")):g&&(t=!0,is(d.top-l.top<2*a,"top above")))}is(t&&i&&o,"all parts")},null,ie_lt8),testCM("restoreHistory",function(e){e.setValue("abc\ndef"),e.compoundChange(function(){e.setLine(1,"hello")}),e.compoundChange(function(){e.setLine(0,"goop")}),e.undo();var n=e.getValue(),a=e.getHistory();window.JSON&&(a=JSON.parse(JSON.stringify(a))),eq(n,"abc\nhello"),e.setValue(""),e.clearHistory(),eq(e.historySize().undo,0),e.setValue(n),e.setHistory(a),e.redo(),eq(e.getValue(),"goop\nhello"),e.undo(),e.undo(),eq(e.getValue(),"abc\ndef")}),testCM("doubleScrollbar",function(e){var n=document.body.appendChild(document.createElement("p"));n.style.cssText="height: 50px; overflow: scroll; width: 50px";var a=n.offsetWidth+1-n.clientWidth;document.body.removeChild(n),e.setSize(null,100),addDoc(e,1,300);var o=e.getWrapperElement();is(o.offsetWidth-byClassName(o,"CodeMirror-lines")[0].offsetWidth<=a)}),testCM("weirdLinebreaks",function(e){e.setValue("foo\nbar\rbaz\r\nquux\n\rplop"),is(e.getValue(),"foo\nbar\nbaz\nquux\n\nplop"),is(e.lineCount(),6),e.setValue("\n\n"),is(e.lineCount(),3)}),testCM("setSize",function(e){e.setSize(100,100),is(e.getWrapperElement().offsetWidth,100),is(e.getWrapperElement().offsetHeight,100),e.setSize("100%","3em"),is(e.getWrapperElement().style.width,"100%"),is(e.getScrollerElement().style.height,"3em"),e.setSize(null,40),is(e.getWrapperElement().style.width,"100%"),is(e.getScrollerElement().style.height,"40px")}),testCM("hiddenLines",function(e){addDoc(e,4,10),e.hideLine(4),e.setCursor({line:3,ch:0}),CodeMirror.commands.goLineDown(e),eqPos(e.getCursor(),{line:5,ch:0}),e.setLine(3,"abcdefg"),e.setCursor({line:3,ch:6}),CodeMirror.commands.goLineDown(e),eqPos(e.getCursor(),{line:5,ch:4}),e.setLine(3,"ab"),e.setCursor({line:3,ch:2}),CodeMirror.commands.goLineDown(e),eqPos(e.getCursor(),{line:5,ch:2})}),testCM("hiddenLinesSelectAll",function(e){addDoc(e,4,20);for(var n=0;20>n;++n)10!=n&&e.hideLine(n);CodeMirror.commands.selectAll(e),eqPos(e.getCursor(!0),{line:10,ch:0}),eqPos(e.getCursor(!1),{line:10,ch:4})}),testCM("wrappingAndResizing",function(e){e.setSize(null,"auto"),e.setOption("lineWrapping",!0);var n=e.getWrapperElement(),a=n.offsetHeight,o=50,t="xxx xxx xxx xxx xxx";e.setValue(t);for(var i=10;;o+=i)if(e.setSize(o),n.offsetHeight==a){if(10!=i){o--;break}o-=10,i=1}e.setCursor({line:0,ch:t.length}),eq(n.offsetHeight,a),e.replaceSelection("x"),is(n.offsetHeight>a),e.setValue(t+"\n"+t+"\n"),e.getScrollerElement().style.maxHeight="100px",e.replaceRange("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n!\n",{line:2,ch:0}),forEach([{line:0,ch:t.length},{line:0,ch:t.length-1},{line:0,ch:0},{line:1,ch:t.length},{line:1,ch:t.length-1}],function(n){var a=e.charCoords(n);eqPos(n,e.coordsChar({x:a.x+2,y:a.y+2}))})},null,ie_lt8),testCM("measureEndOfLine",function(e){e.setSize(null,"auto");for(var n=byClassName(e.getWrapperElement(),"CodeMirror-lines")[0].firstChild,a=20,o=n.offsetHeight,t=10;;a+=t)if(e.setSize(a),n.offsetHeight<2.5*o){if(10!=t)break;a-=10,t=1}e.setValue(e.getValue()+"\n\n");var i=e.charCoords({line:0,ch:18},"local");is(i.y>.8*o,"not at top"),is(i.x>a-20,"not at right"),i=e.charCoords({line:0,ch:18}),eqPos(e.coordsChar({x:i.x,y:i.y+2}),{line:0,ch:18})},{mode:"text/html",value:"<!-- foo barrr -->",lineWrapping:!0},ie_lt8),testCM("scrollVerticallyAndHorizontally",function(e){e.setSize(100,100),addDoc(e,40,40),e.setCursor(39);var n=e.getWrapperElement(),a=byClassName(n,"CodeMirror-scrollbar")[0];is(a.offsetHeight<n.offsetHeight,"vertical scrollbar limited by horizontal one");var o=byClassName(n,"CodeMirror-cursor")[0].getBoundingClientRect(),t=n.getBoundingClientRect();is(o.bottom<t.top+e.getScrollerElement().clientHeight,"bottom line visible")},{gutter:!0}),testCM("moveV stuck",function(e){var n=byClassName(e.getWrapperElement(),"CodeMirror-lines")[0].firstChild,a=n.offsetHeight,o="fooooooooooooooooooooooooo baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaar\n";e.setValue(o);for(var t=50;e.setSize(t),!(n.offsetHeight<=3*a);t+=5);e.setCursor({line:0,ch:o.length-1}),e.moveV(-1,"line"),eqPos(e.getCursor(),{line:0,ch:26})},{lineWrapping:!0},ie_lt8),testCM("clickTab",function(e){var n=e.charCoords({line:0,ch:0}),a=e.charCoords({line:0,ch:1});eqPos(e.coordsChar({x:n.x+5,y:n.y+5}),{line:0,ch:0}),eqPos(e.coordsChar({x:a.x-5,y:a.y+5}),{line:0,ch:1})},{value:"	\n\n",lineWrapping:!0,tabSize:8}),testCM("verticalScroll",function(e){e.setSize(100,200),e.setValue("foo\nbar\nbaz\n");var n=e.getScrollerElement(),a=n.scrollWidth;e.setLine(0,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah"),is(n.scrollWidth>a,"scrollbar present"),e.setLine(0,"foo"),eq(n.scrollWidth,a,"scrollbar gone"),e.setLine(0,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah"),e.setLine(1,"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbh"),is(n.scrollWidth>a,"present again");var o=n.scrollWidth;e.setLine(0,"foo"),is(n.scrollWidth<o,"scrollbar smaller"),is(n.scrollWidth>a,"but still present")}),testCM("extraKeys",function(e){function n(n,o,t){"string"==typeof o&&(o=o.charCodeAt(0));var i={type:"keydown",keyCode:o,preventDefault:function(){},stopPropagation:function(){}};if(t)for(var r in t)i[r]=t[r];a=null,e.triggerOnKeyDown(i),eq(a,n)}var a;CodeMirror.commands.testCommand=function(){a="tc"},CodeMirror.commands.goTestCommand=function(){a="gtc"},e.setOption("extraKeys",{"Shift-X":function(){a="sx"},X:function(){a="x"},"Ctrl-Alt-U":function(){a="cau"},End:"testCommand",Home:"goTestCommand",Tab:!1}),n(null,"U"),n("cau","U",{ctrlKey:!0,altKey:!0}),n(null,"U",{shiftKey:!0,ctrlKey:!0,altKey:!0}),n("x","X"),n("sx","X",{shiftKey:!0}),n("tc",35),n(null,35,{shiftKey:!0}),n("gtc",36),n("gtc",36,{shiftKey:!0}),n(null,9)}),testCM("wordMovementCommands",function(e){e.execCommand("goWordLeft"),eqPos(e.getCursor(),{line:0,ch:0}),e.execCommand("goWordRight"),e.execCommand("goWordRight"),eqPos(e.getCursor(),{line:0,ch:7}),e.execCommand("goWordLeft"),eqPos(e.getCursor(),{line:0,ch:5}),e.execCommand("goWordRight"),e.execCommand("goWordRight"),eqPos(e.getCursor(),{line:0,ch:12}),e.execCommand("goWordLeft"),eqPos(e.getCursor(),{line:0,ch:9}),e.execCommand("goWordRight"),e.execCommand("goWordRight"),e.execCommand("goWordRight"),eqPos(e.getCursor(),{line:1,ch:1}),e.execCommand("goWordRight"),eqPos(e.getCursor(),{line:1,ch:9}),e.execCommand("goWordRight"),eqPos(e.getCursor(),{line:1,ch:13}),e.execCommand("goWordRight"),e.execCommand("goWordRight"),eqPos(e.getCursor(),{line:2,ch:0})},{value:"this is (the) firstline.\na foo12éø×bar\n"}),testCM("charMovementCommands",function(e){e.execCommand("goCharLeft"),e.execCommand("goColumnLeft"),eqPos(e.getCursor(),{line:0,ch:0}),e.execCommand("goCharRight"),e.execCommand("goCharRight"),eqPos(e.getCursor(),{line:0,ch:2}),e.setCursor({line:1,ch:0}),e.execCommand("goColumnLeft"),eqPos(e.getCursor(),{line:1,ch:0}),e.execCommand("goCharLeft"),eqPos(e.getCursor(),{line:0,ch:5}),e.execCommand("goColumnRight"),eqPos(e.getCursor(),{line:0,ch:5}),e.execCommand("goCharRight"),eqPos(e.getCursor(),{line:1,ch:0}),e.execCommand("goLineEnd"),eqPos(e.getCursor(),{line:1,ch:5}),e.execCommand("goLineStartSmart"),eqPos(e.getCursor(),{line:1,ch:1}),e.execCommand("goLineStartSmart"),eqPos(e.getCursor(),{line:1,ch:0}),e.setCursor({line:2,ch:0}),e.execCommand("goCharRight"),e.execCommand("goColumnRight"),eqPos(e.getCursor(),{line:2,ch:0})},{value:"line1\n ine2\n"}),testCM("verticalMovementCommands",function(e){e.execCommand("goLineUp"),eqPos(e.getCursor(),{line:0,ch:0}),e.execCommand("goLineDown"),eqPos(e.getCursor(),{line:1,ch:0}),e.setCursor({line:1,ch:12}),e.execCommand("goLineDown"),eqPos(e.getCursor(),{line:2,ch:5}),e.execCommand("goLineDown"),eqPos(e.getCursor(),{line:3,ch:0}),e.execCommand("goLineUp"),eqPos(e.getCursor(),{line:2,ch:5}),e.execCommand("goLineUp"),eqPos(e.getCursor(),{line:1,ch:12}),e.execCommand("goPageDown"),eqPos(e.getCursor(),{line:5,ch:0}),e.execCommand("goPageDown"),e.execCommand("goLineDown"),eqPos(e.getCursor(),{line:5,ch:0}),e.execCommand("goPageUp"),eqPos(e.getCursor(),{line:0,ch:0})},{value:"line1\nlong long line2\nline3\n\nline5\n"}),testCM("verticalMovementCommandsWrapping",function(e){e.setSize(120),e.setCursor({line:0,ch:5}),e.execCommand("goLineDown"),eq(e.getCursor().line,0),is(e.getCursor().ch>5,"moved beyond wrap");for(var n=0;;++n){is(20>n,"no endless loop"),e.execCommand("goLineDown");var a=e.getCursor();if(1==a.line&&eq(a.ch,5),2==a.line){eq(a.ch,1);break}}},{value:"a very long line that wraps around somehow so that we can test cursor movement\nshortone\nk",lineWrapping:!0});