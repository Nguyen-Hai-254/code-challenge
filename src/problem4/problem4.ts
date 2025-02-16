import promptSync from "prompt-sync";

const prompt = promptSync();

function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

function sum_to_n_b(n: number): number {
    return n * (n + 1) / 2;
}

function sum_to_n_c(n: number): number {
    if (n === 0) return 0;
    return n + sum_to_n_c(n - 1);
}

do {
    const n = parseFloat(prompt("Please enten n (n >= 0) = "));
    if (n < 0 || isNaN(n)) continue;
    console.log('Results when using loop:', sum_to_n_a(n));
    console.log('Results when using formula:', sum_to_n_b(n));
    console.log('Results when using recursion:', sum_to_n_c(n));

    const c = prompt('Press c to continue?');
    if (c !== 'c') {
        break;
    }
}
while (true)