	/*API INDEX DEFINITIONS*/

	var url = "http://www.dnd5eapi.co/api/";

	var abilityDict = {
	    Strength: 1,
	    Dexterity: 2,
	    Constitution: 3,
	    Intelligence: 4,
	    Wisdom: 5,
	    Charisma: 6
	}

	var abilityAbv = {
	    STR: "Strength",
	    DEX: "Dexterity",
	    CON: "Constitution",
	    INT: "Intelligence",
	    WIS: "Wisdom",
	    CHA: "Charisma"
	}

	var skillsDict = {
	    Acrobatics: 1,
	    "Animal Handling": 2,
	    Arcana: 3,
	    Athletics: 4,
	    Deception: 5,
	    History: 6,
	    Insight: 7,
	    Intimidation: 8,
	    Investigation: 9,
	    Medicine: 10,
	    Nature: 11,
	    Perception: 12,
	    Performance: 13,
	    Persuasion: 14,
	    Religion: 15,
	    "Slight of Hand": 16,
	    Stealth: 17,
	    Survival: 18
	}

	var racesDict = {
	    Dwarf: 1,
	    Elf: 2,
	    Halfling: 3,
	    Human: 4,
	    Dragonborn: 5,
	    Gnome: 6,
	    "Half-Elf": 7,
	    "Half-Orc": 8,
	    Tiefling: 9
	}

	var spellClassDict = {
	    Bard: 1,
	    Cleric: 2,
	    Druid: 3,
	    Paladin: 4,
	    Ranger: 5,
	    Sorcerer: 6,
	    Warlock: 7,
	    Wizard: 8
	}

	var weaponsDict = {
		"Simple weapons": 19,
		"Martial weapons": 20,		
	    Club: 1,
	    Dagger: 2,
	    Greatclub: 3,
	    Handaxe: 4,
	    Javelin: 5,
	    "Light Hammer": 6,
	    Mace: 7,
	    Quarterstaff: 8,
	    Sickle: 9,
	    Spear: 10,
	    "Light Crossbow": 11,
	    Dart: 12,
	    Shortbow: 13,
	    Sling: 14,
	    Battleaxe: 15,
	    Flail: 16,
	    Glaive: 17,
	    Greataxe: 18,
	    Greatsword: 19,
	    Halberd: 20,
	    Lance: 21,
	    Longsword: 22,
	    Maul: 23,
	    Morningstar: 24,
	    Pike: 25,
	    Rapier: 26,
	    Scimitar: 27,
	    Shortsword: 28,
	    Trident: 29,
	    "War Pick": 30,
	    Warhammer: 31,
	    Whip: 32,
	    Blowgun: 33,
	    "Hand Crossbow": 34,
	    "Heavy Crossbow": 35,
	    Longbow: 36,
	    Net: 37
	}
	
	var armorsDict = {
		"Light armor": 1,
		"Medium armor": 2,
		"Heavy armor": 3,
		"All armor": 4,
		Shields: 18,
		Padded: 38,
		Leather: 39,
		"Studded Leather": 40,
		Hide: 41,
		"Chain Shirt": 42,
		"Scale Mail": 43,
		Breastplate: 44,
		"Half Plate": 45,
		"Ring Mail": 46,
		"Chain Mail": 47,
		Splint: 48,
		Plate: 49,
		Shield: 50
	}