import {
  inputAddressFormatter,
  outputFileDescriptorSetFormatter,
  formatTransactionHash,
  formatBlockNumber,
  formatSignature,
  formatHexToBytes,
  formatBytesToHex,
  formatTimestamp,
  formatBoolean,
  formatGasLimit,
  formatDataPayload,
  formatNonce,
} from '../../../src/util/formatters';
const gbk = require('gbk-string');

describe('test formatter', () => {
  test('test input address formatter', () => {
    expect(
      inputAddressFormatter(
        'ELF_rkws1GibTwWQnLyLvpRtnDQiZYf51tEqQDwpGaou5s4ZQvi1v_AElf'
      )
    ).toBe('rkws1GibTwWQnLyLvpRtnDQiZYf51tEqQDwpGaou5s4ZQvi1v');
    expect(() => inputAddressFormatter('ELF_test_AElf')).toThrow();
    expect(
      inputAddressFormatter('rkws1GibTwWQnLyLvpRtnDQiZYf51tEqQDwpGaou5s4ZQvi1v')
    ).toBe('rkws1GibTwWQnLyLvpRtnDQiZYf51tEqQDwpGaou5s4ZQvi1v');
    expect(
      inputAddressFormatter(
        'ELF_rkws1GibTwWQnLyLvpRtnDQiZYf51tEqQDwpGaou5s4ZQvi1v'
      )
    ).toBe('rkws1GibTwWQnLyLvpRtnDQiZYf51tEqQDwpGaou5s4ZQvi1v');
    expect(
      inputAddressFormatter({
        value: 'rkws1GibTwWQnLyLvpRtnDQiZYf51tEqQDwpGaou5s4ZQvi1v',
      })
    ).toBe('rkws1GibTwWQnLyLvpRtnDQiZYf51tEqQDwpGaou5s4ZQvi1v');
    expect(() => inputAddressFormatter('test')).toThrow('Invalid address');
    expect(() => inputAddressFormatter('JxF12TrwUP45BMd0OIl')).toThrow('Invalid address');
  });
  test('test output file descriptor set formatter', () => {
    const name = outputFileDescriptorSetFormatter(
      'CiIKIB7Dg+4T7eLv5hCby8b4g2IL6nkg/EerfNaAfWgby3SR'
    ).file[0].name;
    const str = gbk.encodeGBK(name);
    expect(str).toBe(
      '%1E%3F%3F%13%3F%3F%3F%3F%10%3F%3F%3F%3F%3Fb%B%3Fy%20%3FG%3F%7C%3F%7Dh%1B%3Ft%3F'
    );
  });

  test('test transaction hash formatter', () => {
    expect(formatTransactionHash('0xABCDEF')).toBe('0xabcdef');
    expect(() => formatTransactionHash(null)).toThrow('Invalid transaction hash');
  });

  test('test block number formatter', () => {
    expect(formatBlockNumber(100)).toBe('0x64');
    expect(formatBlockNumber('0x64')).toBe('0x64');
    expect(() => formatBlockNumber('invalid')).toThrow('Invalid block number');
  });

  test('test signature formatter', () => {
    expect(formatSignature('abcdef')).toBe('0xabcdef');
    expect(formatSignature('0xabcdef')).toBe('0xabcdef');
    expect(() => formatSignature(null)).toThrow('Invalid signature');
  });

  test('test hex to bytes formatter', () => {
    expect(formatHexToBytes('0xabcdef')).toEqual(Buffer.from('abcdef', 'hex'));
    expect(() => formatHexToBytes('invalid')).toThrow('Invalid hex format');
  });

  test('test bytes to hex formatter', () => {
    expect(formatBytesToHex(Buffer.from('abcdef', 'hex'))).toBe('0xabcdef');
    expect(() => formatBytesToHex('invalid')).toThrow('Invalid bytes input');
  });

  test('test timestamp formatter', () => {
    expect(formatTimestamp(1700000000)).toBe('2023-11-14T22:13:20.000Z');
    expect(() => formatTimestamp('invalid')).toThrow('Invalid timestamp');
  });

  test('test boolean formatter', () => {
    expect(formatBoolean(true)).toBe(true);
    expect(formatBoolean(false)).toBe(false);
    expect(formatBoolean(null)).toBe(false);
  });

  test('test gas limit formatter', () => {
    expect(formatGasLimit(100000)).toBe('0x186a0');
    expect(() => formatGasLimit(-1)).toThrow('Invalid gas limit');
  });

  test('test data payload formatter', () => {
    expect(formatDataPayload('abcdef')).toBe('0x616263646566');
    expect(formatDataPayload('0xabcdef')).toBe('0xabcdef');
    expect(() => formatDataPayload(null)).toThrow('Invalid data payload');
  });

  test('test nonce formatter', () => {
    expect(formatNonce(10)).toBe('0xa');
    expect(() => formatNonce(-1)).toThrow('Invalid nonce');
  });
});
