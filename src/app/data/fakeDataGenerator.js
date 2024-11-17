// /Users/thiennguyen/Documents/GitHub/opti_property/src/app/data/fakeDataGenerator.js
const fs = require("fs");
const path = require("path");

const UTILITY_USAGE_PATH = path.join(__dirname, "utility_usage.json");

function generateFakeData() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const floors = ["floor1", "floor2", "floor3"];
  const date = new Date().toISOString().split("T")[0];

  const data = hours.flatMap((hour) =>
    floors.map((floor) => ({
      hour,
      [`${floor}_electricity`]: Math.floor(Math.random() * (130 - 70 + 1) + 70), // Random value between 70 and 130
      [`${floor}_water`]: Math.floor(Math.random() * (90 - 55 + 1) + 55), // Random value between 55 and 90
      date,
    }))
  );

  return data;
}

function updateUtilityUsage() {
  const fakeData = generateFakeData();
  fs.writeFileSync(UTILITY_USAGE_PATH, JSON.stringify(fakeData, null, 2));
}

setInterval(updateUtilityUsage, 10000); // Update every 10 seconds
