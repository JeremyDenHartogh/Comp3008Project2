import pygame
import random
import pygame.freetype
import pygame_textinput

pygame.init()

# colours = ["BLUE","RED","GREEN","ORANGE","YELLOW","PURPLE","PINK","WHITE","BURGUNDY","TURQUOISE","NAVY",
#					 "BLACK","GREY","EVERGREEN"]
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


## TODO ##
# def createPassword1():
#	x = random.randint(0,13)
#	print (x)

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
	for key in cd:
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

# Screen to attempt a password input
def enterPasswordScreen(name, password, clicked, clicking, pressedColours, rChange, gChange, bChange):
	screen.fill((200,200,200))
	# Creates colour boxes
	clicked, clicking, pressedColours = createColours(clicked, clicking, font, pressedColours)
	
	# Labels
	label1 = (f"Enter your {name} password")
	label2 = ("Your password is a combination of three colours, and 2 letters!")
	textSurf,textRect = fontL.render(label1, cd["BLACK"])
	textRect.center = ((250+(200/2)),(15+(60/2)))
	screen.blit(textSurf, textRect)
	textSurf,textRect = font.render(label2, cd["BLACK"])
	textRect.center = ((250+(200/2)),(50+(60/2)))
	screen.blit(textSurf, textRect)
	
	# adds colours created by 3 colour pass and 2 letter text
	combinedColors = ((pressedColours[0]+(rChange*10)) % 255,(pressedColours[1]+(gChange*10)) % 255,(pressedColours[2]+(bChange*10)) % 255)
	
	# displays users password colour
	pygame.draw.rect(screen, combinedColors, [150, 300, 400, 100],0)
	pygame.draw.rect(screen, cd["BLACK"], [150, 300, 400, 100],2)
	textColour = cd["WHITE"]
	if (getLuminosity(combinedColors) >= 128):
		textColour = cd["BLACK"]
	textSurf,textRect = fontL.render(str(combinedColors) , textColour)
	textRect.center = ((150+(400/2)),(300+(100/2)))
	screen.blit(textSurf, textRect)
	
	# create inputted text box
	textinput.update(events)
	pygame.draw.rect(screen, cd["WHITE"], [250, 320, 200, 60],0)

	# change colour box if 2 lower case letters inputted
	if (len(textinput.get_text()) == 2):
		myText = textinput.get_text()
		if (myText[0] >= 'a' and myText[0] <= 'z' and myText[1]>= 'a' and myText[1] <= 'z'):
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
	
	# update variable values
	return clicked, clicking, pressedColours, rChange, gChange, bChange, submittedColour
	
textinput = pygame_textinput.TextInput()
learnOrEnterPass = "ENTER"
while not done:
	events = pygame.event.get()
	for event in events:
		if event.type == pygame.QUIT:
			done = True
	if learnOrEnterPass == "ENTER":
		clicked, clicking, pressedColours, rChange, gChange, bChange, submitted = enterPasswordScreen("Bank","PASSWORD", clicked, clicking, pressedColours, rChange, gChange, bChange)
		if submitted != []:
			print(submitted)
			break;

	# --- Go ahead and update the screen with what we've drawn.
	pygame.display.flip()
	# --- Limit to 60 frames per second
	clock.tick(60)

	
	
# TO DO LIST
# CREATE GET NEW PASSWORD SCREEN
# CREATE HOME SCREEN