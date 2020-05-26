import JSEncrypt from "jsencrypt";

let jsencrypt = {};

jsencrypt.rsaEncrypt = (rsaPublicKey, aesKey) => {
  var rsaEncrpyt = new JSEncrypt({ default_key_size: 1024 });

  rsaEncrpyt.setPublicKey(rsaPublicKey);
  var rsaEncryptedAesKey = rsaEncrpyt.encrypt(JSON.stringify(aesKey));
  return rsaEncryptedAesKey;
};

export default jsencrypt;
