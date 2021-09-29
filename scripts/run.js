// const main = async () => {
//   const [owner, randoPerson] = await hre.ethers.getSigners();
//   const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
//   const waveContract = await waveContractFactory.deploy();
//   await waveContract.deployed();

//   console.log("Contract deployed to:", waveContract.address);
//   console.log("Contract deployed by:", owner.address);

//   let waveCount;
//   waveCount = await waveContract.getTotalWaves();

//   let waverDetails;
//   waveDetails = await waveContract.getWaverDetails();

//   let waveTxn = await waveContract.wave("Batwoman");
//   await waveTxn.wait();

//   waveCount = await waveContract.getTotalWaves();

//   waveTxn = await waveContract.connect(randoPerson).wave("Batman");
//   await waveTxn.wait();

//   waveCount = await waveContract.getTotalWaves();
//   waverDetails = await waveContract.getWaverDetails();
// };

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// runMain();

const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract addy:", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Let's try two waves now
   */
  let waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait();

  // let waveTxn1 = await waveContract.wave("This is wave #2");
  // await waveTxn1.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
