
async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");
  const mytoken = await MyToken.deploy();
  console.log("deployed to address:",mytoken.address)

}
main()
.then(()=> process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit (1);
});

//0xf9C650f3cbe3987e9c71635E1323748E2bB78B3A