const SimpleStorage = artifacts.require("SimpleStorage");
const truffleAssert = require('truffle-assertions');

contract("SimpleStorage", (accounts) => {
  let fileStorageInstance;
  let fileId;
  const owner = accounts[0];
  const accessUser = accounts[1];
  const nonAccessUser = accounts[2];
  const ipfsHash = "QmTestHash123456";

  beforeEach(async () => {
    fileStorageInstance = await SimpleStorage.new();
  });

  it("should upload a file and emit FileUploaded event", async () => {
    const result = await fileStorageInstance.uploadFile(
      ipfsHash, 
      [accessUser], 
      { from: owner }
    );

    // Capture the fileId from event logs
    fileId = result.logs[0].args.fileId;
    console.log(result.logs);

    // Assert event was emitted
    truffleAssert.eventEmitted(result, 'FileUploaded', (ev) => {
      return ev.ipfsHash === ipfsHash && ev.owner === owner;
    });
  });

  it("should grant access to a specific user", async () => {
    // First upload the file
    const uploadResult = await fileStorageInstance.uploadFile(
      ipfsHash, 
      [], 
      { from: owner }
    );
    const fileId = uploadResult.logs[0].args.fileId;

    // Grant access to the user
    const grantResult = await fileStorageInstance.grantAccess(
      fileId, 
      accessUser, 
      { from: owner }
    );

    // Assert access granted event
    truffleAssert.eventEmitted(grantResult, 'AccessGranted', (ev) => {
      return ev.fileId === fileId && ev.user === accessUser;
    });
  });

  it("should retrieve file for authorized user", async () => {
    // Upload file with access for specific user
    const uploadResult = await fileStorageInstance.uploadFile(
      ipfsHash, 
      [accessUser], 
      { from: owner }
    );
    const fileId = uploadResult.logs[0].args.fileId;

    // Retrieve file as authorized user
    const retrievedHash = await fileStorageInstance.getFile(
      fileId, 
      { from: accessUser }
    );

    assert.equal(retrievedHash, ipfsHash, "Retrieved IPFS hash should match uploaded hash");
  });

  it("should prevent unauthorized file access", async () => {
    // Upload file
    const uploadResult = await fileStorageInstance.uploadFile(
      ipfsHash, 
      [], 
      { from: owner }
    );
    const fileId = uploadResult.logs[0].args.fileId;

    // Attempt to retrieve file without access should revert
    await truffleAssert.reverts(
      fileStorageInstance.getFile(fileId, { from: nonAccessUser }),
      "Access Denied"
    );
  });
});