exports.firstFill = async function(id, phone, page) {

  console.log('hello from fill form 1');

  let arr = this.splitPhoneNumber(phone);
  var prefix = arr[0];
  var number = arr[1];
  var prefixVal = this.getPrefixValue(prefix);
  console.log("prefix = " + prefix);
  console.log("number = " + number);
  console.log("prefixVal = " + prefixVal);

  await page.goto('https://customers.meitavdash.co.il/home/loginuser');
  await page.type('#id-identity-input', id, {
    delay: 100
  }); // Types slower, like a user
  await page.type('#id-phone-input', number, {
    delay: 100
  }); // Types slower, like a user

  await page.click('button.btn.dropdown-toggle.btn-default');
  let element = await page.$('ul.dropdown-menu.inner li:nth-child(' + prefixVal + ')');

  // console.log(element ? 'Has element!' : 'Failed to get element');
  // const text = await page.evaluate(element => element.textContent, element);
  // console.log(text);
  await page.click('ul.dropdown-menu.inner li:nth-child(' + prefixVal + ')');

  await Promise.all([
    page.waitForNavigation(),
    page.click('.cmp-btn.login-id-btn')
  ]);


  await page.screenshot({
    path: 'meitavdash.png'
  });

  console.log('goodbye from fill form 1');

}

exports.secondFill = async function(code, page) {

  console.log('hello from fill form 2');

  await page.type('#code-digits-input', code, {
    delay: 100
  }); // Types slower, like a user

  await Promise.all([
    page.waitForNavigation(),
    page.click('.cmp-btn.login-code-btn')
  ]);

  await page.screenshot({
    path: 'meitavdash.png'
  });

  const renderedContent = await page.evaluate(() => new XMLSerializer().serializeToString(document));
  console.log(renderedContent);

  console.log('goodbye from fill form 2');

  return renderedContent;
}

exports.splitPhoneNumber = function(phone) {
  var prefix = phone.substr(0, 3);
  var number = phone.substr(3);

  return [prefix, number];
}

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
