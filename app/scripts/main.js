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
			$(this).siblings('label').html('<i class="fa fa-check" aria-hidden="true"></i>');
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
  				$('.select-label').html('<i class="fa fa-check" style="display:inline" aria-hidden="true"></i>');
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
			$(this).next('.select-label').html('<i class="fa fa-check" style="display:inline" aria-hidden="true"></i>');
			$('#select-ticket-all').prop('checked', true);
			$('#select-ticket-all').siblings('label').html('<i class="fa fa-check" aria-hidden="true"></i>');
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
		$('#ticketModal .modal .modal-footer').hide();
		$('#ticketModal .form-group').hide();

		modalText += '<img src="images/done.png" class="done-image">'

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
