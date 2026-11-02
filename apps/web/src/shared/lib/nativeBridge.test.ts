import { pickNativePhoto } from './nativeBridge';

describe('pickNativePhoto', () => {
  afterEach(() => {
    delete window.Bridge;
  });

  const mockBridge = (onOpen: (callbackName: string) => void) => {
    window.Bridge = {
      getToken: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
      openGallery: onOpen,
    };
  };

  it('네이티브가 넘긴 dataUrl로 resolve하고 콜백을 정리해요', async () => {
    mockBridge(name =>
      window[name as '__onNativeGalleryPicked']?.('data:image/jpeg;base64,AAA'),
    );
    await expect(pickNativePhoto()).resolves.toBe('data:image/jpeg;base64,AAA');
    expect(window.__onNativeGalleryPicked).toBeUndefined();
  });

  it('취소하면 null로 resolve해요', async () => {
    mockBridge(name => window[name as '__onNativeGalleryPicked']?.(null));
    await expect(pickNativePhoto()).resolves.toBeNull();
  });
});
