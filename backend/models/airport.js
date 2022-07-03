import mongoose from "mongoose";
const { Schema } = mongoose;

const Airport = new Schema(
  {
    airportId: String,
    name: String,
    city: String,
    country: String,
    iata: String,
    icao: String,
    latitude: String,
    longitude: String,
    altitude: String,
    timezone: String,
    dst: String,
    tzDatabaseTimeZone: String,
    type: String,
    source: String,
  },
  {
    statics: {
      async paginate(page = 0, limit = 10) {
        const count = await this.estimatedDocumentCount({});
        const docs = await this.find({})
          .sort({ name: 1 })
          .skip(page * limit)
          .limit(limit);

        return { count, docs };
      },
      async search(query, limit = 5) {
        const docs = await this.find(
          {
            $or: [
              { name: { $regex: `.*${query}.*`, $options: "i" } },
              { iata: { $regex: `.*${query}.*`, $options: "i" } },
            ],
          },
          { airportId: 1, name: 1, city: 1, iata: 1 }
        ).limit(limit);
        return { results: docs };
      },
    },
  }
);

export default mongoose.model("Airport", Airport);
