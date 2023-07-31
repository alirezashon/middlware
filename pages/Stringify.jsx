const extractRequestNumbers = (text) => {
  const regex = /\b\d{8,12}\b/g;
  const requestNumbers = text.match(regex);
  return requestNumbers || [];
};

// Example text containing request numbers
const text = `اصفهان عباس دلگشایی تحویل آقای یدالهی 424413093- عامل فنی(31)23-03-1402
اهواز توسعه ‍پردازی ماداکتو زاگرس 424413151-عامل فنی(160)23-03-1402
تهران رویا پردازان  424413094- عامل فنی(191)23-03-1402
تهران نویان ارتباطات زیر ساخت 424413158-عامل فنی(105)24-03-1402
تهران ‍پیشگامان سخت افزار تیراژه 424413157-عامل فنی(205)23-03-1402
خرم آباد توسعه ‍پرداز ی ماداکتو زاگرس 424413148-عامل فنی(90)23-03-1402;

// Extract request numbers from the text
const requestNumbers = extractRequestNumbers(text);
console.log(requestNumbers);
