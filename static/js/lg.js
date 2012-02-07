

function reload(){
	loc = "/" + request_type + "/" + hosts + "/" + proto;
	if (request_type != "summary" ){
		if( request_args != undefined && request_args != ""){
			loc = loc + "?q=" + request_args;
			document.location = loc;
		} 
	} else {
		document.location = loc;
	}
}
function update_view(){
	if (request_type == "summary")
		$(".navbar-search").hide();
	else
		$(".navbar-search").show();

	$(".navbar li").removeClass('active');

	$(".proto a#"+proto).parent().addClass('active');
	$(".hosts a[id='"+hosts+"']").parent().addClass('active');
	$(".request_type a#"+request_type).parent().addClass('active');

	command = $(".request_type a#"+request_type).text().split("...");
	$(".request_type a:first").html(command[0] + '<b class="caret"></b>');
	if (command[1] != undefined ) {
		$(".navbar li:last").html("&nbsp;&nbsp;"+command[1]);
	} else {
		$(".navbar li:last").html("");
	}
	
	request_args = $(".request_args").val();
	$(".request_args").focus();
	$(".request_args").select();
}
$(function(){
		$(".modal .modal-footer .btn").click(function(){
			$(".modal").modal('hide'); 
		});
		$("a.whois").click(function (event){
			event.preventDefault();
			link = $(this).attr('href');
			$.getJSON(link, function(data) {
				$(".modal h3").html(data.title);
			        $(".modal .modal-body > p").html(data.output);
				$(".modal").modal('show');
			});
		});

		$(".history a").click(function (){
			$(".history li").removeClass("active")
			$(this).parent().addClass("active")
		});


		$(".hosts a").click(function(){
			hosts = $(this).attr('id');
			update_view();
			reload();
			});
		$(".proto a").click(function(){
			proto = $(this).attr('id');
			update_view();
			reload();
			});
		$(".request_type ul a").click(function(){
			if ( request_type.replace("_detail","") != $(this).attr('id').replace("_detail","") ){
				request_args = ""
				$(".request_args").val("");
			}
			request_type = $(this).attr('id');
			update_view();
			reload();
			});
		$("form").submit(function(){
				update_view();
				reload();
				});
		$('.request_args').val(request_args);
		update_view();
});

