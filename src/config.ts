import { Client } from "@elastic/elasticsearch";
//Cloud Elastic Search
const cloudClient = new Client({
  cloud: {
    id:
      "cloud:ZXVyb3BlLXdlc3QxLmdjcC5jbG91ZC5lcy5pbyRlYzg1OGQxZjUzNmE0ODA0YmU2MmE3ODVjYTIwZjM0NCRhN2Q5NTE1NmVmOWM0ZjVkOThkMjkxNzNjOTIwZWEzMA==",
  },
  auth: {
    username: "elastic",
    password: "jMJnrihr26aQAHuIpgz7X8MQ",
  },
});
// Local Elastic Search
// const localClient = new Client({
//   node: "127.0.0.1:9200",
// });

export default cloudClient;
