exports.firstFill = async function(id, phone) {

  console.log('hello from fill form 1');
  let arr = this.splitPhoneNumber(phone);
  var prefix = arr[0];
  var prefixVal = this.getPrefixValue(prefix);
  console.log(prefix);
  var number = arr[1];
  console.log(number);

  const puppeteer = require('puppeteer');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://customers.meitavdash.co.il/home/loginuser');
  await page.type('#id-identity-input', id, {
    delay: 100
  }); // Types slower, like a user
  await page.type('#id-phone-input', number, {
    delay: 100
  }); // Types slower, like a user
  // const element = await page.$("span.filter-option.pull-left");
  await page.click('button.btn.dropdown-toggle.btn-default');
  let element = await page.$('ul.dropdown-menu.inner li:nth-child(' + prefixVal + ')');
  // var elements = await page.$('ul.dropdown-menu.inner li');
  // var element = this.filterElements(elements, prefix);
  console.log(element ? 'Has element!' : 'Failed to get element');
  const text = await page.evaluate(element => element.textContent, element);
  console.log(text);
  await page.click('ul.dropdown-menu.inner li:nth-child(' + prefixVal + ')');
  // const text = await page.evaluate(element => element.textContent, element);
  // await page.evaluate(element => {element.textContent = '052';}, element);
  await Promise.all([
    page.waitForNavigation(),
    page.click('.cmp-btn.login-id-btn')
  ]);
  // await element.type('052');
  // await page.type('span.filter-option', '052'); // Types instantly


  await page.screenshot({
    path: 'meitavdash.png'
  });
  // console.log(text);
  await browser.close();
  console.log('goodbye from fill form 1');

}

exports.secondFill = function(code) {

  console.log('hello from fill form 2');
  const puppeteer = require('puppeteer');

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://customers.meitavdash.co.il/home/loginuser');
    await page.type('#id-identity-input', '201025863', {
      delay: 100
    }); // Types slower, like a user
    await page.type('#id-phone-input', '6410318', {
      delay: 100
    }); // Types slower, like a user
    // const element = await page.$("span.filter-option.pull-left");
    await page.click('button.btn.dropdown-toggle.btn-default');
    // let element = await page.$('#dropdown-menu inner ul:nth-child(0n+2) li:nth-child(0n+1)');
    let element = await page.$('ul.dropdown-menu.inner li:nth-child(3)');
    console.log(element ? 'Has element!' : 'Failed to get element');
    await page.click('ul.dropdown-menu.inner li:nth-child(3)');
    // const text = await page.evaluate(element => element.textContent, element);
    // await page.evaluate(element => {element.textContent = '052';}, element);
    await Promise.all([
      page.waitForNavigation(),
      page.click('.cmp-btn.login-id-btn')
    ]);
    // await element.type('052');
    // await page.type('span.filter-option', '052'); // Types instantly


    await page.screenshot({
      path: 'meitavdash.png'
    });
    // console.log(text);
    await browser.close();
  })();

  console.log('goodbye from fill form 2');

}

exports.splitPhoneNumber = function(phone) {
  var prefix = phone.substr(0, 3);
  var number = phone.substr(3);

  return [prefix, number];
}

// exports.filterElements = function(elements, searchText) {
//   var element = null
//   for (var i = 0; i < elements.length; i++) {
//     if (elements[i].textContent == searchText) {
//       element = elements[i];
//       break;
//     }
//   }
//   return element;
// }

//TODO: get rid of this function
exports.getPrefixValue = function(prefix) {

  let value = null
  switch (prefix) {

    case '050':
      value = 1;
      break;
    case '051':
      value = 2;
      break;
    case '052':
      value = 3;
      break;
    case '053':
      value = 4;
      break;
    case '054':
      value = 5;
      break;
    case '055':
      value = 6;
      break;
    case '057':
      value = 7;
      break;
    case '058':
      value = 8;
      break;
  }

  return value;

}
