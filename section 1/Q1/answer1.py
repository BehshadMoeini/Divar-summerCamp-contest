b = int(input())
a = []
for i in range(0,b):
    a.extend(input().split())


result = 0
h = 0
k = b-1

for i in range(0,b):
    
    if int(a[h])%3 == 1:
        result = result+int(a[h])
    if int(a[k])%3 == 1:
        result = result+int(a[k])
    h = h+b+1
    k = k + b-1

print(result)