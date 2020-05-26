import CryptoJS from "crypto-js";

let aes = {};

aes.decrypt = (msg, key, encType) => {
  var iv = CryptoJS.enc.Hex.parse(msg.substr(0, 32));
  var encrypted = msg.substring(32);

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

aes.createAesKey = () => {
  var keySize = 256;
  var ivSize = 128;
  var iterations = 100;
  var secretPhrase = CryptoJS.lib.WordArray.random(16);
  var salt = CryptoJS.lib.WordArray.random(128 / 8);
  var key = CryptoJS.PBKDF2(secretPhrase, salt, {
    keySize: 128 / 32,
  });
  return key;
};

aes.encryptMsg = (msg, key) => {
  var iv = CryptoJS.lib.WordArray.random(128 / 8);
  var encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return iv.toString() + encrypted.toString();
};

export default aes;
