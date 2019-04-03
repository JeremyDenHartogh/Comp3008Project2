tab = read.csv("results.csv", header = TRUE)

print(tab[1])
print(tab)
q1 = summary(object = tab[1])
print(q1)


print(summary(tab$Colour.text.passwords.are.easy.to.remember.))
print(summary(tab$Text.passwords.are.easy.to.remember.))
res <- t.test(tab$Colour.text.passwords.are.easy.to.remember., 
              tab$Text.passwords.are.easy.to.remember., 
              paired = TRUE)
print(res)

res2 <- t.test(tab$I.feel.that.text.passwords.are.secure.,
               tab$I.feel.that.colour.text.passwords.are.secure.,
               paired = TRUE)
print(res2)