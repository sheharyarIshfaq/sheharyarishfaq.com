// Tells Bing and the other IndexNow engines that every page in the live sitemap has changed. Run after a deploy.
const host = "sheharyarishfaq.com";
const key = "3c3f58c88efcb81fbb14a470251c961e";

const sitemap = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${response.status} ${response.statusText} for ${urlList.length} URLs`);
if (!response.ok) process.exit(1);
