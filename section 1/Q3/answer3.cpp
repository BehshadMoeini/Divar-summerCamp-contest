#include <iostream>

using namespace std;
bool isDigit(char n)
{
    if ( n<='9' && n>='0')
        return true;
    return false;
}
bool isPrime(int n)
{

    if (n <= 1)
        return false;

    for (int i = 2; i < n; i++)
        if (n % i == 0)
            return false;
 
    return true;
}

int main()
{
    string inp;
    cin >> inp;
    for (int i=0;i<inp.size()-1;i++)
    {
        if ( isDigit(inp[i]) && isDigit(inp[i+1])  && inp[i]!='0')
        {
            int num = (inp[i] + -'0') *10 + (inp[i+1] + -'0');
            if (isPrime(num))
                cout << num << endl;
        }
    }
}