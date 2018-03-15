$(document).ready(function () {

	/*Weapon Row Management*/

	$("#add").click(function () {
		$("#weaponRow").clone().prependTo("#weapons");
		$("#rem").click(RemoveWeaponRow);

	});
	
	$("#rem").click(RemoveWeaponRow);

	function RemoveWeaponRow() {
		if ($(".weaponRows").length <= 1) {
			return;
		}
		$(this).parent().parent().remove();
	}


	/*List Item Manegement*/
	
	
	$(".addLi").click(function(){
		var copyLi = $(this).parent().next();
		var currUl = $(this).parent().parent();
		$(copyLi).clone().appendTo(currUl);
		
		$(".remLi").click(RemoveListItem);
	});
	
	$(".remLi").click(RemoveListItem);
	
	function RemoveListItem(){		
		if($(this).parent().parent().children().length <= 2){
		   return;
		}
		$(this).parent().remove();
	}
	

});


/*
	$('#send').on("click", function () {
		var url = "http://www.dnd5eapi.co/api/ides";

		$.get(url, function (response) {
			$('#phrase').html(response);
			console.log(response);
		});
	});
*/
