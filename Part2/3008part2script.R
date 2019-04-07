library(likert)
tab = read.csv("results_likert_only.csv", header = TRUE)

# paired wilcox test on memorability
res1 <- wilcox.test(tab$Colour.text.passwords.are.easy.to.remember., 
                    tab$Text.passwords.are.easy.to.remember., 
                    paired = TRUE)
print(res1)

# paired wilcox test on security
res2 <- wilcox.test(tab$I.feel.that.text.passwords.are.secure.,
                    tab$I.feel.that.colour.text.passwords.are.secure.,
                    paired = TRUE)
print(res2)

# convert to factors for graphing
lik1 = read.csv("results_like_dislike.csv", header = TRUE)
lik1$How.much.do.you.like.the.colours. = factor(lik1$How.much.do.you.like.the.colours.,
                                               levels = c("1","2","3","4","5"),
                                               ordered =TRUE)
lik1$What.is.your.opinion.on.the.mix.of.colours.and.text.Â. = factor(lik1$What.is.your.opinion.on.the.mix.of.colours.and.text.Â.,
                                                                     levels = c("1","2","3","4","5"),
                                                                     ordered = TRUE)
lik1$What.is.your.opinion.of.using.text.only.passwords. = factor(lik1$What.is.your.opinion.of.using.text.only.passwords.,
                                                                 levels = c("1","2","3","4","5"),
                                                                 ordered = TRUE)

lik2 = read.csv("results_agree_disagree.csv", header = TRUE)
lik2$The.colour.text.password.was.difficult.to.input. = factor(lik2$The.colour.text.password.was.difficult.to.input.,
                                                               levels = c("1","2","3","4","5"),
                                                               ordered = TRUE)
lik2$Longer.colour.text.passwords.would.be.just.as.easy.to.use. = factor(lik2$Longer.colour.text.passwords.would.be.just.as.easy.to.use.,
                                                                         levels = c("1","2","3","4","5"),
                                                                         ordered = TRUE)
lik2$It.is.clear.how.to.use.colour.text.passwords. = factor(lik2$It.is.clear.how.to.use.colour.text.passwords.,
                                                            levels = c("1","2","3","4","5"),
                                                            ordered = TRUE)
lik2$It.is.easy.to.learn.how.to.use.the.colour.text.password. = factor(lik2$It.is.easy.to.learn.how.to.use.the.colour.text.password.,
                                                                       levels = c("1","2","3","4","5"),
                                                                       ordered = TRUE)
lik2$I.prefer.text.only.passwords.to.colour.text.passwords. = factor(lik2$I.prefer.text.only.passwords.to.colour.text.passwords.,
                                                                     levels = c("1","2","3","4","5"),
                                                                     ordered = TRUE)

lik3 = read.csv("results_comparison.csv", header = TRUE)
lik3$Colour.text.passwords.are.easy.to.remember. = factor(lik3$Colour.text.passwords.are.easy.to.remember.,
                                                          levels = c("1","2","3","4","5"),
                                                          ordered = TRUE)
lik3$Text.passwords.are.easy.to.remember. = factor(lik3$Text.passwords.are.easy.to.remember.,
                                                   levels = c("1","2","3","4","5"),
                                                   ordered = TRUE)
lik3$I.feel.that.text.passwords.are.secure. = factor(lik3$I.feel.that.text.passwords.are.secure.,
                                                     levels = c("1","2","3","4","5"),
                                                     ordered = TRUE)
lik3$I.feel.that.colour.text.passwords.are.secure. = factor(lik3$I.feel.that.colour.text.passwords.are.secure.,
                                                            levels = c("1","2","3","4","5"),
                                                            ordered = TRUE)


results1 = likert(lik1)
#print(results1)
plot(results1, type = "bar")


results2 = likert(lik2)
#print(results2)
plot(results2, type = "bar")

results3 = likert(lik3)
#print(results3)
plot(results3, type = "bar")