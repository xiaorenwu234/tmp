import CryptoJS from 'crypto-js'
import { defineStore } from 'pinia'

CryptoJS.enc.u8array = {
  /**
   * Converts a word array to a Uint8Array.
   *
   * @param {WordArray} wordArray The word array.
   *
   * @return {Uint8Array} The Uint8Array.
   *
   * @static
   *
   * @example
   *
   * var u8arr = CryptoJS.enc.u8array.stringify(wordArray);
   */
  stringify: function (wordArray) {
    // Shortcuts
    var words = wordArray.words
    var sigBytes = wordArray.sigBytes
    // Convert
    var u8 = new Uint8Array(sigBytes)
    for (var i = 0; i < sigBytes; i++) {
      var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
      u8[i] = byte
    }
    return u8
  },
  /**
   * Converts a Uint8Array to a word array.
   *
   * @param {string} u8Str The Uint8Array.
   *
   * @return {WordArray} The word array.
   *
   * @static
   *
   * @example
   *
   * var wordArray = CryptoJS.enc.u8array.parse(u8arr);
   */
  parse: function (u8arr) {
    // Shortcut
    var len = u8arr.length
    // Convert
    var words = []
    for (var i = 0; i < len; i++) {
      words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8)
    }
    return CryptoJS.lib.WordArray.create(words, len)
  }
}

export const PasswordStore = defineStore('password', () => {
  function generate_key(num) {
    let library = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let key = ''
    for (let i = 0; i < num; i++) {
      let randomPoz = Math.floor(Math.random() * library.length)
      key += library.substring(randomPoz, randomPoz + 1)
    }
    return key
  }

  //加密
  function encrypt(word, key_str = 'XXXXXXXXXXXXXXXX') {
    // 将密钥转换为字节数组
    let t_key = CryptoJS.enc.Utf8.parse(key_str)

    // 将明文转换为字节数组
    let data = CryptoJS.enc.Utf8.parse(word)

    // 进行 AES ECB 加密
    let encrypted = CryptoJS.AES.encrypt(data, t_key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7 // 使用 PKCS7 填充
    })

    // 返回加密后的密文（以十六进制字符串表示）
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex)
  }

  function decryptPart(part, key) {
    const encrypted = CryptoJS.enc.u8array.parse(part)
    const encryptedBase64 = encrypted.toString(CryptoJS.enc.Base64)
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedBase64, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.u8array.stringify(decryptedBytes)
  }

  //解密
  function decrypt(word, keyStr) {
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const encryptedSizeBytes = new Uint8Array(word.slice(0, 4)) // 假设大小信息占4字节
    const encryptedSize = new DataView(encryptedSizeBytes.buffer).getUint32(0, false)
    const encryptedContent = word.slice(4, 4 + encryptedSize)
    const tail = word.slice(4 + encryptedSize)
    const decryptedContent = decryptPart(encryptedContent, key)
    // 将解密后的内容拼接回原文件内容
    const decryptedFile = new Uint8Array(decryptedContent.byteLength + tail.byteLength)
    decryptedFile.set(new Uint8Array(decryptedContent), 0)
    decryptedFile.set(new Uint8Array(tail), decryptedContent.byteLength)
    return decryptedFile
  }

  function decryptStream(stream, keyStr) {
    const res = decrypt(stream.bytes, keyStr)
    stream.bytes = res
    stream.end = stream.bytes.length
    return stream
  }

  return {
    generate_key,
    encrypt,
    decryptStream
  }
})
