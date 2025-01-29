export const baseValidation = (val: any) => {
  return (val && val.length > 0) || 'このフィールドは必須です';
};
export const controlCharValidation = (val: any) => {
  const controlCharPattern = /[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F]/;
  return controlCharPattern.test(val) ? '制御文字は含められません' : true;
};
export const symbolValidation = (val: any) => {
  const symbolPattern =
    /[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]/;
  return symbolPattern.test(val) ? '記号は含められません' : true;
};
export const lengthValidation = (val: any, length: number) => {
  if (!val) {
    return true;
  }
  return val.length <= length || `${length}文字以内で入力してください`;
};
export const urlValidation = (val: any) => {
  // regex-weburl.js(https://gist.github.com/dperini/729294)を利用
  const re_weburl = new RegExp(
    '^' +
      // protocol identifier (optional)
      // short syntax // still required
      '(?:(?:(?:https?|ftp):)?\\/\\/)' +
      // user:pass BasicAuth (optional)
      '(?:\\S+(?::\\S*)?@)?' +
      '(?:' +
      // IP address exclusion
      // private & local networks
      '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
      '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
      '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broadcast addresses
      // (first & last IP address of each class)
      '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
      '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
      '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
      '|' +
      // host & domain names, may end with dot
      // can be replaced by a shortest alternative
      // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
      '(?:' +
      '(?:' +
      '[a-z0-9\\u00a1-\\uffff]' +
      '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
      ')?' +
      '[a-z0-9\\u00a1-\\uffff]\\.' +
      ')+' +
      // TLD identifier name, may end with dot
      '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
      ')' +
      // port number (optional)
      '(?::\\d{2,5})?' +
      // resource path (optional)
      '(?:[/?#]\\S*)?' +
      '$',
    'i'
  );
  return !val ? true : re_weburl.test(val) || '不適切なurlです';
};
