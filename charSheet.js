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


	/*SOMETHING ELSE*/
	
	
	
	
	

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
