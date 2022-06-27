const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3client = new S3Client({
  region: "ewr1",
  endpoint: "https://ewr1.vultrobjects.com/",
  credentials: {
    accessKeyId: "LPPO2YQUG513G7ILHPP0",
    secretAccessKey: "Jap3JeUiGkdECllQ1Wms3SDvruXj9CiDbzOsJ7KF"
  }
});

(async () => {
  try {
    const target_file = path.resolve(__dirname, "./statics/03.jpg");
    const file_stream = fs.createReadStream(target_file);
    const uploadParams = {
      ACL: "public-read",
      Bucket: "test-bucket-002",
      Key: path.basename(target_file),
      Body: file_stream,
    };
    const data = await s3client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
  } catch (err) {
    console.log("Error", err);
  }
})();