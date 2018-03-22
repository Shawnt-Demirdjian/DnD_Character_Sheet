$(document).ready(function () {

	/*WEAPON ROW MANEGEMENT*/

	$("#add").click(function () {
		$("#weaponRow").clone().prependTo("#weapons");
		$("#rem").click(RemoveWeaponRow);
		$(".fillWeaponRow").click(fillWeaponRow);

	});

	$(".fillWeaponRow").click(fillWeaponRow);
	$("#rem").click(RemoveWeaponRow);

	function RemoveWeaponRow() {
		if ($(".weaponRows").length <= 1) {
			return;
		}
		$(this).parent().parent().remove();
	}

	/*WEAPON ROW AUTO FILL*/

	function fillWeaponRow() {
		var currWeapon = $(this);
		var title = $(this).parent().siblings("#weapName").children().val();
		if (title in weaponsDict) {
			var newUrl = url + "equipment/" + weaponsDict[title];
			$.get(newUrl, function (response) {
				currWeapon.parent().siblings("#damage").children().val(response.damage.dice_count + " d" + response.damage.dice_value);
				currWeapon.parent().siblings("#damageType").children().val(response.damage.damage_type.name);
				if (response.weapon_range == "Melee") {
					currWeapon.parent().siblings("#range").children().val("Melee");
				} else {
					currWeapon.parent().siblings("#range").children().val(response.range.normal + "/" + response.range.long);
				}
				currWeapon.parent().siblings("#weight").children().val(response.weight + " pounds");
				currWeapon.parent().siblings("#weapProp").children().val("");
				currWeapon.parent().siblings("#weapProp").children().val(response.properties[0].name)
				for (var i = 1; i < response.properties.length; i++) {
					currWeapon.parent().siblings("#weapProp").children().val(currWeapon.parent().siblings("#weapProp").children().val() + ", " + response.properties[i].name)
				}
			});
		}
	}


	/*LIST ITEM MANAGEMENT*/

	$(".addLi").click(function () {
		var copyLi = $(this).parent().next();
		var currUl = $(this).parent().parent();
		$(copyLi).clone().appendTo(currUl);

		$(".remLi").click(RemoveListItem);
		$(".modableSpell").click(openSpellModal);
	});

	$(".remLi").click(RemoveListItem);

	function RemoveListItem() {
		if ($(this).parent().parent().children().length <= 2) {
			return;
		}
		$(this).parent().remove();
	}

	/*SECTION HIDING*/

	$(".hide").click(function () {
		$(this).parent().next().toggle();
	});

	/*AUTOMATIC MODIFIERS*/

	$("#Level").blur(function () { //updates Prof Bonus and Prof skill mods
		var lev = $(this).val();
		if (lev <= 4) {
			$("#PB").val(2);
		} else if (lev <= 8) {
			$("#PB").val(3);
		} else if (lev <= 12) {
			$("#PB").val(4);
		} else if (lev <= 16) {
			$("#PB").val(5);
		} else {
			$("#PB").val(6);
		}

		profSkillModChange();
	});

	$(".autoMod").blur(function () { //updates all ability and skill mods
		var natMod = Math.floor(($(this).val() - 10) / 2);
		$(this).parent().next().children().val(natMod);
		$.each($(this).parent().parent().parent().find(":not(:checked)"), function (index, skill) {
			$(skill).parent().next().children().val(natMod);
		});
		profSkillModChange();
	});

	$("#ability input:checkbox").mouseup(function () { //updates skill mod on loss/gain prof
		var currMod = $(this).parent().next().children().val();
		if ($(this).is(":checked")) { //loose proficiency
			$(this).parent().next().children().val(parseInt(currMod) - parseInt($("#PB").val()));
		} else { //gain proficiency
			$(this).parent().next().children().val(parseInt(currMod) + parseInt($("#PB").val()));
		}
	});

	function profSkillModChange() { //updates all proficient skill mods
		$.each($(".natMod"), function (natIndex, natMod) {
			$.each($(this).parent().parent().parent().find(":checked"), function (skillindex, skill) {
				$(skill).parent().next().children().val(parseInt($(natMod).val()) + parseInt($("#PB").val()));
			});
		});
	}

	/*ITEM DETAIL MODAL BOX*/

	$(".modable").click(openModal);

	$(".modableClass").click(openClassModal);

	$(".modableRace").click(openRaceModal);

	$(".modableAbil").click(openAbilityModal);

	$(".modableSkill").click(openSkillModal);

	$(".modableSpell").click(openSpellModal);

	function openModal() {
		var title = $(this).html();
		$("#modTitle").html(title);
		$("#detailModal").modal('toggle');
	}

	function openClassModal() {
		var title = $(this).html();
		$("#modTitle").html(title);
		$("#detailModal").modal('toggle');
	}

	function openRaceModal() {
		var title = $(this).next().val();
		if (title in racesDict) {
			var newUrl = url + "races/" + racesDict[title];
			$.get(newUrl, function (response) {
				$("#modBody").html("<b>Alingment: </b>" + response["alignment"] + "<br>" + "<b>Age: </b>" + response["age"] + "<br>" + "<b>Size: </b>" + response["size"] + "; " + response["size_description"]);
			});
		} else {
			$("#modBody").html("Sorry, there is no race '" + title + "' in the D&D 5e SRD.");
		}
		$("#modTitle").html(title);
		$("#detailModal").modal('toggle');
	}

	function openAbilityModal() {
		var title = $(this).html();
		var newUrl = url + "ability-scores/" + abilityDict[title];
		$.get(newUrl, function (response) {
			$("#modBody").html(response["desc"]);
		});
		$("#modTitle").html(title);
		$("#detailModal").modal('toggle');
	}

	function openSkillModal() {
		var title = $(this).html();
		var newUrl = url + "skills/" + skillsDict[title];
		$.get(newUrl, function (response) {
			$("#modBody").html(response["desc"]);
		});
		$("#modTitle").html(title);
		$("#detailModal").modal('toggle');
	}

	function openSpellModal() {
		var title = $(this).prev().val();
		$("#modTitle").html(title);
		$("#detailModal").modal('toggle');
	}




}); //end document.ready funtion


/*
	$('#send').on("click", function () {
		var url = "http://www.dnd5eapi.co/api/classes";

		$.get(url, function (response) {
			$('#phrase').html(response);
			console.log(response);
		});
	});
*/
