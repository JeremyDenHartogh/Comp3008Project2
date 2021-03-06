import pygame
import random
import pygame.freetype
import pygame_textinput
import string, sys, getopt, json
import datetime

#########################
# updateTime -> Updated the time variable to the current time (used for logging)
# verbosePrint -> Used for printing messages in debugging
# comparePassword -> Checks if the users inputted password matches the assigned password
# passToString -> Converts numeric password to string, used to print password
# calculatePasswordFromColours -> perform the computation of the RGB password from the 3 colours and 2 characters
# calculateColourAndText -> perform RGB shift with characters
# calculateColourAndRGB -> calculate the final colour using base colour and RGB shifts, used to obtain the final colour
# getLuminosity -> gets the luminosity of the background colours, to determine if dark or light text should be overlayed
# createColours -> Used to create the colour boxes that appear on the screen, and makes them clickable
# submit -> creates the submit button on the screen, and makes it clickable. 
# reset -> Creates and makes clickable the reset button on the screen
# enterPasswordScreen -> The base controller function, all actions run through this function
#########################
pygame.init()

colours = ["WHITE", "YELLOW", "TURQUOISE", "PINK", "ORANGE", "GREEN", "GREY", "BLUE", "RED", 
		   "EVERGREEN", "PURPLE", "BURGUNDY", "NAVY", "BLACK"]
cd = {"WHITE":(255,255,255), "YELLOW":(254,254,8), "TURQUOISE":(64,224,208), "PINK":(253,105,180),
      "ORANGE":(252,140,7), "GREEN":(6,251,6), "GREY":(129,129,129), "BLUE":(60,130,250),
	  "RED":(249,5,5), "EVERGREEN":(4,80,30), "PURPLE":(100,3,150), "BURGUNDY":(128,2,32),
	  "NAVY":(1,1,127), "BLACK":(0,0,0)}

size = (700,600)
screen = pygame.display.set_mode(size)
done = False
clock = pygame.time.Clock()
font = pygame.freetype.SysFont('Calibri', 15, True, False)
fontL = pygame.freetype.SysFont('Calibri', 30, True, False)
clicked = 0
clicking = False
pressedColours = [128,128,128]
submit = False
rChange = 0
gChange = 0
bChange = 0
# max number of retries if entering password
retries = 3
learnOrEnterPass = "enter"
userID = ""
accType = ""
# store password for current user's account
password = []
pwColour = []
pwStr = ""
# for telling user if they entered correct password when learning
timer = 0
result = ""

verbose = False

def updateTime():
	return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def verbosePrint(msg):
	if (verbose):
		print(msg)

# verify password entered with actual password
def comparePassword(colour, s):
	if (pwColour == colour):
		if (pwStr == s):
			return True
	return False
	
def passToString(password):
	return (f"({password[0]}-{password[1]}-{password[2]})")

# perform the computation of the RGB password from the 3 colours and 2 characters
def calculatePasswordFromColours(colourArray, charArray):
	colour = [128, 128, 128]
	for i in range(3):
		colour[i] = colourArray[i][i]
	return calculateColourAndText(colour, charArray)

