$(document).ready(function () {

    /*WEAPON ROW MANEGEMENT*/
	
	$("#addWeap").click(addWeapon);
	function addWeapon() {
        $("#weapons").append("<tr class='weaponRows' id='weaponRow'><th id='weapName' scope='row'><input type='text' placeholder='Weapon'></th><td id='damage'><input type='text' placeholder='Damage'></td><td id='damageType'><input type='text' placeholder='Damage Type'></td><td id='range'><input type='text' placeholder='Range'></td><td id='weight'><input type='text' placeholder='Weight'></td><td id='weapProp'><input type='text' placeholder='Properties'></td><td><button id='fill' class='btn btn-sm fillWeaponRow'>Fill Details</button></td><td><button id='rem' class='remWeap btn btn-sm'>Remove</button></td></tr>");

        $(".remWeap").click(RemoveWeaponRow);
        $(".fillWeaponRow").click(fillWeaponRow);
    }
    $(".remWeap").click(RemoveWeaponRow);
    $(".fillWeaponRow").click(fillWeaponRow);

    function RemoveWeaponRow() {
        if ($(".weaponRows").length <= 1) {
            $.each($(this).parent().siblings(), function (index, item) {
                $(item).children("input").val("");
            });
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
        var copyLi = $(this).parent().next().clone();
        copyLi.children().val("");
        var currUl = $(this).parent().parent();
        $(copyLi).clone().appendTo(currUl);

        $(".remLi").click(RemoveListItem);
        $(".modableSpell").click(openSpellModal);
    });

    $(".remLi").click(RemoveListItem);

    function RemoveListItem() {
        if ($(this).parent().parent().children().length <= 2) {
            $(this).siblings(":input[type='text']").val("");
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
        spellInfoChange();
    });

    $(".autoMod").blur(function () { //updates all ability and skill mods
        var natMod = Math.floor(($(this).val() - 10) / 2);
        $(this).parent().next().children().val(natMod);
        $.each($(this).parent().parent().parent().find(":not(:checked)"), function (index, skill) {
            $(skill).parent().next().children().val(natMod);
        });
        profSkillModChange();
        spellInfoChange();
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

    /*AUTOMATIC SPELLCASTING INFO*/

    function spellInfoChange() {
        var abilityID = $("#spellAbility").val() + "Mod";
        var abilityMod = $("#" + abilityID).val();
        var DC = 8 + parseInt(abilityMod) + parseInt($("#PB").val());
        var attackMod = parseInt(abilityMod) + parseInt($("#PB").val());

        $("#spellDC").val(DC);
        $("#spellAttMod").val(attackMod);
    }

    /*ITEM DETAIL MODAL BOX*/

    $(".modable").click(openModal);

    $(".modableClass").click(openClassModal);

    $(".modableRace").click(openRaceModal);

    $(".modableAbil").click(openAbilityModal);

    $(".modableSkill").click(openSkillModal);

    $(".modableSpell").click(openSpellModal);

    $(".modableSpellClass").click(openSpellClassModal);

    function openModal() {
        var title = $(this).html();
        $("#modTitle").html(title);
        $("#detailModal").modal('toggle');
    }

    function openClassModal() {
        var title = $(this).next().val();
        var newUrl = url + "classes/" + title.toLowerCase();
        $.get(newUrl, function (response) {
            $("#modBody").html("<b>Hit Dice: d<b>" + response.hit_die + "<br>");

            //Skill Proficiency Choices
            $("#modBody").html($("#modBody").html() + "<b>Proficiency Choices: </b>");
            $.each(response.proficiency_choices, function (index, skillList) {
                $("#modBody").html($("#modBody").html() + "<br><b>Choose " + response.proficiency_choices[index].choose + " :</b>");
                $("#modBody").html($("#modBody").html() + response.proficiency_choices[index].from[0].name.replace("Skill:", ""));
                $.each(response.proficiency_choices[index].from, function (index, skilObj) {
                    if (index < 1) {
                        return;
                    }
                    $("#modBody").html($("#modBody").html() + ", " + skilObj.name.replace("Skill:", ""));
                });
            });

            //Class Proficiencies
            $("#modBody").html($("#modBody").html() + "<br><b>Proficiencies: </b>" + "<br>");
            $("#modBody").html($("#modBody").html() + response.proficiencies[0].name);
            $.each(response.proficiencies, function (index, profObj) {
                if (index < 1) {
                    return;
                }
                $("#modBody").html($("#modBody").html() + ", " + profObj.name);
            });

            //Saving Throw Proficiencies
            $("#modBody").html($("#modBody").html() + "<br><b>Saving Throws: </b>" + "<br>");
            $("#modBody").html($("#modBody").html() + abilityAbv[response.saving_throws[0].name]);
            $.each(response.saving_throws, function (index, savObj) {
                if (index < 1) {
                    return;
                }
                $("#modBody").html($("#modBody").html() + ", " + abilityAbv[savObj.name]);
            });
        });
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
        var searchTitle = title.replace(" ", "+");
        var newUrl = url + "spells/?name=" + searchTitle;
        $.get(newUrl, function (response) { //search for that spell
            if (response.count >= 1) {
                newUrl = response.results[0].url;
                $.get(newUrl, function (response) { //get and print the spell
                    $("#modBody").html("<b>Description: </b>" + response.desc + "<br>");
                    if ("higher_level" in response) {
                        $("#modBody").html($("#modBody").html() + "<b>Higher level: </b>" + response.higher_level + "<br>");
                    }
                    $("#modBody").html($("#modBody").html() + "<b>Page: </b>" + response.page + "<br>");
                    $("#modBody").html($("#modBody").html() + "<b>Range: </b>" + response.range + "<br>");
                    $("#modBody").html($("#modBody").html() + "<b>Components: </b>" + response.components + "<br>");
                    if ("materials" in response) {
                        $("#modBody").html($("#modBody").html() + "<b>Materials: </b>" + response.materials + "<br>");
                    }
                    $("#modBody").html($("#modBody").html() + "<b>Ritual: </b>" + response.ritual + "<br>");
                    $("#modBody").html($("#modBody").html() + "<b>Duration: </b>" + response.duration + "<br>");
                    $("#modBody").html($("#modBody").html() + "<b>Concentration: </b>" + response.concentration + "<br>");
                    $("#modBody").html($("#modBody").html() + "<b>Casting Time: </b>" + response.casting_time + "<br>");
                    $("#modBody").html($("#modBody").html() + "<b>Level: </b>" + response.level + "<br>");
                    $("#modBody").html($("#modBody").html() + "<b>School: </b><b>" + response.school.name + "</b>: ");
                    $.ajax({ //get desc for the school. sync because class will print too soon
                        type: "GET",
                        url: response.school.url,
                        async: false,
                        success: function (schResponse) {
                            $("#modBody").html($("#modBody").html() + schResponse.desc + "<br>");
                        }
                    });
                    $("#modBody").html($("#modBody").html() + "<b>Classes: </b><br>");
                    $.each(response.classes, function (index) {
                        $("#modBody").html($("#modBody").html() + response.classes[index].name + "<br>");
                    });
                    $("#modBody").html($("#modBody").html() + "<b>Subclasses: </b><br>");
                    $.each(response.subclasses, function (index) {
                        $("#modBody").html($("#modBody").html() + response.subclasses[index].name + "<br>");
                    });
                });
            } else {
                $("#modBody").html("Sorry, there is no spell '" + title + "' in the D&D 5e SRD.");
            }
        });
        $("#modTitle").html(title);
        $("#detailModal").modal('toggle');
    }

    function openSpellClassModal() {
        var title = $(this).next().val();
        if (title in spellClassDict) {
            var newUrl = url + "spellcasting/" + spellClassDict[title];
            $("#modBody").html("");
            $.get(newUrl, function (response) {
                $.each(response.info, function (index, value) {
                    $("#modBody").html($("#modBody").html() + "<b>" + value.name + ": </b><br>");
                    $.each(value.desc, function (index, value) {
                        $("#modBody").html($("#modBody").html() + value);
                    });
                    $("#modBody").html($("#modBody").html() + "<br>")
                });
                $("#spellAbility").val(abilityAbv[response.spellcasting_ability.name]);
                spellInfoChange();
            });
        } else {
            $("#modBody").html("Sorry, there is no spellcasting class '" + title + "' in the D&D 5e SRD.");
        }
        $("#modTitle").html(title);
        $("#detailModal").modal('toggle');
    }

    /*SAVE & LOAD JSON FILE*/

    $("#save").click(saveFile);
    $("#load").click(loadFile);

    function saveFile() {
        var charObj = {
            items: [],
            weapons: []
        };
        //all text fields
        $.each($(":input[type='text']"), function (index, element) {
            var currId = $(element).attr("id");
            if (currId !== undefined) {
                var currValue = $(element).val();
                charObj.items.push({
                    id: currId,
                    value: currValue
                });
            }
        });
        //all number fields
        $.each($(":input[type='number']"), function (index, element) {
            var currId = $(element).attr("id");
            var currValue = $(element).val();
            charObj.items.push({
                id: currId,
                value: currValue
            });
        });
        //all checked checkboxes
        $.each($(":checked"), function (index, element) {
            var currId = $(element).attr("id");
            charObj.items.push({
                id: currId,
                value: true
            });
        });
        //portrait and character details
        charObj.items.push({
            id: "portrait",
            value: $("#portrait").attr("src")
        });
        charObj.items.push({
            id: "charDetailsForm",
            value: $("#charDetailsForm").val()
        });
        //fill weapons array
        $.each($("#weapons").children(), function (rowIndex, rowElement) {
            charObj.weapons[rowIndex] = [];
            $.each($(rowElement).children(), function (weapIndex, weapElement) {
                if (weapIndex < 6) {
					charObj.weapons[rowIndex].push({
                    id : $(weapElement).attr('id'),
					value : $(weapElement).children().val()
                    });
                    /*$.extend(charObj.weapons[rowIndex], {
                    id : $(weapElement).attr('id'),
					value : $(weapElement).children().val()
                    });*/
                }
            });
        });
        //create and fill list arrays
        $.each($("ul"), function (listIndex, currList) { //iterate through all lists
            var name = $(currList).attr("id");
            var list = [];
            $.each($(this).children("li"), function (liIndex, currLi) {
                list.push($(currLi).children("input").val());
            });
            $.extend(charObj, {
                [name]: list
            });
        });
        //download JSON file
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(charObj));
        data = "data:" + data;
        var name = $("#charName").val() + ".json";
        $("#save").attr("href", data);
        $("#save").attr("download", name);
    }

    function loadFile() {
        //get and parse file from upload
        var newCharFile = document.getElementById("upload").files[0];
        if (!newCharFile) {
            return;
        } //abort if no file was uploaded
        var newCharObj = "";
        var fileReader = new FileReader();
        fileReader.readAsText(newCharFile, "UTF-8");
        fileReader.onload = function (evt) {
            newCharObj = JSON.parse(evt.target.result);

        }
        //load file into page
        fileReader.onloadend = function () {
            //loading non-list items
            $.each(newCharObj.items, function (index, currObj) {
                $("#" + currObj.id).val(currObj.value);
            });
            //load weapons
			for(var i=1; i<newCharObj.weapons.length; i++){ //add needed # rows
				addWeapon();
			}
            $.each($(".weaponRows"), function (index, currRow){ //fill the rows in
				$.each(newCharObj.weapons[index], function(propIndex, currProp){
					$(currRow).children("#" + currProp.id).children().val(currProp.value);
				});
            });
        }
    }







}); //end document.ready funtion
