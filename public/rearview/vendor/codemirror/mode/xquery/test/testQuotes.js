$(document).ready(function(){module("testQuoteEscape"),test("testQuoteEscapeDouble",function(){expect(1);var s='let $rootfolder := "c:\\builds\\winnt\\HEAD\\qa\\scripts\\"let $keysfolder := concat($rootfolder, "keys\\")return$keysfolder',a='<span class="cm-keyword">let</span> <span class="cm-variable">$rootfolder</span> <span class="cm-keyword">:=</span> <span class="cm-string">"c:\\builds\\winnt\\HEAD\\qa\\scripts\\"</span><span class="cm-keyword">let</span> <span class="cm-variable">$keysfolder</span> <span class="cm-keyword">:=</span> <span class="cm-variable cm-def">concat</span>(<span class="cm-variable">$rootfolder</span>, <span class="cm-string">"keys\\"</span>)<span class="cm-word">return$keysfolder</span>';$("#sandbox").html('<textarea id="editor">'+s+"</textarea>"),CodeMirror.fromTextArea($("#editor")[0]);var e=$(".CodeMirror-lines div div pre")[0].innerHTML;equal(e,a),$("#editor").html("")})});