mat = [[1,2,3,4],
       [12,13,14,5],
       [11,16,15,6],
       [10,9,8,7]]
ls = []
n = len(mat)
for m in range(0,int(n**0.5)):
    ls.append([])
    for i in range(m,n-m):
        ls[m].append(mat[m][i])
    for i in range(m+1,n-m-1):
        ls[m].append(mat[i][n-m-1])
    for i in range(n-m-1, m-1, -1):
        ls[m].append(mat[n-m-1][i])
    for i in range(n-2-m,m,-1):
        ls[m].append(mat[i][0])

print(ls)