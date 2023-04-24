import AElf from '../../src/index';
const stageEndpoint = 'https://explorer-test-tdvw.aelf.io/chain';
describe('test AElf', () => {
  test('test AElf is connected', () => {
    const aelf = new AElf(new AElf.providers.HttpProvider(stageEndpoint));
    const result = aelf.isConnected();
    expect(result).toBeTruthy();
  });
  test('test AElf set provider', () => {
    const aelf = new AElf(
      new AElf.providers.HttpProvider('https://aelf-public-node.aelf.io')
    );
    aelf.setProvider(new AElf.providers.HttpProvider(stageEndpoint));
    expect(aelf.currentProvider.host).toEqual(stageEndpoint);
  });
});
