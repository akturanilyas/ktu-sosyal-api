const cheerio = require('cheerio');
const phantom = require('phantom');

export const getAnnouncements = async () => {
  const instance = await phantom.create();
  const page = await instance.createPage();

  await page.open('https://www.ktu.edu.tr/ktu-tumduyuru');
  const content = await page.property('content');
  page.close();
  instance.exit();
  
  const $ = cheerio.load(content, { decodeEntities: false });
  const links = [];
  const titles = [];
  const select = $('#sonuc table td a');
  select.each(function () { links.push(($(this).attr('href'))); });
  select.each(function () { titles.push(($(this).html())); });

  const result = [];
  for (let i = 0; i < links.length; i += 1) {
    result.push({ link: links[i], title: titles[i] });
  }

  return result;
};
