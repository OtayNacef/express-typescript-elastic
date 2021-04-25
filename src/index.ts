import { RequestParams } from "@elastic/elasticsearch";
import express from "express";
import client from "./config";
import { IPhotos } from "./Iphotos";

const app = express();
const PORT = 3000;

client
  .info()
  .then((response) => console.log(JSON.stringify(response)))
  .catch((error) => console.error(JSON.stringify(error)));

const Add = async () => {
  const document: RequestParams.Index = {
    index: "albums",
    id: "1",
    type: "photos",
    body: {
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
  };
  client.index(document, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("created a new index", result);
    }
  });
};

const bulkAdd = async () => {
  const photos = require("./photos.json");
  // formating photos list to documents (adding _index and _type)
  const body = photos.flatMap((doc: IPhotos) => [
    { index: { _index: "albums", _type: "photos" } },
    doc,
  ]);
  // counting Index
  const { body: bulkResponse } = await client.bulk({
    refresh: true,
    body,
  });
  if (bulkResponse.errors) {
    console.log(bulkResponse.errors);
  }
  // counting Index
  const { body: count } = await client.count({ index: "albums" });
  console.log(count);
};

const deleteDoc = async () => {
  client.delete(
    { index: "albums", id: "1", type: "photos" },
    (error, response) => {
      console.log(response);
    }
  );
};
// Add();
// bulkAdd();
// deleteDoc():

app.get("/photos", async (req, res) => {
  const { search } = req.query;
  try {
    const body = {
      index: "albums",
      type: "photos",
      body: {
        size: 200,
        query: { match: { title: search } },
      },
    };
    await client.search(body).then((response) => {
      res.send(response.body);
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/", (_req, res) => res.send("Elastic ,Express & TypeScript Server"));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
