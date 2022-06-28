string = input()

coded = ''
if len(string) == 0:
    print('')
else:
    count = 1
    prev = string[0]
    for i in range(1, len(string)):
        current = string[i]
        if current == prev:
            count += 1
        else:
            coded += str(count)
            coded += prev
            count = 1
            prev = current

coded += str(count)
coded += prev

print(coded)