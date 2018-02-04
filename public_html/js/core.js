//******************************************************//
//***** JS to create, delete, edit and store notes *****//
//******************************************************//

var notes, count = 0;
// save the notes into local storage
function saveNotes() {
    var notesArray = [];
    // for each of the notes add a bespoke note object to the array
    notes.find("li > div").each(function (i, e) {
        // save attributes of the note div, as well as the id, date created, text for the title and content text areas
        var noteID = $(e).attr("id");
        var title = $(e).find("input.note-title");
        var content = $(e).find("textarea.note-content");
        var date = $(e).find(".date");
        var targetdiv = $(e).find('a').attr('href');

        notesArray.push({ Index: i, Title: title.val(), Content: content.val(), id: noteID, TStamp: date.val(), urlDiv: targetdiv });
    });
    // json encode it
    var jsonStr = JSON.stringify(notesArray);
    // and save the json string into local storage
    localStorage.setItem("notes", jsonStr);
}

// traverse all notes & remove selected/show classes if already present
function hideNotes() {
	var allNotes = $('#notes > li > div').find('.note-content');
	var allTitles = $('#notes > li > div').find('a.title-btn');
	
	if ($(allNotes).hasClass('show')){
		$(allNotes).removeClass('show');
	}
	
	if ($(allTitles).hasClass('selected')){
		$(allTitles).removeClass('selected');
	}
   
}

// find first note and show it
function findFirst() {
	var firstNote = $('#notes > li > div > .note-content').first();
	var firstTitle = $('#notes > li > div a.title-btn').first();
	firstNote.addClass('show');
	firstTitle.addClass('selected');
}

// gets URL entered and triggers a click to select note based on the title
function targetUrl(){
	
	if (window.location.hash) {
		var pathname = window.location.hash,
		rez = pathname.split('#'),
		linkUrl = rez[1];
				
		$("a[href='" + linkUrl + "']").trigger('click');
    }else {
	    $("a[href='#']");
    }

}

// add event handlers to a note
function addNoteEvent(noteElement) {
    var div = noteElement.children("div");
    var titleBtn = div.find('a.title-btn');
    var closeBtn = div.find(".remove");
    var noteContent = div.find(".note-content");

    //add/remove class show when notes are selected
    titleBtn.on('click', function(e) {
	    e.preventDefault();
	    hideNotes()
	    noteContent.addClass('show');
	    titleBtn.addClass('selected');
	    
	    var targetdiv = $(this).attr('href');
		window.location.hash = targetdiv;
		
		saveNotes();
    });
    
    //show and hide remove/delete btn
    div.focus(function() {
        closeBtn.removeClass("hide");
    });
    div.children().focus(function () {
        closeBtn.removeClass("hide");
    });
    div.hover(function() {
        closeBtn.removeClass("hide");
    }, function () {
        closeBtn.addClass("hide");
        saveNotes();
    });
    div.children().hover(function() {
        closeBtn.removeClass("hide");
    }, function () {
        closeBtn.addClass("hide");
    });
    
}
//  adds a new note to the 'notes' list
function addNewNote(IDName, title, content) {
	if(title){
		urlTitle = title.split(' ').join('-');
		saveNotes();
	}else {
		urlTitle = '';
	}
	
	dateSaved = moment().format('MMMM Do YYYY');
				
	// add a new note to the end of the list + Markup of the list
	notes.append("<li><div class='row note-wrapper'>" +
					"<div class='col-md-3'>" +
						"<a href='"+ urlTitle +"' class='title-btn'>" +
							"<div class='title'>" +
								"<input class='note-title' placeholder='Note Title' maxlength='30'/>" +
								"<span class='date'>"+ dateSaved +"</span>" +
								"<span class='remove hide'></span>" + 
							"</div>" +
						"</a>" +
					"</div>" +
					"<textarea class='note-content hide' placeholder='Your Note Content'/>" +
				"</div></li>");
				
	// get the new note that's just been added and attach the click event handler to its close button
	var newNote = notes.find("li:last");
	newNote.find(".remove").click(function (e) {
		e.preventDefault();
        // remove the note and save
	    newNote.remove();
	    saveNotes();
	    getHeight();
	    findFirst();
	    targetUrl();
	});
				
	// hook event handlers to show/hide close button
	addNoteEvent(newNote);
				
	// if a title is inputed then set the title of the new note
	if (title) {
		// get the title input element and set its value
		newNote.find("input.note-title").val(title);
    }
	// if content is inputed then set the content of the new note
	if (content) {
		// get the content textarea element and set its value
		newNote.find("textarea.note-content").val(content);
    }
    // save
    saveNotes();
}
// load the notes saved in the local storage
function loadNotes() {
    var storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        // passes the stored json back into an array of note objects
        var notesArray = JSON.parse(storedNotes);
        count = notesArray.length;
        var i;
        for (i = 0; i < count; i++) {
            var storedNote = notesArray[i];
            addNewNote(storedNote.Class, storedNote.Title, storedNote.Content, storedNote.TStamp, storedNote.urlDiv);
        }
    }
}
		


//calc height of app using title boxes and set content height to match
function getHeight() {
    appHeight = $('#notes').height();
    
    $('.note-content').css('height', appHeight - 15);
}


$(document).ready(function () {
    // get references to the 'notes' list
    notes = $("#notes");
    // load notes from local storage if one's available
    loadNotes();
    getHeight();
    hideNotes();
    findFirst();
    targetUrl();
    
    // clicking the 'New Note' button adds a new note to the list
    $("#btnNew").click(function () {
        addNewNote();
        getHeight()
    });
    // add a note to the list if there aren't any
    if (count === 0) {
        $("#btnNew").click();
    }
});