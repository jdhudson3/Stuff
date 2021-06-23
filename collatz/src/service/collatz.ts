import {GenericCache} from "../store/cache"

/* The collatz conjecture is a mathematical sequence that will always  converge to 1.
   The below class calculates the number of steps necessary for the conjecture to result in 1.
*/
export class Collatz {
    private cache: GenericCache;

    constructor(genericCache: GenericCache) {
        this.cache = genericCache;
    }

    /* The conjecture is compromised of two steps
        - if an input is even, divide by two
        - if an input is odd, multiply by three and add 1
    */
    public async compute(input) {
        var cachedVal = this.cache.get(input);
        if (cachedVal) {
            return Promise.resolve(cachedVal);
        }
        return new Promise((resolve) => {
            let val;

            if (input <= 1) {
                return resolve(0);
            }

            if (input % 2 == 0) {
                val = input / 2;
            } else {
                val = input * 3 + 1;
            }

            var lowerVal = this.compute(val).then((res) => {
                this.cache.add(val, res);
                return resolve(res + 1);
            });
        })
    }
}

/*
var ctz2 = new collatz(500);

async function printLater() {
    for(var i = 10; i > 0; i--) {
        let val = await ctz2.compute(i);
        console.log("output " + i + " " + val);
    }
}

printLater().then(() =>
    console.log("done")
);
/*
Promise.all(vals).then((values) => {
    console.log("???");
    console.log(values);
})*/