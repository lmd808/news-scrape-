// Grab the articles as a json
$.getJSON('/articles', function(data) {
	// For each one
	for (var i = 0; i < data.length; i++) {
		// Display the apropos information on the page
		$('#articles').append(
			`<li class="list-group-item" data-id= ${data[i]._id}>
			${data[i].title}
			<br />
			${data[i].link} 
			</li>`
		);
	}
});

// Whenever someone clicks a p tag
$('#articles').on('click', 'li', function() {
	// Empty the notes from the note section
	$('#notes').empty();
	// Save the id from the p tag
	var thisId = $(this).attr('data-id');
	console.log(thisId);

	// Now make an ajax call for the Article
	$.ajax({
		method: 'GET',
		url: '/articles/' + thisId
	})
		// With that done, add the note information to the page
		.then(function(data) {
			// The title of the article
			$('#notes').append('<h2>' + data.title + '</h2>');
			// An input to enter a new title
			$('#notes').append("<input id='titleinput' name='title' >");
			// A textarea to add a new note body
			$('#notes').append("<textarea id='bodyinput' name='body'></textarea>");
			// A button to submit a new note, with the id of the article saved to it
			$('#notes').append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

			// If there's a note in the article
			if (data.note) {
				var dataNote = data.note;
				console.log('views' + dataNote);
				//notes.empty
				// notes.append
				// comment component for all comments on that article
				// the data would return as an array for loop through array to create comment for each

				// link user id to note
				// if user id === to id of the person who wrote the note then clicking on id will delete the comment
				for (var i = 0; i < dataNote.length; i++) {
					$('#comments').append(
						`<li class="list-group-item comment" data-id= ${data.note[i]._id}>
				${data.note[i].title}
				<br />
				${data.note[i].body} 
				</li>`
					);
				}
			}
			// if (data.note) {
			// 	// Place the title of the note in the title input
			// 	//$('#titleinput').val(data.note.title);
			// 	// Place the body of the note in the body textarea
			// 	//$('#bodyinput').val(data.note.body);
			// }
		});
});

// When you click the savenote button
$(document).on('click', '#savenote', function() {
	// Grab the id associated with the article from the submit button
	var thisId = $(this).attr('data-id');
	// Run a POST request to change the note, using what's entered in the inputs
	$.ajax({
		method: 'POST',
		url: '/articles/' + thisId,
		data: {
			// Value taken from title input
			title: $('#titleinput').val(),
			// Value taken from note textarea
			body: $('#bodyinput').val()
		}
	})
		// With that done
		.then(function(data) {
			// Log the response
			console.log(data);
			// Empty the notes section
			$('#notes').empty();
		});

	// Also, remove the values entered in the input and textarea for note entry
	$('#titleinput').val('');
	$('#bodyinput').val('');
});

$('#comments').on('click', 'li', function() {
	// Empty the notes from the note section
	var noteId = $(this).attr('data-id');
	// Now make an ajax call for the Article
	$.ajax({
		method: 'DELETE',
		url: '/note/' + noteId,
		data: noteId
	}).then(function(data) {
		$(this).empty();

		// The title of the article
	});
});
