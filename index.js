const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand, GetBucketCorsCommand, PutBucketCorsCommand } = require("@aws-sdk/client-s3");

const s3client = new S3Client({
  region: "ewr1",
  endpoint: "https://ewr1.vultrobjects.com/",
  credentials: {
    accessKeyId: "LPPO2YQUG513G7ILHPP0",
    secretAccessKey: "Jap3JeUiGkdECllQ1Wms3SDvruXj9CiDbzOsJ7KF"
  }
});

async function set_cors() {
  const cors_command = new PutBucketCorsCommand({
    Bucket: "test-bucket-002",
    CORSConfiguration: {
      CORSRules: [{
        AllowedOrigins: ["http://localhost:8200"],
        AllowedHeaders: ["Authorization"],
        AllowedMethods: ["GET", "POST", "PUT", "HEAD", "DELETE"],
      }]
    }
  });
  const cors_result = await s3client.send(cors_command);
  console.log(cors_result);
};

async function get_cors() {
  const cors_command = new GetBucketCorsCommand({
    Bucket: "test-bucket-002",
  });
  const cors_result = await s3client.send(cors_command);
  console.log(cors_result.CORSRules);
};

(async () => {
  await set_cors();
  await get_cors();
})();


async function upload_file() {
  try {
    const target_file = path.resolve(__dirname, "./statics/03.jpg");
    const file_stream = fs.createReadStream(target_file);
    const upload_command = new PutObjectCommand({
      ACL: "public-read",
      Bucket: "test-bucket-002",
      Key: path.basename(target_file),
      Body: file_stream,
    });
    const data = await s3client.send(upload_command);
    console.log("Success", data);
  } catch (err) {
    console.log("Error", err);
  }
};