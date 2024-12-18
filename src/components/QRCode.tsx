import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export const QRCodeComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        window.location.href,
        {
          width: 120,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white rounded">
      <canvas ref={canvasRef} />
      <p className="text-sm text-gray-600">扫描二维码获取你的 2024 年度游戏大奖</p>
    </div>
  );
};

export default QRCodeComponent;
