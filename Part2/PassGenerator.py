import random

####################
# generatePassword -> Generates a new random password
# createUser -> Creates a new user, with three new passwords, one for email, one for banking and one for shopping
####################


colours = ["WHITE", "YELLOW", "TURQUOISE", "PINK", "ORANGE", "GREEN", "GREY", "BLUE", "RED", 
		   "EVERGREEN", "PURPLE", "BURGUNDY", "NAVY", "BLACK"]

def generatePassword():
	myPassList = []
	for i in range (3):
		rand = random.randint(0,13)
		myPassList.append(colours[rand])
	letterCombo = ""
	for i in range (2):
		rand = random.randint(0,25)
		letterCombo += chr(rand+97)
	myPassList.append(letterCombo)
	return myPassList
	
def createUser():
	id = 0
	with open('passwords.txt', 'r') as f:
		lines = f.read().splitlines()
		if lines != []:
			id = int(lines[-1].split(";")[0].split(":")[1]) + 1
			print (id)
	with open('passwords.txt', 'a+') as f:
			f.write(f"id:{id}; type:Email; pass:{str(generatePassword())}\n")
			f.write(f"id:{id}; type:Banking; pass:{str(generatePassword())}\n")
			f.write(f"id:{id}; type:Shopping; pass:{str(generatePassword())}\n")


createUser()
