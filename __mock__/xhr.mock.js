const createMockXHR = (responseJSON) => {
  const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    response: responseJSON,
    responseText: responseJSON
  };
  return mockXHR;
}

export default createMockXHR
