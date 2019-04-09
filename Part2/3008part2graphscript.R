# create data frame from csv data
tab = read.csv("data.csv", header = TRUE)
tab2 = read.csv("parsed_Data.csv", header = TRUE)
#create seperate data frames for each password scheme
colorTable <- tab2
textTable <- tab[tab$Scheme == "text21", ]
#create histograms for login attempts, for each password scheme
colorTotalHistogram = hist(colorTable$NumLogins,main="Total Login Attempts Per User: Color+Text",xlab="# of Attempts",breaks=30, col="purple")
textTotalHistogram = hist(textTable$NumLogins,main="Total Login Attempts: text21",xlab="# of Attempts", breaks=20, col="purple")
colorSuccessfulHistogram = hist(colorTable$NumSuccessful,main="Successful Login Attempts: Color+Text",xlab="# of Attempts",ylim=c(0, 10),breaks=20, col="light blue")
textSuccessfulHistogram = hist(textTable$NumSuccessful,main="Successful Login Attempts: text21",xlab="# of Attempts", breaks=20, col="light blue")
colorFailedHistogram = hist(colorTable$NumFailed,main="Failed Login Attempts: Color+Text", xlab="# of Attempts", ylim=c(0, 8),breaks=20, col="red")
textFailedHistogram = hist(textTable$NumFailed,main="Failed Login Attempts: text21", xlab="# of Attempts",breaks=20, col="red")
#create histograms for login time for each password scheme
colorSuccessTimeHistogram = hist(colorTable$SuccessTime,main="Frequency of Average Successful Login Time: Color+Text",xlab="Time (s)",ylim=c(0, 4),breaks=20, col="light blue")      
textSuccessTimeHistogram = hist(textTable$SuccessTime,main="Frequency of Average Successful Login Time: text21",xlab="Time (s)", breaks=10, col="light blue")
colorFailedTimeHistogram = hist(colorTable$FailedTime,main="Frequency of Average Failed Login Time: Color+Text",xlab="Time (s)",ylim=c(0, 8),breaks=20, col="red")
textFailedTimeHistogram = hist(textTable$FailedTime, main="Frequency of Average Failed Login Time: text21",xlab="Time (s)",breaks=20, col="red")
#create boxplots for login time, with both password schemes on the same graph.
colorSuccessBoxplot <- boxplot(colorTable$SuccessTime, main="Successful Login Time: Color+Text", names=c("Color+Text"), xlab="Color+Text", ylab="Time (s)",ylim=c(0, 16), col="light blue")
textSuccessBoxplot <- boxplot(textTable$SuccessTime, main="Successful Login Time: text21", names=c("text21"), xlab="text21", ylab="Time (s)", col="light blue")
colorFailedBoxplot <- boxplot(colorTable$FailedTime, main="Failed Login Time: Color+Text", names=c("Color+Text"), xlab="Color+Text",ylab="Time (s)", ylim = c(0, 20), col="red")
textFailedBoxplot <- boxplot(textTable$FailedTime, main="Failed Login Time: text21", names=c("text21"), xlab="text21",ylab="Time (s)", col="red")
