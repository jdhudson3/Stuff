/* Generic cache, currently implemented as just a singleton map.
*/
export class GenericCache {
    private static instance: GenericCache;
    private maxSize: number;
    private hits: number = 0;
    private misses: number = 0;

    /* Could switch this to an actual caching library to support eviction rather than just capping the size.
       Could also switch this to redis or some other distributed k/v store if you wanted to do something fancier than
            computing arbitrary numbers.
    */
    private cacheContents = new Map();

    private constructor(desiredSize: number) {
        this.maxSize = desiredSize;
    }

    public static getInstance(desiredSize: number): GenericCache {
        if (!GenericCache.instance) {
            GenericCache.instance = new GenericCache(desiredSize);
        }
        return GenericCache.instance;
    }

    public add(key, value) {
        if (this.cacheContents.size < this.maxSize) {
            this.cacheContents[key] = value;
        }
    }

    public get(key) {
        if (key in this.cacheContents) {
            this.hits++;
            return this.cacheContents[key];
        }
        this.misses++;
        return null;
    }

    public getCacheContents() {
        return this.cacheContents;
    }

    public getStats() {
        return {
            "size": this.cacheContents.size,
            "maxSize": this.maxSize,
            "hits": this.hits,
            "misses": this.misses
        };
    }

}