import { Map } from "immutable";

export default class QueryCache<KeyType, DataType> {
  private staleTime: number;
  private cacheMap: Map<
    KeyType,
    {
      data: DataType;
      refreshTime: number;
    }
  >;

  constructor(staleTime: number) {
    this.staleTime = staleTime;
    this.cacheMap = Map();
  }

  public getCachedData(key: KeyType) {
    let cache = this.cacheMap.get(key);
    if (cache === undefined) return undefined;
    if (Date.now() >= cache.refreshTime) return undefined;
    return cache.data;
  }

  public updateCacheData(key: KeyType, data: DataType) {
    this.cacheMap = this.cacheMap.set(key, {
      data: data,
      refreshTime: Date.now() + this.staleTime
    });
  }

  public clearCache() {
    this.cacheMap = this.cacheMap.clear();
  }
}
