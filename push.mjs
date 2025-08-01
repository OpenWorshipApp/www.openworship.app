"use strict";

import { readdirSync, statSync, createReadStream } from "node:fs";
import { join } from "node:path";

import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mime from "mime";

const instanceInitData = {
  apiVersion: "latest",
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

function walkSync(currentDirPath, callback) {
  readdirSync(currentDirPath).forEach((fileName) => {
    const filePath = join(currentDirPath, fileName);
    const stat = statSync(filePath);
    if (stat.isFile()) {
      callback({ currentDirPath, filePath, fileName });
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

async function uploadToS3(client, filePath, absoluteTargetDir) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const key = ('www/' + filePath.split(absoluteTargetDir).pop().replace(/\\+/g, "/"))
    .replace(/\/+/g, "/");
  const contentType = mime.getType(filePath);
  console.log(contentType);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: createReadStream(filePath),
    ContentType: contentType,
  });
  const url = `s3://${bucketName}/${key}`;
  console.log(`Uploading to "${url}"`);
  await client.send(command);
  console.log(`*Uploaded to "${url}"`);
}

async function clearCache(key) {
  const item = `/${key}`;
  const cloudfront = new CloudFrontClient(instanceInitData);
  const command = new CreateInvalidationCommand({
    DistributionId: process.env.AWS_DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: `caller-reference-${new Date().getTime()}`,
      Paths: {
        Quantity: 1,
        Items: [item],
      },
    },
  });
  await cloudfront.send(command);
  console.log("Clear cache done for", item);
}

async function main(targetDir) {
  const results = [];
  const absoluteTargetDir = join(process.cwd(), targetDir)
    .trim()
    .replace(/\/+$/, "");
  walkSync(absoluteTargetDir, (data) => results.push(data));
  const s3Client = new S3Client(instanceInitData);
  await Promise.all(
    results.map(({ filePath }) => {
      return uploadToS3(s3Client, filePath, absoluteTargetDir);
    })
  );
  await clearCache("*");
}

main(process.argv[2]);
