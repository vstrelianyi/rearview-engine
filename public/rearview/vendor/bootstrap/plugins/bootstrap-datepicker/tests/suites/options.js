module("Options",{setup:function(){},teardown:function(){}}),test("Autoclose",function(){var i,t=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd",autoclose:!0}),e=t.data("datepicker"),a=e.picker;t.focus(),ok(a.is(":visible"),"Picker is visible"),i=a.find(".datepicker-days tbody td:nth(7)"),equal(i.text(),"4"),i.click(),ok(a.is(":not(:visible)"),"Picker is hidden"),datesEqual(e.date,UTCDate(2012,2,4)),datesEqual(e.viewDate,UTCDate(2012,2,4))}),test("Startview: year view (integer)",function(){var i=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd",startView:1}),t=i.data("datepicker"),e=t.picker;i.focus(),ok(e.find(".datepicker-days").is(":not(:visible)"),"Days view hidden"),ok(e.find(".datepicker-months").is(":visible"),"Months view visible"),ok(e.find(".datepicker-years").is(":not(:visible)"),"Years view hidden")}),test("Startview: year view (string)",function(){var i=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd",startView:"year"}),t=i.data("datepicker"),e=t.picker;i.focus(),ok(e.find(".datepicker-days").is(":not(:visible)"),"Days view hidden"),ok(e.find(".datepicker-months").is(":visible"),"Months view visible"),ok(e.find(".datepicker-years").is(":not(:visible)"),"Years view hidden")}),test("Startview: decade view (integer)",function(){var i=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd",startView:2}),t=i.data("datepicker"),e=t.picker;i.focus(),ok(e.find(".datepicker-days").is(":not(:visible)"),"Days view hidden"),ok(e.find(".datepicker-months").is(":not(:visible)"),"Months view hidden"),ok(e.find(".datepicker-years").is(":visible"),"Years view visible")}),test("Startview: decade view (string)",function(){var i=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd",startView:"decade"}),t=i.data("datepicker"),e=t.picker;i.focus(),ok(e.find(".datepicker-days").is(":not(:visible)"),"Days view hidden"),ok(e.find(".datepicker-months").is(":not(:visible)"),"Months view hidden"),ok(e.find(".datepicker-years").is(":visible"),"Years view visible")}),test("Today Button: today button not default",function(){var i=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd"}),t=i.data("datepicker"),e=t.picker;i.focus(),ok(e.find(".datepicker-days").is(":visible"),"Days view visible"),ok(e.find(".datepicker-days tfoot .today").is(":not(:visible)"),"Today button not visible")}),test("Today Button: today visibility when enabled",function(){var i=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd",todayBtn:!0}),t=i.data("datepicker"),e=t.picker;i.focus(),ok(e.find(".datepicker-days").is(":visible"),"Days view visible"),ok(e.find(".datepicker-days tfoot .today").is(":visible"),"Today button visible"),e.find(".datepicker-days thead th.switch").click(),ok(e.find(".datepicker-months").is(":visible"),"Months view visible"),ok(e.find(".datepicker-months tfoot .today").is(":visible"),"Today button visible"),e.find(".datepicker-months thead th.switch").click(),ok(e.find(".datepicker-years").is(":visible"),"Years view visible"),ok(e.find(".datepicker-years tfoot .today").is(":visible"),"Today button visible")}),test("Today Button: data-api",function(){var i=$('<input data-date-today-btn="true" />').appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd"}),t=i.data("datepicker"),e=t.picker;i.focus(),ok(e.find(".datepicker-days").is(":visible"),"Days view visible"),ok(e.find(".datepicker-days tfoot .today").is(":visible"),"Today button visible")}),test("Today Button: moves to today's date",function(){var i,t=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd",todayBtn:!0}),e=t.data("datepicker"),a=e.picker;t.focus(),ok(a.find(".datepicker-days").is(":visible"),"Days view visible"),ok(a.find(".datepicker-days tfoot .today").is(":visible"),"Today button visible"),i=a.find(".datepicker-days tfoot .today"),i.click();var d=new Date,s=UTCDate(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate());datesEqual(e.viewDate,s),datesEqual(e.date,UTCDate(2012,2,5))}),test('Today Button: "linked" selects today\'s date',function(){var i,t=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd",todayBtn:"linked"}),e=t.data("datepicker"),a=e.picker;t.focus(),ok(a.find(".datepicker-days").is(":visible"),"Days view visible"),ok(a.find(".datepicker-days tfoot .today").is(":visible"),"Today button visible"),i=a.find(".datepicker-days tfoot .today"),i.click();var d=new Date,s=UTCDate(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate());datesEqual(e.viewDate,s),datesEqual(e.date,s)}),test("Today Highlight: today's date is not highlighted by default",patch_date(function(i){i.now=UTCDate(2012,2,15);var t,e=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd"}),a=e.data("datepicker"),d=a.picker;e.focus(),ok(d.find(".datepicker-days").is(":visible"),"Days view visible"),equal(d.find(".datepicker-days thead .switch").text(),"March 2012",'Title is "March 2012"'),t=d.find(".datepicker-days tbody td:contains(15)"),ok(!t.hasClass("today"),'Today is not marked with "today" class'),t=d.find(".datepicker-days tbody td:contains(14)"),ok(!t.hasClass("today"),'Yesterday is not marked with "today" class'),t=d.find(".datepicker-days tbody td:contains(16)"),ok(!t.hasClass("today"),'Tomorrow is not marked with "today" class')})),test("Today Highlight: today's date is highlighted when not active",patch_date(function(i){i.now=UTCDate(2012,2,15);var t,e=$("<input />").appendTo("#qunit-fixture").val("2012-03-05").datepicker({format:"yyyy-mm-dd",todayHighlight:!0}),a=e.data("datepicker"),d=a.picker;e.focus(),ok(d.find(".datepicker-days").is(":visible"),"Days view visible"),equal(d.find(".datepicker-days thead .switch").text(),"March 2012",'Title is "March 2012"'),t=d.find(".datepicker-days tbody td:contains(15)"),ok(t.hasClass("today"),'Today is marked with "today" class'),t=d.find(".datepicker-days tbody td:contains(14)"),ok(!t.hasClass("today"),'Yesterday is not marked with "today" class'),t=d.find(".datepicker-days tbody td:contains(16)"),ok(!t.hasClass("today"),'Tomorrow is not marked with "today" class')}));