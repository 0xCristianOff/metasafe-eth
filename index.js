var ethers = require('ethers');
const words240 = require('./240words');

checkDuplicates = names =>
  names.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {});

analysis = async wordss => {
  let mnemonicValid = ethers.utils.HDNode.isValidMnemonic(wordss.join(' '));
  if (mnemonicValid === true && wordss.length === 12) {
    let duplicates = checkDuplicates(wordss);
    let duplicateGrade = 40;
    let consecutiveGrade = 30;
    let from10Grade = 30;
    let theWords = [];
    let theWords2 = [];

    for (let [key, value] of Object.entries(duplicates)) {
      if (value > 1) {
        duplicateGrade = duplicateGrade - value * 3;
      }
    }

    for (let i = 0; i < wordss.length - 1; i++) {
      if (wordss[i].charCodeAt(0) - wordss[i + 1].charCodeAt(0) === 0) {
        theWords.push(wordss[i]);
      }
    }
    if (theWords.length >= 2) {
      consecutiveGrade = consecutiveGrade - theWords.length * 2.5;
    }

    for (let i = 0; i < words240.length; i++) {
      for (let j = 0; j < wordss.length; j++) {
        if (words240[i] === wordss[j]) {
          // console.log(words[i]);
          /// logic for if 4 or more words, it's risky
          theWords2.push(wordss[i]);
        }
      }
    }
    if (theWords2.length >= 4) {
      from10Grade = from10Grade - theWords2.length * 2.5;
    }

    return [duplicateGrade, consecutiveGrade, from10Grade];
  } else {
    return 'mnemonic invalid';
  }
};

// 24 word check
analysis24 = async wordss => {
  let mnemonicValid = ethers.utils.HDNode.isValidMnemonic(wordss.join(' '));
  if (mnemonicValid === true && wordss.length === 24) {
    let duplicates = checkDuplicates(wordss);
    let duplicateGrade = 40;
    let consecutiveGrade = 30;
    let from10Grade = 30;
    let theWords = [];
    let theWords2 = [];

    for (let [key, value] of Object.entries(duplicates)) {
      if (value > 1) {
        duplicateGrade = duplicateGrade - value * 1.5;
      }
    }

    for (let i = 0; i < wordss.length - 1; i++) {
      if (wordss[i].charCodeAt(0) - wordss[i + 1].charCodeAt(0) === 0) {
        theWords.push(wordss[i]);
      }
    }
    if (theWords.length >= 2) {
      consecutiveGrade = consecutiveGrade - theWords.length * 1.75;
    }

    for (let i = 0; i < words240.length; i++) {
      for (let j = 0; j < wordss.length; j++) {
        if (words240[i] === wordss[j]) {
          // console.log(words[i]);
          /// logic for if 4 or more words, it's risky
          theWords2.push(wordss[i]);
        }
      }
    }
    if (theWords2.length >= 4) {
      from10Grade = from10Grade - theWords2.length * 1.75;
    }

    return [duplicateGrade, consecutiveGrade, from10Grade];
  } else {
    return 'mnemonic invalid';
  }
};

generateMnemonic12 = async () => {
  try {
    let y = true;
    while (y === true) {
      var mnemonic = ethers.utils.HDNode.entropyToMnemonic(
        ethers.utils.randomBytes(16)
      );
      mnemonic = mnemonic.split(' ');
      let x = await analysis(mnemonic);
      if (x[0] + x[1] + x[2] === 100) {
        y = false;
        return mnemonic;
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};
generateMnemonic24 = async () => {
  try {
    let y = true;
    while (y === true) {
      var mnemonic = ethers.utils.HDNode.entropyToMnemonic(
        ethers.utils.randomBytes(32)
      );
      mnemonic = mnemonic.split(' ');
      let x = await analysis24(mnemonic);
      if (x[0] + x[1] + x[2] === 100) {
        y = false;
        return mnemonic;
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};



module.exports.generateMnemonic12 = generateMnemonic12;
module.exports.generateMnemonic24 = generateMnemonic24;
