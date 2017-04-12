$(document).ready(function () {

	function countTickets() {
		//count tickets selected
		var totalTickets;
		totalTickets = $('.select-ticket:checked').length;
		$('.countTickets').html(totalTickets);
	}

	function changeTableHeader(totalTickets) {
		//change table header
		if (totalTickets >0) {
			$('.when-tickets-selected, .drop-code .caret').hide();
			$('.event-checkbox-header').attr('colspan', 4);
			$('.count-tickets, .manage-tickets').show();

			$('.drop-code').css({
				'width' : 'auto',
				'display' : 'inline-block',
				'background-color' : '#fafbfc'
			});

			$('.count-tickets, .manage-tickets').css({
				'display' : 'inline-block'
			});
		}
		else {
			$('.when-tickets-selected, .drop-code .caret').show();
			$('.event-checkbox-header').removeAttr('colspan');
			$('.count-tickets, .manage-tickets').hide();
		}
	}

	//tick all ticket details
	$('#select-ticket-all').click(function() {
		var checkBoxes = $('.select-ticket');
    
    	//check all tickets
    	if ($(this).is(':checked')) {
  			checkBoxes.prop('checked', true);
			$(this).siblings('label').html('<img class="icon icon-tick" src="images/tick/icon_tick_blue_small.svg">');
		}
		else {
			checkBoxes.prop('checked', false);
			$(this).siblings('label').html('');
		}

  		totalTickets = $('.select-ticket:checked').length;
		//apply color to selected tr
	    checkBoxes.each(function() {
    		if ($(this).is(':checked')) {
  				checkBoxes.closest('tr').addClass('tickets-selected');
  				$('.select-label').html('<img class="icon icon-tick" src="images/tick/icon_tick_blue_small.svg">');
  			}
  			else {
  				checkBoxes.closest('tr').removeClass('tickets-selected');	
  				$('.select-label').html('');
  			}
    	});

    	countTickets();
    	changeTableHeader(totalTickets);
	});

	$('.select-ticket').click(function() {
	    totalTickets = $('.select-ticket:checked').length;
		//select head checkbox
		if ($(this).is(':checked')) {
			$(this).next('.select-label').html('<img class="icon icon-tick" src="images/tick/icon_tick_blue_small.svg">');
			$('#select-ticket-all').prop('checked', true);
			$('#select-ticket-all').siblings('label').html('<img class="icon icon-tick" src="images/tick/icon_tick_blue_small.svg">');
		}
		else {
			$(this).next('.select-label').html('');	
			$('#select-ticket-all').prop('checked', false);
			$('#select-ticket-all').siblings('label').html('');
		}
		//apply color to selected tr
	    $(this).closest('tr').toggleClass('tickets-selected');

		countTickets();
		changeTableHeader(totalTickets);
	});

	$('.add-ticket-link').click(function() {
		$('#addTicketModal .ticket-title').html('Add ');
	});

	$('.resend-tickets-link').click(function() {
		$('#ticketDetailModal').removeClass('fade');
		$('#ticketDetailModal').modal('hide');
		$('#ticketDetailModal').addClass('fade');
		$('.btn-ticket, .done-message, .done-image').hide();
		$('.modal .modal-body table, .modal .modal-footer').show();
		$('#ticketModal .modal-header .icon').removeClass('icon-trash');
		$('#ticketModal .modal-header .icon').addClass('icon-envelope');
		$('#ticketModal .modal-header .icon').attr('src', 'images/envelope/icon_envelope_gray.svg');
		$('#ticketModal .ticket-title').html('Resend ');
		$('#ticketModal .modal-content').addClass('model-content-custom');
		$('#ticketModal').addClass('modal-custom');
		$('#resendMailTable').addClass('modal-table');
		$('.event-message').html('Are you sure you want to resend <span class="countTickets"></span> tickets?');
		$('.event-message-xs').html('You are about to resend 3 tickets.');
		countTickets();
		$('#resendTicketBtn').show();
	});

	$('.delete-tickets-link').click(function() {
		$('#ticketDetailModal').removeClass('fade');
		$('#ticketDetailModal').modal('hide');
		$('#ticketDetailModal').addClass('fade');
		$('.btn-ticket, .done-message, .done-image').hide();
		$('.modal .modal-body table, .modal .modal-footer').show();
		$('#ticketModal .modal-header .icon').removeClass('icon-envelope');
		$('#ticketModal .modal-header .icon').addClass('icon-trash');
		$('#ticketModal .modal-header .icon').attr('src', 'images/trash/icon_trash_gray.svg');
		$('#ticketModal .ticket-title').html('Delete ');
		$('#ticketModal .modal-content').addClass('model-content-custom');
		$('#ticketModal').addClass('modal-custom');
		$('#resendMailTable').addClass('modal-table');
		$('.event-message').html('Deleted tickets cannot be recovered. Do you still want to continue?');
		$('#delTicketBtn').show();
	});

	//change modal-body content when button is clicked (resend/delete)
	$('.btn-ticket').click(function() {
		var ticketID, modalText='';
		ticketID = this.id;

		$('#ticketModal .modal-body table').hide();
		$('#ticketModal .done-message').hide();
		$('#ticketModal .done-image').hide();
		$('#ticketModal .modal-footer').hide();
		$('#ticketModal .form-group').hide();

		modalText += '<img src="images/icon_confirmation.svg" class="done-image">'

		if (ticketID=='resendTicketBtn') {
			modalText += '<div class="done-message">Tickets Resent!</div>'
		}
		else if (ticketID=='delTicketBtn') {
			modalText += '<div class="done-message">Tickets Deleted!</div>'	
		}
		else if (ticketID=='addTicketBtn') {
			modalText += '<div class="done-message">Tickets saved!</div>'
		}

		$('#ticketModal .modal-body').append(modalText);

	});

	$('.ticket-code').click(function() {
		$(this).closest('tr').toggleClass('tickets-selected');
		$(this).find('.manage-tickets-xs').toggle();
	});

	$('.add-ticket-type').click(function() {
		var markup = '<tr><td><input type="text" name="" value="" class="form-control" placeholder="VIP"></td><td><input type="text" name="" value="" class="form-control ticket-type-qty" placeholder="0"></td><td><input type="text" name="" value="" class="form-control ticket-type-price" placeholder="£0.00"></td><td><button class="del-ticket-type"><i class="fa fa-trash" aria-hidden="true"></i></button></td></tr>';
		$('table#addTicketType tbody').append(markup);
		$('.del-ticket-type').click(function(event) {
			$(event.target).parents('tr').remove();
		});
	});

	$('.sort-by-code').click(function(event) {
		var table = $(event.target).parents('table')[0];

		var ascending = (table.getAttribute('sort-by-code') != 'descending');
		ascending = !ascending;
		sortTable(table, ascending);

		table.setAttribute('sort-by-code', ascending ? 'ascending' : 'descending');

		var caret = $(event.target).children('span')[0];
		$(caret).css('transform', ascending ? '' : 'rotate(180deg)');
	});

	function sortTable(table, ascending = true) {
		var rows, switching, i, x, y, shouldSwitch;
		switching = true;
		while (switching) {
			switching = false;
			rows = table.getElementsByTagName('TR');
			for (i = 1; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName('TD')[1].getElementsByTagName('a')[0];
				y = rows[i + 1].getElementsByTagName('TD')[1].getElementsByTagName('a')[0];
				if (ascending && x.text.toLowerCase() > y.text.toLowerCase()
					|| !ascending && x.text.toLowerCase() < y.text.toLowerCase()) {
					shouldSwitch= true;
					break;
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
			}
		}
	}
	//increment / decrement button
	$('.increment-qty').on('click',function() {
		ticketTotal = parseInt($('#ticketQty').val())+1;
	    $('#ticketQty').val(ticketTotal);

		if (ticketTotal <= 0) {
			$('.decrement-qty').attr('disabled', true);
			$('.decrement-qty i').css({'color': '#c5cfd7'});
		}
		else {
			$('.decrement-qty i').css({'color': '#0078bd'});
		}
	});

	$('.decrement-qty').on('click',function() {
		ticketTotal = parseInt($('#ticketQty').val())-1;
		$('#ticketQty').val(ticketTotal);

		if (ticketTotal <= 0) {
			$('.decrement-qty').attr('disabled', true);
			$('.decrement-qty i').css({'color': '#c5cfd7'});
		}
		else {
			$('.decrement-qty i').css({'color': '#0078bd'});
		}
	});

	//Create ticket - wysiwyg
	$('#ticket-wysiwyg').summernote({
		disableDragAndDrop: true,
		disableResizeEditor: true,
		toolbar: [
			['font-style', ['fontname']],
			['style', ['bold', 'italic', 'underline']],
			['para', ['ul', 'ol', 'paragraph']],
			['color', ['color']],
			['insert', ['link','table','picture','video']],
			['misc',['codeview']]
		]
	});

	$('button .note-current-fontname').html('A');
});
