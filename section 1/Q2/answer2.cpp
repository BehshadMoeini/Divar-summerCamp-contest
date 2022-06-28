#include <iostream>

using namespace std;
int total = 0;
int n;
int array[100][100];
int maxFolow= 0;
int folow (int x,int y)
{
    if (x < 0 || y < 0 || x==n || y==n)
        return 0 ;
    if (array[x][y] == 1)
    {
        array[x][y] = 0;
        return 1 + folow(x+1, y) + folow( x-1, y) + folow( x, y+1) + folow( x, y-1);
    }
    return 0;
    
}
int main()
{
    cin >> n;
    for (int i=0;i<n;i++)
        for (int j=0;j<n;j++)
            cin >> array[j][i];
    for (int i=0;i<n;i++)
        for (int j=0;j<n;j++)
        {
            int tempfolow = folow(j,i);
            if (maxFolow<tempfolow)
                maxFolow = tempfolow;
        }
    cout << maxFolow;
}