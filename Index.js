function matrixChainMultiplication(p) {
  // n is the number of matrices
  let n = p.length - 1;
  // m is the 2D array that stores the minimum number of multiplications needed
  let m = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
  // s is the 2D array that stores the optimal split point
  let s = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
  // l is the chain length
  for (let l = 2; l <= n; l++) {
    for (let i = 1; i <= n - l + 1; i++) {
      let j = i + l - 1;
      m[i][j] = Number.MAX_SAFE_INTEGER;
      for (let k = i; k < j; k++) {
        // q is the number of multiplications needed for the current split point
        let q = m[i][k] + m[k + 1][j] + (p[i - 1] * p[k] * p[j]);
        if (q < m[i][j]) {
          m[i][j] = q;
          s[i][j] = k;
        }
      }
    }
  }
  return { m, s };
}

function printOptimalParens(s, i, j) {
  // Base case: if i and j are the same, print the matrix
  if (i === j) {
    process.stdout.write(`A${i}`);
  } else {
    process.stdout.write("(");
    printOptimalParens(s, i, s[i][j]);
    printOptimalParens(s, s[i][j] + 1, j);
    process.stdout.write(")");
  }
}

// Read the matrix dimensions from a file
const fs = require('fs')

try {
    let data = fs.readFileSync('data.txt', 'utf8')
    let userData = []
    for (let i = 0; i < data.length; i++) {
        if (data[i] != ',')
        {
            userData.push(parseInt(data[i]))
        }
    }
    console.log(userData.length)
    if (userData.length > 0)
    {
        const { m, s } = matrixChainMultiplication(userData);
        console.log("********************************************");
        console.log(`Minimum number of multiplications: ${m[1][userData.length - 1]}`);
        process.stdout.write("Optimal Parenthesis              : ", end = "");
        printOptimalParens(s, 1, userData.length - 1);
        console.log("\n********************************************");

    }
    else
    {
        console.log("Invalid Input")    
    }

} catch (err) {
  console.error('Haseb error')
}

