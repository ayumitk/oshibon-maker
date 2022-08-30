// import core from "puppeteer-core";
// import chrome from "chrome-aws-lambda";

const createOgpImage = async (thumbnails: string) => {
  // const html = getHTML(thumbnails);
  // const file = await genImage(html);
  // return file;
};

// const getHTML = (thumbnails: string) => {
//   thumbnails = JSON.parse(thumbnails);
//   const thumbnailsHTML = thumbnails.map((thumbnail) => {
//     return `<img src="${thumbnail}" />`;
//   });

//   return `<!DOCTYPE html>
//   <html>
//   <meta charset="utf-8">
//   <title>Generated Image</title>
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <style>
//       .container {
//           position: relative;
//       }
//       .center {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           font-size: 30px;
//       }
//       #bg-img {
//           width: 1200px;
//           height: 630px;
//       }
//   </style>
//   <body>
//       <div class="container">
//           <div class="center">${thumbnailsHTML}</div>
//           <img id='bg-img'
//               src='path-to-background-image'>
//       </div>
//   </body>
//   </html>
//   `;
// };

// const genImage = async (html: string) => {
//   const options = await getOptions();
//   const browser = await core.launch(options);
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1200, height: 630 });
//   await page.setContent(html);
//   const file = await page.screenshot();
//   return file;
// };

// const isLocal = (): boolean => {
//   return process.env.FUNCTIONS_EMULATOR === "true";
// };

// const localExePath =
//   process.platform === "win32"
//     ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
//     : process.platform === "linux"
//     ? "/usr/bin/google-chrome"
//     : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// interface Options {
//   args: string[];
//   executablePath: string;
//   headless: boolean;
// }

// const getOptions = async () => {
//   let options: Options;
//   if (isLocal()) {
//     options = {
//       args: [],
//       executablePath: localExePath,
//       headless: true,
//     };
//   } else {
//     options = {
//       args: chrome.args,
//       executablePath: await chrome.executablePath,
//       headless: chrome.headless,
//     };
//   }
//   return options;
// };

module.exports = createOgpImage;
