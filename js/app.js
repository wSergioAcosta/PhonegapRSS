// JavaScript Document

//globals
//var rssSource = "http://www.tvshow.com.uy/rss/";
var rssSource = "http://www.npr.org/rss/rss.php?id=1001";
//var rssSource = "http://www.wunderman.com.uy/tmp/sergio/rss/proxy.php?url=http://www.mtv.com/rss/news/news_full.jhtml";
//var rssSource = "http://www.mtv.com/rss/news/news_full.jhtml";
var entries = [];

/*
function getRSS(){
	$.get(RSS, {}, function(res, code) {
		var xml = $(res);
		var items = xml.find("item");
		
		$.each(items, function(i, v) {
			entry = { 
				title:$(v).find("title").text(), 
				link:$(v).find("link").text(), 
				description:$.trim($(v).find("description").text())
			};

		});
	});
}
*/

var storage;

function getAjaxRSS(){
	$.ajax({
		url:rssSource,
		type:'GET',
		dataType:"xml",
		crossDomain: true,
		success:function(res,code) {
			entries = [];
			var xml = $(res);
			var items = xml.find("item");
			$.each(items, function(i, v) {
				entry = { 
					title:$(v).find("title").text(), 
					link:$(v).find("link").text(), 
					description:$.trim($(v).find("description").text()),
					content:$(v).find("encoded").text()
				};

				entries.push(entry);

				//guarda en webSQL
				storage.insert(entry);
			});
			//store entries
			//guarda en local storage
			//localStorage["entries"] = JSON.stringify(entries);

			renderEntries(entries);
		},
		error:function(jqXHR,status,error) {
			//try to use cache
			if(localStorage["entries"]) {
				$("#status").html("Using cached version...");
				entries = JSON.parse(localStorage["entries"])
				renderEntries(entries);
			} else {
				$("#status").html("Sorry, we are unable to get the RSS and there is no cache.");
			}
		}
	});
}

function renderEntries(entries) {
    var s = '';
    $.each(entries, function(i, v) {
		$page = '<div class="page"><div class="wrapper"><div class="scroller"><h5 class="title" data-entryid="'+i+'">' + v.title + '</h5><p class="description">' + v.description + '</p><p> ' + v.content + ' </p></div></div></div>';
	    $("#pageScroller").append($page);
    });
	
	start(entries.length);
}

//Listen for main page
$(document).on('ready', function(){
	storage = new WebSQLStorage(getAjaxRSS());
	});

//Listen for the content page to load
/*
$("#contentPage").on("pageshow", function(prepage) {
	//Set the title
	$("h1", this).text(entries[selectedEntry].title);
	var contentHTML = "";
	contentHTML += entries[selectedEntry].description;
	contentHTML += '<p/><a href="'+entries[selectedEntry].link + '">Read Entry on Site</a>';
	$("#entryText",this).html(contentHTML);
});
*/