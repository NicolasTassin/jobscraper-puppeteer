const express = require("express");
const app = express();
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://remoteok.com/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  async function getPropertyValue(element, propertyValue) {
    const property = await element.getProperty(propertyValue);
    return await property.jsonValue();
  }
  const mainBody = await page.$("tbody");
  const rows = await mainBody.$$("tr");

  // puppeteer return an array of promises
  const rowsMapping = rows.map(async (row) => {
    const jobTitleElement = await row.$("[itemprop=title]");
    if (jobTitleElement) {
      const titleValue = await getPropertyValue(jobTitleElement, "innerText");
      const companyElement = await row.$('[itemprop=hiringOrganization]')
      //console.log(titleValue, 'title')
      const companyName = "";
      let technologies = [];
      const tags = await row.$$(".tag");

      // technologies = await Promise.all(tags.map( async (tag) => {
      //     const tagContent =  await tag.$('h3')
      //     return await tagContent.getPropertyValue(tagContent, 'innerText')
      // }))
      // const techno = tags.map(async (tag) => {
      //     const tagValue = await getPropertyValue(tag, 'innerText')
      //     technologies.push(tagValue)
      //     //console.log('tecnologies',technologies)
      // })
      // //remove duplicates
      // technologies = [...new Set(technologies)]
    }
  });
  await Promise.all(rowsMapping);

  let testTitle = "front end developer";
  const testCompany = "Google";
  const testSkills = ["frontend", "react", "node"];

  let resume = { testTitle, testCompany, testSkills };

  const testSalary = "200K";

  resume = {...resume, testSalary };

  console.log(resume);

  await browser.close();
})();

app.listen(3000, () => {
  console.log("Server launched on prot 3000");
});
