class ApiFeature {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword, //for pattern matching
            $options: "i", // for case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    // const querycopy = this.querystr // this way a refernece is passed not copy
    const querycopy = { ...this.querystr }; // this way a copy is formed

    // remove some fields for catregory
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete querycopy[key]);

    // filter for price and rating
    // console.log(querycopy);  // it gives as gt or lt but we have to add $ sign for mongo db to act
    let queryStr = JSON.stringify(querycopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); // it will replace gt with $gt

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // filter for pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.querystr.page) || 1; // to convert to number and if not given then set to 1
    const skip = resultPerPage*(currentPage-1);
    this.query = this.query.find().limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeature