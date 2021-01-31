type CarSide = 'forward' | 'rear' | 'left' | 'right';

type CarSideTranslation = 'dianteira' | 'traseira' | 'esquerda' | 'direita';

export default function getCarSideTranslation(
  side: CarSide,
): CarSideTranslation | undefined {
  switch (side) {
    case 'forward':
      return 'dianteira';
    case 'rear':
      return 'traseira';
    case 'left':
      return 'esquerda';
    case 'right':
      return 'direita';
    default:
      return undefined;
  }
}
