# create data frame from csv data
tab = read.csv("data.csv", header = TRUE)
#create seperate data frames for each password scheme
imageTable <- tab[tab$Scheme == "Image21", ]
textTable <- tab[tab$Scheme == "text21", ]
#create histograms for login attempts, for each password scheme
imageTotalHistogram = hist(imageTable$NumLogins,main="Total Login Attempts Per User: Image21",xlab="# of Attempts", breaks=20)
textTotalHistogram = hist(textTable$NumLogins,main="Total Login Attempts Per User: text21",xlab="# of Attempts", breaks=20)
imageSuccessfulHistogram = hist(imageTable$NumSuccessful,main="Successful Login Attempts Per User: Image21",xlab="# of Attempts", breaks=20)
textSuccessfulHistogram = hist(textTable$NumSuccessful,main="Successful Login Attempts Per User: text21",xlab="# of Attempts", breaks=20)
imageFailedHistogram = hist(imageTable$NumFailed,main="Failed Login Attempts Per User: Image21", xlab="# of Attempts",breaks=20)
textFailedHistogram = hist(textTable$NumFailed,main="Failed Login Attempts Per User: text21", xlab="# of Attempts",breaks=20)
#create histograms for login time for each password scheme
imageSuccessTimeHistogram = hist(imageTable$SuccessTime,main="Average Successful Login Time Per User: Image21",xlab="Time (s)", breaks=20)      
textSuccessTimeHistogram = hist(textTable$SuccessTime,main="Average Successful Login Time Per User: text21",xlab="Time (s)", breaks=20)
imageFailedTimeHistogram = hist(imageTable$FailedTime,main="Average Failed Login Time Per User: Image21",xlab="Time (s)", breaks=20)
textFailedTimeHistogram = hist(textTable$FailedTime, main="Average Failed Login Time Per User: text21",xlab="Time (s)",breaks=20)
#create boxplots for login time, with both password schemes on the same graph.
groupedSuccessBoxplot <- boxplot(tab$SuccessTime ~ tab$Scheme, main="Successful Login Time", names=c("Image21", "Text21"), xlab="Login Scheme", ylab="Time (s)")
groupedFailedBoxplot <- boxplot(tab$FailedTime ~ tab$Scheme, main="Failed Login Time", names=c("Image21", "text21"), xlab="Login Scheme",ylab="Time (s)")


