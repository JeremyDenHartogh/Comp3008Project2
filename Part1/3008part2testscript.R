# create data frame from csv data
tab = read.csv("data.csv", header = TRUE)
#create seperate data frames for each password scheme
imageTable <- tab[tab$Scheme == "Image21", ]
textTable <- tab[tab$Scheme == "text21", ]
#create histograms for login attempts, for each password scheme
imageTotalHistogram = hist(imageTable$NumLogins,main="Total Login Attempts Per User: Image21",xlab="# of Attempts", ylim=c(0,6),breaks=30, col="purple")
textTotalHistogram = hist(textTable$NumLogins,main="Total Login Attempts: text21",xlab="# of Attempts", breaks=20, col="purple")
imageSuccessfulHistogram = hist(imageTable$NumSuccessful,main="Successful Login Attempts: Image21",xlab="# of Attempts", ylim=c(0,10),breaks=20, col="light blue")
textSuccessfulHistogram = hist(textTable$NumSuccessful,main="Successful Login Attempts: text21",xlab="# of Attempts", breaks=20, col="light blue")
imageFailedHistogram = hist(imageTable$NumFailed,main="Failed Login Attempts: Image21", xlab="# of Attempts",ylim=c(0, 8),breaks=20, col="red")
textFailedHistogram = hist(textTable$NumFailed,main="Failed Login Attempts: text21", xlab="# of Attempts",breaks=20, col="red")
#create histograms for login time for each password scheme
imageSuccessTimeHistogram = hist(imageTable$SuccessTime,main="Frequency of Average Successful Login Time: Image21",xlab="Time (s)", ylim=c(0, 4),breaks=20, col="light blue")      
textSuccessTimeHistogram = hist(textTable$SuccessTime,main="Frequency of Average Successful Login Time: text21",xlab="Time (s)", breaks=20, col="light blue")
imageFailedTimeHistogram = hist(imageTable$FailedTime,main="Frequency of Average Failed Login Time: Image21",xlab="Time (s)", ylim=c(0, 8),breaks=20, col="red")
textFailedTimeHistogram = hist(textTable$FailedTime, main="Frequency of Average Failed Login Time: text21",xlab="Time (s)",breaks=20, col="red")
#create boxplots for login time, with both password schemes on the same graph.
groupedSuccessBoxplot <- boxplot(tab$SuccessTime ~ tab$Scheme, main="Successful Login Time", names=c("Image21", "Text21"), xlab="Login Scheme", ylab="Time (s)", col="light blue")
groupedFailedBoxplot <- boxplot(tab$FailedTime ~ tab$Scheme, main="Failed Login Time", names=c("Image21", "text21"), xlab="Login Scheme",ylab="Time (s)", col="red")