# perform RGB shift with characters
def calculateColourAndText(colour, charArray):
	verbosePrint("calculateColourAndText")
	verbosePrint(colour)
	if (charArray[0] in string.ascii_lowercase and charArray[1] in string.ascii_lowercase):
		r = 122-ord(charArray[0])
		b = 122-ord(charArray[1])
		g = 122-((ord(charArray[0])+ord(charArray[1])) // 2)
		return calculateColourAndRGB(colour, r, g, b)
	return False

# calculate the final colour using base colour and RGB shifts
def calculateColourAndRGB(colour, r, g, b):
	return ((colour[0]+(r*10)) % 255,(colour[1]+(g*10)) % 255,(colour[2]+(b*10)) % 255)

# GET LUMINOSITY OF THE COLOUR TO ASSIGN TEXT COLOUR
def getLuminosity(colour):
	#print (round(0.299*colour[0] + 0.587*colour[1] + 0.114*colour[2]))
	return (round(0.299*colour[0] + 0.587*colour[1] + 0.114*colour[2]))

# CREATE THE COLOUR BOXES	
def createColours(clicked, clicking, font, pressedColours):
	count = 0
	mouse = pygame.mouse.get_pos()
	click = pygame.mouse.get_pressed()
	if click[0] == 0:
		clicking = False
	for key in colours:
		if count < 7:
			x = 25+(95*count)
			y = 130
		if count >= 7:
			x = 25+(95*(count-7))
			y = 210
		if clicked < 3:
			pygame.draw.rect(screen, cd[key], [x, y, 80, 50],0)
		else:
			pygame.draw.rect(screen, cd["GREY"], [x, y, 80, 50],0)
		if (mouse[0] > x and mouse[0] < x + 80 and mouse[1] > y and mouse[1] < y+50) and clicked < 3:
			pygame.draw.rect(screen, cd["WHITE"], [x, y, 80, 50],2)
			if click[0] == 1 and clicking == False:
				clicking = True
				print ("CLICKED: " + key)
				pressedColours[clicked] = cd[key][clicked]
				print (cd[key])
				clicked += 1
		else:
			pygame.draw.rect(screen, cd["BLACK"], [x, y, 80, 50],2)
		if getLuminosity(cd[key]) >= 128:
			textSurf,textRect = font.render(key,cd["BLACK"])
		else:
			textSurf,textRect = font.render(key,cd["WHITE"])
		textRect.center = ((x+(80/2)),(y+(50/2)))
		screen.blit(textSurf, textRect)
		count+=1
	return clicked, clicking, pressedColours
	
	
# creates submit button
def submit(clicking, combinedColors, clicked, textLength):
	if clicked >= 3 and textLength == True:
		pygame.draw.rect(screen, cd["RED"], [290, 520, 120, 60],0)
	else:
		pygame.draw.rect(screen, cd["GREY"], [290, 520, 120, 60],0)
	textSurf,textRect = fontL.render("SUBMIT" , cd["WHITE"])
	textRect.center = ((290+(120/2)),(520+(60/2)))
	screen.blit(textSurf, textRect)
	mouse = pygame.mouse.get_pos()
	click = pygame.mouse.get_pressed()
	if (mouse[0] > 290 and mouse[0] < 410 and mouse[1] > 520 and mouse[1] < 580) and clicked >= 3 and textLength == True:
		pygame.draw.rect(screen, cd["WHITE"], [290, 520, 120, 60],2)
		if (click[0] == 1 and clicking == False):
			print ("CLICKED SUBMIT")
			return combinedColors, True
		else:
			return [], clicking
	else:
		pygame.draw.rect(screen, cd["BLACK"], [290, 520, 120, 60],2)
		return [], clicking

# creates reset button
def reset(clicking, clicked, textLength):
	# greyed out if a whole password was entered
	if clicked >= 3 and textLength == 2:
		pygame.draw.rect(screen, cd["GREY"], [600, 530, 80, 50],0)
	else:
		pygame.draw.rect(screen, cd["RED"], [600, 530, 80, 50],0)
	
	textSurf,textRect = font.render("RESET" , cd["WHITE"])
	textRect.center = ((600+(80/2)),(530+(50/2)))
	screen.blit(textSurf, textRect)
	mouse = pygame.mouse.get_pos()
	click = pygame.mouse.get_pressed()
	# if within bounds
	if (mouse[0] > 600 and mouse[0] < 680 and mouse[1] > 530 and mouse[1] < 580):
		pygame.draw.rect(screen, cd["WHITE"], [600, 530, 80, 50],2)
		# if clicked and partial password entered
		if (click[0] == 1 and clicking == False):
			if ((clicked != 0 or textLength != 0) and not (clicked >= 3 and textLength == 2)):
				print ("CLICKED RESET")
				return True
	else:
		pygame.draw.rect(screen, cd["BLACK"], [600, 530, 80, 50],2)
	return False


# Screen to attempt a password input
def enterPasswordScreen(clicked, clicking, pressedColours, rChange, gChange, bChange):
	screen.fill((200,200,200))
	# Creates colour boxes
	clicked, clicking, pressedColours = createColours(clicked, clicking, font, pressedColours)
	
	# Labels
	label1 = ("Enter your " + accType + " password")
	label2 = ("Your password is a combination of three colours, and 2 letters!")
	textSurf,textRect = fontL.render(label1, cd["BLACK"])
	textRect.center = ((250+(200/2)),(15+(60/2)))
	screen.blit(textSurf, textRect)
	textSurf,textRect = font.render(label2, cd["BLACK"])
	textRect.center = ((250+(200/2)),(50+(60/2)))
	screen.blit(textSurf, textRect)

	# say the password if learning
	if learnOrEnterPass == "learn":
		label3 = "Your password is:"
		textSurf,textRect = font.render(label3, cd["BLACK"])
		textRect.center = ((30+(100/2)),(320+(30/2)))
		screen.blit(textSurf,textRect)
		for i, s in enumerate(password):
			textSurf,textRect = font.render(s, cd["BLACK"])
			textRect.center = ((30+(100/2)),(350+(30*i)+(30/2)))
			screen.blit(textSurf,textRect)
	
	# adds colours created by 3 colour pass and 2 letter text
	combinedColors = calculateColourAndRGB(pressedColours, rChange, gChange, bChange)

	# displays users password colour
	pygame.draw.rect(screen, combinedColors, [150, 400, 400, 100],0)
	pygame.draw.rect(screen, cd["BLACK"], [150, 400, 400, 100],2)
	textColour = cd["WHITE"]
	if (getLuminosity(combinedColors) >= 128):
		textColour = cd["BLACK"]
	textSurf,textRect = fontL.render(str(combinedColors) , textColour)
	textRect.center = ((200+(300/2)),(400+(100/2)))
	screen.blit(textSurf, textRect)
	
	# create inputted text box
	textinput.update(events)
	pygame.draw.rect(screen, cd["WHITE"], [250, 320, 200, 60],0)

	# change colour box if 2 lower case letters inputted
	if (len(textinput.get_text()) == 2):
		myText = textinput.get_text()
		if (myText[0] in string.ascii_lowercase and myText[1] in string.ascii_lowercase):
			rChange = 122-ord(myText[0])
			bChange = 122-ord(myText[1])
			gChange = 122-((ord(myText[0])+ord(myText[1])) // 2)
			
	# display text input box and label
	textSurf,textRect = fontL.render("ENTER 2 LETTER PASSWORD", cd["BLACK"])
	textRect.center = ((250+(200/2)),(270+(60/2)))
	screen.blit(textSurf, textRect)
	pygame.draw.rect(screen, cd["BLACK"], [250, 320, 200, 60],2)
	textRect.center = ((250+(200/2)),(320+(60/2)))
	# display text input
	screen.blit(textinput.get_surface(), (330,336))
	
	# submit button
	submittedColour = []
	submittedColour,clicking = submit(clicking, combinedColors, clicked, len(textinput.get_text()) == 2)
	if (submittedColour != []):
		print(comparePassword(pressedColours, textinput.get_text()))

	# reset button
	if (reset(clicking, clicked, len(textinput.get_text()))):
		# reset all of the choices made so far
		pressedColours = [128,128,128]
		clicked = 0
		rChange = 0
		gChange = 0
		bChange = 0
		textinput.clear_text()
		textinput.update(events)

	# update variable values
	return clicked, clicking, pressedColours, rChange, gChange, bChange, submittedColour
	
# get command line args if run as main program
# https://www.tutorialspoint.com/python/python_command_line_arguments.htm
if __name__ == "__main__":
	if len(sys.argv) < 4:
		print("SamplePassScheme.py <learn/enter> <user-id> <Email/Banking/Shopping>")
		sys.exit(1)
	
	learnOrEnterPass = sys.argv[1]
	userID = sys.argv[2]
	accType = sys.argv[3]

	# check if user id/account type is in password file
	f = open("passwords.txt", "r")
	for line in f:
		# parse the line into a password and add to passwords
		if userID == line[3]: # only using one digit user ids
			accStr = line.split("; ")[1].split(":")[1]
			if accType == accStr:
				passwordStr = line.split("; ", 2)[2]
				password = passwordStr[5:]
				verbosePrint(password)
				password = eval(password)
				pwStr = password[3]
				pwColour.append(cd[password[0]][0])
				pwColour.append(cd[password[1]][1])
				pwColour.append(cd[password[2]][2])

	try:
		opts, args = getopt.getopt(sys.argv[4:],"v")
	except getopt.GetoptError:
		print("SamplePassScheme.py <learn/enter> <user-id> <Email/Banking/Shopping> [-v]")
		sys.exit(2)
	for opt, arg in opts:
		if opt == '-v':
			verbose = True

textinput = pygame_textinput.TextInput()
stringPass = passToString(calculateColourAndText(pwColour,pwStr))
with open('PassAttempts.csv', 'a+') as f:
	f.write(f"{updateTime()},{userID},{accType},{learnOrEnterPass},start,{stringPass},None\n")
	while not done:
		events = pygame.event.get()
		for event in events:
			if event.type == pygame.QUIT:
				done = True
		clicked, clicking, pressedColours, rChange, gChange, bChange, submitted = enterPasswordScreen(clicked, clicking, pressedColours, rChange, gChange, bChange)

		# correct or wrong stays on screen for a few seconds
		if timer > 0:
			if result != "":
				textSurf,textRect = fontL.render(result, cd["BLACK"])
				textRect.center = ((30+(100/2)),(500+(50/2)))
				screen.blit(textSurf,textRect)
			timer -= 1
			if timer == 0:
				result = ""

		if submitted != []:
			submitPass = passToString(calculateColourAndText(pressedColours,textinput.get_text()))
			f.write(f"{updateTime()},{userID},{accType},{learnOrEnterPass},submit,{stringPass},{submitPass}\n")
			correct = comparePassword(pressedColours, textinput.get_text())
			if learnOrEnterPass == "enter":
				if correct:
					f.write(f"{updateTime()},{userID},{accType},{learnOrEnterPass},success,{stringPass},{submitPass}\n")
					break
				else:
					f.write(f"{updateTime()},{userID},{accType},{learnOrEnterPass},failure,{stringPass},{submitPass}\n")
					retries -= 1
					if retries <= 0:
						f.write(f"{updateTime()},{userID},{accType},{learnOrEnterPass},locked,{stringPass},{submitPass}\n")
						print("Too many failed logins")
						break
			else: # learning
				timer = 180
				if correct:
					f.write(f"{updateTime()},{userID},{accType},{learnOrEnterPass},success,{stringPass},{submitPass}\n")
					print("correct")
					result = "Correct!"
				else:
					f.write(f"{updateTime()},{userID},{accType},{learnOrEnterPass},failure,{stringPass},{submitPass}\n")
					print("wrong")
					result = "Wrong!"
			
			# reset the password entry
			pressedColours = [128,128,128]
			clicked = 0
			rChange = 0
			gChange = 0
			bChange = 0
			textinput.clear_text()
			textinput.update(events)

		# --- Go ahead and update the screen with what we've drawn.
		pygame.display.flip()
		# --- Limit to 60 frames per second
		clock.tick(60)

