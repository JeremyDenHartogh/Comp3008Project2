tab = read.csv("results.csv", header = TRUE)

# two tailed, wilcox test on memorability
res1 <- wilcox.test(tab$Colour.text.passwords.are.easy.to.remember., 
                    tab$Text.passwords.are.easy.to.remember., 
                    paired = TRUE)
print(res1)

# two tailed, paired t-test on security
res2 <- wilcox.test(tab$I.feel.that.text.passwords.are.secure.,
                    tab$I.feel.that.colour.text.passwords.are.secure.,
                    paired = TRUE)
print(res2)

# two tailed t-test comparing preference of scheme or neutrality
res3 <- wilcox.test(tab$I.prefer.text.only.passwords.to.colour.text.passwords.,
                    mu = 3)
print(res3)


tab$How.much.do.you.like.the.colours. = factor(tab$How.much.do.you.like.the.colours.,
                                               levels = c("1","2","3","4","5"),
                                               ordered =TRUE)
tab$What.is.your.opinion.on.the.mix.of.colours.and.text.Â. = factor(tab$What.is.your.opinion.on.the.mix.of.colours.and.text.Â.,
                                                                    levels = c("1","2","3","4","5"),
                                                                    ordered = TRUE)
tab$What.is.your.opinion.of.using.text.only.passwords. = factor(tab$What.is.your.opinion.of.using.text.only.passwords.,
                                                                levels = c("1","2","3","4","5"),
                                                                ordered = TRUE)
tab$Colour.text.passwords.are.easy.to.remember. = factor(tab$Colour.text.passwords.are.easy.to.remember.,
                                                         levels = c("1","2","3","4","5"),
                                                         ordered = TRUE)
tab$Text.passwords.are.easy.to.remember. = factor(tab$Text.passwords.are.easy.to.remember.,
                                                  levels = c("1","2","3","4","5"),
                                                  ordered = TRUE)
tab$The.colour.text.password.was.difficult.to.input. = factor(tab$The.colour.text.password.was.difficult.to.input.,
                                                              levels = c("1","2","3","4","5"),
                                                              ordered = TRUE)
tab$Longer.colour.text.passwords.would.be.just.as.easy.to.use. = factor(tab$Longer.colour.text.passwords.would.be.just.as.easy.to.use.,
                                                                        levels = c("1","2","3","4","5"),,
                                                                        ordered = TRUE)
tab$It.is.clear.how.to.use.colour.text.passwords. = factor(tab$It.is.clear.how.to.use.colour.text.passwords.,
                                                           levels = c("1","2","3","4","5"),
                                                           ordered = TRUE)
#tab$I.use.a.Password.manager. = factor(tab$I.use.a.Password.manager.,
#                                       levels = c("Yes","No"),
#                                       ordered = TRUE)
tab$It.is.easy.to.learn.how.to.use.the.colour.text.password. = factor(tab$It.is.easy.to.learn.how.to.use.the.colour.text.password.,
                                                                      levels = c("1","2","3","4","5"),
                                                                      ordered = TRUE)
tab$I.feel.that.text.passwords.are.secure. = factor(tab$I.feel.that.text.passwords.are.secure.,
                                                    levels = c("1","2","3","4","5"),
                                                    ordered = TRUE)
tab$I.feel.that.colour.text.passwords.are.secure. = factor(tab$I.feel.that.colour.text.passwords.are.secure.,
                                                           levels = c("1","2","3","4","5"),
                                                           ordered = TRUE)
tab$I.prefer.text.only.passwords.to.colour.text.passwords. = factor(tab$I.prefer.text.only.passwords.to.colour.text.passwords.,
                                                                    levels = c("1","2","3","4","5"),
                                                                    ordered = TRUE)

print(tab)
results = likert(tab)
print(results)
plot(results, type = "bar")
