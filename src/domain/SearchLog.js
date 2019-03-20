class SearchLog {
  constructor(region, kindOf, startDate, endDate, pageSize) {
    this.region = region;
    this.kindOf = kindOf;
    this.startDate = startDate;
    this.endDate = endDate;
    this.page = 0;
    this.size = pageSize;
  }

  addCondition(region, kindOf) {
    this.region = region;
    this.kindOf = kindOf;
  }
}

export default SearchLog;
